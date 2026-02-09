---
title: Differences from miniShop2
description: Migration and compatibility guide for miniShop2 developers
---
# Differences from miniShop2

This guide helps developers familiar with miniShop2 get up to speed with MiniShop3 and understand the main changes.

## System requirements

| Requirement | miniShop2 | MiniShop3 |
|------------|-----------|-----------|
| MODX | 2.3+ | **3.0.0+** |
| PHP | 7.0+ | **8.1+** |
| MySQL | 5.5+ | 5.7+ / MariaDB 10.3+ |
| pdoTools | 2.x | **3.x** |

## Architecture

### Namespaces

miniShop2 used classes without namespaces. In MiniShop3 all classes live in the `MiniShop3\` namespace:

```php
// miniShop2
$ms2 = $modx->getService('minishop2');
$product = $modx->getObject('msProduct', $id);
$order = $modx->getObject('msOrder', $id);

// MiniShop3
use MiniShop3\MiniShop3;
use MiniShop3\Model\msProduct;
use MiniShop3\Model\msOrder;

$ms3 = $modx->services->get('ms3');
$product = $modx->getObject(msProduct::class, $id);
$order = $modx->getObject(msOrder::class, $id);
```

### Service container

MiniShop3 uses the MODX 3 DI container for services:

```php
// miniShop2
$ms2 = $modx->getService('minishop2');
$cart = $ms2->cart;
$order = $ms2->order;

// MiniShop3
$ms3 = $modx->services->get('ms3');
$cart = $modx->services->get('ms3_cart');
$order = $modx->services->get('ms3_order');
```

### Database migrations

miniShop2 managed the DB schema via xPDO schema and the build process. MiniShop3 uses **Phinx** for versioned migrations:

```bash
# Run migrations
php vendor/bin/phinx migrate -c phinx.php
```

Migrations run automatically when the component is installed.

## System settings

All system settings are renamed from `ms2_` to `ms3_`:

| miniShop2 | MiniShop3 |
|-----------|-----------|
| `ms2_template_product_default` | `ms3_template_product_default` |
| `ms2_template_category_default` | `ms3_template_category_default` |
| `ms2_category_grid_fields` | `ms3_category_grid_fields` |
| `ms2_product_extra_fields` | `ms3_product_extra_fields` |
| `ms2_frontend_js` | `ms3_frontend_assets` |
| `ms2_frontend_css` | (merged into `ms3_frontend_assets`) |
| `ms2_price_format` | `ms3_price_format` |
| `ms2_weight_format` | `ms3_weight_format` |

### New MiniShop3 settings

MiniShop3 adds many new settings:

**API and security:**

- `ms3_cors_allowed_origins` — allowed CORS origins
- `ms3_api_debug` — API debug mode
- `ms3_rate_limit_max_attempts` — API request limit
- `ms3_customer_token_ttl` — customer token TTL

**Customers (new entity):**

- `ms3_customer_auto_register_on_order` — auto-register on order
- `ms3_customer_auto_login_after_register` — auto-login after register
- `ms3_customer_require_email_verification` — email verification
- `ms3_customer_sync_enabled` — sync with modUser

**Currency:**

- `ms3_currency_symbol` — currency symbol (₽, $, €)
- `ms3_currency_position` — symbol position (before/after)

## REST API

### Entry points

```php
// miniShop2 — single action.php
/assets/components/minishop2/action.php

// MiniShop3 — separate endpoints
/assets/components/minishop3/connector.php  // Manager API
/assets/components/minishop3/api.php        // Web API (v1)
```

### Web API (new in MiniShop3)

MiniShop3 provides a full REST API for headless integrations:

```javascript
// Cart
POST /api/v1/cart/add
POST /api/v1/cart/remove
POST /api/v1/cart/change
GET  /api/v1/cart/get
POST /api/v1/cart/clean

// Order
GET  /api/v1/order/get
POST /api/v1/order/add
POST /api/v1/order/submit
GET  /api/v1/order/cost

// Customer
POST /api/v1/customer/token/get
GET  /api/v1/customer/addresses
```

### API authorization

```javascript
// miniShop2 — no auth
$.post('/assets/components/minishop2/action.php', {
    action: 'cart/add',
    id: 123
});

// MiniShop3 — token auth
const token = getCookie('MS3TOKEN');
fetch('/api/v1/cart/add', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-MS3-Token': token
    },
    body: JSON.stringify({ id: 123, count: 1 })
});
```

## JavaScript API

### Global object

```javascript
// miniShop2
miniShop2.Cart.add(123);
miniShop2.Order.submit();
miniShop2Config.actionUrl;

// MiniShop3
ms3.cart.add(123);
ms3.order.submit();
ms3Config.apiUrl;
```

### Callbacks → Hooks

```javascript
// miniShop2 — callbacks
miniShop2.Callbacks.add('Cart.add.response.success', 'my_callback', function(response) {
    console.log('Product added', response);
});

miniShop2.Callbacks.remove('Cart.add.response.success', 'my_callback');

