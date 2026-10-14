---
title: Order status events
---
# Order status events

Tracking and controlling order status changes.

## msOnBeforeChangeOrderStatus

Fired **before** changing order status. Lets you validate or abort the change.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrder` | `msOrder` | Order object |
| `old_status` | `int` | Current status ID |
| `status` | `int` | New status ID |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOrderStatus':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        if ($newStatus == 6 && $order->get('payment_status') == 'paid') {
            $modx->event->output('Cannot cancel a paid order');
            return;
        }

        $hour = (int)date('G');
        if ($hour < 9 || $hour > 18) {
            $modx->event->output('Status change available from 9:00 to 18:00');
            return;
        }
        break;
}
```

### Redirecting to a different status

Besides aborting through `output()`, a plugin can **redirect** the change to another status: the core re-validates the transition and applies the returned status instead of the requested one.

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOrderStatus':
        $newStatus = $scriptProperties['status'];

        // Orders without prepayment go to "needs confirmation" instead of "paid"
        if ($newStatus === 3) { // 3 = "paid"
            $modx->event->returnedValues = ['status' => 7]; // 7 = "needs confirmation"
        }
        break;
}
```

### Checking products before shipping

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Status "Shipped" = 3
        if ($newStatus == 3) {
            $properties = $order->get('properties') ?? [];
            if (empty($properties['tracking_number'])) {
                $modx->event->output('Enter tracking number before shipping');
                return;
            }
        }
        break;
}
```

---

## msOnChangeOrderStatus

Fired **after** successful order status change.

::: warning A plugin error does not undo the status change
By the time this fires, the status is already persisted along with the inventory movements, and the transition is written to the order history — the entry is made before the event on purpose, so that a plugin error cannot erase that history.

If a plugin calls `output()`, the caller receives the error message but the status stays new: there is no rollback. Status-change notifications are sent as well — the core dispatches them first and only then returns the error.

Put any check that should abort the transition into `msOnBeforeChangeOrderStatus`.
:::

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrder` | `msOrder` | Order object |
| `old_status` | `int` | Previous status ID |
| `status` | `int` | New status ID |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Status] Order #%s: status %d → %d',
            $order->get('num'),
            $oldStatus,
            $newStatus
        ));
        break;
}
```

### CRM integration

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        $crmData = [
            'order_id' => $order->get('num'),
            'status' => $newStatus,
            'updated_at' => date('c'),
        ];

        // $crm->updateOrder($crmData);
        break;
}
```

### Bonus points on order completion

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Status "Completed" = 4
        if ($newStatus == 4) {
            $customer = $order->getOne('Customer');
            if ($customer) {
                $bonus = floor($order->get('cost') * 0.05);
                $currentBonus = $customer->get('bonus') ?? 0;
                $customer->set('bonus', $currentBonus + $bonus);
                $customer->save();

                $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                    '[Bonus] %d bonus points to customer #%d for order #%s',
                    $bonus,
                    $customer->get('id'),
                    $order->get('num')
                ));
            }
        }
        break;
}
```

### Return products to stock on cancel

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        // Status "Cancelled" = 6
        if ($newStatus == 6) {
            foreach ($order->getMany('Products') as $product) {
                $msProduct = $product->getOne('Product');
                if ($msProduct) {
                    $stock = $msProduct->get('stock') ?? 0;
                    $msProduct->set('stock', $stock + $product->get('count'));
                    $msProduct->save();
                }
            }

            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Stock] Products returned to stock for order #%s',
                $order->get('num')
            ));
        }
        break;
}
```

### Send SMS when order ships

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $newStatus = $scriptProperties['status'];

        if ($newStatus == 3) {
            $address = $order->getOne('Address');
            $phone = $address->get('phone');
            $trackingNumber = $order->get('properties')['tracking_number'] ?? '';

            if ($phone && $trackingNumber) {
                $message = sprintf(
                    'Your order #%s has shipped. Tracking: %s',
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

## Full example: status business logic

```php
<?php
/**
 * Plugin: Status business logic
 * Events: msOnBeforeChangeOrderStatus, msOnChangeOrderStatus
 *
 * Statuses:
 * 1 - New
 * 2 - Processing
 * 3 - Shipped
 * 4 - Completed
 * 5 - Awaiting payment
 * 6 - Cancelled
 */

switch ($modx->event->name) {

    case 'msOnBeforeChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        switch ($newStatus) {
            case 3:
                $properties = $order->get('properties') ?? [];
                if (empty($properties['tracking_number'])) {
                    $modx->event->output('Enter tracking number');
                    return;
                }
                break;

            case 4:
                if ($oldStatus != 3) {
                    $modx->event->output('Order must be shipped first');
                    return;
                }
                break;

            case 6:
                if ($oldStatus == 4) {
                    $modx->event->output('Cannot cancel a completed order');
                    return;
                }
                break;
        }
        break;

    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['msOrder'];
        $oldStatus = $scriptProperties['old_status'];
        $newStatus = $scriptProperties['status'];

        switch ($newStatus) {
            case 2:
                foreach ($order->getMany('Products') as $product) {
                    $msProduct = $product->getOne('Product');
                    if ($msProduct) {
                        $stock = $msProduct->get('stock') ?? 0;
                        $msProduct->set('stock', max(0, $stock - $product->get('count')));
                        $msProduct->save();
                    }
                }
                break;

            case 4:
                $customer = $order->getOne('Customer');
                if ($customer) {
                    $bonus = floor($order->get('cost') * 0.05);
                    $currentBonus = $customer->get('bonus') ?? 0;
                    $customer->set('bonus', $currentBonus + $bonus);
                    $customer->save();
                }
                break;

            case 6:
                foreach ($order->getMany('Products') as $product) {
                    $msProduct = $product->getOne('Product');
                    if ($msProduct) {
                        $stock = $msProduct->get('stock') ?? 0;
                        $msProduct->set('stock', $stock + $product->get('count'));
                        $msProduct->save();
                    }
                }
                break;
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderStatus] Order #%s: %d → %d (manager: %s)',
            $order->get('num'),
            $oldStatus,
            $newStatus,
            $modx->user->get('username') ?? 'system'
        ));
        break;
}
```
