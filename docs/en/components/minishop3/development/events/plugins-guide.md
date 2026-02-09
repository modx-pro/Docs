---
title: Working with plugins
---
# Working with plugins

Guide to creating MiniShop3 event plugins: getting parameters, returning data, aborting operations, passing data between plugins.

## Basic plugin structure

```php
<?php
/**
 * MiniShop3 plugin
 * Events: msOnBeforeAddToCart, msOnAddToCart
 */

switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // Code for "before add" event
        break;

    case 'msOnAddToCart':
        // Code for "after add" event
        break;
}
```

## Getting incoming parameters

### Method 1: $scriptProperties array

All event parameters are in `$scriptProperties`:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $options = $scriptProperties['options'];
        $controller = $scriptProperties['controller'];
        break;
}
```

### Method 2: extract()

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        extract($scriptProperties);
        // Now available: $msProduct, $count, $options, $controller
        break;
}
```

### Debug: list all parameters

```php
<?php
$modx->log(modX::LOG_LEVEL_ERROR, '[' . $modx->event->name . '] Parameters: ' . print_r(array_keys($scriptProperties), true));
$modx->log(modX::LOG_LEVEL_ERROR, '[' . $modx->event->name . '] ' . print_r($scriptProperties, true));
```

## controller parameter

::: info Important
In all MiniShop3 controller events the `controller` parameter is passed automatically — the current controller instance (Cart, Order, Customer).
:::

Through the controller you can access:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        /** @var \MiniShop3\Controllers\Cart\Cart $controller */
        $controller = $scriptProperties['controller'];

        $ms3 = $controller->ms3;
        $modx = $controller->modx;
        // Use public controller methods for cart data
        break;
}
```

## Aborting the operation

For events with the `Before` prefix you can stop the operation by returning an error message:

### $modx->event->output()

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $product = $scriptProperties['msProduct'];

        if ($product->get('price') <= 0) {
            $modx->event->output('Product is not available for order');
            return;
        }

        if ($scriptProperties['count'] > 10) {
            $modx->event->output('Maximum 10 units per product');
            return;
        }
        break;
}
```

### How it works

1. MiniShop3's `invokeEvent()` collects all plugin outputs
2. If any output is non-empty, the operation is aborted
3. The message is returned to the user (frontend or API response)

### Events that support aborting

- `msOnBeforeGetCart`
- `msOnBeforeAddToCart`
- `msOnBeforeChangeInCart`
- `msOnBeforeChangeOptionsInCart`
- `msOnBeforeRemoveFromCart`
- `msOnBeforeEmptyCart`
- `msOnBeforeAddToOrder`
- `msOnBeforeRemoveFromOrder`
- `msOnSubmitOrder`
- `msOnBeforeCreateOrder`
- `msOnBeforeChangeOrderStatus`
- Other events with the `Before` prefix

## Modifying data

### returnedValues

To change parameters used later:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $values = &$modx->event->returnedValues;

        if ($scriptProperties['count'] < 2) {
            $values['count'] = 2;
        }

        $options = $scriptProperties['options'] ?? [];
        $options['source'] = 'promo_landing';
        $values['options'] = $options;
        break;
}
```

### Important: use reference (&)

```php
// Correct — changes apply
$values = &$modx->event->returnedValues;
$values['count'] = 5;

// Wrong — changes are lost
$values = $modx->event->returnedValues;
$values['count'] = 5;
```

## Passing data between plugins

Use `$modx->eventData` to pass data between plugins of the same event or between events in one request.

### Example: price modification

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];

        $data = $scriptProperties['data'];

        if ($data['parent'] == 5) {
            $price = $price * 0.85;
        }

        $modx->eventData['msOnGetProductPrice']['price'] = $price;
        break;
}
```

