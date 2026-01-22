# Сервисы

PHP-сервисы mFilter и возможности их кастомизации.

## Архитектура

mFilter использует сервис-ориентированную архитектуру с lazy-loading:

```php
// Главный класс — фасад для доступа к сервисам
$mfilter = $modx->services->get('mfilter');

// Получение сервисов через геттеры
$filter = $mfilter->getFilter();
$slugManager = $mfilter->getSlugManager();
$urlRouter = $mfilter->getUrlRouter();
```

## Список сервисов

| Сервис | Класс | Описание |
|--------|-------|----------|
| Filter | `Services\Filter\Filter` | Основная логика фильтрации |
| FilterConfig | `Services\Filter\FilterConfig` | Конфигурация фильтров страницы |
| FilterSetManager | `Services\FilterSet\FilterSetManager` | Управление наборами фильтров |
| SlugManager | `Services\Slug\SlugManager` | Управление слагами |
| SlugParser | `Services\Slug\SlugParser` | Парсинг SEO URL |
| SlugGenerator | `Services\Slug\SlugGenerator` | Генерация слагов |
| UrlRouter | `Services\Router\UrlRouter` | Роутинг URL |
| UrlBuilder | `Services\Router\UrlBuilder` | Построение URL |
| SeoBuilder | `Services\Seo\SeoBuilder` | Генерация SEO-данных |
| TemplateParser | `Services\Seo\TemplateParser` | Парсинг SEO-шаблонов |
| WordFormsManager | `Services\Seo\WordFormsManager` | Управление словоформами |
| ElementRunner | `Services\Element\ElementRunner` | Запуск element/paginator |
| Profiler | `Services\Profiler` | Профилирование запросов |

## Получение сервисов

```php
/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->services->get('mfilter');

// Фильтрация
$filter = $mfilter->getFilter();
$filterConfig = $mfilter->getFilterConfig();
$filterSetManager = $mfilter->getFilterSetService();

// Слаги
$slugManager = $mfilter->getSlugManager();
$slugParser = $mfilter->getSlugParser();
$slugGenerator = $mfilter->getSlugGenerator();

// Роутинг
$urlRouter = $mfilter->getUrlRouter();
$urlBuilder = $mfilter->getUrlBuilder();

// SEO
$seoBuilder = $mfilter->getSeoBuilder();
$templateParser = $mfilter->getTemplateParser();
$wordFormsManager = $mfilter->getWordFormsManager();

// Handlers
$filterTypesRegistry = $mfilter->getFilterTypeRegistry();
$sourceRegistry = $mfilter->getSourceRegistry();
$filterHandler = $mfilter->getFilterHandler();

// Утилиты
$elementRunner = $mfilter->getElementRunner();
```

## Filter

Основной сервис фильтрации.

### Методы

```php
$filter = $mfilter->getFilter();

// Применить фильтры
$result = $filter->apply($resourceId, $filters, $options);
// $result = ['ids' => [...], 'total' => 150, 'suggestions' => [...]]

// Получить suggestions (counts)
$suggestions = $filter->getSuggestions($resourceId, $filters);

// Применить к массиву ID
$filteredIds = $filter->applyToIds($ids, $filters);

// Получить suggestions для массива ID
$suggestions = $filter->getSuggestionsForIds($ids, $filters, $resourceId);
```

### Пример использования

```php
$filter = $mfilter->getFilter();

$result = $filter->apply(5, [
    'vendor' => ['apple', 'samsung'],
    'price' => ['min' => 10000, 'max' => 50000]
], [
    'sort' => 'price',
    'sortdir' => 'ASC',
    'limit' => 24,
    'offset' => 0
]);

// $result['ids'] — массив ID товаров
// $result['total'] — общее количество
// $result['suggestions'] — counts для фильтров
```

## SlugManager

Управление слагами (SEO-алиасами значений фильтров).

### Методы

