---
title: Order product events
---
# Order product events

Events for managing products inside an order: add, update, remove.

::: info Context
These events are fired when working with products via manager processors, not the cart controller. For cart add events see [Cart events](cart).
:::

## msOnBeforeCreateOrderProduct

Fired **before** adding a product to the order (via manager).

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrderProduct` | `msOrderProduct` | Order product object |
| `mode` | `string` | Mode: `new` |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrderProduct':
        /** @var \MiniShop3\Model\msOrderProduct $orderProduct */
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Check stock
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $remains = $msProduct->get('remains') ?? 0;
            if ($count > $remains) {
                $modx->event->output('Insufficient product in stock');
                return;
            }
        }
        break;
}
```

---

## msOnCreateOrderProduct

Fired **after** adding a product to the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrderProduct` | `msOrderProduct` | Created product object |
| `mode` | `string` | Mode: `new` |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Reserve product
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', max(0, $remains - $count));
            $msProduct->save();
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Added product #%d to order, qty: %d',
            $productId,
            $count
        ));
        break;
}
```

---

## msOnBeforeUpdateOrderProduct

Fired **before** updating a product in the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrderProduct` | `msOrderProduct` | Order product object |
| `mode` | `string` | Mode: `upd` |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $newCount = $orderProduct->get('count');
        $oldCount = $orderProduct->getPrevious('count');

        // If increasing quantity — check stock
        if ($newCount > $oldCount) {
            $diff = $newCount - $oldCount;
            $productId = $orderProduct->get('product_id');

            $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($msProduct) {
                $remains = $msProduct->get('remains') ?? 0;
                if ($diff > $remains) {
                    $modx->event->output('Insufficient product to increase quantity');
                    return;
                }
            }
        }
        break;
}
```

---

## msOnUpdateOrderProduct

Fired **after** updating a product in the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrderProduct` | `msOrderProduct` | Updated product object |
| `mode` | `string` | Mode: `upd` |

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

                $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                    '[OrderProduct] Product #%d qty changed: %d → %d',
                    $productId,
                    $oldCount,
                    $newCount
                ));
            }
        }
        break;
}
```

---

## msOnBeforeRemoveOrderProduct

Fired **before** removing a product from the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrderProduct` | `msOrderProduct` | Product object to remove |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        $order = $orderProduct->getOne('Order');

        // Disallow removing products from paid orders
        if ($order && $order->get('payment_status') === 'paid') {
            $modx->event->output('Cannot remove products from paid order');
            return;
        }
        break;
}
```

---

## msOnRemoveOrderProduct

Fired **after** removing a product from the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `msOrderProduct` | `msOrderProduct` | Removed product object |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Return product to stock
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', $remains + $count);
            $msProduct->save();
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Removed product #%d from order, returned: %d',
            $productId,
            $count
        ));
        break;
}
```
