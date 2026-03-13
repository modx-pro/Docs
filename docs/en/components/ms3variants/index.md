---
title: ms3Variants
description: Product variants component for MiniShop3
logo: https://modstore.pro/assets/extras/ms3variants/logo.png
author: biz87

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

Component for managing product variants in MiniShop3. Lets you create products with different option combinations (color, size, etc.), each with its own price, stock and image.

## Features

### Variant management

- **Unlimited variants** per product
- **Any option combinations** — color + size, volume + weight, material + color, etc.
- **Per-variant attributes**:
  - Price and old price (for discounts)
  - Stock
  - SKU
  - Weight
  - Image from product gallery

### MiniShop3 integration

- **Price in cart** — variant price is used when adding to cart
- **Stock control** — cannot add more than in stock
- **Stock deduction** — automatic when order reaches the configured status
- **Option sync** — variant option values are added to msProductData for filtering

### Frontend

- **SSR rendering** of variants in catalog via msProducts
- **Image switching** on variant selection (catalog and product page)
- **Gallery integration** — events for Splide, GLightbox and others
- **JavaScript API** for customization

### Manager

- **Vue interface** on the product tab
- **Variant selection** when editing products in an order
- **Quick creation** of variants with auto-generated SKU

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MiniShop3 | 1.0.0+ |
| VueTools | 1.0.0+ |
| pdoTools | 3.0.0+ |

## Installation

1. Go to **Extras → Installer**
2. Find **ms3Variants** in the package list
3. Click **Download** then **Install**

After installation:

1. Open any MiniShop3 product
2. Go to the **Variants** tab
3. Create variants with the desired options

## Quick start

### 1. Creating variants

1. Open a product in the MiniShop3 manager
2. Go to the **Variants** tab
3. Click **Create variant**
4. Fill in options (color, size, etc.)
5. Set price and stock
6. Pick an image from the product gallery
7. Save

### 2. Output on product page

```fenom
{'msProductVariants' | snippet}
```

### 3. Output in catalog

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small',
    'tpl' => 'ms3_products_row_variants'
]}
```

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
| weight | decimal(10,3) | Weight |
| file_id | int | Image ID |
| active | tinyint | Active flag |
| position | int | Sort order |

### Table ms3_variant_options

| Field | Type | Description |
|-------|------|-------------|
| id | int | Record ID |
| variant_id | int | Variant ID |
| key | varchar(50) | Option key (color, size...) |
| value | varchar(255) | Option value |
