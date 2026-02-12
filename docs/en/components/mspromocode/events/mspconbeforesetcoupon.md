# mspcOnBeforeSetCoupon

Event fires **before** the coupon is applied to the cart.

If the coupon does not exist, the event will not run.

## Parameters

- `msPromoCode $mspc` — reference to main msPromoCode class
- `array $coupon` — promo code array
