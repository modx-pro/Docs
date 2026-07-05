---
title: msCustomer
---
# msCustomer

Snippet for displaying the customer account.

::: warning Caching
The snippet uses the user session and must be called **uncached** (`!msCustomer`).
:::

## How it works

The snippet is driven by the **`service`** parameter. Different values render different account pages with different data and behavior.

### profile — Customer profile

Edit personal data: name, email, phone. Shows email and phone verification status.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

| Parameter | Default | Description |
|----------|--------------|----------|
| **tpl** | `tpl.msCustomer.profile` | Profile chunk |

See also: [Customer profile](/en/components/minishop3/frontend/customer-profile)

---

### addresses — Address management

List of saved delivery addresses with create, edit, delete, and set-default options.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'addresses'
]}
```

| Parameter | Default | Description |
|----------|--------------|----------|
| **tpl** | `tpl.msCustomer.addresses` | Address list chunk |
| **addressTpl** | `tpl.msCustomer.address.row` | Address row chunk |
| **formTpl** | `tpl.msCustomer.address.form` | Address form chunk |

See also: [Customer addresses](/en/components/minishop3/frontend/customer-addresses)

---

### orders — Order history

List of all customer orders with status filter and pagination. Click an order for details.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'orders',
    'limit' => 10
]}
```

| Parameter | Default | Description |
|----------|--------------|----------|
| **tpl** | `tpl.msCustomer.orders` | Order list chunk |
| **orderTpl** | `tpl.msCustomer.order.row` | Order row chunk |
| **detailTpl** | `tpl.msCustomer.order.details` | Order details chunk |
| **limit** | `20` | Orders per page |

See also: [Customer orders](/en/components/minishop3/frontend/customer-orders)

---

## Common parameters

| Parameter | Default | Description |
|----------|--------------|----------|
| **service** | `profile` | Service: `profile`, `addresses`, `orders` |
| **return** | `tpl` | Format: `tpl` (HTML), `data` (array) |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Chunk for unauthorized users |

## Get data without rendering

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

### For service=orders

| Parameter | Description |
|----------|----------|
| `order_id` | Order ID for details view |
| `status` | Filter by status ID |
| `offset` | Pagination offset |

```
/cabinet/?order_id=15      — order #15 details
/cabinet/?status=2         — orders with status 2
/cabinet/?offset=20        — second page
```

### For service=addresses

| Parameter | Description |
|----------|----------|
| `mode` | Mode: `list`, `edit`, `create` |
| `id` | Address ID to edit |

```
/cabinet/addresses/              — address list
/cabinet/addresses/?mode=create  — create address
/cabinet/addresses/?mode=edit&id=5  — edit address #5
```

### Logout

```
/cabinet/?action=logout
```

## Data structure

### service=profile (return=data)

```php
[
    'authorized' => true,
    'service' => 'profile',
    'customer' => [
        'id' => 1,
        'email' => 'user@example.com',
        'first_name' => 'John',
        'last_name' => 'Doe',
        'phone' => '+7 999 123-45-67',
        // ... other msCustomer fields
    ],
    'email_verified' => true,
    'email_verified_at' => '15.01.2024 12:30',
    'phone_verified' => false,
    'phone_verified_at' => null,
    'errors' => [],
    'success' => false,
]
```

### service=orders (return=data) — list

```php
[
    'authorized' => true,
    'service' => 'orders',
    'orders' => [
        [
            'id' => 15,
            'num' => 'MS-00015',
            'createdon' => '2024-01-15 10:30:00',
            'createdon_formatted' => '15.01.2024 10:30',
            'cost' => 7500,
            'cost_formatted' => '7 500',
            'status_id' => 2,
            'status_name' => 'Paid',
            'status_color' => '008000',
            // ... other msOrder fields
        ],
        // ...
    ],
    'orders_count' => 5,
    'total' => 12,
    'statuses' => [
        ['id' => 2, 'name' => 'Paid', 'color' => '008000', 'selected' => false],
        ['id' => 3, 'name' => 'Shipped', 'color' => '0000FF', 'selected' => false],
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
]
```

### service=orders (return=data) — order details

When GET parameter `order_id` is present:

```php
[
    'authorized' => true,
    'service' => 'orders',
    'order' => [
        'id' => 15,
        'num' => 'MS-00015',
        'status_name' => 'Paid',
        'status_color' => '008000',
        'createdon_formatted' => '15.01.2024 10:30',
        'comment' => 'Call before delivery',
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
            'weight' => '500 g',
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
        'city' => 'Moscow',
        'street' => 'Sample St',
        'building' => '15',
        'room' => '42',
        // ... other address fields
    ],
    'total' => [
        'cost' => '7 800',
        'cart_cost' => '7 500',
        'delivery_cost' => '300',
        'weight' => '1 kg',
    ],
    'customer' => [...],
]
```

### Unauthorized user

```php
[
    'authorized' => false,
    'login_url' => '/login/',
    'register_url' => '/register/',
]
```

## Chunk architecture

Customer account chunks use **inheritance** via a base layout:

```
tpl.msCustomer.base          — base layout (sidebar + content)
├── tpl.msCustomer.profile   — extends base, profile block
├── tpl.msCustomer.orders    — extends base, order list block
└── tpl.msCustomer.addresses — extends base, addresses block
```

### Base layout