// MiniShop3 — hooks
ms3.hooks.add('afterAddToCart', function({ response }) {
    console.log('Product added', response);
});

ms3.hooks.remove('afterAddToCart', 'my_hook');
```

### MiniShop3 hooks mapping

| miniShop2 Callback | MiniShop3 Hook |
|--------------------|----------------|
| `Cart.add.before` | `beforeAddToCart` |
| `Cart.add.response.success` | `afterAddToCart` |
| `Cart.remove.response.success` | `afterRemoveFromCart` |
| `Cart.change.response.success` | `afterChangeCart` |
| `Order.submit.before` | `beforeSubmitOrder` |
| `Order.submit.response.success` | `afterSubmitOrder` |

### Data attributes

```html
<!-- miniShop2 -->
<form class="ms2_form" method="post">
    <button type="submit" name="ms2_action" value="cart/add">
        Add to cart
    </button>
</form>

<!-- MiniShop3 — declarative -->
<button type="button"
        data-ms-action="cart/add"
        data-id="123"
        data-count="1">
    Add to cart
</button>
```

## Plugin events

Most event names are unchanged, but parameters differ:

```php
// miniShop2
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $cart = $scriptProperties['cart'];  // msCartHandler class
        break;
}

// MiniShop3
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $cart = $scriptProperties['cart'];  // MiniShop3\Controllers\Cart\Cart
        break;
}
```

### New MiniShop3 events

- `msOnCustomerCreate` — customer created
- `msOnCustomerUpdate` — customer updated
- `msOnCustomerLogin` — customer login
- `msOnBeforeAPIRequest` — before API request
- `msOnAfterAPIRequest` — after API request

## Snippets

### Snippet names (compatibility)

Snippet names are unchanged:

- `msProducts`
- `msCart`
- `msOrder`
- `msGetOrder`
- `msGallery`
- `msOptions`
- `msProductOptions`

### New snippets

- `msCustomer` — customer account
- `msOrderTotal` — order totals (replaces msMiniCart)

### msMiniCart → msOrderTotal

```fenom
{* miniShop2 *}
{'!msMiniCart' | snippet}

{* MiniShop3 *}
{set $cart = '!msOrderTotal' | snippet}
<a href="{15 | url}"> {* Cart page ID *}
    {$cart.count} items, {$cart.cost}
</a>
```

## Chunks

Chunk names changed for consistency:

| miniShop2 | MiniShop3 |
|-----------|-----------|
| `tpl.msProducts.row` | `tpl.msProducts.row` (unchanged) |
| `tpl.msCart` | `tpl.msCart` (unchanged) |
| `tpl.msOrder` | `tpl.msOrder` (unchanged) |
| `tpl.msMiniCart` | `tpl.msOrderTotal` |
| — | `tpl.msCustomer.profile` (new) |
| — | `tpl.msCustomer.orders` (new) |

## Data model

### New entity: msCustomer

MiniShop3 introduces a separate entity for store customers:

```php
// miniShop2 — customer = modUser
$user = $modx->getObject('modUser', $userId);
$profile = $user->getOne('Profile');
$address = $profile->get('address');

// MiniShop3 — separate msCustomer entity
use MiniShop3\Model\msCustomer;
use MiniShop3\Model\msCustomerAddress;

$customer = $modx->getObject(msCustomer::class, ['email' => $email]);
$addresses = $customer->getMany('Addresses');

// Link to modUser (optional)
$modUser = $customer->getOne('User');
```

### Customer addresses

```php
// miniShop2 — address in msOrderAddress (order only)
$orderAddress = $order->getOne('Address');

// MiniShop3 — saved customer addresses
$addresses = $customer->getMany('Addresses');
foreach ($addresses as $address) {
    echo $address->get('city') . ', ' . $address->get('street');
}
```

## Migrating from miniShop2

### Step 1: Upgrade MODX to 3.x

MiniShop3 runs only on MODX 3. Migrate MODX first.

### Step 2: Install MiniShop3

Install MiniShop3 via the MODX package manager or download a transport from [GitHub](https://github.com/modx-pro/MiniShop3/releases).

### Step 3: Update system settings

Rename settings from `ms2_` to `ms3_` or create new ones.

### Step 4: Update JavaScript

Replace `miniShop2` calls with `ms3`:

```javascript
// Before
miniShop2.Cart.add(id);

// After
ms3.cart.add(id);
```

### Step 5: Update plugins

Review and update plugins that use miniShop2 events.

### Step 6: Update templates

Replace data attributes and classes:

```html
<!-- Before -->
<form class="ms2_form">
    <button name="ms2_action" value="cart/add">

<!-- After -->
<button data-ms-action="cart/add" data-id="{$id}">
```

## Backward compatibility

MiniShop3 keeps compatibility at these levels:

✅ **Compatible:**

- Snippet names
- Placeholder structure in chunks
- Main snippet parameters
- Most plugin events

❌ **Incompatible:**

- System settings (ms2_ → ms3_)
- JavaScript API (miniShop2 → ms3)
- PHP classes (require namespaces)
- API entry points (action.php → api.php)
