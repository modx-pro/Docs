---
title: Order product events
---
# Order product events

Events for order line items: add, update, remove.

::: info Context
Since 1.12 the manager edits lines via **Manager API** (`OrdersController`: `POST/PUT/DELETE …/orders/{id}/products/…`), not legacy processors. Parameters include `msOrder` and `msOrderProduct`.

For storefront cart events see [Cart events](cart).
:::

::: warning After hooks do not roll back DB
`msOnCreateOrderProduct`, `msOnUpdateOrderProduct`, `msOnRemoveOrderProduct` run **after** `save()` / `remove()`. If an after-plugin returns `output`, core logs a warning only — the Vue client still gets success. Validation and veto belong in matching `msOnBefore*`.
:::

## msOnBeforeCreateOrderProduct

Fired **before** persisting a new line (Manager API).

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | New line (not in DB yet) |
| `msOrder` | `msOrder` | Parent order |
| `mode` | `int` | `modSystemEvent::MODE_NEW` |

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
            $remains = $msProduct->get('remains') ?? 0;
            if ($count > $remains) {
                $modx->event->output('Not enough stock');
                return;
            }
        }
        break;
}
```

---

## msOnCreateOrderProduct

Fired **after** successful `save()`. A plugin error does not roll back the row.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Saved line |
| `msOrder` | `msOrder` | Order |
| `mode` | `int` | `modSystemEvent::MODE_NEW` |

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
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', max(0, $remains - $count));
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
| `msOrderProduct` | `msOrderProduct` | Line with new field values |
| `msOrder` | `msOrder` | Order |
| `mode` | `int` | `modSystemEvent::MODE_UPD` |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $newCount = $orderProduct->get('count');
        $oldCount = $orderProduct->getPrevious('count');

        if ($newCount > $oldCount) {
            $diff = $newCount - $oldCount;
            $productId = $orderProduct->get('product_id');

            $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($msProduct) {
                $remains = $msProduct->get('remains') ?? 0;
                if ($diff > $remains) {
                    $modx->event->output('Not enough stock to increase quantity');
                    return;
                }
            }
        }
        break;
}
```

---

## msOnUpdateOrderProduct

Fired **after** successful `save()`. A plugin error does not roll back changes.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Updated line |
| `msOrder` | `msOrder` | Order |
| `mode` | `int` | `modSystemEvent::MODE_UPD` |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $newCount = $orderProduct->get('count');
        $oldCount = $orderProduct->getPrevious('count');

        if ($newCount != $oldCount) {
            $diff = $newCount - $oldCount;
            $productId = $orderProduct->get('product_id');

            $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($msProduct) {
                $remains = $msProduct->get('remains') ?? 0;
                $msProduct->set('remains', $remains - $diff);
                $msProduct->save();
            }
        }
        break;
}
```

---

## msOnBeforeRemoveOrderProduct

Fired **before** `remove()`. API rejects deleting the last line (HTTP 400 before the event).

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Line to remove |
| `msOrder` | `msOrder` | Order |
| `id` | `int` | `msOrderProduct` id |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrderProduct':
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

Fired **after** successful `remove()`. A plugin error does not restore the row.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Removed line (still in xPDO memory) |
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
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', $remains + $count);
            $msProduct->save();
        }
        break;
}
```

---

## Full example: stock control

```php
<?php
/**
 * Plugin: Order line stock control
 * Events: msOnBeforeCreateOrderProduct, msOnBeforeUpdateOrderProduct,
 *         msOnCreateOrderProduct, msOnUpdateOrderProduct, msOnRemoveOrderProduct
 */

switch ($modx->event->name) {

    case 'msOnBeforeCreateOrderProduct':
    case 'msOnBeforeUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct && $count > ($msProduct->get('remains') ?? 0)) {
            $modx->event->output('Insufficient stock');
            return;
        }
        break;

    case 'msOnCreateOrderProduct':
    case 'msOnRemoveOrderProduct':
        // Adjust stock after persistence (after errors are logged only)
        adjustStock($modx, $scriptProperties['msOrderProduct'], $modx->event->name);
        break;

    case 'msOnUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        $diff = $orderProduct->get('count') - $orderProduct->getPrevious('count');
        if ($diff !== 0) {
            adjustStockDelta($modx, $orderProduct->get('product_id'), -$diff);
        }
        break;
}

function adjustStock($modx, $orderProduct, $eventName) {
    // ...
}

function adjustStockDelta($modx, $productId, $delta) {
    // ...
}
```
