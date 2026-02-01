# mspc2OnGetCoupon

Fires after getting the promo code and passing all checks in `mspc2Manager::getCoupon`.
Runs only if the promo code exists and passes lifetime, active, quantity, etc. checks.

This method is called frequently, including when applying a promo code to an existing order.

## Parameters

- `array $coupon` — promo code array
