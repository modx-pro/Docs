# Расширение компонента

mSearch позволяет индексировать не только ресурсы MODX, но и любые другие объекты — комментарии, товары, пользователей и т.д. Для этого используется система адаптеров.

## Архитектура

```
┌─────────────────────────────────────────────────────┐
│                     Indexer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │ Resource    │  │ Comment     │  │ Product     │ │
│  │ Adapter     │  │ Adapter     │  │ Adapter     │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────┐
│              Таблицы индекса                        │
│  mse_words (resource, field, word, class_key)       │
│  mse_intro (resource, intro, class_key)             │
└─────────────────────────────────────────────────────┘
```

Каждый адаптер:

- Определяет, какие классы объектов он поддерживает
- Указывает поля для индексации и их веса
- Извлекает текст из полей объекта
- Предоставляет выборку объектов для пакетной индексации

## Интерфейс ContentAdapterInterface

```php
<?php

namespace MSearch\Adapters;

interface ContentAdapterInterface
{
    /**
     * Проверяет, поддерживает ли адаптер данный класс
     */
    public function supports(string $className): bool;

    /**
     * Возвращает массив полей для индексации с весами
     * @return array<string, int> [field => weight]
     */
    public function getIndexableFields(): array;

    /**
     * Извлекает текст из поля объекта
     */
    public function extractContent(object $object, string $field): string;

    /**
     * Возвращает объекты для пакетной индексации
     * @return iterable<object>
     */
    public function getObjects(array $criteria, int $limit, int $offset): iterable;

    /**
     * Возвращает общее количество объектов
     */
    public function getTotal(array $criteria = []): int;

    /**
     * Возвращает приоритет адаптера (выше = раньше проверяется)
     */
    public function getPriority(): int;
}
```

## Базовый класс AbstractAdapter

Для удобства наследуйтесь от `AbstractAdapter`:

```php
<?php

namespace MSearch\Adapters;

abstract class AbstractAdapter implements ContentAdapterInterface
{
    protected \MODX\Revolution\modX $modx;
    protected \MSearch\MSearch $msearch;

    public function __construct(\MODX\Revolution\modX $modx, \MSearch\MSearch $msearch)
    {
        $this->modx = $modx;
        $this->msearch = $msearch;
    }

    /**
     * Очистка HTML и нормализация пробелов
     */
    protected function cleanText(string $text): string
    {
        $text = strip_tags($text);
        $text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
        $text = preg_replace('/\s+/', ' ', $text);
        return trim($text);
    }

    /**
     * Рекурсивное извлечение текста из JSON (MIGX и др.)
     */
    protected function flattenJson(mixed $data): string
    {
        if (is_string($data)) {
            $decoded = json_decode($data, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                return $this->flattenJson($decoded);
            }
            return $data;
        }

        if (is_array($data)) {
            $texts = [];
            foreach ($data as $value) {
                $texts[] = $this->flattenJson($value);
            }
            return implode(' ', array_filter($texts));
        }

        return '';
    }

    public function getPriority(): int
    {
        return 0;
    }
}
```

## Событие mseOnRegisterAdapters

Для регистрации адаптеров используется событие `mseOnRegisterAdapters`, которое вызывается при инициализации Indexer.

**Параметры события:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `indexer` | `Indexer` | Экземпляр индексатора |

## Пример: Адаптер для комментариев

Допустим, у вас есть компонент с комментариями (модель `TicketComment`) и вы хотите их индексировать.

### Шаг 1: Создайте класс адаптера

Файл: `core/components/tickets/src/Adapters/TicketCommentAdapter.php`

```php
<?php

namespace Tickets\Adapters;

use MSearch\Adapters\AbstractAdapter;

class TicketCommentAdapter extends AbstractAdapter
{
    /**
     * Поддерживаемый класс
     */
    public function supports(string $className): bool
    {
        return is_a($className, 'TicketComment', true);
    }

    /**
     * Поля для индексации с весами
     */
    public function getIndexableFields(): array
    {
        return [
            'text' => 1,      // текст комментария
            'name' => 2,      // имя автора (выше вес для поиска по авторам)
            'email' => 1,     // email автора
        ];
    }

    /**
     * Извлечение текста из поля
     */
    public function extractContent(object $object, string $field): string
    {
        $value = $object->get($field);

        if ($field === 'text') {
            return $this->cleanText($value ?? '');
        }

        return $value ?? '';
    }

    /**
     * Выборка комментариев для индексации
     */
    public function getObjects(array $criteria, int $limit, int $offset): iterable
    {
        $c = $this->modx->newQuery('TicketComment');
        $c->where([
            'published' => true,
            'deleted' => false,
        ]);
        $c->sortby('id', 'ASC');
        $c->limit($limit, $offset);

        return $this->modx->getIterator('TicketComment', $c);
    }

    /**
     * Общее количество комментариев
     */
    public function getTotal(array $criteria = []): int
    {
        return $this->modx->getCount('TicketComment', [
            'published' => true,
            'deleted' => false,
        ]);
    }

    /**
     * Приоритет выше стандартного ResourceAdapter (0)
     */
    public function getPriority(): int
    {
        return 10;
    }
}
```

### Шаг 2: Создайте плагин для регистрации

**Плагин:** `TicketsMSearchAdapter`
**События:** `mseOnRegisterAdapters`

