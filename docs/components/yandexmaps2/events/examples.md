# Примеры

## Проверка карты в плагине

С помощью параметра `$snippetProperties` можно проверить, из какой карты был вызван плагин:

Вызов сниппета:

```fenom
{'!YandexMaps2' | snippet : [
  'map' => 'custom-map',
  ...
]}
```

Код плагина:

```php
switch ($modx->event->name) {
  case 'ymOnLoadObjects':
    if ($snippetProperties['map'] != 'custom-map') {
      break;
    }

    /**
     * Логика плагина
     */

    break;
}
```
