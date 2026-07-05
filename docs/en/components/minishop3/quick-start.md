---
title: Quick start
---
# Quick start

This guide helps you set up MiniShop3 quickly and create your first products.

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |
| Composer | 2.x |

### Dependencies

- **pdoTools 3.x** — for snippets and the Fenom template engine
- **[VueTools](/en/components/vuetools/)** — Vue 3 and PrimeVue for the Manager interface
- **[Scheduler](/en/components/scheduler/)** *(optional)* — for background tasks (import, notifications, cleanup)

## Installation

### Via MODX package manager

1. [Connect our repository](https://modstore.pro/info/connection)
2. Go to **Packages → Installer**
3. Select the Modstore.pro provider, click **Download Extras**
4. Find **pdoTools**, **VueTools**, **Scheduler**, and **MiniShop3** in the catalog, one by one
5. For each package, click **Download** and **Install**

More installation methods are on the [main documentation page](index).

## What happens during installation

MiniShop3 automatically:

1. ✅ Creates database tables via Phinx migrations
2. ✅ Registers snippets, plugins, and chunks
3. ✅ Installs system settings with the `ms3_` prefix
4. ✅ Creates default order statuses
5. ✅ Creates delivery and payment methods

## Initial setup

### 1. Store service pages

Create the following pages:

1. **Cart** — place the `msCart` snippet
2. **Checkout** — place the `msOrder` snippet
3. **Order placed** — place the `msGetOrder` snippet
4. **Customer account** — place the `msCustomer` snippet with the `profile` service
5. **Customer orders** — place the `msCustomer` snippet with the `orders` service
6. **Customer addresses** — place the `msCustomer` snippet with the `addresses` service

Template examples for each page are in `/core/components/minishop3/elements/templates/`.
For a quick start, copy the template markup as-is and adjust it to your design.

### 2. System settings

Go to **System Settings** and find settings in the `minishop3` namespace (you can search for `page_id`):

[![](https://file.modx.pro/files/e/b/4/eb4bfa6a1a38faf46638bad136138b72s.jpg)](https://file.modx.pro/files/e/b/4/eb4bfa6a1a38faf46638bad136138b72.png)

| Setting | Description |
|---------|-------------|
| `ms3_cart_page_id` | ID of the cart page |
| `ms3_order_page_id` | ID of the checkout page |
| `ms3_order_success_page_id` | ID of the page the customer is redirected to after successful payment |
| `ms3_order_redirect_thanks_id` | ID of the "Thank you for your order" page |
| `ms3_customer_login_page_id` | ID of the customer login page (usually the same as the profile page) |
| `ms3_customer_register_page_id` | ID of the customer registration page (usually the same as the profile page) |
| `ms3_customer_profile_page_id` | ID of the customer profile page |
| `ms3_customer_orders_page_id` | ID of the customer order history page |

The full settings list is on the [System settings](settings) page.

### 3. Creating categories

1. Go to **Resources**
2. Create a new resource with **Resource Type** = `Product category`
3. Fill in the title, choose a template, and save

[![](https://file.modx.pro/files/e/b/7/eb75082fda3e16c578f90bf622dc1f56s.jpg)](https://file.modx.pro/files/e/b/7/eb75082fda3e16c578f90bf622dc1f56.png)

### 4. Creating products

1. In the category, click **Add product**
2. Enter the title, choose a template, and save
3. After saving, fill in the **Product properties** tab:
   - SKU
   - Price
   - Weight (optional)
   - Image
4. Save the product and check **Published**

## Templates

For a quick start, the package includes ready-made templates you can copy entirely and then edit to match your design.
Available templates:

- `core/components/minishop3/elements/templates/catalog.tpl` — Catalog
- `core/components/minishop3/elements/templates/product.tpl` — Product page
- `core/components/minishop3/elements/templates/cart.tpl` — Cart
- `core/components/minishop3/elements/templates/order.tpl` — Checkout
- `core/components/minishop3/elements/templates/thanks.tpl` — Thank you page
- `core/components/minishop3/elements/templates/customer.tpl` — Customer account

## Checkout

For checkout to work, make sure **Settings** has at least one payment method and one delivery method.

[![](https://file.modx.pro/files/e/c/8/ec8465a41233991c2ec0cd62d3ac6d25s.jpg)](https://file.modx.pro/files/e/c/8/ec8465a41233991c2ec0cd62d3ac6d25.png)

Finally, check that the delivery method you use lists the required fields for your case. Usually phone, first name, last name, and sometimes email.

[![](https://file.modx.pro/files/3/d/e/3de8bb7a8a195fe8e406319b80ef44d4s.jpg)](https://file.modx.pro/files/3/d/e/3de8bb7a8a195fe8e406319b80ef44d4.png)

## Next steps

- [Snippets](snippets/) — full snippet reference
- [Manager interface](interface/) — Manager UI overview
- [Frontend interface](frontend/) — site UI, templates, and chunks
- [Frontend JavaScript](development/frontend-js) — using JS on your site
- [REST API](development/api) — API integration
- [Events](development/events) — extending via plugins
