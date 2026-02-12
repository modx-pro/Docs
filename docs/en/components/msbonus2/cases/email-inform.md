# Showing bonus writeoff in order emails

Show bonus information in emails to the user or manager.

## Step 1

In the email chunk, near the top, add:

```fenom
{var $bonus = (('!pdoResources' | snippet: [
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

This fills `$bonus` or leaves it empty if no msb2Order or msb2User was found:

```php
Array (
  [accrual] => 0.00
  [writeoff] => 4000.00
  [points] => 2440.00
  [reserve] => 0.00
)
```

## Step 2

With this array you can output:

- `writeoff` — bonuses written off for the order (if user applied them);
- `accrual` — points credited to the user (if status is in `msb2_order_status_paid` and order has products from `msb2_categories_for_accrual_of_points`);
- `points` — user's current available balance;
- `reserve` — user's current reserve (soon to be available);

Example:

```fenom
You have {$bonus.points | number : 0 : '.' : ' '} points
and {$bonus.reserve | number : 0 : '.' : ' '} in reserve that will be available soon.
```

Or:

```fenom
{if ($bonus.accrual + 0)?}
  This order earned you {$bonus.accrual | number : 0 : '.' : ' '} points.
{/if}
```

Or:

```fenom
{if ($bonus.writeoff + 0)?}
  Bonuses used for this order: {$bonus.writeoff | number : 0 : '.' : ' '}
  Cart total after discount: {$total.cart_cost}
  Cart total before discount: {($bonus.writeoff + ($total.cart_cost | replace : ' ' : '')) | number : 0 : '.' : ' '}
{/if}
```

Note how cart cost is handled: `$total.cart_cost | replace : ' ' : ''`. In the email chunk the cost is a string with space as thousands separator (e.g. 1 000.00). Without this, calculations would be wrong.
