# Свой тип фильтра

Создание кастомного типа фильтрации.

## Задача

Создать фильтр, которого нет среди встроенных типов.

## Пример: Фильтр по рейтингу

Создадим фильтр «Рейтинг» с выбором количества звёзд.

### 1. Создайте класс типа

```php
<?php
// core/components/mysite/src/FilterTypes/RatingFilterType.php

namespace MySite\FilterTypes;

use MODX\Revolution\modX;
use MFilter\Handlers\FilterTypes\AbstractFilterType;

class RatingFilterType extends AbstractFilterType
{
    /**
     * Применить фильтр к запросу
     */
    public function apply(
        \xPDOQuery $query,
        string $key,
        mixed $value,
        array $config
    ): void {
        $values = $this->normalizeValue($value);
        $field = $this->getFieldName($config);

        if (isset($values['min'])) {
            // Рейтинг >= выбранного
            $query->where(["{$field}:>=" => (int)$values['min']]);
        } else {
            // Точное значение рейтинга
            $query->where(["{$field}:IN" => array_map('intval', $values)]);
        }
    }

    /**
     * Получить доступные значения для фильтра
     */
    public function getValues(
        string $key,
        array $config,
        array $context
    ): array {
        $values = [];

        // Генерируем значения 1-5 звёзд
        for ($i = 5; $i >= 1; $i--) {
            $values[] = [
                'value' => (string)$i,
                'label' => str_repeat('★', $i) . str_repeat('☆', 5 - $i),
                'count' => 0 // Будет заполнено через suggestions
            ];
        }

        return [
            'values' => $values,
            'min' => 1,
            'max' => 5
        ];
    }

    /**
     * Получить SQL для подсчёта (suggestions)
     */
    public function getSuggestionsQuery(
        string $key,
        array $config,
        array $context
    ): ?string {
        $field = $this->getFieldName($config);

        return "SELECT {$field} as value, COUNT(*) as count
                FROM {table}
                WHERE {$field} IS NOT NULL
                GROUP BY {$field}";
    }

    /**
     * Получить имя поля
     */
    protected function getFieldName(array $config): string
    {
        return $config['field'] ?? 'Data.rating';
    }
}
```

### 2. Зарегистрируйте тип

Создайте плагин на событие `OnMFilterInit`:

```php
<?php
/**
 * Плагин: MySiteFilterTypes
 * События: OnMFilterInit
 */

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Автозагрузка (если не через Composer)
require_once MODX_CORE_PATH . 'components/mysite/src/FilterTypes/RatingFilterType.php';

// Регистрация типа
$mfilter->getFilterTypeRegistry()->register(
    'rating',
    new \MySite\FilterTypes\RatingFilterType($modx)
);
```

### 3. Используйте в наборе фильтров

В админке создайте фильтр с типом `rating`:

```json
{
    "rating": {
        "type": "rating",
        "source": "resource",
        "field": "Data.rating",
        "label": "Рейтинг"
    }
}
```

### 4. Создайте шаблон (опционально)

```html
{* @FILE chunks/mfilter/filter.rating.tpl *}

<div class="mfilter-rating">
    {foreach $values as $item}
        <label class="mfilter-rating__item {$item.selected ? 'mfilter-rating__item--selected' : ''}">
            <input type="radio"
                   name="{$key}[min]"
                   value="{$item.value}"
                   {$item.selected ? 'checked' : ''}>
            <span class="mfilter-rating__stars">{$item.label}</span>
            <span class="mfilter-rating__text">и выше</span>
            <span class="mfilter-rating__count">({$item.count})</span>
        </label>
    {/foreach}
</div>
```

```css
.mfilter-rating__stars {
    color: #ffc107;
    font-size: 1.2em;
}

.mfilter-rating__item--selected .mfilter-rating__stars {
    text-shadow: 0 0 5px rgba(255, 193, 7, 0.5);
}
```

## Пример: Фильтр по наличию на складе

### Класс

