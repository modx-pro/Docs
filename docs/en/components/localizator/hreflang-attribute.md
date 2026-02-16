---
title: hreflang attribute
---
# hreflang attribute for multilingual sites

For correct behavior, the localization **HTTP HOST** setting must end with `/`. Example:

- **ua**: `modx.pro/ua/`
- **ru**: `modx.pro/`

## 1. Create snippet `hreflang` and paste this code

```php
<?php
$output = "";
$default = "ua"; // Default language
$id = $modx->resource->get('id');
$start = $modx->getOption('site_start');
$protocol = $modx->getOption('server_protocol') . '://';

$resources = $modx->runSnippet('pdoResources', [
  'loadModels' => 'localizator',
  'class' => 'localizatorLanguage',
  'sortby' => 'id',
  'limit' => '0',
  'sortdir' => 'asc',
  'where' => ['active' => 1],
  'return' => 'json',
]);

if ($resources) {
  $resources = json_decode($resources);

  foreach ($resources as $resource) {
    $key = $resource->key;
    if ($id != $start) {
      $url = $resource->http_host.$modx->makeUrl($id);
    } else {
      $url = $resource->http_host;
    }
    if ($key == $default) {
      $output .= "<link rel='alternate' hreflang='x-default' href='{$protocol}{$url}' />";
    }
    $output .= "<link rel='alternate' hreflang='{$key}' href='{$protocol}{$url}'>";
  }
}

return $output;
```

## 2. Call the snippet in `head`

```fenom
{'!hreflangs' | snippet}
```

## Result

```html
<link rel="alternate" hreflang="ru" href="https://site.com/ru/">
<link rel="alternate" hreflang="uk" href="https://site.com/">
<link rel="alternate" hreflang="en" href="https://site.com/en/">
<link rel="alternate" hreflang="x-default" href="https://site.com/">
```
