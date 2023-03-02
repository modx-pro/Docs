# Атрибут hreflang для мультиязычных сайтов

Для корректной работы адрес в настройках локализации в параметре **HTTP HOST** должен указан с `/` на конце.
Для примера:

- **ua**: modx.pro/ua/
- **ru**: modx.pro/

## 1. Создаем сниппет `hreflang` и вставляем следующий код

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
            $output .= "<link rel='alternate' hreflang='x-default' href='{$protocol}{$url}' />";
        }
        $output .= "<link rel='alternate' hreflang='{$key}' href='{$protocol}{$url}'>";
    }
}

return $output;
```

## 2. Вызываем сниппет в `head`  

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
