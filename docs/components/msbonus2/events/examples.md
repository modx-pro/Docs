# Примеры

## Отменить применение бонусов

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'msb2OnBeforeSetBonus':
    $modx->event->output('Не нравишься ты мне, чувачок!');
    break;
}
```
