# Примеры

## Отменить применение промо-кода

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'mspc2OnBeforeGetCoupon':
    $modx->event->output('Мне не нравится этот промо-код!');
    break;
}
```
