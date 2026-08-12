---
title: Quick start
description: Install MiniShop3, service pages, first product, and a test order
---
# Quick start

Install the package, create service pages, add a product, and place a test order on the storefront.

## System requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |
| Composer | 2.x |

### Dependencies

| Package | Why |
| --- | --- |
| **pdoTools 3.x** | Snippets and Fenom |
| **[VueTools](/en/components/vuetools/)** | Vue 3 and PrimeVue in the Manager |
| **[Scheduler](/en/components/scheduler/)** (optional) | Background: import, notifications, draft cleanup |

## Installation

1. [Connect the modstore.pro repository](https://modstore.pro/info/connection).
2. Open **Packages → Installer**, Modstore.pro provider, **Download Extras**.
3. Download and install in order: **pdoTools**, **VueTools**, then **MiniShop3**. Install **Scheduler** if you need background tasks.

Other install methods: [main page](index).

### What installation creates

1. Tables via Phinx (catalog, orders, customers, `ms3_grid_fields`, etc.).
2. Snippets, plugins, chunks.
3. System settings with the `ms3_` prefix.
4. Five order statuses (ids 1–5: draft, new, paid, sent, canceled). Keys `ms3_status_new` / `paid` / `canceled` get ids 2, 3, 5.
5. “Self pickup” delivery (id 1) and “Cash” payment (id 1) linked in `ms3_delivery_payments`.
6. Scheduler tasks (`ms3_cleanup_tokens`, `ms3_cleanup_drafts`) — active after you enable `ms3_use_scheduler`.

After install, open **System → System Settings → minishop3** and verify `ms3_status_*` if you changed statuses manually.

## Service pages

Create resources and call snippets **uncached**.

| Page | Snippet | Example |
| --- | --- | --- |
| Cart | `msCart` | `{'!msCart' \| snippet}` |
| Checkout | `msOrder` | `{'!msOrder' \| snippet}` |
| Thanks / order | `msGetOrder` | `{'!msGetOrder' \| snippet}` |
| Header mini cart | `msOrderTotal` | `{'!msOrderTotal' \| snippet}` |
| Account (profile) | `msCustomer` | `service=profile` |
| Order history | `msCustomer` | `service=orders` |
| Addresses | `msCustomer` | `service=addresses` |

A guest on any `msCustomer` page sees login and registration forms (`tpl.msCustomer.unauthorized`). Details: [Login and registration](frontend/customer-auth).

Ready templates live in `core/components/minishop3/elements/templates/`:

- `catalog.tpl`, `product.tpl`, `cart.tpl`, `order.tpl`, `thanks.tpl`, `customer.tpl`

Copy the markup into your MODX templates and adapt it to your design.

### “Thanks” page

On URLs with `?msorder=`:

- `msOrder` returns an empty string so checkout does not render twice.
- `msGetOrder` shows order details (UUID or numeric id in the query).
- `msCart` **renders by default** (mini cart in the layout keeps working). Pass `hideOnThanks=1` to hide a specific cart call.

Usually the thanks page needs only `msGetOrder` plus `msOrderTotal` in the header.

::: code-group

```fenom
{'!msCart' | snippet}
```

```modx
[[!msCart]]
```

:::

## System settings page_id

**System settings** → namespace `minishop3` (search `page_id`):

<!-- ![page_id settings](/components/minishop3/screenshots/mgr-system-settings.png) -->

| Setting | What to set |
| --- | --- |
| `ms3_cart_page_id` | Cart ID |
| `ms3_order_page_id` | Checkout ID |
| `ms3_order_redirect_thanks_id` | “Thanks” page ID |
| `ms3_order_success_page_id` | Redirect after successful payment |
| `ms3_customer_profile_page_id` | Profile |
| `ms3_customer_orders_page_id` | Order history |
| `ms3_customer_addresses_page_id` | Addresses |
| `ms3_customer_login_page_id` | Usually the same as profile |
| `ms3_customer_register_page_id` | Usually the same as profile |

Full list: [System settings](settings).

`ms3_cart_page_id` and `ms3_order_page_id` drive “Go to cart” and “Checkout” links in storefront JS. Submit still redirects via `ms3_order_redirect_thanks_id` without them.

## Scheduler (optional)

For background CSV import, queued notifications, and draft cleanup:

1. Install [Scheduler](/en/components/scheduler/) and configure cron.
2. Enable `ms3_use_scheduler`.
3. Optionally set `ms3_delete_drafts_after` (e.g. `-2 weeks`).

Details: [Scheduler integration](development/scheduler).

## Web API (headless)

Entry point: `/assets/components/minishop3/api.php?route=/api/v1/...`.

| Scenario | Endpoint |
| --- | --- |
| Guest token | `GET /api/v1/customer/token/get` |
| Catalog without token | `GET /api/v1/product/list`, `GET /api/v1/product/get/{id}` |
| Cart | `/api/v1/cart/*` |
| Checkout | `/api/v1/order/*` |
| Account | `/api/v1/customer/*` (login, addresses, orders) |
| Health | `GET /api/v1/health` |

The `/api/v1` group has CORS and rate limit. Full map: [REST API](development/api).

## Category and product

1. **Resources** → new resource, type **Product category**, catalog template, save.
2. In the category: **Add product**, product template, save.
3. **Product properties** tab: SKU, price, weight, image.
4. Mark **Published**.

<!-- ![Category](/components/minishop3/screenshots/mgr-category-products.png) -->

## Delivery and payment

In **Extras → MiniShop3 → Settings** confirm at least one active delivery and one payment method. After install the resolver creates “Self pickup” (id 1) and “Cash” (id 1) with `first_name`, `last_name`, `email` rules for pickup.

Without a delivery↔payment link, storefront checkout fails with a pair error.

## First test order

1. Open the category on the storefront, add a product to the cart.
2. Go to the cart, then checkout.
3. Fill required fields for the selected delivery.
4. Choose a payment compatible with that delivery.
5. Submit the order. The “Thanks” page with `msGetOrder` should open.
6. In the Manager under **Orders** the order appears with status “New” (not a draft). Drafts are visible only when `ms3_order_show_drafts=1`.

A guest order can create an `msCustomer` if `ms3_customer_auto_register_on_order` and `ms3_customer_auto_login_on_order` are on.

Online payment comes from a separate payment extra (YooKassa, Sberbank, and so on). A base MS3 method with an empty `class` only records the payment choice. See [Payment methods](interface/settings/payments).

## Next steps

- [Login and registration](frontend/customer-auth)
- [Checkout](frontend/order)
- [Orders in the Manager](interface/orders)
- [Snippets](snippets/)
- [REST API](development/api)
