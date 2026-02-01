# Output promo code info in email

This case covers outputting the promo code and discount info in emails to the user/manager.

This option is not very obvious. It's done in 2 simple steps.

* In the email chunk, somewhere at the beginning, add:

```fenom
{var $coupon = (('!pdoResources' | snippet: [
  'class' => 'mspcOrder',
  'loadModels' => 'msPromoCode',
  'innerJoin' => [ [
    'class' => 'mspcCoupon',
    'alias' => 'mspcCoupon',
    'on' => 'mspcCoupon.id = mspcOrder.coupon_id',
  ] ],
  'select' => [
    'mspcOrder' => 'code, discount_amount',
  ],
  'where' => [
    'mspcOrder.order_id' => $order['id'],
  ],
  'sortby' => '{"id":"ASC"}',
  'return' => 'json',
]) | fromJSON)}
{if $coupon?}
  {var $coupon = $coupon[0]}
{/if}
```

This gives us an array in variable `$coupon`:

```php
Array (
  [code] => all
  [discount_amount] => 2112.22
)
```

* With this coupon info we can get the cart cost without discount:

```fenom
Discount amount: {$coupon.discount_amount}
Cost with discount: {$total.cart_cost}
Cost without discount: {($coupon.discount_amount + ($total.cart_cost | replace : ' ' : ''))}
```

Note how I handle the cart cost: `$total.cart_cost | replace : ' ' : ''`. The cart cost in the email chunk comes as a string with thousand separators (spaces): 1 000.00. Without this, the calculation would be wrong.

::: warning Important
This solution works 100% with miniShop2 v2.4, as it was only tested on it. It may work with earlier shop versions, likely without major changes.
:::
