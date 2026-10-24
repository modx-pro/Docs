---
title: Product sets
---
# Product sets

The admin page manages templates and applies sets to categories in bulk.

## Interface contents

- **Set list**: ID, name, type, related product list
- **Create/edit form**
  - `name`
  - `type`
  - `related_product_ids`
  - `description`
  - `sortorder`
- **Apply to category**: choose template and one or more categories
- **Replace option**: replace existing links of this template (`type` + `template_name`) before insert
- **Unbind template**: remove links created by this template in the selected category

## Template types

Only these types are available in admin for templates:

- `buy_together`
- `similar`
- `popcorn`
- `cart_suggestion`
- `vip`

Types `auto`, `auto_sales`, `also-bought`, `cross-sell`, `custom` are not selectable in admin. They are for snippet use only (auto recommendations without a template).

## Bulk apply

When applying a template:

1. The component collects products from the selected category and nested subcategories
2. For each product it creates links in `ms3_product_sets`
3. `template_name` is set to the template name

If `replace=true`, only links of this `type` and `template_name` for category products are removed before insert.

## Limits and behavior

- **VueTools** is required to open the page
- Interface requests go to `assets/components/ms3productsets/connector.php`
- Manager actions require an authenticated `mgr` user with core `view`. Writes also need `save`.
