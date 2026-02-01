---
title: Order model events (xPDO)
---
# Order model events (xPDO)

Low-level xPDO events for the msOrder model: saving and removing objects.

::: warning Event level
These events are fired at the xPDO model level, not the controller. They run on any msOrder save/remove, including:

- Creating order via frontend
- Editing in manager
- Programmatic change via API
:::

## msOnBeforeSaveOrder

Fired **before** saving the order object (xPDO `save()`).

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrder` | `msOrder` | Order object |
| `mode` | `string` | Mode: `new` or `upd` |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSaveOrder':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        // Auto-fill fields for new order
        if ($mode === 'new') {
            if (empty($order->get('uuid'))) {
                $order->set('uuid', \Ramsey\Uuid\Uuid::uuid4()->toString());
            }
        }

        // Update time on any save
        $order->set('updatedon', time());
        break;
}
```

### Validation before save

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSaveOrder':
        $order = $scriptProperties['msOrder'];

        // Check minimum amount
        $cost = $order->get('cost');
        if ($cost > 0 && $cost < 500) {
            // Note: aborting via output() does not work here;
            // use return false in the model's save() method
            $modx->log(modX::LOG_LEVEL_WARN,
                '[Order] Order amount below minimum: ' . $cost
            );
        }
        break;
}
```

---

## msOnSaveOrder

Fired **after** successfully saving the order object.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrder` | `msOrder` | Saved order object |
| `mode` | `string` | Mode: `new` or `upd` |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnSaveOrder':
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        if ($mode === 'new') {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Order] Created new order #%d',
                $order->get('id')
            ));
        }

        // Sync with external system
        // $externalApi->syncOrder($order->toArray());
        break;
}
```

---

## msOnBeforeRemoveOrder

Fired **before** removing the order object.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrder` | `msOrder` | Order object to remove |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrder':
        $order = $scriptProperties['msOrder'];

        // Archive before remove
        $archiveData = [
            'order_id' => $order->get('id'),
            'order_num' => $order->get('num'),
            'data' => json_encode($order->toArray()),
            'deleted_at' => date('Y-m-d H:i:s'),
            'deleted_by' => $modx->user->get('id'),
        ];

        $archive = $modx->newObject('msOrderArchive', $archiveData);
        $archive->save();

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Order #%s archived before removal',
            $order->get('num')
        ));
        break;
}
```

---

## msOnRemoveOrder

Fired **after** removing the order object.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrder` | `msOrder` | Removed order object |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveOrder':
        $order = $scriptProperties['msOrder'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Removed order #%s (ID: %d)',
            $order->get('num'),
            $order->get('id')
        ));

        // Notify admin
        // $notifier->send('Order #' . $order->get('num') . ' removed');
        break;
}
```

---

## msOnBeforeUpdateOrder

Fired **before** updating the order via the manager processor.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrder` | `msOrder` | Order object |
| `mode` | `string` | Mode: `upd` |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrder':
        $order = $scriptProperties['msOrder'];

        // Save change history
        $changes = $order->getDirty();
        if (!empty($changes)) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Order] Order #%d changes: %s',
                $order->get('id'),
                json_encode($changes)
            ));
        }
        break;
}
```

---

## msOnUpdateOrder

Fired **after** updating the order via the manager processor.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrder` | `msOrder` | Updated order object |
| `mode` | `string` | Mode: `upd` |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnUpdateOrder':
        $order = $scriptProperties['msOrder'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Order #%d updated by manager %s',
            $order->get('id'),
            $modx->user->get('username')
        ));

        // Sync with CRM
        // $crm->updateOrder($order->toArray());
        break;
}
```
