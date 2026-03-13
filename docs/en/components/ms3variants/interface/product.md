---
title: Variants tab on product
---
# Variants tab on product

When editing a MiniShop3 product, an extra **Variants** tab appears for managing product variants.

## Overview

<!-- Screenshot: variants tab with table -->

The tab includes:
- **Statistics** — total variants, active variants, total stock
- **Variants table** — list of all variants with main info
- **Create button** — to add a new variant

## Variants table

The table lists all variants of the product:

| Column | Description |
|--------|-------------|
| Image | Variant image thumbnail |
| Options | Option combination (color, size, etc.) |
| SKU | Variant SKU |
| Price | Current price |
| Stock | Quantity in stock |
| Active | On/off |
| Actions | Edit and delete buttons |

## Creating a variant

<!-- Screenshot: create variant dialog -->

1. Click **Create variant**
2. In the dialog, fill in the fields:

### Variant fields

| Field | Required | Description |
|-------|----------|-------------|
| Options | Yes | At least one option (key + value) |
| SKU | No | Auto-generated from pattern |
| Price | Yes | Variant price |
| Old price | No | For showing discount |
| Stock | No | Quantity in stock (default 0) |
| Weight | No | Variant weight |
| Image | No | Pick from product gallery |
| Active | — | On by default |

### Adding options

1. Click **Add option**
2. Choose option key from the list or enter a new one
3. Enter the option value
4. Repeat for all needed options

**Common option keys:**
- `color` — Color
- `size` — Size
- `material` — Material
- `volume` — Volume
- `weight` — Weight (as option; distinct from weight field)

::: tip Filter sync
When a variant is saved, values for options `color`, `size`, and `tags` are added to the product's msProductData field. This lets you use standard MiniShop3 filters to find products by variant options.
:::

### Choosing an image

<!-- Screenshot: image pick from gallery -->

1. Click the image pick area
2. The product gallery opens
3. Select the image
4. The image is assigned to the variant

::: warning Images from gallery
Only images already in the product gallery can be used for a variant. Add all needed images on the **Gallery** tab first.
:::

## Editing a variant

1. Click the variant row or the edit button
2. Change the fields
3. Click **Save**

## Deleting a variant

1. Click the delete (trash) button on the variant row
2. Confirm deletion

::: danger Warning
Deleting a variant cannot be undone. If the variant was in orders, that order data is kept but the link to the variant is lost.
:::

## Bulk operations

### Quick price change

To change price for several variants:
1. Open each variant
2. Change the price
3. Save

### Deactivating variants

If a variant is temporarily unavailable:
1. Open the variant
2. Uncheck **Active**
3. Save

Inactive variants are not shown on the site and cannot be added to the cart.