### Example: passing data between events

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $modx->eventData['myPlugin']['original_count'] = $scriptProperties['count'];
        $modx->eventData['myPlugin']['added_at'] = time();
        break;

    case 'msOnAddToCart':
        $originalCount = $modx->eventData['myPlugin']['original_count'] ?? null;
        $addedAt = $modx->eventData['myPlugin']['added_at'] ?? null;

        if ($originalCount) {
            $modx->log(modX::LOG_LEVEL_INFO,
                "Product added. Original quantity: {$originalCount}, time: {$addedAt}"
            );
        }
        break;
}
```

### eventData structure

```php
$modx->eventData = [
    'msOnGetProductPrice' => [
        'price' => 1500.00,
    ],
    'msOnGetProductFields' => [
        'data' => [...],
    ],
    'myPlugin' => [
        'custom_key' => 'custom_value',
    ],
];
```

::: warning Important
`$modx->eventData` is cleared after the request. Use `$_SESSION` or the database to persist data between requests.
:::

## Showing messages in the manager

For manager events you can show messages to the user:

### JavaScript alert via addHtml

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if ($page === 'product_update') {
            $controller = $scriptProperties['controller'];

            $controller->addHtml('<script>
                Ext.onReady(function() {
                    MODx.msg.alert("Notice", "Remember to check prices!");
                });
            </script>');
        }
        break;
}
```

### Toast notifications

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];
        $controller = $scriptProperties['controller'];

        if ($page === 'orders') {
            $controller->addHtml('<script>
                Ext.onReady(function() {
                    Ext.Msg.notify("MiniShop3", "You have new orders!");
                });
            </script>');
        }
        break;
}
```

## Plugin priority

Execution order is determined by the plugin **priority** setting:

- Lower value = runs first
- Default: 0
- Any integer

### When priority matters

1. **Price modification** — plugins apply discounts in sequence
2. **Validation** — one plugin may depend on another's result
3. **Data passing** — source plugin must run before consumer

## Debugging plugins

### Logging

```php
<?php
$modx->log(modX::LOG_LEVEL_ERROR, 'Error');
$modx->log(modX::LOG_LEVEL_WARN, 'Warning');
$modx->log(modX::LOG_LEVEL_INFO, 'Info');
$modx->log(modX::LOG_LEVEL_DEBUG, 'Debug');

$modx->log(modX::LOG_LEVEL_ERROR,
    '[MyPlugin::' . $modx->event->name . '] ' . $message
);
```

### Common mistakes

### 1. Forgetting return after output()

```php
// Wrong
if ($error) {
    $modx->event->output('Error');
}
doSomething();

// Correct
if ($error) {
    $modx->event->output('Error');
    return;
}
```

### 2. Not using reference for returnedValues

```php
// Wrong
$values = $modx->event->returnedValues;
$values['count'] = 10;

// Correct
$values = &$modx->event->returnedValues;
$values['count'] = 10;
```

### 3. Wrong event for aborting

```php
// msOnAddToCart — AFTER add; output() here won't stop the add
case 'msOnAddToCart':
    $modx->event->output('Error'); // Useless
    break;

// msOnBeforeAddToCart — BEFORE add
case 'msOnBeforeAddToCart':
    $modx->event->output('Error'); // Stops the add
    break;
```

### 4. Forgetting break in switch

```php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // code
        // Forgot break — next case runs too!

    case 'msOnAddToCart':
        break;
}
```

## Full plugin example

```php
<?php
/**
 * Plugin: Cart add control
 *
 * Events: msOnBeforeAddToCart, msOnAddToCart
 *
 * - Disallow adding products without price
 * - Cap maximum quantity
 * - Log adds
 */

switch ($modx->event->name) {

    case 'msOnBeforeAddToCart':
        /** @var \MiniShop3\Model\msProduct $product */
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $options = $scriptProperties['options'] ?? [];

        if ($product->get('price') <= 0) {
            $modx->event->output($modx->lexicon('ms3_cart_product_not_available'));
            return;
        }

        $maxCount = 99;
        if ($count > $maxCount) {
            $values = &$modx->event->returnedValues;
            $values['count'] = $maxCount;

            $modx->eventData['cartControl']['count_limited'] = true;
            $modx->eventData['cartControl']['original_count'] = $count;
        }

        $values = &$modx->event->returnedValues;
        $options['added_timestamp'] = time();
        $values['options'] = $options;
        break;

    case 'msOnAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $productKey = $scriptProperties['product_key'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[CartControl] Product added: %s (ID: %d), qty: %d, key: %s',
            $product->get('pagetitle'),
            $product->get('id'),
            $count,
            $productKey
        ));

        if (!empty($modx->eventData['cartControl']['count_limited'])) {
            $original = $modx->eventData['cartControl']['original_count'];
            $modx->log(modX::LOG_LEVEL_WARN, sprintf(
                '[CartControl] Quantity capped: requested %d, added %d',
                $original,
                $count
            ));
        }
        break;
}
```
