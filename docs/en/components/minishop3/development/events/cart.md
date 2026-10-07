---
title: Cart events
---
# Cart events

Adding, changing and removing products in the cart.

Besides the parameters listed below, every event on this page also receives `controller` — the call wrapper adds it.

## Which events can abort the operation

`$modx->event->output(...)` does not stop the work everywhere: the core reads the plugin response only for some of the events.

| Event | Reaction to `output()` |
| --- | --- |
| Every `msOnBefore*` | The operation is aborted, the client gets an error |
| `msOnAddToCart` | The product is already saved, but the request still returns an error |
| `msOnChangeInCart`, `msOnChangeOptionInCart`, `msOnRemoveFromCart`, `msOnEmptyCart` | Ignored — the operation has already completed |
| `msOnGetCart`, `msOnGetStatusCart` | Used only to substitute data, not to abort |

These four after-events cannot return an error: the core calls them without reading the response. Put your checks into the paired `msOnBefore*`.

## msOnBeforeGetCart

Fired **before** getting cart contents.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft (cart) |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetCart':
        /** @var \MiniShop3\Controllers\Cart\Cart $controller */
        $controller = $scriptProperties['controller'];
        $draft = $scriptProperties['draft'];

        // E.g. deny cart access for certain users
        if ($modx->user->get('id') == 123) {
            $modx->event->output('Access denied');
            return;
        }
        break;
}
```

---

## msOnGetCart

Fired **after** getting cart contents. Lets you modify data before it is returned.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft (cart) |
| `data` | `array` | Cart products array |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetCart':
        $controller = $scriptProperties['controller'];
        $data = $scriptProperties['data'];

        // Add extra data to each product
        foreach ($data as $key => &$item) {
            $product = $modx->getObject(\MiniShop3\Model\msProduct::class, $item['product_id']);
            if ($product) {
                $item['sku'] = $product->get('article');
                $item['thumb'] = $product->get('thumb');
            }
        }

        // Return modified data
        $values = &$modx->event->returnedValues;
        $values['data'] = $data;
        break;
}
```

---

## msOnBeforeAddToCart

Fired **before** adding a product to the cart. Lets you validate or modify add parameters.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `msProduct` | `msProduct` | Product object |
| `count` | `int` | Quantity |
| `options` | `array` | Product options |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        /** @var \MiniShop3\Model\msProduct $product */
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];

        // Disallow adding products with zero price
        if ($product->get('price') <= 0) {
            $modx->event->output('Product is not available for order');
            return;
        }

        // Disallow adding more than 10 units
        if ($count > 10) {
            $modx->event->output('Maximum 10 units per product');
            return;
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $options = $scriptProperties['options'] ?? [];

        $values = &$modx->event->returnedValues;

        // Minimum quantity — 2
        if ($count < 2) {
            $values['count'] = 2;
        }

        // Add source tag to options
        $options['source'] = 'promo_landing';
        $values['options'] = $options;
        break;
}
```

---

## msOnAddToCart

Fired **after** a product has been successfully added — it is already saved and the draft is recalculated.

::: warning Can fail an already completed request
The product is saved by this point, yet the plugin can still call `$modx->event->output(...)` — `add()` then returns an error to the client although the cart has already changed.
:::

::: tip Not fired when the same product is added again
If the product+options key is already in the cart, `add()` hands the work over to `change()` — `msOnBeforeChangeInCart`/`msOnChangeInCart` fire instead of `msOnBeforeAddToCart`/`msOnAddToCart`. The quantity is summed with what is already there: 2 units on top of 3 give `count = 5`, and that is the value the change events receive.
:::

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `msProduct` | `msProduct` | Product object |
| `count` | `int` | Quantity added |
| `options` | `array` | Product options |
| `product_key` | `string` | Unique product key in cart |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $productKey = $scriptProperties['product_key'];

        // Log add
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Cart] Product added: %s (ID: %d), qty: %d, key: %s',
            $product->get('pagetitle'),
            $product->get('id'),
            $count,
            $productKey
        ));

        // Send event to analytics
        // analytics()->track('add_to_cart', [...]);
        break;
}
```

---

## msOnBeforeChangeInCart

Fired **before** changing product quantity in the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `product_key` | `string` | Unique product key in cart |
| `count` | `int` | New quantity |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeInCart':
        $productKey = $scriptProperties['product_key'];
        $count = $scriptProperties['count'];

        // Disallow changing certain products
        if (strpos($productKey, 'promo') !== false) {
            $modx->event->output('Promo product quantity cannot be changed');
            return;
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeInCart':
        $count = $scriptProperties['count'];

        // Cap maximum
        $values = &$modx->event->returnedValues;
        if ($count > 50) {
            $values['count'] = 50;
        }
        break;
}
```

---

## msOnChangeInCart

Fired **after** changing product quantity in the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `product_key` | `string` | Unique product key |
| `count` | `int` | New quantity |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeInCart':
        $productKey = $scriptProperties['product_key'];
        $count = $scriptProperties['count'];

        $modx->log(modX::LOG_LEVEL_INFO,
            "Quantity changed: {$productKey} => {$count}"
        );
        break;
}
```

