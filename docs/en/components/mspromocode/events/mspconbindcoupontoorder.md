# mspcOnBindCouponToOrder

Event fires **when** an order with a coupon is created.

If no coupon was bound to the order, the event will not run.

## Parameters

- `msPromoCode $mspc` — reference to main msPromoCode class
- `msOrder $msOrder` — miniShop2 order object
- `mspcOrder $mspcOrder` — msPromoCode order object linking miniShop2 and msPromoCode data
- `mspcCoupon $mspcCoupon` — promo code object
- `array $coupon` — promo code array
- `float $discount_amount` — discount amount

## Example

```php
switch ($modx->event->name) {
  case "mspcOnBindCouponToOrder":
    // Check if coupon is referral
    if ($mspcCoupon->referrer_id) {
      // Some actions...
      $modx->log(1, print_r('Activated coupon "' . $mspcCoupon->code . '" via referral program. Discount was ' . $mspcOrder->discount_amount . '.', 1));
    }
    break;
}
```
