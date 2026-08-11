---
title: Differences from miniShop2
---
# Differences from miniShop2

This guide helps developers familiar with miniShop2 get up to speed with MiniShop3 and understand the key changes.

## System requirements

| Requirement | miniShop2 | MiniShop3 |
| --- | --- | --- |
| MODX | 2.3+ | **3.0.0+** |
| PHP | 7.0+ | **8.1+** |
| MySQL | 5.5+ | 5.7+ / MariaDB 10.3+ |
| pdoTools | 2.x | **3.x** |

## Architecture

### Namespaces

miniShop2 used classes without namespaces. In MiniShop3, all classes live in the `MiniShop3\` namespace:

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

### Service Container

MiniShop3 uses the MODX 3 DI container to register services:

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

miniShop2 managed the database schema via xPDO schema and the build process. MiniShop3 uses **Phinx** for versioned migrations:

```bash
# Run migrations
php vendor/bin/phinx migrate -c phinx.php
```

Migrations run automatically during component installation.

## System settings

All system settings were renamed from `ms2_` to `ms3_`:

| miniShop2 | MiniShop3 |
| --- | --- |
| `ms2_template_product_default` | `ms3_template_product_default` |
| `ms2_template_category_default` | `ms3_template_category_default` |
| `ms2_category_grid_fields` | **Removed.** Category grid columns: **Utilities → Table fields** (`ms3_grid_fields`, `grid_key=category-products`) + **Utilities → Model fields** |
| `ms2_product_extra_fields` | `ms3_product_extra_fields` |
| `ms2_frontend_js` | `ms3_frontend_assets` |
| `ms2_frontend_css` | (merged into `ms3_frontend_assets`) |
| `ms2_price_format` | `ms3_price_format` |
| `ms2_weight_format` | `ms3_weight_format` |

### New MiniShop3 settings

MiniShop3 adds many new settings:

**API and security:**

- `ms3_cors_allowed_origins` — allowed CORS domains
- `ms3_api_debug` — API debug mode
- `ms3_rate_limit_max_attempts` — API request limit
- `ms3_customer_token_ttl` — customer token lifetime

**Customers (new entity):**

- `ms3_customer_auto_register_on_order` — auto-register on checkout
- `ms3_customer_auto_login_on_order` — auto-login after checkout (not only after registration)
- `ms3_customer_auto_login_after_register` — auto-login after registration
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
/assets/components/minishop3/connector.php  // Manager API (MODX session)
/assets/components/minishop3/api.php        // Web API (/api/v1/, MS3TOKEN)
```

The Manager API powers the Vue admin (orders, customers, utilities). Processors under `core/components/minishop3/src/Processors/` remain for ExtJS resource panels (category, product). Custom web routes: `core/config/ms3_routes_web.custom.php`, add-on fragments: `core/config/ms3.routes.d/web/*.php`.

### Web API (new in MiniShop3)

MiniShop3 ships a REST API for headless work:

```javascript
// Cart
POST /api/v1/cart/add
POST /api/v1/cart/remove
POST /api/v1/cart/change
POST /api/v1/cart/change-option   // change line option (#219)
GET  /api/v1/cart/get
POST /api/v1/cart/clean

// Order
GET  /api/v1/order/get
POST /api/v1/order/add
POST /api/v1/order/set
POST /api/v1/order/submit
GET  /api/v1/order/cost
GET  /api/v1/order/delivery/validation-rules
GET  /api/v1/order/delivery/required-fields

// Customer
POST /api/v1/customer/login
POST /api/v1/customer/register
POST /api/v1/customer/logout
POST /api/v1/customer/forgot-password
POST /api/v1/customer/reset-password
GET  /api/v1/customer/token/get
GET  /api/v1/customer/addresses

// Catalog (no token)
GET  /api/v1/product/list
```

### API authentication

```javascript
// miniShop2 — no authentication
$.post('/assets/components/minishop2/action.php', {
    action: 'cart/add',
    id: 123
});

// MiniShop3 — token authentication
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

### MiniShop3 hook list

| miniShop2 Callback | MiniShop3 Hook |
| --- | --- |
| `Cart.add.before` | `beforeAddToCart` |
| `Cart.add.response.success` | `afterAddToCart` |
| `Cart.remove.response.success` | `afterRemoveFromCart` |
| `Cart.change.response.success` | `afterChangeCart` |
| `Cart.change-option.response.success` | *(new)* cart line option change |
| `Order.submit.before` | `beforeSubmitOrder` |
| `Order.submit.response.success` | `afterSubmitOrder` |

After AJAX requests the `afterSendRequest` hook runs and by default calls `ms3.cartUI.init()` to rebind cart UI.

### Data attributes

```html
<!-- miniShop2 -->
<form class="ms2_form" method="post">
    <button type="submit" name="ms2_action" value="cart/add">
        Add to cart
    </button>
</form>

<!-- MiniShop3 — declarative approach -->
<button type="button"
        data-ms-action="cart/add"
        data-id="123"
        data-count="1">
    Add to cart
