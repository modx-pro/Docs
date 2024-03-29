# Отменить промо-код при наличии в корзине запрещённых товаров

В этом кейсе я покажу, как программно (через плагины) можно обращаться к API msPromoCode и отменять или вовсе запрещать применение промо-кода, когда в корзине есть запрещённые товары.

Я умышленно использовал событие `mspcOnSetCoupon` вместо `mspcOnBeforeSetCoupon`, чтобы наглядно показать, как можно отменить скидку на корзину и отменить **уже применённый** промо-код через API компонента.

## Входные данные

Предположим, что у нас уже есть товар с ID == 25 и скидочный промо-код с кодом "testCoupon". Именно с этими данными мы будем работать в плагине.

## Плагин mspcCancelPromoCode

Я постарался хорошо закомментировать код плагина, чтобы каждое действие было понятно. Поэтому объяснять, как работает плагин, думаю будет излишним. Скажу только то, что плагин нужно повесить на события `mspcOnSetCoupon` и `msOnAddToCart`.
Код плагина:

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  /**
   * Запрещаем применять промо-код "testCoupon",
   * если в корзине товар с ID == 25
   */
  case 'mspcOnSetCoupon':
    // Проверяем, наш ли это купон
    if ($coupon['code'] !== 'testCoupon') {
      break;
    }

    // Получаем массив корзины
    $cart_data = $mspc->ms2->cart->get();

    // Ищем в корзине запрещёнку
    $is_stop = !empty(array_filter($cart_data, function ($v) {
      return $v['id'] == 25;
    }));
    unset($cart_data);

    // Удаляем промо-код!
    if ($is_stop) {
      $mspc->discount->removeDiscountFromCart();
      $mspc->coupon->removeCurrentCoupon();
      $mspc->setError('Промо-код не соответствует условиям!', true);
    }
    break;
  /**
   * Отменяем промо-код "testCoupon",
   * если в корзину добавлен товар с ID == 25
   */
  case 'msOnAddToCart':
    // Получаем объект msPromoCode
    $mspc = $modx->getService('mspromocode', 'msPromoCode', MODX_CORE_PATH . 'components/mspromocode/model/mspromocode/');
    if (!is_object($mspc) || empty($mspc->active)) {
      break;
    }
    // Получаем массив купона
    $coupon = $mspc->coupon->getCurrentCoupon();

    // Проверяем, наш ли это купон
    if ($coupon['code'] !== 'testCoupon') {
      break;
    }

    // Получаем массив корзины
    $cart_data = $cart->get();

    // Ищем в корзине запрещёнку
    $is_stop = !empty(array_filter($cart_data, function ($v) {
      return $v['id'] == 25;
    }));
    unset($cart_data);

    // Удаляем промо-код!
    if ($is_stop) {
      $mspc->discount->removeDiscountFromCart();
      $mspc->coupon->removeCurrentCoupon();
      $mspc->setError('Промо-код отменён, т.к. он не соответствует условиям!', true);
    }
    break;
}
```

Всё таки нужно сделать несколько пояснений...

- На втором событии мы удаляем скидку с корзины и отменяем уже применённый промо-код.
- В метод `msPromoCode::setError` вторым параметром указывается, что мы хотим записать сообщение в сессию и вывести его при следующем открытии корзины (на самом деле не корзины, а вызове формы c промо-кодом). Другими словами, уведомить пользователя об отмене промо-кода при открытии страницы с корзиной.
