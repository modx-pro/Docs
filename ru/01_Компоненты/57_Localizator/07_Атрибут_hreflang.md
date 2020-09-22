# Атрибут hreflang для мультиязычных сайтов

Добавляем в `head` сайта

``` php
{set $prefix = ['/uk/', '/ua/', '/ru/', '/en/']}
{$_modx->runSnippet('!pdoResources', [
    'loadModels' => 'localizator',
    'class' => 'localizatorLanguage',
    'sortby' => 'id',
    'limit' => '0',
    'sortdir' => 'asc',
    'where' => ['active' => 1],
    'tpl' => '@FILE chunks/main/langsHead.html',
])}
```

```html
<link rel="alternate" hreflang="x-default" href="{$_modx->makeUrl($_modx->resource.id, '', '', 'full') | replace : $prefix : '/'}" />
```

## Chunk LangsHead.html

``` php
{set $prefix = $key ~ '/'}
{set $langs = ['ru/', 'ua/', 'en/']}
<link rel="alternate" hreflang="{$cultureKey}" href="{$_modx->config.site_url | replace : $langs : ''}{$prefix | replace : 'ua/' : ''}{if $_modx->resource.id != 1}{$_modx->resource.id | url}{/if}"/>
```

## Результат

``` html
<link rel="alternate" hreflang="ru" href="https://site.com/ru/">
<link rel="alternate" hreflang="uk" href="https://site.com/">
<link rel="alternate" hreflang="en" href="https://site.com/en/">
<link rel="alternate" hreflang="x-default" href="https://site.com/">
```
