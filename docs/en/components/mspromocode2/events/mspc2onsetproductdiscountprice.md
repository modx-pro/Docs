# mspc2OnSetProductDiscountPrice

Fires after applying a coupon, **when** the product discount is applied.

_Added in version `1.1.18`._

## Parameters

- `array $coupon` — promo code array
- `null|msOrder $order` — `msOrder` object or `null` if applied to cart
- `array $product` — product data (cart item or msOrderProduct data)
- `string $key` — item key in cart array
- `float $price` — price **after** discount
- `float $old_price` — price **before** discount
- `float|string $discount` — discount, percent or fixed amount
- `float $discount_price` — discount per 1 unit
- `float $discount_cost` — total discount amount

## Example

```php
switch ($modx->event->name) {
  case 'mspc2OnSetProductDiscountPrice':
    if (is_object($order)) {
      // Event fired when recalculating order product prices
    }

    // If coupon code is `leto`
    if (strtolower($coupon['code']) === 'leto') {

      // If product ID = 5
      if ((int)$product['product_id'] === 5) {

        // If option color === `white`
        if (mb_strtolower(@$product['options']['color'] ?: '', 'utf-8') === 'white') {

          // If product count in cart >= 2
          if ($product['count'] >= 2) {

            // Add 200 to product price
            $product['price'] += 200;

            // Subtract 200 from discount per unit
            $product['discount_price'] -= 200;

            // Subtract the difference from total product discount (200 * product count)
            $product['discount_cost'] -= 200 * $product['count'];
          }
        }

        // If option color === `green`
        if (mb_strtolower(@$product['options']['color'] ?: '', 'utf-8') === 'green') {

          // Give product for free
          $product['discount_price'] += $product['price'];
          $product['discount_price'] += $product['price'] * $product['count'];
          $product['price'] = 0;
        }
      }
    }
    $modx->event->returnedValues['product'] = $product;
    break;
}
```

## Important

- Product ID is in `$product['product_id']` for both cart and order calls.

- The event fires even if the product discount is 0%. The product must be linked to the promo code in some way.
