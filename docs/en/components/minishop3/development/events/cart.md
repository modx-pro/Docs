---
title: Cart events
---
# Cart events

Events for managing the shopping cart: adding, changing, removing products.

## msOnBeforeGetCart

Fired **before** getting cart contents.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft (cart) |

### Aborting the operation

You can cancel getting the cart:

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
|-----------|------|-------------|
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
|-----------|------|-------------|
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

Fired **after** successfully adding a product to the cart.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
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
|-----------|------|-------------|
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
|-----------|------|-------------|
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
|-----------|------|-------------|
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

---

## msOnChangeOptionInCart

Fired **after** changing product options in the cart.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
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
|-----------|------|-------------|
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
|-----------|------|-------------|
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
|-----------|------|-------------|
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
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnEmptyCart':
        $modx->log(modX::LOG_LEVEL_INFO, 'Cart cleared');

        // Clear promo code in session
        unset($_SESSION['ms3']['promocode']);
        break;
}
```

---

## msOnGetStatusCart

Fired when calculating cart status (totals). Lets you modify the totals.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `status` | `array` | Cart totals array |

### status structure

```php
$status = [
    'total_count' => 5,        // Total product count
    'total_cost' => 15000,     // Total cost
    'total_weight' => 2500,    // Total weight (grams)
    'total_discount' => 1500,  // Total discount
    'total_positions' => 3,    // Number of positions
];
```

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

After modifying status the data is available on the frontend:

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
