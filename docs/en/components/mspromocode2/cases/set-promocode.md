# Set promo code programmatically on site visit

Few know that msPromoCode2 can work as a product discount component without user input. You just need a small plugin that uses the programmatic API.

It's done in 2 steps.

## Step 1

Create promo code `DISCOUNT` and configure it as needed.

## Step 2

Add a plugin and attach it to event `OnWebPageInit` with priority `-9999999`.

```php
// Promo code to apply
$code = 'DISCOUNT';

$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();
switch ($modx->event->name) {
  case 'OnWebPageInit':
    $couponCurrent = $manager->getCurrentCoupon();
    $couponNew = $manager->getCoupon($code);
    if (!is_array($couponCurrent) && is_array($couponNew)) {
      $manager->setCoupon((int)$couponNew['id']);
    }
    break;
}
```

Replace the `$code` value if your promo code name differs.
