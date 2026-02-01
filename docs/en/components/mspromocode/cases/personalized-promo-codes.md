# Personalized promo codes for user

This case ties a promo code to a specific user, blocking use in any other case.

## Option 1

Very simple! Create a plugin on event `mspcOnBeforeSetCoupon` with this code:

```php
switch ($modx->event->name) {
  case 'mspcOnBeforeSetCoupon':
    // Coupon is personalized if description contains "user: [[+username]]", otherwise no checks
    if (!preg_match('/^user\: /i', $coupon['description'])) {
      break;
    }
    $username = preg_replace('/^user\: (.*)$/ui', '$1', $coupon['description']);

    // If coupon description contains user's username, apply the promo code
    if (is_object($modx->user) && $modx->user->get('username') == $username) {
      break;
    }

    // Return coupon application error
    $modx->event->output('Promo code "' . $coupon['code'] . '" is not your personalized code!');
    break;
}
```

::: warning Important
When creating the promo code, put `user: [[+username]]` in the description, where `[[+username]]` is the login of the user who owns the promo code.
:::

## Option 2

You can skip the name check in the description and create coupons with the user's `username` as the code. So the promo code equals the username of the coupon owner. Code for this approach:

```php
switch ($modx->event->name) {
  case 'mspcOnBeforeSetCoupon':
    // Personalized promo code when coupon description is "user"
    if ($coupon['description'] != 'user') {
      break;
    }

    // If coupon code equals user's username, apply it
    if (is_object($modx->user) && $modx->user->get('username') == $coupon['code']) {
      break;
    }

    // Return coupon application error
    $modx->event->output('Promo code "' . $coupon['code'] . '" is not your personalized code!');
    break;
}
```

::: warning Important
When creating the promo code, write `user` in the description so the script knows the coupon is personalized.
:::
