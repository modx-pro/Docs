---
title: Order product events
---
# Order product events

Adding, updating and removing order line items.

::: info Context
Since 1.12 the manager edits lines via the **Manager API** (`OrdersController`: `POST/PUT/DELETE …/orders/{id}/products/…`), not the older processors. Parameters include `msOrder` and `msOrderProduct`.

For frontend cart events see [Cart events](cart).
:::

::: info A second source of msOnBeforeCreateOrderProduct / msOnCreateOrderProduct
Besides the Manager API, this pair is also fired from `OrderDraftManager` — when an order is created programmatically without a session (`ProgrammaticOrderService`, the sessionless API for integrations and cron). In that channel the event parameters carry an **extra `origin` key** (`'integration'` by default), which the Manager API call does not have.
:::

::: warning After-events do not roll back the database
`msOnCreateOrderProduct`, `msOnUpdateOrderProduct`, `msOnRemoveOrderProduct` run **after** `save()` / `remove()`. If such a plugin returns `output`, the core only logs a warning — the Vue client still gets a success response. Checks that must abort the operation belong in the paired `msOnBefore*`.
:::

## msOnBeforeCreateOrderProduct

Fired **before** persisting a new line (Manager API).

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | New line (not in DB yet) |
| `object` | `msOrderProduct` | The same line as `msOrderProduct` (MS2-style alias) |
| `msOrder` | `msOrder` | Parent order |
| `mode` | `string` | `modSystemEvent::MODE_NEW` (the value `'new'`) |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrderProduct':
        /** @var \MiniShop3\Model\msOrderProduct $orderProduct */
        $orderProduct = $scriptProperties['msOrderProduct'];

        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $stock = $msProduct->get('stock') ?? 0;
            if ($count > $stock) {
                $modx->event->output('Not enough stock');
                return;
            }
        }
        break;
}
```

---

## msOnCreateOrderProduct

Fired **after** a successful `save()`. A plugin error does not roll back the row.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Saved line |
| `object` | `msOrderProduct` | The same line as `msOrderProduct` (MS2-style alias) |
| `msOrder` | `msOrder` | Order |
| `mode` | `string` | `modSystemEvent::MODE_NEW` (the value `'new'`) |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $stock = $msProduct->get('stock') ?? 0;
            $msProduct->set('stock', max(0, $stock - $count));
            $msProduct->save();
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Added product #%d, qty: %d',
            $productId,
            $count
        ));
        break;
}
```

---

## msOnBeforeUpdateOrderProduct

Fired **before** `save()` on an updated line.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Line with the new field values (the object is already mutated, the old values are not in the event parameters) |
| `object` | `msOrderProduct` | The same line as `msOrderProduct` (MS2-style alias) |
| `msOrder` | `msOrder` | Order |
| `mode` | `string` | `modSystemEvent::MODE_UPD` (the value `'upd'`) |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // The object already holds the NEW count. The old value is not among
        // the event parameters (it is not saved to the database yet).
        $newCount = $orderProduct->get('count');
        $productId = $orderProduct->get('product_id');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $stock = $msProduct->get('stock') ?? 0;
            if ($newCount > $stock) {
                $modx->event->output('Not enough stock for the requested quantity');
                return;
            }
        }
        break;
}
```

---

## msOnUpdateOrderProduct

Fired **after** a successful `save()`. A plugin error does not roll back the changes.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Updated line |
| `object` | `msOrderProduct` | The same line as `msOrderProduct` (MS2-style alias) |
| `msOrder` | `msOrder` | Order |
| `mode` | `string` | `modSystemEvent::MODE_UPD` (the value `'upd'`) |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // The event does not pass the count from before the change
        // (there is no snapshot of the old row). Sync the external system
        // with the CURRENT, already saved, line.
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Product #%d in the order, current quantity: %d',
            $productId,
            $count
        ));
        break;
}
```

---

## msOnBeforeRemoveOrderProduct

Fired **before** `remove()`. The API rejects deleting the last line — HTTP 400 before the event.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Line to remove |
| `object` | `msOrderProduct` | The same line as `msOrderProduct` (MS2-style alias) |
| `msOrder` | `msOrder` | Order |
| `id` | `int` | `msOrderProduct` id |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];

        if ($order && (int) $order->get('status_id') === 2) {
            $modx->event->output('Cannot remove lines from a finalized order');
            return;
        }
        break;
}
```

---

## msOnRemoveOrderProduct

Fired **after** a successful `remove()`. A plugin error does not restore the row.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Removed line (still in xPDO memory) |
| `object` | `msOrderProduct` | The same line as `msOrderProduct` (MS2-style alias) |
| `msOrder` | `msOrder` | Order |
| `id` | `int` | Removed line id |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $stock = $msProduct->get('stock') ?? 0;
            $msProduct->set('stock', $stock + $count);
            $msProduct->save();
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Removed product #%d from the order, returned: %d',
            $productId,
            $count
        ));
        break;
}
```

---

## Full example: stock control

```php
<?php
/**
 * Plugin: Order line stock
 * Events: msOnCreateOrderProduct, msOnUpdateOrderProduct, msOnRemoveOrderProduct
 */

switch ($modx->event->name) {

    case 'msOnCreateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        updateStock($modx, $orderProduct->get('product_id'), -$orderProduct->get('count'));
        break;

    case 'msOnUpdateOrderProduct':
        // The event does not pass the count from before the change, so an
        // incremental stock calculation is impossible here. Only create and
        // remove change the reserve directly.
        $orderProduct = $scriptProperties['msOrderProduct'];
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Stock] Order line changed, product #%d, current quantity: %d',
            $orderProduct->get('product_id'),
            $orderProduct->get('count')
        ));
        break;

    case 'msOnRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        updateStock($modx, $orderProduct->get('product_id'), $orderProduct->get('count'));
        break;
}

/**
 * Update product stock
 */
function updateStock($modx, $productId, $delta) {
    $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
    if ($msProduct) {
        $stock = $msProduct->get('stock') ?? 0;
        $newStock = max(0, $stock + $delta);
        $msProduct->set('stock', $newStock);
        $msProduct->save();

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Stock] Product #%d: %d %s %d = %d',
            $productId,
            $stock,
            $delta >= 0 ? '+' : '-',
            abs($delta),
            $newStock
        ));
    }
}
```
