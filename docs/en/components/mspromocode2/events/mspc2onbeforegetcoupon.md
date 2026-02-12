# mspc2OnBeforeGetCoupon

Fires before getting a promo code in `mspc2Manager::getCoupon`.
Runs even if the promo code does not exist.

This method is called frequently, including when applying a promo code to an existing order.

Due to how `mspc2Manager::getCoupon` works, two parameters are set dynamically.

## Parameters

- `string $key` — key used to request the promo code
- `int $id` — dynamic, only when the promo code is requested by numeric id
- `string $code` — dynamic, only when the promo code is requested by string code

## Example

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'mspc2OnBeforeGetCoupon':
    $key = $sp['key'];
    if (is_int($sp[$key])) {
      // Coupon $id passed
    } elseif (is_string($sp[$key])) {
      // Coupon $code passed
    }
    break;
}
```
