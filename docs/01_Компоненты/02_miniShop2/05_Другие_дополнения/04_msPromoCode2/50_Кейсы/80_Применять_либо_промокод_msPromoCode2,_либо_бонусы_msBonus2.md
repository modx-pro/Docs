Иногда приходится ограничить посетителя магазина в скидке,
а точнее дать применить либо промокод, либо воспользоваться бонусами.

Данный плагин решает эту задачу. Позволяет применить либо промокод `msPromoCode2`, либо бонусы `msBonus2`.

Добавляем плагин и вешаем его на события `msb2OnBeforeSetBonus` и `mspc2OnBeforeSetCoupon`.

```php
$msb2 = $modx->getService('msbonus2', 'msBonus2', MODX_CORE_PATH . 'components/msbonus2/model/msbonus2/');
$msb2->initialize($modx->context->key);
$msb2Manager = $msb2->getManager();

$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2', MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$mspc2Manager = $mspc2->getManager();

$error_text = 'Можно воспользоваться либо промо-кодом на скидку, либо бонусами.';

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
