---
title: Переключение языков
---
# Переключение языков

Для переключения языков на фронте можно использовать встроенный сниппет **getLocales** (доступен с версии 1.0.8). Ниже — вариант с кастомным сниппетом `getLanguages` и своей разметкой.

## Сниппет getLanguages

Создайте сниппет с именем `getLanguages` и поместите в него код:

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

## Вывод в шаблоне

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

## Чанк section-langs-1

Текущий язык (кнопка/иконка для открытия меню):

```fenom
<a href="#" data-toggle="dropdown" role="button" aria-expanded="false">
  <img class="imglang {$active}" src="/assets/img/flags/{$cultureKey}.png" alt="{$cultureKey}">
</a>
```

## Чанк section-langs-2

Элемент списка языков (ссылка или текущий без ссылки):

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
