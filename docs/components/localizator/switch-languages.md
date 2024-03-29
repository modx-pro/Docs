# Переключение языков

Для реализации переключения языков на фронте создаем сниппет `getLanguages`

## Сниппет getLanguages

```php
<?php
$output = "";
$pdo = $modx->getService('pdoTools');

$uri = $_SERVER['REQUEST_URI'];
if(substr($uri, 0, 1)) {
  $uri = mb_substr($uri, 1);
  $tmp = explode('/', $uri);
  if ($path = $tmp[0]) {
    $tmp = $modx->getObject('localizatorLanguage', array('http_host:LIKE' => "%/{$path}/"));
    if ($tmp) {
      $uri = str_replace("{$path}/", "", $uri);
    }
  }
}

$protocol = 'https://';
$languages = $modx->getIterator('localizatorLanguage', ['active' => 1]);
foreach($languages as $language) {
  if(mb_substr($language->http_host, -1) == '/') {
    $placeholders = array(
      'cultureKey' => $language->key,
      'active' => $language->key == $modx->localizator_key ? 'active' : '',
      'url' => $protocol . $language->http_host . $uri,
    );
  } else {
    $placeholders = array(
      'cultureKey' => $language->key,
      'active' => $language->key == $modx->localizator_key ? 'active' : '',
      'url' => $protocol . $language->http_host . '/' . $uri,
    );
  }
  $output .= $pdo->getChunk($tpl, $placeholders);
}

return $output;
```

## Вывод в шаблоне

```fenom
<div class="langs">
  {$_modx->runSnippet('!getLanguages', ['tpl' => 'section-langs-1'])}
  <div class="dropdown-menu">
    {$_modx->runSnippet('!getLanguages', ['tpl' => 'section-langs-2'])}
  </div>
</div>
```

## Чанк section-langs-1

```fenom
<a href="#" data-toggle="dropdown" role="button" aria-expanded="false">
  <img class="imglang {$active}" src="/assets/img/flags/{$cultureKey}.png" alt="{$cultureKey}">
</a>
```

## Чанк section-langs-2

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