```php
$slugManager = $mfilter->getSlugManager();

// Получить или создать слаг
$slug = $slugManager->getOrCreate('vendor', 'Apple Inc.');
// 'apple-inc'

// Получить значение по слагу
$value = $slugManager->getValue('vendor', 'apple-inc');
// 'Apple Inc.'

// Проверить существование
$exists = $slugManager->hasSlug('vendor', 'apple-inc');
```

## UrlBuilder

Построение SEO-friendly URL.

### Методы

```php
$urlBuilder = $mfilter->getUrlBuilder();

// Установить базовый URI
$urlBuilder->setBaseUri('/catalog/electronics/');

// Построить URL
$url = $urlBuilder->build(
    ['vendor' => ['apple'], 'color' => ['black']],
    ['sort' => 'price-asc', 'page' => 2]
);
// '/catalog/electronics/vendor_apple/color_black/sort_price-asc/page_2/'

// Построить canonical
$canonical = $urlBuilder->buildCanonical($filters, $techParams);
```

## SeoBuilder

Генерация SEO-данных на основе шаблонов.

### Методы

```php
$seoBuilder = $mfilter->getSeoBuilder();

$seoData = $seoBuilder->build($resourceId, $filters);
// [
//     'title' => 'Apple iPhone — купить в Москве',
//     'h1' => 'Apple iPhone',
//     'description' => 'Купить Apple iPhone...',
//     'text' => 'Текст для страницы...',
//     'canonical' => '/catalog/',
//     'noindex' => false
// ]
```

## FilterTypeRegistry

Реестр типов фильтров.

### Методы

```php
$registry = $mfilter->getFilterTypeRegistry();

// Получить тип
$type = $registry->get('number');

// Зарегистрировать свой тип
$registry->register('mytype', new MyFilterType($modx));

// Проверить существование
$exists = $registry->has('mytype');

// Получить все типы
$types = $registry->all();
```

## Замена сервисов через DI

Можно заменить стандартные сервисы своими реализациями.

### Файл конфигурации

Создайте файл `core/components/mfilter/config/services.php`:

```php
<?php
return [
    'slugManager' => MyNamespace\MySlugManager::class,
    'filter' => MyNamespace\MyFilter::class,
];
```

### Пример кастомного сервиса

```php
<?php
namespace MyNamespace;

use MFilter\Services\Slug\SlugManager;

class MySlugManager extends SlugManager
{
    /**
     * Кастомная генерация слага
     */
    public function generateSlug(string $value): string
    {
        // Своя логика
        $slug = parent::generateSlug($value);

        // Например, добавить префикс
        return 'my-' . $slug;
    }
}
```

### Интерфейсы

При замене сервисов рекомендуется реализовывать интерфейсы:

| Интерфейс | Описание |
|-----------|----------|
| `SlugManagerInterface` | Контракт для SlugManager |
| `FilterInterface` | Контракт для Filter |

```php
<?php
namespace MyNamespace;

use MFilter\Services\Slug\SlugManagerInterface;

class MySlugManager implements SlugManagerInterface
{
    public function getOrCreate(string $key, string $value): string { }
    public function getValue(string $key, string $slug): ?string { }
    public function hasSlug(string $key, string $slug): bool { }
    // ...
}
```

## Конфигурация MFilter

```php
$mfilter = $modx->services->get('mfilter');

// Доступ к конфигурации
$config = $mfilter->config;

// Пути
$config['corePath']      // core/components/mfilter/
$config['assetsPath']    // assets/components/mfilter/
$config['assetsUrl']     // /assets/components/mfilter/
$config['cachePath']     // core/cache/mfilter/
$config['apiUrl']        // /assets/components/mfilter/api.php
```

## Хелперы

### Инвалидация кэша

```php
$mfilter->invalidatePageCache($resourceId);
$mfilter->rebuildRouterCache();
```

### Регистрация фронтенда

```php
$mfilter->registerFrontend($context);
```
