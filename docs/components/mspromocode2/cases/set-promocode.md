# Установка промо-кода программно при входе на сайт

Мало кто знает, что msPromoCode2 можно использовать и как компонент для скидок на товары, без обязательного ввода промо-кода юзером. Всего лишь нужно написать маленький плагин, взаимодействующий с программным API. В этом посте предлагаю данный кейс.

Делается это в 2 волшебных шага.

## Шаг 1

Создаём промо-код `DISCOUNT` и настраиваем его, как нам необходимо.

## Шаг 2

Добавляем плагин и вешаем его на событие `OnWebPageInit` с приоритетом `-9999999`.

```php
// Код промо-кода, который применяем
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

Главное, замените значение переменной `$code`, если название промо-кода у вас отличается.
