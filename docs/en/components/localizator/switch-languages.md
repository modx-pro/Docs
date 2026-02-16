---
title: Language switching
---
# Language switching

For language switching on the frontend you can use the built-in snippet **getLocales** (available since 1.0.8). Below is an option with a custom `getLanguages` snippet and your own markup.

## Snippet getLanguages

Create a snippet named `getLanguages` and put this code in it:

```php
<?php
$output = "";
$pdo = $modx->getService('pdoTools');

$uri = $_SERVER['REQUEST_URI'];
if (substr($uri, 0, 1)) {
  $uri = mb_substr($uri, 1);
  $tmp = explode('/', $uri);
  if ($path = $tmp[0]) {
    $tmp = $modx->getObject('localizatorLanguage', ['http_host:LIKE' => "%/{$path}/"]);
    if ($tmp) {
      $uri = str_replace("{$path}/", "", $uri);
    }
  }
}

$protocol = $modx->getOption('server_protocol', null, 'http') . '://';
$languages = $modx->getIterator('localizatorLanguage', ['active' => 1]);
foreach ($languages as $language) {
  if (mb_substr($language->http_host, -1) == '/') {
    $placeholders = [
      'cultureKey' => $language->key,
      'active' => $language->key == $modx->localizator_key ? 'active' : '',
      'url' => $protocol . $language->http_host . $uri,
    ];
  } else {
    $placeholders = [
      'cultureKey' => $language->key,
      'active' => $language->key == $modx->localizator_key ? 'active' : '',
      'url' => $protocol . $language->http_host . '/' . $uri,
    ];
  }
  $output .= $pdo->getChunk($tpl, $placeholders);
}

return $output;
```

## Output in template

::: code-group

```fenom
<div class="langs">
  {$_modx->runSnippet('!getLanguages', ['tpl' => 'section-langs-1'])}
  <div class="dropdown-menu">
    {$_modx->runSnippet('!getLanguages', ['tpl' => 'section-langs-2'])}
  </div>
</div>
```

```modx
<div class="langs">
  [[!getLanguages? &tpl=`section-langs-1`]]
  <div class="dropdown-menu">
    [[!getLanguages? &tpl=`section-langs-2`]]
  </div>
</div>
```

:::

## Chunk section-langs-1

Current language (button/icon to open menu):

```fenom
<a href="#" data-toggle="dropdown" role="button" aria-expanded="false">
  <img class="imglang {$active}" src="/assets/img/flags/{$cultureKey}.png" alt="{$cultureKey}">
</a>
```

## Chunk section-langs-2

Language list item (link or current without link):

```fenom
<div class="dropdown-item">
  {if $active != 'active'}
    <a class="{$active}" href="{$url}">
      <img class="imglang {$active}" src="/assets/img/flags/{$cultureKey}.png" alt="{$cultureKey}">
    </a>
  {else}
    <div class="{$active}">
      <img class="imglang {$active}" src="/assets/img/flags/{$cultureKey}.png" alt="{$cultureKey}">
    </div>
  {/if}
</div>
```
