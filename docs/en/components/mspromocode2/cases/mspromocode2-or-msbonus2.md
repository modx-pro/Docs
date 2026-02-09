# Apply either msPromoCode2 promo code or msBonus2 bonuses

Sometimes you need to restrict the store visitor to either a promo code or bonuses, but not both.

This plugin does that. It allows either msPromoCode2 promo code or msBonus2 bonuses.

Add a plugin and attach it to events `msb2OnBeforeSetBonus` and `mspc2OnBeforeSetCoupon`.

```php
$msb2 = $modx->getService('msbonus2', 'msBonus2', MODX_CORE_PATH . 'components/msbonus2/model/msbonus2/');
$msb2->initialize($modx->context->key);
$msb2Manager = $msb2->getManager();

$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2', MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$mspc2Manager = $mspc2->getManager();

$error_text = 'You can use either a promo code or bonuses.';

switch ($modx->event->name) {
  case 'msb2OnBeforeSetBonus':
    $result = $mspc2Manager->getCurrentCoupon();
    if (is_array($result)) {
      $modx->event->output($error_text);
    }
    break;

  case 'mspc2OnBeforeSetCoupon':
    $result = $msb2Manager->getCartWriteoff();
    if (!empty($result)) {
      $modx->event->output($error_text);
    }
    break;
}
```
