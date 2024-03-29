# Дополнительные бонусы за первый заказ на сайте

Иногда нужно начислять юзеру баллы не за регистрацию (данный функционал есть в коробке), а за первый заказ на сайте.
При чём, помимо основного начисления баллов за заказ (процент от стоимости) нужно начислить фиксированное количество баллов за первый заказ.

Данный кейс решает эту задачу.

## Шаг 1

Создаём лексиконы:

- `msb2_logs_+first_order` = `Дополнительные баллы за первый заказ`
- `msb2_logs_-first_order` = `Списание устаревших баллов за первый заказ`

> Второй лексикон нужен, если вы захотите добавить в системную настройку `msb2_lifetime_for_bonus` время жизни для бонусов типа `first_order`.

## Шаг 2

Добавляем плагин и вешаем его на событие `msOnChangeOrderStatus` с приоритетом `99999997`.

```php
switch ($modx->event->name) {
  case 'msOnChangeOrderStatus':
    // Фиксированное количество баллов за первый заказ
    $additional_points = 2000;

    // Минимальная стоимость первого заказа
    $min_order_cost = 0;

    // Только заказы со статусом "Новый (1)"
    if ((int)$order->get('status') !== 1) {
      break;
    }

    // Its first order?
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
