---
title: ms3Variants
description: Product variants component for MiniShop3
categories: catalog
logo: https://modstore.pro/assets/extras/ms3variants/logo.png
author: biz87

compatibility:
  - modx3
  - php82
  - minishop3
  - vue3
items: [
  { text: 'System settings', link: 'settings' },
  { text: 'Snippets', link: 'snippets' },
  {
    text: 'Manager interface',
    items: [
      { text: 'Variants tab on product', link: 'interface/product' },
      { text: 'Variants in order', link: 'interface/order' },
    ],
  },
  {
    text: 'Frontend',
    items: [
      { text: 'Product page', link: 'frontend/product' },
      { text: 'Product catalog', link: 'frontend/catalog' },
    ],
  },
]
---
# ms3Variants

Product variants for MiniShop3: one product has several variants with different options (color, size, etc.), each with its own price and old price, stock, SKU, weight and an image from the product gallery.

## Features

**Variants:**

- the number of variants is unlimited;
- variant options are any keys of standard MiniShop3 options.

**Cart and order:**

- the cart gets the variant price;
- with stock control on, you cannot add more than is in stock — [settings](settings#ms3variants_check_stock);
- stock is deducted in the configured order status — [settings](settings#ms3variants_deduct_stock_status);
- variant option values are added to the product's standard MiniShop3 options, and `color`, `size`, `tags` also to the product fields of the same name. This happens when a variant is saved; when a variant is changed or deleted, old values are not removed from the product.

**Frontend:**

- a variant list on the product page that changes the price, SKU and image — [Product page](frontend/product);
- variants in catalog cards via `msProducts` — [Product catalog](frontend/catalog);
- JavaScript events for your own galleries and handlers, ready adapters for Splide and GLightbox.

**Manager:**

- the "Variants" tab on the product card — [Variants tab on product](interface/product);
- variant selection in an order item (Russian-language manager only) — [Variants in order](interface/order).

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| MiniShop3 | 1.4.0+ |
| pdoTools | 3.0.0+ — the `msProductVariants` snippet does not work without it |
| VueTools | any version, needed for the "Variants" tab in the manager |

::: warning PHP 8.2
The package installer lets PHP 8.1 through, but the component libraries require PHP 8.2. Do not install ms3Variants on PHP 8.1.
:::

## Installation

1. Go to **Extras → Installer**.
2. Find **ms3Variants**, download and install it.

The package creates:

- the variant tables;
- the `msProductVariants` snippet;
- the `ms3_variants`, `ms3_variants_row`, `ms3_products_row_variants` chunks;
- the `ms3Variants` plugin — enabled right away, works with MiniShop3 cart, order, catalog and manager events;
- system settings.

A product page template example and a Splide gallery chunk are not created on installation: they are files in `core/components/ms3variants/elements/`.

## Quick start

### 1. Create variants

Open a saved product, go to the **Variants** tab, click **Create Variant**, add options, set the price and stock, save. Details — [Variants tab on product](interface/product).

### 2. Output variants on the product page

```fenom
{'!msProductVariants' | snippet}
```

The call must be uncached — see [Snippets](snippets) for why. The variant list shows each variant's price by itself. For the price and SKU in the page template to change when a variant is selected, add the `data-ms3v-*` attributes to them — [Product page](frontend/product).

### 3. Output variants in the catalog

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'ms3_products_row_variants'
]}
```

The catalog always adds the first variant to the cart until the MiniShop3 `ProductCardUI.js` module is replaced with the ms3Variants module (the replacement is visible in the `ms3_frontend_assets` system setting). How to replace it and what to do before removing the package — [Product catalog](frontend/catalog#product-card-ui).

## Data structure

### Table ms3_product_variants

| Field | Type | Description |
|-------|------|-------------|
| id | int | Variant ID |
| product_id | int | Product ID |
| sku | varchar(100) | Variant SKU |
| price | decimal(12,2) | Price |
| old_price | decimal(12,2) | Old price |
| count | int | Stock |
| weight | decimal(10,3) | Weight in MiniShop3 units |
| file_id | int | Image ID from the product gallery |
| active | tinyint | Active: 1 — yes, 0 — no |
| position | int | Sort position |
| created_at, updated_at | datetime | Creation and update dates |

### Table ms3_variant_options

| Field | Type | Description |
|-------|------|-------------|
| id | int | Record ID |
| variant_id | int | Variant ID. The `variant_id` + `option_key` pair is unique; options are deleted together with the variant |
| option_key | varchar(100) | Option key (`color`, `size`…) |
| option_value | varchar(255) | Option value |
