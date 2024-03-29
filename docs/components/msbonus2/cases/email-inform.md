# Вывод информации в письме о списанных бонусах за заказ

Выводим информацию о бонусах за заказ в письме пользователю/менеджеру.

## Шаг 1

В чанке письма, где нибудь в начале, пишем такой код:

```fenom
{var $bonus = (('!pdoResources' | snippet : [
  'class' => 'msb2Order',
  'loadModels' => 'miniShop2,msBonus2',
  'innerJoin' => [ [
    'class' => 'msOrder',
    'alias' => 'msOrder',
    'on' => 'msOrder.id = msb2Order.order',
  ], [
    'class' => 'msb2User',
    'alias' => 'msb2User',
    'on' => 'msb2User.user = msOrder.user_id',
  ] ],
  'select' => [
    'msb2Order' => 'accrual, writeoff',
    'msb2User' => 'points, reserve',
  ],
  'where' => [
    'msb2Order.order' => $order['id'],
  ],
  'sortby' => '{"id":"ASC"}',
  'return' => 'json',
]) | fromJSON)}
{if $bonus?}
  {var $bonus = $bonus[0]}
{/if}
```

Таким образом мы получим массив в переменную `$bonus` или пустой массив, если дополнительного объекта заказа `msb2Order` или дополнительного объекта юзера `msb2User` не было найдено:

```php
Array (
  [accrual] => 0.00
  [writeoff] => 4000.00
  [points] => 2440.00
  [reserve] => 0.00
)
```

## Шаг 2

Имея эту информацию в массиве, мы можем вывести:

- `writeoff` – списанные бонусы за заказ, если они были применены юзером;
- `accrual` – начисленные баллы юзеру, если они были начислены (был установлен статус из системной настройки `msb2_order_status_paid`, в заказе товары соответствующие системной настройке `msb2_categories_for_accrual_of_points`);
- `points` – кол-во бонусов у юзера в распоряжении на данный момент;
- `reserve` – кол-во бонусов у юзера в резерве на данный момент;

Вывести можно например так:

```fenom
У вас накоплено {$bonus.points | number : 0 : '.' : ' '} баллов,
а также {$bonus.reserve | number : 0 : '.' : ' '} баллов в резерве, которые скоро станут доступны.
```

Или так:

```fenom
{if ($bonus.accrual + 0)?}
  За данный заказ было начислено {$bonus.accrual | number : 0 : '.' : ' '} баллов.
{/if}
```

Или вот так:

```fenom
{if ($bonus.writeoff + 0)?}
  Списано бонусов за заказ: {$bonus.writeoff | number : 0 : '.' : ' '}
  Стоимость корзины со скидкой: {$total.cart_cost}
  Стоимость корзины без скидки: {($bonus.writeoff + ($total.cart_cost | replace : ' ' : '')) | number : 0 : '.' : ' '}
{/if}
```

Обратите внимание на то, как я обрабатываю стоимость корзины: `$total.cart_cost | replace : ' ' : ''`.
Дело в том, что в чанк письма стоимость попадает не числом, а строкой с пробелами в виде разделителей тысяч: 1 000.00. Если его не обработать, то подсчёт будет некорректным.
