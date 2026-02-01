# Output promo code info in email

This case covers outputting the promo code and discount info in emails to the user/manager.

This option is not very obvious. It's done in 2 simple steps.

## Step 1

In the email chunk, somewhere at the beginning, add:

```fenom
{var $coupon = (('!pdoResources' | snippet: [
  'class' => 'mspc2CouponOrder',
  'loadModels' => 'msPromoCode2',
  'innerJoin' => [ [
    'class' => 'mspc2Coupon',
    'alias' => 'mspc2Coupon',
    'on' => 'mspc2Coupon.id = mspc2CouponOrder.coupon',
  ] ],
  'select' => [
    'mspc2CouponOrder' => 'code, discount, discount_amount',
  ],
  'where' => [
    'mspc2CouponOrder.order' => $order['id'],
  ],
  'sortby' => '{"id":"ASC"}',
  'return' => 'json',
]) | fromJSON)}
{if $coupon?}
  {var $coupon = $coupon[0]}
{/if}
```

This gives us an array in `$coupon` or an empty array if no coupon is bound to the order:

```php
Array (
  [code] => DISCOUNT
  [discount] => 20%
  [discount_amount] => 40218.00
)
```

## Step 2

With this coupon info we can get the cart cost without discount:

```fenom
Discount amount: {$coupon.discount_amount}
Cost with discount: {$total.cart_cost}
Cost without discount: {($coupon.discount_amount + ($total.cart_cost | replace : ' ' : ''))}
```

Note how the cart cost is handled: `$total.cart_cost | replace : ' ' : ''`.
The cart cost in the email chunk comes as a string with thousand separators (spaces): 1 000.00. Without this, the calculation would be wrong.
