---
title: System settings
---
# System settings

The settings are in **System settings**, namespace `ms3variants`.

| Key | Default | What it does |
|-----|---------|--------------|
| `ms3variants_check_stock` | Yes | Forbids selling beyond stock and enables stock deduction |
| `ms3variants_show_out_of_stock` | Yes | Shows out-of-stock variants |
| `ms3variants_deduct_stock_status` | `2` | Order status in which stock is deducted |
| `ms3variants_enabled` | Yes | Has no effect in the current version |
| `ms3variants_default_active` | Yes | Has no effect in the current version |
| `ms3variants_sku_pattern` | `{product_article}-{option_values}` | Has no effect in the current version |

## Stock

### ms3variants_check_stock

Variant stock control. Default — Yes.

| | Yes | No |
|---|---|---|
| Adding to cart and changing quantity beyond stock | forbidden: MiniShop3 returns the error "Variant is out of stock", also when stock is above zero but less than requested | allowed |
| Stock deduction by order status | works (see [`ms3variants_deduct_stock_status`](#ms3variants_deduct_stock_status)) | **does not work** |
| Variant with stock 0 | out of stock | in stock: the standard chunks show "В наличии: 0" (chunk text, not translated) |
| Hiding out-of-stock variants ([`ms3variants_show_out_of_stock`](#ms3variants_show_out_of_stock)) | hides variants with stock 0 | hides only inactive variants |

::: warning "No" also turns off deduction
With No, variant stock is not reduced in any order status, even if `ms3variants_deduct_stock_status` is set. You cannot deduct stock and allow selling beyond it at the same time.
:::

### ms3variants_show_out_of_stock

Whether to show variants that are out of stock. Default — Yes.

- **Yes** — all active variants are shown. Inactive ones are not output on the site with any value, except a snippet call with `activeOnly` = 0. The standard chunks mark out-of-stock ones as "Нет в наличии" (chunk text, not translated). In the catalog their add button is disabled, but only with stock control on: with `ms3variants_check_stock` = No, a variant with stock 0 counts as "in stock". On the product page it is not: the customer can select the variant, and the server refuses to add it to the cart.
- **No** — out-of-stock and inactive variants are hidden on the product page and in the catalog.

The setting does not affect `available_options` and `options_json` of the `msProductVariants` snippet or the manager: values of hidden variants stay in the options list.

### ms3variants_deduct_stock_status

ID of the order status; on the transition into it, variant stock is reduced by the quantity from the order. Default — `2`. The value `0` turns deduction off.

MiniShop3 statuses after installation:

| ID | Status |
|----|--------|
| 1 | Draft |
| 2 | New |
| 3 | Paid |
| 4 | Sent |
| 5 | Cancelled |

::: warning By default stock is deducted when the order is placed, before payment
The value `2` is the "New" status, not "Paid". Placing an order moves it from "Draft" to "New", and stock is deducted at that moment. To deduct after payment, set `3`. The status IDs on your site are in the "Order statuses" table on the **MiniShop3 → Settings** page.
:::

How deduction works:

- only on the transition into exactly this status. If the order goes, for example, from "New" straight to "Sent" while the setting is "Paid", stock is not deducted;
- when an order is cancelled, stock is not returned — return it manually on the product's "Variants" tab;
- if the order enters this status again, stock is deducted again;
- stock does not go below zero;
- only variant stock changes. The MiniShop3 product stock and order items without a variant are not affected. MiniShop3 inventory (`ms3_inventory_enabled`) tracks product stock separately;
- with [`ms3variants_check_stock`](#ms3variants_check_stock) = No, deduction does not work.

## Not in effect in the current version

The settings are listed, but the component does not read them: their value has no effect.

### ms3variants_enabled

The component works with any value.

### ms3variants_default_active

A new variant is always created active. To turn a variant off, clear the "Active" checkbox in the variant window.

### ms3variants_sku_pattern

The variant SKU is not created automatically: if the "SKU" field is left empty, the variant is saved without an SKU.
