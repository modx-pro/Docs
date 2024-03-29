# Вывод информации по промо-коду в письме

В этом кейсе мы рассмотрим вывод промо-кода и информацию по скидке в письме пользователю/менеджеру.

На самом деле такая возможность не совсем явным образом бросается в глаза. Делается это в 2 простых шага.

## Шаг 1

В чанке письма, где нибудь в начале, пишем такой код:

```fenom
{var $coupon = (('!pdoResources' | snippet : [
  'class' => 'mspc2CouponOrder',
  'loadModels' => 'msPromoCode2',
  'innerJoin' => [ [
    'class' => 'mspc2Coupon',
    'alias' => 'mspc2Coupon',
    'on' => 'mspc2Coupon.id = mspc2CouponOrder.coupon',
  ] ],
  'select' => [
    'mspc2CouponOrder' => 'code, discount, discount_amount',
  ],
  'where' => [
    'mspc2CouponOrder.order' => $order['id'],
  ],
  'sortby' => '{"id":"ASC"}',
  'return' => 'json',
]) | fromJSON)}
{if $coupon?}
  {var $coupon = $coupon[0]}
{/if}
```

Таким образом мы получим массив в переменную `$coupon` или пустой массив, если купон к заказу не привязан:

```php
Array (
  [code] => DISCOUNT
  [discount] => 20%
  [discount_amount] => 40218.00
)
```

## Шаг 2

Имея эту информацию по купону мы можем узнать и стоимость корзины без скидки:

```fenom
Сумма скидки: {$coupon.discount_amount}
Стоимость со скидкой: {$total.cart_cost}
Стоимость без скидки: {($coupon.discount_amount + ($total.cart_cost | replace : ' ' : ''))}
```

Обратите внимание на то, как я обрабатываю стоимость корзины: `$total.cart_cost | replace : ' ' : ''`.
Дело в том, что в чанк письма стоимость попадает не числом, а строкой с пробелами в виде разделителей тысяч: 1 000.00. Если его не обработать, то подсчёт будет некорректным.
