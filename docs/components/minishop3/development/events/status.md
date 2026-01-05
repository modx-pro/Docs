---
title: События статуса заказа
---
# События статуса заказа

События для отслеживания и контроля смены статуса заказа.

## msOnBeforeChangeOrderStatus

Вызывается **перед** сменой статуса заказа. Позволяет проверить условия или отменить смену.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Объект заказа |
| `old_status` | `int` | ID текущего статуса |
| `status` | `int` | ID нового статуса |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOrderStatus':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        // Запретить отмену оплаченных заказов
        if ($newStatus == 6 && $order->get('payment_status') == 'paid') {
            $modx->event->output('Нельзя отменить оплаченный заказ');
            return;
        }

        // Запретить смену статуса в нерабочее время
        $hour = (int)date('G');
        if ($hour < 9 || $hour > 18) {
            $modx->event->output('Смена статуса доступна с 9:00 до 18:00');
            return;
        }
        break;
}
```

### Проверка товаров перед отправкой

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Статус "Отправлен" = 3
        if ($newStatus == 3) {
            // Проверить наличие трек-номера
            $properties = $order->get('properties') ?? [];
            if (empty($properties['tracking_number'])) {
                $modx->event->output('Укажите трек-номер перед отправкой');
                return;
            }
        }
        break;
}
```

---

## msOnChangeOrderStatus

Вызывается **после** успешной смены статуса заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrder` | `msOrder` | Объект заказа |
| `old_status` | `int` | ID предыдущего статуса |
| `status` | `int` | ID нового статуса |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        // Логирование
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Status] Заказ #%s: статус %d → %d',
            $order->get('num'),
            $oldStatus,
            $newStatus
        ));
        break;
}
```

### Интеграция с CRM

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Отправка в CRM при смене статуса
        $crmData = [
            'order_id' => $order->get('num'),
            'status' => $newStatus,
            'updated_at' => date('c'),
        ];

        // $crm->updateOrder($crmData);
        break;
}
```

### Начисление бонусов при выполнении заказа

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Статус "Выполнен" = 4
        if ($newStatus == 4) {
            $customer = $order->getOne('Customer');
            if ($customer) {
                // Начисляем 5% от суммы заказа в бонусы
                $bonus = floor($order->get('cost') * 0.05);
                $currentBonus = $customer->get('bonus') ?? 0;
                $customer->set('bonus', $currentBonus + $bonus);
                $customer->save();

                $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                    '[Bonus] Начислено %d бонусов покупателю #%d за заказ #%s',
                    $bonus,
                    $customer->get('id'),
                    $order->get('num')
                ));
            }
        }
        break;
}
```

### Возврат товаров на склад при отмене

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Статус "Отменён" = 6
        if ($newStatus == 6) {
            foreach ($order->getMany('Products') as $product) {
                $msProduct = $product->getOne('Product');
                if ($msProduct) {
                    $remains = $msProduct->get('remains') ?? 0;
                    $msProduct->set('remains', $remains + $product->get('count'));
                    $msProduct->save();
                }
            }

            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Stock] Товары возвращены на склад для заказа #%s',
                $order->get('num')
            ));
        }
        break;
}
```

### Отправка SMS при отправке заказа

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Статус "Отправлен" = 3
        if ($newStatus == 3) {
            $address = $order->getOne('Address');
            $phone = $address->get('phone');
            $trackingNumber = $order->get('properties')['tracking_number'] ?? '';

            if ($phone && $trackingNumber) {
                $message = sprintf(
                    'Ваш заказ #%s отправлен. Трек-номер: %s',
                    $order->get('num'),
                    $trackingNumber
                );

                // $smsService->send($phone, $message);
            }
        }
        break;
}
```

---

## Полный пример: бизнес-логика статусов

```php
<?php
/**
 * Плагин: Бизнес-логика статусов
 * События: msOnBeforeChangeOrderStatus, msOnChangeOrderStatus
 *
 * Статусы:
 * 1 - Новый
 * 2 - В обработке
 * 3 - Отправлен
 * 4 - Выполнен
 * 5 - Ожидает оплаты
 * 6 - Отменён
 */

switch ($modx->event->name) {

    case 'msOnBeforeChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        // Проверки перед сменой статуса
        switch ($newStatus) {
            case 3: // Отправлен
                $properties = $order->get('properties') ?? [];
                if (empty($properties['tracking_number'])) {
                    $modx->event->output('Укажите трек-номер');
                    return;
                }
                break;

            case 4: // Выполнен
                // Только из статуса "Отправлен"
                if ($oldStatus != 3) {
                    $modx->event->output('Заказ должен быть сначала отправлен');
                    return;
                }
                break;

            case 6: // Отменён
                // Нельзя отменить выполненный заказ
                if ($oldStatus == 4) {
                    $modx->event->output('Нельзя отменить выполненный заказ');
                    return;
                }
                break;
        }
        break;

    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        // Действия после смены статуса
        switch ($newStatus) {
            case 2: // В обработке
                // Резервирование товаров
                foreach ($order->getMany('Products') as $product) {
                    $msProduct = $product->getOne('Product');
                    if ($msProduct) {
                        $remains = $msProduct->get('remains') ?? 0;
                        $msProduct->set('remains', max(0, $remains - $product->get('count')));
                        $msProduct->save();
                    }
                }
                break;

            case 4: // Выполнен
                // Начисление бонусов
                $customer = $order->getOne('Customer');
                if ($customer) {
                    $bonus = floor($order->get('cost') * 0.05);
                    $currentBonus = $customer->get('bonus') ?? 0;
                    $customer->set('bonus', $currentBonus + $bonus);
                    $customer->save();
                }
                break;

            case 6: // Отменён
                // Возврат товаров
                foreach ($order->getMany('Products') as $product) {
                    $msProduct = $product->getOne('Product');
                    if ($msProduct) {
                        $remains = $msProduct->get('remains') ?? 0;
                        $msProduct->set('remains', $remains + $product->get('count'));
                        $msProduct->save();
                    }
                }
                break;
        }

        // Логирование всех смен статусов
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderStatus] Заказ #%s: %d → %d (менеджер: %s)',
            $order->get('num'),
            $oldStatus,
            $newStatus,
            $modx->user->get('username') ?? 'system'
        ));
        break;
}
```
