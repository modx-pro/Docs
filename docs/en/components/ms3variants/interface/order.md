---
title: Variants in order
---
# Variants in order

When editing a MiniShop3 order you can select and change product variants.

## Displaying variants

<!-- Screenshot: order products table with variants -->

In the order products table, variants are shown:
- In the **Options** column — variant option combination
- Product price — selected variant price
- SKU — variant SKU (if set)

## Selecting a variant when adding a product

When adding a product with variants to an order:

1. Select the product in the search window
2. If the product has variants, a selector appears
3. Choose the variant from the list
4. Click **Apply**

<!-- Screenshot: variant selection when adding product -->

### Variant information

The selector shows:
- Option combination (color, size, etc.)
- Variant price
- Available stock

## Changing the variant

To change the variant of an already added product:

1. Find the product in the order table
2. Click the **Variant** button in the product row
3. Select the new variant
4. Click **Apply**

<!-- Screenshot: changing product variant in order -->

::: warning Cost recalculation
When the variant is changed, the following are recalculated:
- Line price
- Line total (price × quantity)
- Order total
:::

## Resetting the variant

To revert to the base product (no variant):

1. Click the **Variant** button in the product row
2. Select **Base product**
3. Click **Apply**

The product will use the price from the product card.

## Options in the order

The selected variant's options are stored in the order line's `options` field:

```json
{
    "_variant_id": 5,
    "color": "red",
    "size": "XL"
}
```

This allows:
- Showing options in email notifications
- Showing options in customer order history
- Using them in print forms

## Stock control

Variant stock is respected when working with orders:

### When adding
- Cannot add more than in stock
- Available quantity is shown

### When changing quantity
- Available stock is checked
- Warning is shown if exceeded

### Stock deduction

Stock is deducted when the order reaches the status set in `ms3variants_deduct_stock_status`.

**Example:**
1. Order created with a variant (stock: 10)
2. Order moved to "Paid" status (ID: 2)
3. If `ms3variants_deduct_stock_status = 2`, stock is decreased
4. New stock: 10 − quantity in order

::: tip Order cancellation
When an order is cancelled, stock is not restored automatically. To return stock, edit the variant manually or use a dedicated plugin.
:::
