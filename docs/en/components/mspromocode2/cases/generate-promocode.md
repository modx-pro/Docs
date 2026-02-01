# Generate promo code in email for next order

Since 1.1.12 there is method `mspc2Manager::generateCoupon` that generates a promo code with a given format and parameters.
This simplifies generating coupons with unique codes.

## Step 1

Create snippet `generateCoupon` with this code:

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

$order_id = (int)$modx->getOption('order', $scriptProperties) ?: 0;
if (empty($order_id)) {
  return 'Specify order id.';
}

// First try to find an already generated promo code for this order
if ($couponObj = $modx->getObject('mspc2Coupon', ['properties LIKE "%\"prev-order\":' . $order_id . '%"'])) {
  $coupon = $manager->getCoupon((int)$couponObj->get('id'));
}

// Promo code not found
if (empty($coupon) || !is_array($coupon)) {
  // Promo code format as regex-like syntax
  $format = '[a-zA-Z0-9]{12}';

  // Promo code parameters
  $data = [
    'list' => 'for-next-order', // Promo code "List" field
    'count' => 1, // How many times the generated promo code can be applied
    'discount' => '10%', // Discount for generated promo code
    'description' => 'Discount on next order', // Promo code description

    // Config
    'showinfo' => true, // Show warnings
    'oneunit' => false, // Per product unit
    'onlycart' => true, // Only in cart
    'unsetifnull' => false, // Don't apply without discount
    'unsetifnull_msg' => '', // Unset message
    'oldprice' => false, // Without old price

    // Validity
    'lifetime' => strtotime('1 month'), // +1 month in seconds

    // Save order id in properties
    'properties' => [
      'prev-order' => $order_id,
    ],
  ];
  $coupon = $manager->generateCoupon($format, $data);
}

return $coupon;
```

## Step 2

In the email chunk where you want to generate a promo code for the customer (e.g. `tpl.msEmail.paid.user`), call the snippet and output the coupon data:

```fenom
{extends 'tpl.msEmail'}

{block 'title'}
  {'ms2_email_subject_paid_user' | lexicon : $order}
{/block}

{block 'products'}
  {var $newCoupon = ('!generateCoupon' | snippet: [
    'order' => $order.id,
  ])}
  {if ($newCoupon is not empty) && is_array($newCoupon)}
    <div style="margin: -10px 20px 40px;">
      We've generated a special promo code -{$newCoupon.discount} for your next purchase:
      <span style="display: inline-block;background: #ffecec;padding: 4px 4px;border: 2px solid #ff4f50;border-radius: 4px;font-size: 18px;line-height: 1;">
        {$newCoupon.code}
      </span>.
      Enter it in the cart on your next order to get a personal discount.
      {if $newCoupon.stoppedon?}
        <br>Valid until {$newCoupon.stoppedon | date : 'd.m.Y H:i'}
      {/if}
    </div>
  {/if}

  {parent}
{/block}
```

It will look like this:

![](https://file.modx.pro/files/1/f/f/1ff4ab1c2c9889f958ddaff304541b6f.png)