---

## msOnBeforeChangeOptionsInCart

Fired **before** changing product options in the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `product_key` | `string` | Unique product key |
| `options` | `array` | New options |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOptionsInCart':
        $options = $scriptProperties['options'];

        // Disallow changing color to "gold" (exclusive)
        if (isset($options['color']) && $options['color'] === 'gold') {
            $modx->event->output('Gold color is not available');
            return;
        }
        break;
}
```

### Modifying data

The options can be substituted — the core reads them back from the response if the value is an array:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOptionsInCart':
        $options = $scriptProperties['options'];

        // Normalise the case of the values
        $options = array_map('mb_strtolower', $options);

        $values = &$modx->event->returnedValues;
        $values['options'] = $options;
        break;
}
```

The substituted options take part in computing `product_key`, so the cart row key changes along with them.

---

## msOnChangeOptionInCart

Fired **after** changing product options in the cart.

::: tip Not fired when keys collide
If the new combination of options matches an existing cart row, the core removes the current row and hands the work over to `change()` — `msOnBeforeChangeInCart`/`msOnChangeInCart` fire instead of this event. The quantities of the two rows are added together.
:::

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `old_product_key` | `string` | Old product key |
| `product_key` | `string` | New product key (may change) |
| `options` | `array` | New options |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOptionInCart':
        $oldKey = $scriptProperties['old_product_key'];
        $newKey = $scriptProperties['product_key'];
        $options = $scriptProperties['options'];

        if ($oldKey !== $newKey) {
            $modx->log(modX::LOG_LEVEL_INFO,
                "Product key changed: {$oldKey} => {$newKey}"
            );
        }
        break;
}
```

---

## msOnBeforeRemoveFromCart

Fired **before** removing a product from the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `product_key` | `string` | Unique product key |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveFromCart':
        $productKey = $scriptProperties['product_key'];

        // Disallow removing required product
        // (e.g. delivery service added automatically)
        if ($productKey === 'ms_delivery_service') {
            $modx->event->output('This product cannot be removed');
            return;
        }
        break;
}
```

---

## msOnRemoveFromCart

Fired **after** removing a product from the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `product_key` | `string` | Removed product key |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveFromCart':
        $productKey = $scriptProperties['product_key'];

        $modx->log(modX::LOG_LEVEL_INFO,
            "Product removed from cart: {$productKey}"
        );

        // Analytics notification
        // analytics()->track('remove_from_cart', [...]);
        break;
}
```

---

## msOnBeforeEmptyCart

Fired **before** fully clearing the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeEmptyCart':
        // Disallow clearing cart at certain times
        $hour = (int)date('G');
        if ($hour >= 23 || $hour < 6) {
            $modx->event->output('Cart cannot be cleared at night');
            return;
        }
        break;
}
```

---

## msOnEmptyCart

Fired **after** fully clearing the cart.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnEmptyCart':
        $modx->log(modX::LOG_LEVEL_INFO, 'Cart cleared');

        // A good place to drop your own cart-bound state. MiniShop3 core keeps
        // no such keys of its own — things like a promo code come from add-ons,
        // for example ms3PromoCode.
        unset($_SESSION['myshop']['promo']);
        break;
}
```

---

## msOnGetStatusCart

Fired when calculating cart status (totals). Lets you modify the totals.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `status` | `array` | Cart totals array |

### status structure

```php
$status = [
    'total_count' => 5,        // Total units across all rows
    'total_cost' => 15000,     // Total cost
    'total_weight' => 12.5,    // Total weight in ms3_weight_unit (kg by default)
    'total_discount' => 1500,  // Total discount
    'total_positions' => 3,    // Number of positions (cart rows)
];
```

There are no other keys in `status` — the array is built entirely by `CartItemManager::calculateStatus()`. `total_count` sums the quantities of every row, `total_positions` counts the rows themselves.

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetStatusCart':
        $status = $scriptProperties['status'];

        // Add bonus points
        $status['bonus_points'] = floor($status['total_cost'] / 100);

        // Add free delivery info
        $status['free_delivery'] = $status['total_cost'] >= 5000;
        $status['free_delivery_diff'] = max(0, 5000 - $status['total_cost']);

        $values = &$modx->event->returnedValues;
        $values['status'] = $status;
        break;
}
```

### Outputting extra info

Once the status is modified, the data is available on the frontend:

```fenom
{* In cart chunk *}
{if $status.free_delivery}
    <div class="free-delivery">Free delivery!</div>
{else}
    <div class="delivery-info">
        Until free delivery: {$status.free_delivery_diff | number_format : 0 : '' : ' '} ₽
    </div>
{/if}

{if $status.bonus_points > 0}
    <div class="bonus">You will get {$status.bonus_points} bonus points</div>
{/if}
```
