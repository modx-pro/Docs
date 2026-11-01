---
title: Variants in order
---
# Variants in order

## How to select an item variant

The variant is selected in the order item edit window, not when the product is added:

1. Add the product to the order — it is added at the price from the product card.
2. Click the pencil in the item row.
3. In the "Вариант" block, select a variant and click "Применить". The variant price and weight go into the window fields, `_variant_id` and the variant options go into the item options. Other item options are kept; matching keys get the variant values.
4. Click "Сохранить" (Save) in the MiniShop3 window.

Nothing is saved until "Сохранить" is clicked. The item gets what is in the window fields: if you change the price manually after "Применить", that price is saved.

The list shows option values, the SKU in square brackets and the variant price. The "Вариант" block does not appear if the product has no variants or the script cannot find the item's product: it takes it from the product link in the item row — if the product is deleted and there is no link, the block does not appear.

::: warning The list shows all variants
The list includes inactive and out-of-stock variants, unmarked. Variant stock is not checked in the manager, neither on selection nor on quantity change.
:::

::: warning Works only in the Russian-language manager
The script finds the window fields by their Russian labels ("Цена", "Вес", "Опции"). In a manager in another language, the variant price and weight are not filled in, and the buttons show `ms3variants_apply` and `ms3variants_reset`. The block labels on this page are given in Russian for this reason.
:::

## Changing and resetting the variant

To change the variant, open the item, select another variant, click "Применить" and "Сохранить". Options of the previous variant that the new one does not have stay in the item — remove them in the "Опции" (Options) field manually.

"Сбросить" removes `_variant_id` and the variant options from the item. The button does not restore the product price and weight: the item keeps the variant price and weight. Enter the product price manually, then click "Сохранить".

## How a manager item differs from a site item

| | From the site | From the manager |
|---|---|---|
| Price | variant price, set by the server — even if it is 0 | whatever is in the "Цена" (Price) field |
| Weight | variant weight, if above 0 | variant weight, even if 0 |
| Old price and discount | written | not written |

## Item options

The `options` field of an item with a variant:

```json
{
    "_variant_id": 5,
    "color": "red",
    "size": "XL"
}
```

The options are shown in the "Options" column of the order table, in emails and in the customer order history — together with the service key `_variant_id`. In your own code, cast `_variant_id` to a number before comparing.

## Stock deduction

Variant stock is deducted when the order moves to the status from the [`ms3variants_deduct_stock_status`](../settings#ms3variants_deduct_stock_status) setting. This applies to every item with `_variant_id` in its options, whether added on the site or in the manager. By default the status is 2 — "New", that is, stock is deducted when the order is placed.

Stock does not go below zero, and the status change is not blocked when stock is short. With [`ms3variants_check_stock`](../settings#ms3variants_check_stock) = No, stock is not deducted at all.

Stock does not change:

- when the order is cancelled — return it manually on the product's "Variants" tab;
- when an item is edited after deduction — changing the variant, the quantity or removing the item.
