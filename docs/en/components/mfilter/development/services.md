# Services

PHP services of mFilter and options for customizing them.

## Architecture

mFilter uses a service-oriented architecture with lazy-loading:

```php
// Main class — facade for accessing services
$mfilter = $modx->services->get('mfilter');

// Getting services via getters
$filter = $mfilter->getFilter();
$slugManager = $mfilter->getSlugManager();
$urlRouter = $mfilter->getUrlRouter();
```

## Service list

| Service | Class | Description |
|---------|-------|-------------|
| Filter | `Services\Filter\Filter` | Core filtering logic |
| FilterConfig | `Services\Filter\FilterConfig` | Page filter configuration |
| FilterSetManager | `Services\FilterSet\FilterSetManager` | Filter set management |
| SlugManager | `Services\Slug\SlugManager` | Slug management |
| SlugParser | `Services\Slug\SlugParser` | SEO URL parsing |
| SlugGenerator | `Services\Slug\SlugGenerator` | Slug generation |
| UrlRouter | `Services\Router\UrlRouter` | URL routing |
| UrlBuilder | `Services\Router\UrlBuilder` | URL building |
| SeoBuilder | `Services\Seo\SeoBuilder` | SEO data generation |
| TemplateParser | `Services\Seo\TemplateParser` | SEO template parsing |
| WordFormsManager | `Services\Seo\WordFormsManager` | Word forms management |
| ElementRunner | `Services\Element\ElementRunner` | Running element/paginator |
| Profiler | `Services\Profiler` | Query profiling |

## Getting services

```php
/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->services->get('mfilter');

// Filtering
$filter = $mfilter->getFilter();
$filterConfig = $mfilter->getFilterConfig();
$filterSetManager = $mfilter->getFilterSetService();

// Slugs
$slugManager = $mfilter->getSlugManager();
$slugParser = $mfilter->getSlugParser();
$slugGenerator = $mfilter->getSlugGenerator();

// Routing
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

// Utilities
$elementRunner = $mfilter->getElementRunner();
```

## Filter

Core filtering service.

### Methods

```php
$filter = $mfilter->getFilter();

// Apply filters
$result = $filter->apply($resourceId, $filters, $options);
// $result = ['ids' => [...], 'total' => 150, 'suggestions' => [...]]

// Get suggestions (counts)
$suggestions = $filter->getSuggestions($resourceId, $filters);

// Apply to array of IDs
$filteredIds = $filter->applyToIds($ids, $filters);

// Get suggestions for array of IDs
$suggestions = $filter->getSuggestionsForIds($ids, $filters, $resourceId);
```

### Example

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

// $result['ids'] — array of product IDs
// $result['total'] — total count
// $result['suggestions'] — counts for filters
```

## SlugManager

Managing slugs (SEO aliases of filter values).

### Methods

```php
$slugManager = $mfilter->getSlugManager();

// Get or create slug
$slug = $slugManager->getOrCreate('vendor', 'Apple Inc.');
// 'apple-inc'

// Get value by slug
$value = $slugManager->getValue('vendor', 'apple-inc');
// 'Apple Inc.'

// Check existence
$exists = $slugManager->hasSlug('vendor', 'apple-inc');
```

## UrlBuilder

Building SEO-friendly URLs.

### Methods

```php
$urlBuilder = $mfilter->getUrlBuilder();

// Set base URI
$urlBuilder->setBaseUri('/catalog/electronics/');

// Build URL
$url = $urlBuilder->build(
    ['vendor' => ['apple'], 'color' => ['black']],
    ['sort' => 'price-asc', 'page' => 2]
);
// '/catalog/electronics/vendor_apple/color_black/sort_price-asc/page_2/'

// Build canonical
$canonical = $urlBuilder->buildCanonical($filters, $techParams);
```

## SeoBuilder

Generating SEO data from templates.

### Methods

```php
$seoBuilder = $mfilter->getSeoBuilder();

$seoData = $seoBuilder->build($resourceId, $filters);
// [
//     'title' => 'Apple iPhone — buy in Moscow',
//     'h1' => 'Apple iPhone',
//     'description' => 'Buy Apple iPhone...',
//     'text' => 'Page text...',
//     'canonical' => '/catalog/',
//     'noindex' => false
// ]
```

## FilterTypeRegistry

Filter type registry.

### Methods

```php
$registry = $mfilter->getFilterTypeRegistry();

// Get type
$type = $registry->get('number');

// Register custom type
$registry->register('mytype', new MyFilterType($modx));

// Check existence
$exists = $registry->has('mytype');

// Get all types
$types = $registry->all();
```

## Replacing services via DI

You can replace default services with your own implementations.

### Config file

Create `core/components/mfilter/config/services.php`:

```php
<?php
return [
    'slugManager' => MyNamespace\MySlugManager::class,
    'filter' => MyNamespace\MyFilter::class,
];
```

### Example custom service

```php
<?php
namespace MyNamespace;

use MFilter\Services\Slug\SlugManager;

class MySlugManager extends SlugManager
{
    /**
     * Custom slug generation
     */
    public function generateSlug(string $value): string
    {
        // Your logic
        $slug = parent::generateSlug($value);

        // e.g. add prefix
        return 'my-' . $slug;
    }
}
```

### Interfaces

When replacing services, it is recommended to implement interfaces:

| Interface | Description |
|-----------|-------------|
| `SlugManagerInterface` | Contract for SlugManager |
| `FilterInterface` | Contract for Filter |

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

## MFilter configuration

```php
$mfilter = $modx->services->get('mfilter');

// Access config
$config = $mfilter->config;

// Paths
$config['corePath']      // core/components/mfilter/
$config['assetsPath']    // assets/components/mfilter/
$config['assetsUrl']     // /assets/components/mfilter/
$config['cachePath']     // core/cache/mfilter/
$config['apiUrl']        // /assets/components/mfilter/api.php
```

## Helpers

### Cache invalidation

```php
$mfilter->invalidatePageCache($resourceId);
$mfilter->rebuildRouterCache();
```

### Frontend registration

```php
$mfilter->registerFrontend($context);
```