```php
<?php
/**
 * Регистрация адаптера комментариев в mSearch
 *
 * @event mseOnRegisterAdapters
 */

switch ($modx->event->name) {
    case 'mseOnRegisterAdapters':
        /** @var \MSearch\Services\Indexer\Indexer $indexer */
        $indexer = $modx->event->params['indexer'];

        /** @var \MSearch\MSearch $msearch */
        $msearch = $modx->services->get('msearch');

        // Проверяем, что Tickets установлен
        $ticketsPath = MODX_CORE_PATH . 'components/tickets/';
        if (!is_dir($ticketsPath)) {
            return;
        }

        // Регистрируем адаптер
        $indexer->addAdapter(
            new \Tickets\Adapters\TicketCommentAdapter($modx, $msearch)
        );
        break;
}
```

### Шаг 3: Автоиндексация при сохранении

**Плагин:** `TicketsAutoIndex`
**События:** `OnTicketCommentSave`, `OnTicketCommentRemove`

```php
<?php
/**
 * Автоиндексация комментариев
 *
 * @event OnTicketCommentSave
 * @event OnTicketCommentRemove
 */

if (!$modx->services->has('msearch')) {
    return;
}

/** @var \MSearch\MSearch $msearch */
$msearch = $modx->services->get('msearch');

switch ($modx->event->name) {
    case 'OnTicketCommentSave':
        /** @var TicketComment $comment */
        $comment = $modx->event->params['object'];

        if ($comment->get('published') && !$comment->get('deleted')) {
            $msearch->index($comment->get('id'));
        } else {
            $msearch->removeFromIndex($comment->get('id'));
        }
        break;

    case 'OnTicketCommentRemove':
        /** @var TicketComment $comment */
        $comment = $modx->event->params['object'];
        $msearch->removeFromIndex($comment->get('id'));
        break;
}
```

## Пример: Адаптер для товаров miniShop2

```php
<?php

namespace MiniShop2\Adapters;

use MSearch\Adapters\AbstractAdapter;

class msProductAdapter extends AbstractAdapter
{
    public function supports(string $className): bool
    {
        return is_a($className, 'msProduct', true);
    }

    public function getIndexableFields(): array
    {
        return [
            'pagetitle' => 5,
            'longtitle' => 3,
            'description' => 2,
            'introtext' => 2,
            'content' => 1,
            'article' => 4,      // артикул — важное поле
            'vendor_name' => 2,  // название производителя
        ];
    }

    public function extractContent(object $object, string $field): string
    {
        // Название производителя из связанной таблицы
        if ($field === 'vendor_name') {
            $vendorId = $object->get('vendor');
            if ($vendorId) {
                $vendor = $this->modx->getObject('msVendor', $vendorId);
                return $vendor ? $vendor->get('name') : '';
            }
            return '';
        }

        // Артикул из msProductData
        if ($field === 'article') {
            $data = $object->getOne('Data');
            return $data ? $data->get('article') ?? '' : '';
        }

        // Стандартные поля
        return $this->cleanText($object->get($field) ?? '');
    }

    public function getObjects(array $criteria, int $limit, int $offset): iterable
    {
        $c = $this->modx->newQuery('msProduct');
        $c->where([
            'published' => true,
            'deleted' => false,
            'searchable' => true,
            'class_key' => 'msProduct',
        ]);
        $c->limit($limit, $offset);

        return $this->modx->getIterator('msProduct', $c);
    }

    public function getTotal(array $criteria = []): int
    {
        return $this->modx->getCount('msProduct', [
            'published' => true,
            'deleted' => false,
            'searchable' => true,
            'class_key' => 'msProduct',
        ]);
    }

    public function getPriority(): int
    {
        return 20;
    }
}
```

## Программное использование

### Индексация

```php
<?php
$msearch = $modx->services->get('msearch');

// Индексировать один объект
$msearch->index($objectId);

// Пакетная индексация
$result = $msearch->indexBatch([
    'limit' => 100,
    'offset' => 0,
]);
// ['indexed' => 95, 'offset' => 100, 'total' => 500, 'done' => false]

// Удаление из индекса
$msearch->removeFromIndex($objectId);

// Полная очистка
$msearch->clearIndex();
```

### Поиск

```php
<?php
$msearch = $modx->services->get('msearch');

$results = $msearch->search('купить смартфон', [
    'limit' => 20,
    'offset' => 0,
]);

$results->getTotal();      // общее количество
$results->getIds();        // массив ID
$results->toArray();       // [id => weight]
$results->isEmpty();       // нет результатов?

foreach ($results as $id => $weight) {
    $resource = $modx->getObject('modResource', $id);
}
```

### Подсветка

```php
<?php
$msearch = $modx->services->get('msearch');

$highlighted = $msearch->highlight($text, $query, [
    'tagOpen' => '<mark>',
    'tagClose' => '</mark>',
    'ellipsisLength' => 200,
]);
```

## Приоритет адаптеров

Адаптеры проверяются в порядке приоритета (от большего к меньшему). Первый адаптер, вернувший `true` в `supports()`, будет использован.

```
msProductAdapter (priority: 20)     ← проверяется первым
TicketCommentAdapter (priority: 10)
ResourceAdapter (priority: 0)       ← проверяется последним
```

## Поле class_key

Индекс хранит `class_key` для каждой записи, что позволяет:

- Индексировать объекты разных типов в одних таблицах
- Фильтровать результаты по типу при необходимости
