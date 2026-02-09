---
title: Quick start
---
# Quick start

This guide helps you set up MiniShop3 and create your first products.

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |
| Composer | 2.x |

### Dependencies

- **pdoTools 3.x** — for snippets and Fenom templating
- **[VueTools](/en/components/vuetools/)** — Vue 3 and PrimeVue for the admin interface
- **[Scheduler](/en/components/scheduler/)** *(optional)* — for background tasks (import, notifications, cleanup)

## Installation

### Via MODX Package Manager

1. [Connect our repository](https://modstore.pro/info/connection)
2. Go to **Packages → Installer**
3. Select provider Modstore.pro, click **Load packages**
4. Find **pdoTools**, **VueTools**, **Scheduler**, **MiniShop3** in the catalog
5. For each, click **Download** and **Install**

See [documentation home](index) for other installation options.

## What happens on install

MiniShop3 automatically:

1. ✅ Creates database tables via Phinx migrations
2. ✅ Registers snippets, plugins, and chunks
3. ✅ Sets system settings with prefix `ms3_`
4. ✅ Creates default order statuses
5. ✅ Creates delivery and payment methods

## Initial setup

### 1. Store pages

Create the following pages:

1. **Cart** — place snippet `msCart`
2. **Checkout** — place snippet `msOrder`
3. **Order confirmation** — place snippet `msGetOrder`
4. **Customer account** — place snippet `msCustomer` with service `profile`
5. **Customer orders** — place snippet `msCustomer` with service `orders`
6. **Customer addresses** — place snippet `msCustomer` with service `addresses`

Template examples for these pages are in `/core/components/minishop3/elements/templates/`. For a quick start you can copy the template markup and then adapt it.

### 2. System settings

Go to **System Settings** and find settings in namespace `minishop3` (you can search for `page_id`):

| Setting | Description |
|---------|-------------|
| `ms3_cart_page_id` | Cart page ID |
| `ms3_order_page_id` | Checkout page ID |
| `ms3_order_success_page_id` | Page to redirect after successful payment |
| `ms3_order_redirect_thanks_id` | "Thank you" page ID |
| `ms3_customer_login_page_id` | Customer login page ID (often same as profile) |
| `ms3_customer_register_page_id` | Customer registration page ID (often same as profile) |
| `ms3_customer_profile_page_id` | Customer profile page ID |
| `ms3_customer_orders_page_id` | Customer order history page ID |

Full list: [System settings](settings).

### 3. Creating categories

1. Go to **Resources**
2. Create a new resource with **Resource type** = `Product category`
3. Enter name, choose template, save

### 4. Creating products

1. In a category click **Add product**
2. Enter name, choose template, save
3. After saving fill the **Product data** tab:
   - SKU
   - Price
   - Weight (optional)
   - Image
4. Save and check **Published**

## Templates

For a quick start, the package includes ready-made templates you can copy and then edit:

- `core/components/minishop3/elements/templates/catalog.tpl` — Catalog
- `core/components/minishop3/elements/templates/product.tpl` — Product page
- `core/components/minishop3/elements/templates/cart.tpl` — Cart
- `core/components/minishop3/elements/templates/order.tpl` — Checkout
- `core/components/minishop3/elements/templates/thanks.tpl` — Thank you
- `core/components/minishop3/elements/templates/customer.tpl` — Customer account

## Checkout

For checkout to work, ensure at least one payment method and one delivery method exist in **Settings**.

Also configure required fields for the delivery method (e.g. phone, first name, last name, sometimes email).

## Next steps

- [Snippets](snippets/) — snippet reference
- [Admin interface](interface/) — administrative interface
- [Frontend interface](frontend/) — site templates and chunks
- [JavaScript](development/frontend-js) — using JS on your site
- [REST API](development/api) — API integration
- [Events](development/events) — extending via plugins
