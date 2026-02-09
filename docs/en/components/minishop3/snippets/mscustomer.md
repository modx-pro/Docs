---
title: msCustomer
---
# msCustomer

Snippet for the customer account (profile, addresses, orders).

::: warning Caching
The snippet uses the user session and must be called **uncached** (`!msCustomer`).
:::

## How it works

The snippet is driven by the **`service`** parameter. Different values show different account pages with different data and behavior.

### profile — Customer profile

Edit profile: name, email, phone. Shows email and phone verification status.

```fenom
{'!msCustomer' | snippet: [
    'service' => 'profile'
]}
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msCustomer.profile` | Profile chunk |

See: [Customer profile](/en/components/minishop3/frontend/customer-profile)

---

### addresses — Address management

List of saved delivery addresses: create, edit, delete, set default.

```fenom
{'!msCustomer' | snippet: [
    'service' => 'addresses'
]}
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msCustomer.addresses` | Address list chunk |
| **addressTpl** | `tpl.msCustomer.address.row` | Address row chunk |
| **formTpl** | `tpl.msCustomer.address.form` | Address form chunk |

See: [Customer addresses](/en/components/minishop3/frontend/customer-addresses)

---

### orders — Order history

List of customer orders with status filter and pagination. Click an order for details.

```fenom
{'!msCustomer' | snippet: [
    'service' => 'orders',
    'limit' => 10
]}
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msCustomer.orders` | Order list chunk |
| **orderTpl** | `tpl.msCustomer.order.row` | Order row chunk |
| **detailTpl** | `tpl.msCustomer.order.details` | Order details chunk |
| **limit** | `20` | Orders per page |

See: [Customer orders](/en/components/minishop3/frontend/customer-orders)

---

## Common parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **service** | `profile` | Service: `profile`, `addresses`, `orders` |
| **return** | `tpl` | Format: `tpl` (HTML), `data` (array) |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Chunk for unauthorized users |

## Get data without rendering

```fenom
{set $profile = '!msCustomer' | snippet: [
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
|-----------|-------------|
| `order_id` | Order ID for details |
| `status` | Filter by status ID |
| `offset` | Pagination offset |

### For service=addresses

| Parameter | Description |
|-----------|-------------|
| `mode` | Mode: `list`, `edit`, `create` |
| `id` | Address ID to edit |

### Logout

```
/cabinet/?action=logout
```

## Data structure

With `return=data` the snippet returns arrays for `customer`, `orders`, `order`, `products`, `delivery`, `payment`, `address`, `total`, `pagination`, `statuses`, etc., depending on `service` and context. See the Russian docs or component source for full structure.

## Chunk architecture

Customer chunks use **inheritance** via a base layout:

- `tpl.msCustomer.base` — base layout (sidebar + content)
- `tpl.msCustomer.profile` — extends base, profile block
- `tpl.msCustomer.orders` — extends base, order list block
- `tpl.msCustomer.addresses` — extends base, addresses block
