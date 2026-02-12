# Cancel promo code when cart contains prohibited products

This case shows how to programmatically (via plugins) call the msPromoCode API to cancel or block a promo code when the cart contains prohibited products.

I intentionally used the `mspcOnSetCoupon` event instead of `mspcOnBeforeSetCoupon` to clearly show how to cancel the cart discount and **already applied** promo code via the component API.

## Input data

Suppose we have a product with ID == 25 and a discount promo code "testCoupon". We will use these in the plugin.

## mspcCancelPromoCode plugin

I tried to comment the plugin code well so each action is clear. So explaining how the plugin works would be redundant. I'll only say the plugin must be attached to events `mspcOnSetCoupon` and `msOnAddToCart`.
Plugin code:

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  /**
   * Block promo code "testCoupon" if cart contains product with ID == 25
   */
  case 'mspcOnSetCoupon':
    // Check if this is our coupon
    if ($coupon['code'] !== 'testCoupon') {
      break;
    }

    // Get cart array
    $cart_data = $mspc->ms2->cart->get();

    // Look for prohibited product in cart
    $is_stop = !empty(array_filter($cart_data, function ($v) {
      return $v['id'] == 25;
    }));
    unset($cart_data);

    // Remove promo code!
    if ($is_stop) {
      $mspc->discount->removeDiscountFromCart();
      $mspc->coupon->removeCurrentCoupon();
      $mspc->setError('Promo code does not meet the conditions!', true);
    }
    break;
  /**
   * Cancel promo code "testCoupon" when product with ID == 25 is added to cart
   */
  case 'msOnAddToCart':
    // Get msPromoCode object
    $mspc = $modx->getService('mspromocode', 'msPromoCode', MODX_CORE_PATH . 'components/mspromocode/model/mspromocode/');
    if (!is_object($mspc) || empty($mspc->active)) {
      break;
    }
    // Get coupon array
    $coupon = $mspc->coupon->getCurrentCoupon();

    // Check if this is our coupon
    if ($coupon['code'] !== 'testCoupon') {
      break;
    }

    // Get cart array
    $cart_data = $cart->get();

    // Look for prohibited product in cart
    $is_stop = !empty(array_filter($cart_data, function ($v) {
      return $v['id'] == 25;
    }));
    unset($cart_data);

    // Remove promo code!
    if ($is_stop) {
      $mspc->discount->removeDiscountFromCart();
      $mspc->coupon->removeCurrentCoupon();
      $mspc->setError('Promo code cancelled because it does not meet the conditions!', true);
    }
    break;
}
```

A few clarifications:

- On the second event we remove the discount from the cart and cancel the already applied promo code.
- The second parameter to `msPromoCode::setError` indicates we want to save the message to session and show it on the next cart open (actually when the promo code form is called). In other words, notify the user about the promo code cancellation when they open the cart page.
