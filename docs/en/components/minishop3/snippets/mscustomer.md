---
title: msCustomer
---
# msCustomer

Renders the customer account. The `service` parameter picks the section: `profile`, `addresses` or `orders`.

::: warning The account page must not be cached
Untick «Cacheable» on the resource in the admin. The snippet outputs one specific customer's data; on a cacheable page it lands in the cache and reaches the next visitor.

The `!` prefix is not enough for this. In MODX `[[!msCustomer]]` defers execution to the uncacheable pass, while in Fenom `{'!msCustomer'|snippet}` the snippet runs where it stands. The prefix only disables the element cache inside pdoTools: keep it, but rely on the resource setting.
:::

## How it works

```mermaid
flowchart TB
  call[msCustomer]
  auth{Customer signed in?}
  unauth[unauthorizedTpl / return data]
  svc{service}
  profile[profile]
  addresses[addresses]
  orders[orders]
  outTpl[Section chunk]
  outData[return=data array]
  call --> auth
  auth -->|No| unauth
  auth -->|Yes| svc
  svc --> profile
  svc --> addresses
  svc --> orders
  profile --> outTpl
  addresses --> outTpl
  orders --> outTpl
  profile --> outData
  addresses --> outData
  orders --> outData
```

## Call and parameters

### Common parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **service** | `profile` | Section: `profile`, `addresses`, `orders` |
| **return** | `tpl` | Format: `tpl` (HTML), `data` (array) |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Chunk for signed-out visitors |