```php
<?php
namespace MySite\FilterTypes;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class StockFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);

        $conditions = [];

        if (in_array('instock', $values)) {
            $conditions[] = 'Data.count > 0';
        }

        if (in_array('preorder', $values)) {
            $conditions[] = '(Data.count = 0 AND Data.available = 1)';
        }

        if (in_array('outofstock', $values)) {
            $conditions[] = '(Data.count = 0 AND Data.available = 0)';
        }

        if ($conditions) {
            $query->where('(' . implode(' OR ', $conditions) . ')');
        }
    }

    public function getValues(string $key, array $config, array $context): array
    {
        return [
            'values' => [
                ['value' => 'instock', 'label' => 'В наличии', 'count' => 0],
                ['value' => 'preorder', 'label' => 'Под заказ', 'count' => 0],
                ['value' => 'outofstock', 'label' => 'Нет в наличии', 'count' => 0],
            ]
        ];
    }
}
```

## Пример: Фильтр по тегам (many-to-many)

### Класс

```php
<?php
namespace MySite\FilterTypes;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class TagsFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $tagIds = array_map('intval', $this->normalizeValue($value));

        // JOIN с таблицей связей
        $query->innerJoin(
            'ProductTags',
            'Tags',
            'Tags.product_id = msProduct.id'
        );

        $query->where(['Tags.tag_id:IN' => $tagIds]);
        $query->groupby('msProduct.id');
    }

    public function getValues(string $key, array $config, array $context): array
    {
        // Получить все теги
        $tags = $this->modx->getCollection('Tag', [
            'active' => true
        ]);

        $values = [];
        foreach ($tags as $tag) {
            $values[] = [
                'value' => (string)$tag->get('id'),
                'label' => $tag->get('name'),
                'count' => 0
            ];
        }

        return ['values' => $values];
    }

    public function getSuggestionsQuery(string $key, array $config, array $context): ?string
    {
        return "SELECT Tags.tag_id as value, COUNT(DISTINCT Tags.product_id) as count
                FROM modx_product_tags Tags
                INNER JOIN {table} ON {table}.id = Tags.product_id
                GROUP BY Tags.tag_id";
    }
}
```

## Пример: Географический фильтр

### Класс

```php
<?php
namespace MySite\FilterTypes;

use MFilter\Handlers\FilterTypes\AbstractFilterType;

class GeoFilterType extends AbstractFilterType
{
    public function apply($query, string $key, mixed $value, array $config): void
    {
        $values = $this->normalizeValue($value);

        if (isset($values['lat'], $values['lng'], $values['radius'])) {
            $lat = (float)$values['lat'];
            $lng = (float)$values['lng'];
            $radius = (float)$values['radius']; // км

            // Формула Haversine для поиска в радиусе
            $query->where("
                (6371 * acos(
                    cos(radians({$lat}))
                    * cos(radians(Data.latitude))
                    * cos(radians(Data.longitude) - radians({$lng}))
                    + sin(radians({$lat}))
                    * sin(radians(Data.latitude))
                )) <= {$radius}
            ");
        }
    }

    public function getValues(string $key, array $config, array $context): array
    {
        return [
            'type' => 'geo',
            'defaultRadius' => 10
        ];
    }
}
```

## Регистрация через конфиг

Альтернативный способ — файл конфигурации:

```php
<?php
// core/components/mfilter/config/filter_types.php

return [
    'rating' => \MySite\FilterTypes\RatingFilterType::class,
    'stock' => \MySite\FilterTypes\StockFilterType::class,
    'tags' => \MySite\FilterTypes\TagsFilterType::class,
    'geo' => \MySite\FilterTypes\GeoFilterType::class,
];
```

## Советы

1. **Наследуйте AbstractFilterType** — он содержит полезные методы
2. **Реализуйте getSuggestionsQuery()** — для корректных счётчиков
3. **Валидируйте входные данные** — не доверяйте пользовательскому вводу
4. **Добавляйте индексы** — для полей, по которым фильтруете
5. **Тестируйте производительность** — сложные JOIN могут замедлить запросы
