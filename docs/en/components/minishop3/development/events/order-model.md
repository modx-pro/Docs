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
|----------|-----|----------|
| `mode` | `string` | Mode: `new` or `upd` |
| `object` | `msOrder` | Order object (MS2-style alias) |
| `msOrder` | `msOrder` | Order object (MS3-style; same record) |
| `cacheFlag` | `bool` \| `int` \| `null` | Cache flag passed to `save()` |

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
|----------|-----|----------|
| `mode` | `string` | Mode: `new` or `upd` |
| `object` | `msOrder` | Saved order object (MS2-style alias) |
| `msOrder` | `msOrder` | Saved order object (MS3-style; same record) |
| `cacheFlag` | `bool` \| `int` \| `null` | Cache flag passed to `save()` |

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
|----------|-----|----------|
| `id` | `int` | ID of the order being removed |
| `object` | `msOrder` | Order object (MS2-style alias) |
| `msOrder` | `msOrder` | Order object (MS3-style; same record) |
| `ancestors` | `array` | Dependent objects array passed to xPDO `remove()` |

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
|----------|-----|----------|
| `id` | `int` | ID of the removed order |
| `object` | `msOrder` | Removed order object (MS2-style alias) |
| `msOrder` | `msOrder` | Removed order object (MS3-style; same record) |
| `ancestors` | `array` | Dependent objects array passed to xPDO `remove()` |

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

::: warning Reserved event
In the current MS3 implementation the event is registered but **not invoked separately**. Any order update goes through `xPDO::save()`, so listen to `msOnBeforeSaveOrder` with `$mode === 'upd'` for the same semantics.
:::

### Parameters (planned)

| Parameter | Type | Description |
|----------|-----|----------|
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

::: warning Reserved event
In the current MS3 implementation the event is registered but **not invoked separately**. Use `msOnSaveOrder` with `$mode === 'upd'`.
:::

### Parameters (planned)

| Parameter | Type | Description |
|----------|-----|----------|
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

---

## Full example: order change audit

```php
<?php
/**
 * Plugin: Order change audit
 * Events: msOnBeforeSaveOrder, msOnSaveOrder, msOnRemoveOrder
 */

switch ($modx->event->name) {

    case 'msOnBeforeSaveOrder':
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        if ($mode === 'upd') {
            // Save state before changes for comparison
            $modx->eventData['orderAudit'] = [
                'before' => $order->toArray(),
                'dirty' => $order->getDirty(),
            ];
        }
        break;

    case 'msOnSaveOrder':
        $order = $scriptProperties['msOrder'];
        $mode = $scriptProperties['mode'];

        $auditData = $modx->eventData['orderAudit'] ?? null;

        $audit = $modx->newObject('msOrderAudit', [
            'order_id' => $order->get('id'),
            'user_id' => $modx->user->get('id') ?: 0,
            'action' => $mode === 'new' ? 'create' : 'update',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
            'createdon' => date('Y-m-d H:i:s'),
        ]);

        if ($mode === 'new') {
            $audit->set('changes', json_encode(['action' => 'create']));
        } else {
            $audit->set('changes', json_encode($auditData['dirty'] ?? []));
        }

        $audit->save();
        break;

    case 'msOnRemoveOrder':
        $order = $scriptProperties['msOrder'];

        $audit = $modx->newObject('msOrderAudit', [
            'order_id' => $order->get('id'),
            'user_id' => $modx->user->get('id') ?: 0,
            'action' => 'delete',
            'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
            'createdon' => date('Y-m-d H:i:s'),
            'changes' => json_encode([
                'order_num' => $order->get('num'),
                'cost' => $order->get('cost'),
            ]),
        ]);
        $audit->save();
        break;
}
```