::: tip The snippet has no properties in the admin
msCustomer declares none, so its property grid is empty: every parameter is set in the call only. The same goes for `selector` on msCart and msOrderTotal ([#805](https://github.com/modx-pro/MiniShop3/issues/805)).
:::

### Customer profile (`service=profile`)

Editing personal data: name, email, phone and their verification states.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msCustomer.profile` | Profile chunk |

More: [Customer profile](/en/components/minishop3/frontend/customer-profile)

### Delivery addresses (`service=addresses`)

Saved delivery addresses: create, edit, delete, pick the default one.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'addresses'
]}
```

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msCustomer.addresses` | Address list chunk |
| **addressTpl** | `tpl.msCustomer.address.row` | Address row chunk |
| **formTpl** | `tpl.msCustomer.address.form` | Address form chunk |

More: [Delivery addresses](/en/components/minishop3/frontend/customer-addresses)

### Order history (`service=orders`)

The customer's orders: status filter, pagination, order details. Drafts (status id 1) appear neither in the list nor in the status filter.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'orders',
    'limit' => 10
]}
```

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msCustomer.orders` | Order list chunk |
| **orderTpl** | `tpl.msCustomer.order.row` | Order row chunk |
| **detailTpl** | `tpl.msCustomer.order.details` | Order details chunk |
| **limit** | `20` | Orders per page |

More: [Order history](/en/components/minishop3/frontend/customer-orders)

## Getting data as an array (`return=data`)

```fenom
{set $profile = '!msCustomer' | snippet : [
    'service' => 'profile',
    'return' => 'data'
]}

{if $profile.authorized}
    Hello, {$profile.customer.first_name}!
{else}
    <a href="{$profile.login_url}">Log in</a>
{/if}
```

## GET parameters

| Parameter | Service | Description |
| --- | --- | --- |
| `action=logout` | any | Sign out of the account |
| `order` | `orders` | Order UUID (36 characters) — show the details |
| `status` | `orders` | Filter by status ID |
| `offset` | `orders` | Pagination offset |
| `mode` | `addresses` | Mode: `list`, `edit`, `create` |
| `id` | `addresses` | Address ID for `mode=edit` |

```text
/cabinet/?action=logout                               — sign out
/cabinet/?order=0f9e8d7c-1a2b-3c4d-5e6f-7a8b9c0d1e2f  — order details
/cabinet/?status=2                                    — orders with status 2
/cabinet/?offset=20                                   — second page
/cabinet/addresses/                                   — address list
/cabinet/addresses/?mode=create                       — create an address
/cabinet/addresses/?mode=edit&id=5                    — edit address #5
```

## Data structure

### Profile (`service=profile`)

```php
[
    'authorized' => true,
    'service' => 'profile',
    'customer' => [
        'id' => 1,
        'email' => 'user@example.com',
        'first_name' => 'John',
        'last_name' => 'Smith',
        'phone' => '+1 555 123-45-67',
        // ... other msCustomer fields
    ],
    'email_verified' => true,
    'email_verified_at' => '15.01.2024 12:30',
    'phone_verified' => false,      // always false, see #138
    'phone_verified_at' => null,
    'errors' => [],
    'success' => false,
]
```

### Order list (`service=orders`)

```php
[
    'authorized' => true,
    'service' => 'orders',
    'orders' => [
        [
            'id' => 15,
            'num' => '2610/5',
            'createdon' => '2024-01-15 10:30:00',
            'createdon_formatted' => '15.01.2024 10:30',
            'cost' => 7500,
            'cost_formatted' => '7 500',
            'status_id' => 2,
            'status_name' => 'Paid',
            'status_color' => '008000',
            'can_cancel' => false,
            // ... other msOrder fields
        ],
        // ...
    ],
    'orders_count' => 5,
    'total' => 12,
    'statuses' => [
        ['id' => 2, 'name' => 'Paid', 'color' => '008000', 'selected' => false],
        ['id' => 3, 'name' => 'Sent', 'color' => '0000FF', 'selected' => false],
    ],
    'pagination' => [
        'total' => 12,
        'total_pages' => 2,
        'current_page' => 1,
        'limit' => 10,
        'offset' => 0,
        'pages' => [...],
        'has_prev' => false,
        'has_next' => true,
        'prev_offset' => 0,
        'next_offset' => 10,
    ],
    'customer' => [...],
    'page_url' => 'https://example.com/cabinet/',
]
```

### Order details (`service=orders`)

With the `order` GET parameter present:

```php
[
    'authorized' => true,
    'service' => 'orders',
    'order' => [
        'id' => 15,
        'num' => '2610/5',
        'status_name' => 'Paid',
        'status_color' => '008000',
        'createdon_formatted' => '15.01.2024 10:30',
        'can_cancel' => false,
        'order_comment' => 'Call before delivery',
        // ... other msOrder fields
    ],
    'products' => [
        [
            'product_id' => 10,
            'pagetitle' => 'Product 1',
            'article' => 'ART-001',
            'count' => 2,
            'price' => '3 500',
            'old_price' => '4 000',
            'cost' => '7 000',
            'weight' => '500',
            'weight_formatted' => '500 g',
            'options' => ['color' => 'Red', 'size' => 'M'],
        ],
        // ...
    ],
    'delivery' => [
        'id' => 1,
        'name' => 'Courier delivery',
        'description' => 'Delivery within 1-2 days',
    ],
    'payment' => [
        'id' => 2,
        'name' => 'Bank card',
    ],
    'address' => [
        'city' => 'New York',
        'street' => 'Main St',
        'building' => '15',
        'room' => '42',
        // ... other address fields
    ],
    'total' => [
        'cost' => '7 800',
        'cart_cost' => '7 500',
        'delivery_cost' => '300',
        'weight' => '1',
        'weight_formatted' => '1 kg',
    ],
    'customer' => [...],
    'api_url' => '/api/v1/',
    'assets_url' => '/assets/components/minishop3/',
]
```

When the order is not found or belongs to another customer:

```php
[
    'error' => 'Order not found',
    'customer' => [...],
]
```

### Signed-out visitor

```php
[
    'authorized' => false,
    'login_url' => '/login/',       // empty until ms3_customer_login_page_id is set
    'register_url' => '/register/', // empty until ms3_customer_register_page_id is set
]
```

## Chunk architecture

Section chunks extend the base chunk and fill its `content` block:

```text
tpl.msCustomer.base          — base layout (sidebar + content)
├── tpl.msCustomer.profile   — extends base, profile block
├── tpl.msCustomer.orders    — extends base, order list block
└── tpl.msCustomer.addresses — extends base, addresses block
```

```fenom
{* tpl.msCustomer.base *}
<div class="ms3-customer-account">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 mb-4">
                {include 'tpl.msCustomer.sidebar'}
            </div>
            <div class="col-lg-9 col-md-8">
                {block 'content'}{/block}
            </div>
        </div>
    </div>
</div>
```

The full section chunks are on the [Customer profile](/en/components/minishop3/frontend/customer-profile), [Delivery addresses](/en/components/minishop3/frontend/customer-addresses) and [Order history](/en/components/minishop3/frontend/customer-orders) pages. The required form markup is in [Form handling](#forms).

## Placeholders in chunks

### tpl.msCustomer.profile

| Placeholder | Description |
| --- | --- |
| `{$customer}` | Customer data (array) |
| `{$customer.id}` | Customer ID |
| `{$customer.email}` | Email |
| `{$customer.first_name}` | First name |
| `{$customer.last_name}` | Last name |
| `{$customer.phone}` | Phone |
| `{$email_verified}` | Email verified (bool) |
| `{$email_verified_at}` | Email verification date |
| `{$phone_verified}` | Always `false` — phone verification is planned ([#138](https://github.com/modx-pro/MiniShop3/issues/138)) |
| `{$phone_verified_at}` | Always empty, for the same reason |
| `{$errors}` | Validation errors (array) |
| `{$success}` | Saved successfully (bool) |

### tpl.msCustomer.order.row

| Placeholder | Description |
| --- | --- |
| `{$id}` | Order ID |
| `{$num}` | Order number. A date per `ms3_order_format_num` plus a separator and a counter — for example `2610/5` |
| `{$createdon_formatted}` | Creation date |
| `{$cost_formatted}` | Order total |
| `{$status_name}` | Status name |
| `{$status_color}` | Status colour |

Placeholders of the other chunks, with value types: [Order history](/en/components/minishop3/frontend/customer-orders) — `tpl.msCustomer.orders` and `tpl.msCustomer.order.details`; [Delivery addresses](/en/components/minishop3/frontend/customer-addresses) — the address list and form.

## System settings

| Setting | Description |
| --- | --- |
| `ms3_customer_login_page_id` | Login page ID |
| `ms3_customer_register_page_id` | Registration page ID |
| `ms3_customer_profile_page_id` | Profile page ID |
| `ms3_customer_orders_page_id` | Order history page ID |
| `ms3_customer_addresses_page_id` | Addresses page ID |
| `ms3_customer_cancel_allowed_statuses` | Comma-separated status IDs the customer may cancel an order from |

::: warning The account pages must be set in the settings
`ms3_customer_login_page_id`, `ms3_customer_register_page_id`, `ms3_customer_profile_page_id`, `ms3_customer_addresses_page_id` and `ms3_customer_orders_page_id` all ship as zero. MODX returns an empty link for a zero id and writes an error to the log.

Until they are filled in, the account has empty «Log in» and «Register» links. Logout goes nowhere, section navigation does not work and neither does the order details link.
:::

::: tip What `ms3_customer_cancel_allowed_statuses` controls
It drives `{$can_cancel}` in the order row. The package ships `2,3`.

Clearing the setting does not forbid cancellation: the code falls back to the statuses from `ms3_status_new` and `ms3_status_paid`. To forbid it entirely, set `0`.
:::

## Form handling {#forms}

Profile and address forms are submitted by POST; the action is set by the hidden `ms3_action` field:

| `ms3_action` | Action |
| --- | --- |
| `customer/update-profile` | Update the profile |
| `customer/address-create` | Create an address |
| `customer/address-update` | Update an address |

```html
<form method="post" data-ms3-form="customer">
    <input type="hidden" name="ms3_action" value="customer/update-profile">
    <div>
        <input type="text" name="first_name" value="{$customer.first_name}">
        <div class="invalid-feedback"></div>
    </div>
</form>
```

::: warning Two marks, both required
`data-ms3-form="customer"` (or the `ms3_customer_form` class) switches on auto-saving: each field goes to the server right after it changes. Without that mark the form silently behaves like a plain HTML form — it reloads the page and saves nothing.

The `<div>` wrapper around the field is required too: the handler looks for the nearest parent `div` and stops without one, never reaching the save. Put `.invalid-feedback` in the same `div` — that is where the field error text goes.
:::

### Actions without `ms3_action`

JavaScript intercepts a click on the selector:

| Selector | Action |
| --- | --- |
| `.delete-address` | Delete an address |
| `.set-default-address` | Pick the default address |
| `.ms3-order-cancel` | Cancel an order |
| `#resend-verification-email` | Resend the verification email |

The first two live in the default address row chunk — `tpl.msCustomer.address.row`, file `ms3_customer_address_row.tpl`.

### Address form: the action depends on the mode

There is one `ms3_action` field and its value changes with the mode — the default chunk fills it in:

```fenom
<input type="hidden" name="ms3_action"
       value="customer/{if $mode == 'edit'}address-update{else}address-create{/if}">
```

Your own chunk has to do the same: with `address-create` in edit mode a second address appears instead of the existing one being changed.

## CSS classes

| Class | Element |
| --- | --- |
| `.ms3-customer-account` | Account container |
| `.ms3-customer-profile` | Profile block |
| `.ms3-customer-orders` | Orders block |
| `.ms3-customer-addresses` | Addresses block |
| `.ms3-customer-order-details` | Order details |
| `.ms3_form` | MiniShop3 form |
| `.ms3_link` | Form submit button |
