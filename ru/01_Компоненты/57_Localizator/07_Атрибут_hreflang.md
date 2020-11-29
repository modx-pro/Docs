# Атрибут hreflang для мультиязычных сайтов

Создаем сниппет `hreflang` и вставляем следующий код:

```php
<?php
$output = "";
$default = "ua"; // Указываем язык по умолчанию
$id = $modx->resource->get('id');
$start = $modx->getOption('site_start');
$protocol = $modx->getOption('server_protocol').'://';

$resources = $modx->runSnippet('pdoResources', [
    'loadModels' => 'localizator',
    'class' => 'localizatorLanguage',
    'sortby' => 'id',
    'limit' => '0',
    'sortdir' => 'asc',
    'where' => ['active' => 1],
    'return' => 'json',
]);

if($resources) {
    $resources = json_decode($resources);
    foreach($resources as $resource) {

        $key = $resource->key;
        if($id != $start) {
            $url = $resource->http_host.$modx->makeUrl($id);
        } else {
            $url = $resource->http_host;
        }
        if($key == $default) {
            $output .= "<link rel='alternate' hreflang='x-default' href='{$protocol}{$resource->http_host}' />";
        }
        $output .= "<link rel='alternate' hreflang='{$key}' href='{$protocol}{$url}'>";
    }
}

return $output;
```

Вызываем в `head`  

```php
{'!hreflangs' | snippet : []}
```

## Результат

``` html
<link rel="alternate" hreflang="ru" href="https://site.com/ru/">
<link rel="alternate" hreflang="uk" href="https://site.com/">
<link rel="alternate" hreflang="en" href="https://site.com/en/">
<link rel="alternate" hreflang="x-default" href="https://site.com/">
```