Chunk `tpl.msCustomer.base` contains:

- Sidebar (`tpl.msCustomer.sidebar`)
- Content area via `{block 'content'}`

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

### Example profile chunk

```fenom
{* tpl.msCustomer.profile *}
{extends 'tpl.msCustomer.base'}

{block 'content'}
<div class="ms3-customer-profile">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">{'ms3_customer_profile_title' | lexicon}</h5>
        </div>
        <div class="card-body">
            {if $success?}
            <div class="alert alert-success">
                {'ms3_customer_profile_updated' | lexicon}
            </div>
            {/if}

            <form class="ms3_form ms3-customer-profile-form" method="post">
                <input type="hidden" name="ms3_action" value="customer/update-profile">

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="first_name" class="form-label">
                            {'ms3_customer_first_name' | lexicon}
                        </label>
                        <input type="text"
                               class="form-control {if $errors.first_name?}is-invalid{/if}"
                               name="first_name"
                               value="{$customer.first_name}"
                               required>
                        {if $errors.first_name?}
                        <div class="invalid-feedback">{$errors.first_name}</div>
                        {/if}
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="last_name" class="form-label">
                            {'ms3_customer_last_name' | lexicon}
                        </label>
                        <input type="text"
                               class="form-control"
                               name="last_name"
                               value="{$customer.last_name}"
                               required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">{'ms3_customer_email' | lexicon}</label>
                    <div class="input-group">
                        <input type="email" class="form-control"
                               name="email" value="{$customer.email}" required>
                        {if $email_verified}
                        <span class="input-group-text bg-success text-white">
                            {'ms3_customer_email_verified' | lexicon}
                        </span>
                        {/if}
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">{'ms3_customer_phone' | lexicon}</label>
                    <input type="tel" class="form-control"
                           name="phone" value="{$customer.phone}" required>
                </div>

                <button type="submit" class="btn btn-primary ms3_link">
                    {'ms3_customer_profile_save' | lexicon}
                </button>
            </form>
        </div>
    </div>
</div>
{/block}
```

## Placeholders in chunks

### tpl.msCustomer.profile

| Placeholder | Description |
|-------------|----------|
| `{$customer}` | Customer data (array) |
| `{$customer.id}` | Customer ID |
| `{$customer.email}` | Email |
| `{$customer.first_name}` | First name |
| `{$customer.last_name}` | Last name |
| `{$customer.phone}` | Phone |
| `{$email_verified}` | Email verified (bool) |
| `{$email_verified_at}` | Email verification date |
| `{$phone_verified}` | Phone verified (bool) |
| `{$phone_verified_at}` | Phone verification date |
| `{$errors}` | Validation errors (array) |
| `{$success}` | Save success (bool) |

### tpl.msCustomer.orders

| Placeholder | Description |
|-------------|----------|
| `{$orders}` | Rendered order rows (HTML) |
| `{$orders_count}` | Orders on current page |
| `{$total}` | Total order count |
| `{$statuses}` | Status list for filter |
| `{$pagination}` | Pagination data |
| `{$customer}` | Customer data |

### tpl.msCustomer.order.row

| Placeholder | Description |
|-------------|----------|
| `{$id}` | Order ID |
| `{$num}` | Order number (MS-00015) |
| `{$createdon_formatted}` | Created date |
| `{$cost_formatted}` | Order total |
| `{$status_name}` | Status name |
| `{$status_color}` | Status color |

### tpl.msCustomer.order.details

| Placeholder | Description |
|-------------|----------|
| `{$order}` | Order data |
| `{$products}` | Order products array |
| `{$delivery}` | Delivery method |
| `{$payment}` | Payment method |
| `{$address}` | Delivery address |
| `{$total}` | Totals (cost, cart_cost, delivery_cost, weight) |
| `{$customer}` | Customer data |

## System settings

| Setting | Description |
|-----------|----------|
| `ms3_customer_login_page_id` | Login page ID |
| `ms3_customer_register_page_id` | Registration page ID |

## Example account page

Create three resources with the same template but different snippet calls:

### Profile (/cabinet/profile/)

```fenom
{'!msCustomer' | snippet : ['service' => 'profile']}
```

### Orders (/cabinet/orders/)

```fenom
{'!msCustomer' | snippet : ['service' => 'orders']}
```

### Addresses (/cabinet/addresses/)

```fenom
{'!msCustomer' | snippet : ['service' => 'addresses']}
```

## Form handling

Profile and address forms are submitted via POST with `ms3_action`:

```html
<form method="post">
    <input type="hidden" name="ms3_action" value="customer/update-profile">
    <!-- form fields -->
</form>
```

Available actions:

| Action | Description |
|----------|----------|
| `customer/update-profile` | Update profile |
| `customer/create-address` | Create address |
| `customer/update-address` | Update address |
| `customer/delete-address` | Delete address |
| `customer/set-default-address` | Set default address |

## CSS classes

Main classes for styling:

| Class | Element |
|-------|---------|
| `.ms3-customer-account` | Account container |
| `.ms3-customer-profile` | Profile block |
| `.ms3-customer-orders` | Orders block |
| `.ms3-customer-addresses` | Addresses block |
| `.ms3-customer-order-details` | Order details |
| `.ms3_form` | MiniShop3 form |
| `.ms3_link` | Form submit button |
