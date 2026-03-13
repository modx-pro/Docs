---
title: Admin guide
---
# Admin guide

## Manager section

- Menu: **Components → Product sets**
- Controller: `namespace=ms3productsets`, `action=index`
- **VueTools** must be installed.

## What you can do

1. Create a set template:
   - name;
   - type (`buy_together`, `similar`, `popcorn`, `cart_suggestion`, `vip`);
   - product list (picker or ID string);
   - description (for admin reference);
   - sort order (`sortorder`).
2. Edit/delete templates.
3. Apply template to a category (including nested subcategories).
4. Unbind template from category.

## Applying template to category

1. Select template.
2. Select category in the tree.
3. Optionally enable **Replace existing sets of this type** (`replace=true`).
4. Click **Apply**.

Result: records are created in `ms3_product_sets` with `template_name` set.

## Unbinding template

- Only links created by that template (`type + template_name`) are removed.
- Manual TV links and other templates stay.

## TV mode on product card

Supported TVs:

- `ms3productsets_buy_together`
- `ms3productsets_similar`
- `ms3productsets_popcorn`
- `ms3productsets_cart_suggestion`
- `ms3productsets_vip`

On product save, TVs are synced to `ms3_product_sets`.

Admin UI only offers template types: `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `vip`. Types `auto`, `auto_sales`, `also-bought`, `cross-sell`, `custom` are for snippet use only (auto recommendations without template).

## Typical workflow

1. Use templates + apply to categories for bulk logic.
2. Edit TV fields on individual products for exceptions.
3. Check frontend with the matching `ms3ProductSets` call.

## Full step-by-step guide

Detailed guide, staging checklist and FAQ are in **ADMIN-SETS.md** in the package: `core/components/ms3productsets/docs/ADMIN-SETS.md` (sections 11–12: checklist, FAQ).
