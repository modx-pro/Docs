# mspcOnSetProductDiscount

Event fires **when** the product discount is applied after the coupon is applied to the cart.

## Parameters

- `msPromoCode $mspc` — reference to main msPromoCode class
- `array $coupon` — promo code array
- `array $product` — cart product data array
- `array $cart` — miniShop2 cart array
- `string $key` — item key from miniShop2 cart array
- `float $price` — price **after** discount
- `float $old_price` — price **before** discount
- `float|string $discount` — discount, can be percent or fixed amount
- `float $discount_amount` — discount amount

## Usage example

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case "mspcOnSetProductDiscount":

    // If coupon code is "all"
    if (strtolower($sp['coupon']['code']) == 'all') {

      // If product ID = 15
      if ($sp['product']['id'] == 15) {

        // If option size = S or M
        if (!empty($sp['product']['options']['size']) && ($sp['product']['options']['size'] == 'S' || $sp['product']['options']['size'] == 'M')) {

          // If product count in cart >= 2
          if ($sp['product']['count'] >= 2) {

            // Calculate discount per unit
            $discount_unit = $sp['discount_amount'] / $sp['product']['count'];

            // Get final product cost minus discount equal to discount per unit,
            // regardless of product count in cart
            $sp['price'] = (float) ($sp['price'] + ($sp['discount_amount'] - $discount_unit));
          }
        }
      }
    }
    break;
}
$modx->event->returnedValues = $sp;
```

::: warning Important
The event fires even if the product discount is 0%. The product must be linked to the coupon in some way.
:::