</button>
```

## Plugin events

Most events kept their names, but the passed parameters changed:

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
- `msOnCustomerLogin` — customer logged in
- `msOnBeforeAPIRequest` — before API request
- `msOnAfterAPIRequest` — after API request

## Snippets

### Snippet names (compatibility preserved)

All snippets kept their names:

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

The `formatPrices` parameter was removed (#242). Numeric placeholders are `float`; use `*_formatted` for display.

```fenom
{* miniShop2 *}
{'!msMiniCart' | snippet}

{* MiniShop3 — default chunk tpl.msOrderTotal *}
{'!msOrderTotal' | snippet}

{* or an array for custom markup *}
{set $cart = '!msOrderTotal' | snippet : ['return' => 'data']}
<a href="{'ms3_cart_page_id' | option | url}">
    {$cart.total_positions} for {$cart.total_cost_formatted}
</a>
```

### Price placeholders (#242)

| miniShop2 | MiniShop3 |
| --- | --- |
| `{$product.price}` often included currency | `{$product.price}` — float, `{$product.price_formatted}` — string |
| `formatPrices=1` on snippets | Removed. Always float + `*_formatted` |

## Chunks

Chunk names changed for consistency:

| miniShop2 | MiniShop3 |
| --- | --- |
| `tpl.msProducts.row` | `tpl.msProducts.row` (unchanged) |
| `tpl.msCart` | `tpl.msCart` (unchanged) |
| `tpl.msOrder` | `tpl.msOrder` (unchanged) |
| `tpl.msMiniCart` | `tpl.msOrderTotal` |
| — | `tpl.msCustomer.profile` (new) |
| — | `tpl.msCustomer.orders` (new) |

## Data model

### New entity: msCustomer

MiniShop3 introduces a separate store customer entity:

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

// Optional link to modUser (ms3_customer_sync_enabled)
$modUser = $customer->getOne('User');
```

Customers sign in via `msCustomer` and the `MS3TOKEN` cookie, not standard modUser Login (unless sync is enabled).

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

## Migration from miniShop2

This is a data and code runbook. Parallel MS2 and MS3 on one DB is not assumed: MODX 3 first, then MS3, then the transfer.

### Step 1: MODX 3

Upgrade the site to MODX 3.x. MS3 does not install on MODX 2.

### Step 2: Backup

Take a DB and file dump. Record MS2 category, product, status, delivery, and payment IDs.

### Step 3: Install MiniShop3

Via the package manager or a transport from [GitHub Releases](https://github.com/modx-pro/MiniShop3/releases). Wait for Phinx migrations.

### Step 4: Catalog and order data

The package has no one-click MS2→MS3 migrator. Typical path:

1. Export products/categories to CSV (or a custom script over `ms2_*` tables).
2. Import into MS3 via [Utilities → Import](/en/components/minishop3/interface/utilities/import) or the API.
3. Options: `option_*` keys; after 1.11 groups live in `msOptionGroup` (not `modCategory`).
4. Move orders and customers with a separate script, or keep an MS2 archive read-only.

Check resource `class_key` values: categories `msCategory`, products `msProduct`.

### Step 5: System settings

MS3 does not read `ms2_*` keys. Create `ms3_*` (page_id, statuses, currency). Copy old MS2 values by hand.

### Step 6: Storefront JavaScript

```javascript
// Before
miniShop2.Cart.add(id);

// After
ms3.cart.add(id);
```

### Step 7: Plugins

Rewrite event subscriptions for MS3 (names and signatures differ). See [Events](/en/components/minishop3/development/events).

### Step 8: Chunks and placeholders

- Prices: raw floats + `*_formatted` (since 1.11, breaking #242). Remove `formatPrices` from snippet calls.
- Options: `group_name` instead of MS2 `category_name`. Option groups use `msOptionGroup`, not `modCategory`.
- Product preview: `preview_file_id` on `msProductData` (gallery “Set preview”), not only `thumb`/`image`.
- Extra categories: `msCategoryMember` and `CategoryProductScope` on `msProducts` (#481).
- Cart on thanks: `msCart` is **not** hidden on `?msorder=` by default (#249). For old behavior use `hideOnThanks=1`. `msOrder` is always empty on thanks.

```html
<!-- Before -->
<form class="ms2_form">
    <button name="ms2_action" value="cart/add">

<!-- After -->
<button data-ms-action="cart/add" data-id="{$id}">
```

### Step 9: Verification

1. Catalog and product card.
2. Cart → checkout → thanks.
3. Account: login, addresses, orders.
4. Manager: orders, customers, options.

## Manager UI

| Area | miniShop2 | MiniShop3 |
| --- | --- | --- |
| Orders, customers, utilities | ExtJS | Vue 3 + PrimeVue (Manager API) |
| Category/product editor in the tree | ExtJS | ExtJS + Vue category products grid |
| Table columns | System settings `ms2_*_grid_fields` | **Utilities → Table fields** (`ms3_grid_fields`) |

Plugin events from Vue CRUD (orders, customers) do not fire the same way as resource processor changes. For admin customization see [Events](/en/components/minishop3/development/events) and the Manager API.

## Backward compatibility

MiniShop3 maintains compatibility at the level of:

✅ **Compatible:**

- Snippet names
- Chunk placeholder structure
- Main snippet parameters
- Most plugin events

❌ **Not compatible:**

- System settings (`ms2_` → `ms3_`)
- JavaScript API (miniShop2 → ms3)
- PHP classes (require namespaces)
- API entry points (action.php → api.php)
