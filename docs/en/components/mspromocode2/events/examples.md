# Examples

## Reject applying a promo code

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'mspc2OnBeforeGetCoupon':
    $modx->event->output('I do not like this promo code!');
    break;
}
```
