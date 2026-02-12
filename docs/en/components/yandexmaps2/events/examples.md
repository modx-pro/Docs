# Examples

## Check which map triggered the plugin

Use `$snippetProperties` to see which map called the plugin:

Snippet call:

```fenom
{'!YandexMaps2' | snippet: [
  'map' => 'custom-map',
  ...
]}
```

Plugin code:

```php
switch ($modx->event->name) {
  case 'ymOnLoadObjects':
    if ($snippetProperties['map'] != 'custom-map') {
      break;
    }

    /**
     * Plugin logic
     */

    break;
}
```
