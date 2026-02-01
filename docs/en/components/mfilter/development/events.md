# Events

MODX system events for extending mFilter.

## mFilter plugin

The plugin handles the following events:

| Event | Description |
|-------|-------------|
| `OnHandleRequest` | SEO URL routing |
| `OnLoadWebDocument` | CSS/JS inclusion |
| `OnDocFormSave` | Cache invalidation |
| `OnCacheUpdate` | mFilter cache cleanup |
| `OnResourceDelete` | Cleanup of related data |

## OnMFilterInit

Fires when the mFilter service is initialized. Used for:

- Registering custom filter types
- Registering data sources
- Modifying configuration

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `mfilter` | MFilter | Main class instance |

### Example: Registering a filter type

```php
<?php
// Plugin on event OnMFilterInit

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Register custom filter type
$mfilter->getFilterTypeRegistry()->register(
    'mytype',
    new MyNamespace\MyFilterType($modx)
);
```

### Example: Registering a data source

```php
<?php
/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Register source for custom table
$mfilter->getSourceRegistry()->register(
    'myproducts',
    new MyNamespace\MyProductsSource($modx, $mfilter)
);
```

## OnHandleRequest

Handles incoming request, resolves filter SEO URL.

### Logic

1. Gets REQUEST_URI
2. Tries to parse as filter SEO URL
3. If successful:
   - Sets filter placeholders
   - Calls `sendForward()` to target resource

### Placeholders after routing

| Placeholder | Description |
|-------------|-------------|
| `mfilter.filters` | Array of active filters |
| `mfilter.sort` | Sort (price-asc) |
| `mfilter.sortBy` | Sort field |
| `mfilter.sortDir` | Sort direction |
| `mfilter.page` | Page number |
| `mfilter.limit` | Items per page |
| `mfilter.seo.h1` | SEO H1 |
| `mfilter.seo.title` | SEO Title |
| `mfilter.seo.description` | SEO Description |
| `mfilter.seo.canonical` | Canonical URL |
| `mfilter.seo.noindex` | Noindex flag |

## OnLoadWebDocument

Includes frontend assets (CSS/JS) on pages.

### Control

Disable auto-include: `mfilter.register_frontend` = `false`

### Customizing file list

System setting `mfilter.frontend_assets`:

```json
[
    "[[+cssUrl]]web/mfilter.css",
    "[[+jsUrl]]web/core/ApiClient.js",
    "[[+jsUrl]]web/mfilter.js"
]
```

## OnDocFormSave

Fires when a resource is saved.

### Actions

- Invalidates page cache if the page is linked to filters
- Rebuilds router cache if URI changed

## OnCacheUpdate

Fires when MODX cache is cleared.

### Actions

- Clears mFilter router cache
- Clears result cache

## OnResourceDelete

Fires when a resource is deleted.

### Actions

- Removes related PageConfig
- Removes FilterSet bindings
- Rebuilds router cache

## Creating a plugin

### Basic template

```php
<?php
/**
 * My mFilter Extension
 *
 * Events: OnMFilterInit
 */

if ($modx->event->name !== 'OnMFilterInit') {
    return;
}

/** @var MFilter\MFilter $mfilter */
$mfilter = $modx->event->params['mfilter'];

// Your extension code
```

### Plugin registration

1. Create file in `core/components/mypackage/elements/plugins/`
2. Register plugin in MODX
3. Bind to event `OnMFilterInit`

## Extension examples

### Filtering logging

```php
<?php
// Plugin: mFilterLogger
// Events: OnMFilterInit

$mfilter = $modx->event->params['mfilter'];

// Add hook on filter apply
$mfilter->getFilter()->addHook('afterApply', function($result, $params) use ($modx) {
    $modx->log(
        modX::LOG_LEVEL_ERROR,
        '[mFilter] Applied filters: ' . json_encode($params['filters']) .
        ', Results: ' . $result['total']
    );
});
```

### Custom validation

```php
<?php
// Plugin: mFilterValidator
// Events: OnMFilterInit

$mfilter = $modx->event->params['mfilter'];

// Validate before apply
$mfilter->getFilter()->addHook('beforeApply', function(&$params) use ($modx) {
    // Limit max price
    if (isset($params['filters']['price']['max'])) {
        if ($params['filters']['price']['max'] > 1000000) {
            $params['filters']['price']['max'] = 1000000;
        }
    }
});
```

### Analytics integration

```php
<?php
// Plugin: mFilterAnalytics
// Events: OnMFilterInit

$mfilter = $modx->event->params['mfilter'];

$mfilter->getFilter()->addHook('afterApply', function($result, $params) use ($modx) {
    // Send to Google Analytics via Measurement Protocol
    $data = [
        'v' => 1,
        'tid' => 'UA-XXXXX-Y',
        'cid' => session_id(),
        't' => 'event',
        'ec' => 'filter',
        'ea' => 'apply',
        'el' => json_encode($params['filters']),
        'ev' => $result['total']
    ];

    // Async send
    $ch = curl_init('https://www.google-analytics.com/collect');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_exec($ch);
    curl_close($ch);
});
```
