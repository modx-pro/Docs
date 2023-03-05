# mspcOnBindCouponToOrder

Событие срабатывает **в момент создания** заказа с купоном.

Если к заказу не был привязан купон, то событие не сработает.

## Параметры

* `msPromoCode $mspc` — ссылка на основной класс msPromoCode
* `msOrder $msOrder` — объект заказа miniShop2
* `mspcOrder $mspcOrder` — объект заказа msPromoCode, связывающий данные заказа miniShop2 и msPromoCode
* `mspcCoupon $mspcCoupon` — объект промо-кода
* `array $coupon` — массив промо-кода
* `float $discount_amount` — сумма скидки

## Пример вызова

```php
switch ($modx->event->name) {
    case "mspcOnBindCouponToOrder":
        // Проверяем, является ли купон реферальным
        if ($mspcCoupon->referrer_id) {
            // Какие-то действия...
            $modx->log(1, print_r('Активирован купон "' . $mspcCoupon->code . '" по реферальной программе. Скидка составила ' . $mspcOrder->discount_amount . ' денег.', 1));
        }
        break;
}
```
