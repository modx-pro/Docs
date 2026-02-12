# Examples

## Cancel bonus application

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'msb2OnBeforeSetBonus':
    $modx->event->output('Sorry, not this time!');
    break;
}
```
