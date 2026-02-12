# mspc2OnSetCoupon

Fires after applying the promo code to the cart or order.

## Parameters

- `array $coupon` — promo code array
- `null|msOrder $order` — `msOrder` object or `null` if applied to cart
- `float $discount_amount` — discount amount
