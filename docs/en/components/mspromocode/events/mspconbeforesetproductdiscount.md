# mspcOnBeforeSetProductDiscount

Event fires **before** the product discount is applied after the coupon is applied to the cart.

## Parameters

- `msPromoCode $mspc` — reference to main msPromoCode class
- `array $coupon` — promo code array
- `array $product` — cart product data array
- `array $cart` — miniShop2 cart array
- `string $key` — item key from miniShop2 cart array
- `float $price` — price before discount
- `float|string $discount` — discount, can be percent or fixed amount

## Usage example

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case "mspcOnBeforeSetProductDiscount":
    // If coupon code is "all"
    if (strtolower($sp['coupon']['code']) == 'all') {

      // If product count in cart >= 3
      if ($sp['product']['count'] >= 3) {

        // If product is in category with ID = 24
        $parents = $modx->getParentIds($sp['product']['id'], 10);
        if (in_array(24, $parents)) {

          // If discount is in percent
          if (strstr($sp['discount'], '%')) {

            // Add +50% to current discount
            $sp['discount'] = (floatval($sp['discount']) + 50) . '%';
          }
        }
      }

      // If product ID = 15
      if ($sp['product']['id'] == 15) {

        // If option size = XXL
        if (!empty($sp['product']['options']['size']) && $sp['product']['options']['size'] == 'XXL') {

          // Apply coupon discount to product instead of product/category relations
          $sp['discount'] = $coupon['discount'];
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
