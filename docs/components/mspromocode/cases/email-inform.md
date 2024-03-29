# Вывод информации по промо-коду в письме

В этом кейсе мы рассмотрим вывод промо-кода и информацию по скидке в письме пользователю/менеджеру.

На самом деле такая возможность не совсем явным образом бросается в глаза. Делается это в 2 простых шага.

* В чанке письма, где нибудь в начале, пишем такой код:

```fenom
{var $coupon = (('!pdoResources' | snippet : [
  'class' => 'mspcOrder',
  'loadModels' => 'msPromoCode',
  'innerJoin' => [ [
    'class' => 'mspcCoupon',
    'alias' => 'mspcCoupon',
    'on' => 'mspcCoupon.id = mspcOrder.coupon_id',
  ] ],
  'select' => [
    'mspcOrder' => 'code, discount_amount',
  ],
  'where' => [
    'mspcOrder.order_id' => $order['id'],
  ],
  'sortby' => '{"id":"ASC"}',
  'return' => 'json',
]) | fromJSON)}
{if $coupon?}
  {var $coupon = $coupon[0]}
{/if}
```

Таким образом мы получим массив в переменную `$coupon`:

```php
Array (
  [code] => all
  [discount_amount] => 2112.22
)
```

* Имея эту информацию по купону мы можем узнать и стоимость корзины без скидки:

```fenom
Сумма скидки: {$coupon.discount_amount}
Стоимость со скидкой: {$total.cart_cost}
Стоимость без скидки: {($coupon.discount_amount + ($total.cart_cost | replace : ' ' : ''))}
```

Обратите внимание на то, как я обрабатываю стоимость корзины: `$total.cart_cost | replace : ' ' : ''`. Дело в том, что в чанк письма стоимость попадает не числом, а строкой с пробелами в виде разделителей тысяч: 1 000.00. Если его не обработать, то подсчёт будет некорректен.

::: warning Важно
Учитывайте, что это решение 100% работает для miniShop2 v2.4, т.к. проверялось только на нём. Хотя можно попытаться совместить и с более ранними версиями магазина, скорее всего, даже без существенных правок.
:::
