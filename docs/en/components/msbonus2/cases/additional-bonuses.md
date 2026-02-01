# Extra bonuses for first order on the site

Sometimes you want to give points not for registration (that is built-in) but for the user's first order. Besides the usual order accrual (percent of cost), you add a fixed amount for the first order. This case shows how.

## Step 1

Create lexicon entries:

- `msb2_logs_+first_order` = `Extra points for first order`
- `msb2_logs_-first_order` = `Expired first-order points writeoff`

> The second entry is needed if you add a lifetime in `msb2_lifetime_for_bonus` for type `first_order`.

## Step 2

Add a plugin and attach it to `msOnChangeOrderStatus` with priority `99999997`.

```php
switch ($modx->event->name) {
  case 'msOnChangeOrderStatus':
    // Fixed points for first order
    $additional_points = 2000;

    // Minimum cost of first order
    $min_order_cost = 0;

    // Only orders with status "New (1)"
    if ((int)$order->get('status') !== 1) {
      break;
    }

    // Is it first order?
    $user_id = $order->get('user_id');
    if ($order->get('cost') < $min_order_cost || $modx->getCount('msOrder', ['user_id' => $user_id]) !== 1) {
      break;
    }
    $msb2 = $modx->getService('msbonus2', 'msBonus2',
        MODX_CORE_PATH . 'components/msbonus2/model/msbonus2/');
    $msb2->initialize($modx->context->key);
    $manager = $msb2->getManager();
    $manager->setPlus('first_order', $additional_points, $user_id, $order->get('id'), $user_id);

    break;
}
```
