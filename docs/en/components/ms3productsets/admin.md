---
title: Manager guide
---
# Manager guide

The **Product sets** page manages **set templates** and **bulk apply** to categories. A template is a fixed product list plus a **type**. Per-product overrides use TVs. See [TVs on the product card](#tvs-on-the-product-card).

UI zones and template types: [Product sets (interface)](interface/templates).

## Manager section

- Menu: **Components → Product sets**
- Controller: `namespace=ms3productsets`, `action=index`
- **VueTools** is required. Without it the page will not load.

![Page overview](/components/ms3productsets/screenshots/page-overview.png)

## Page layout

1. **Template list:** table of existing templates (ID, name, type, related products).
2. **Create/edit form:** template fields (`name`, `type`, `related_product_ids`, `description`, `sortorder`).
3. **Apply to category:** pick template, category tree, replace option, apply action.
4. Optionally **unbind** a template from a category.

![Template list](/components/ms3productsets/screenshots/template-list.png)

## Creating a template

A template is a **preset**: a fixed **type** and **product list**. **Apply** copies it into `ms3_product_sets` for each product in the chosen category.

1. Open **Components → Product sets**.
2. Create a new template.
3. Fill in the form:

| Field | What to enter |
|-------|----------------|
| **`name`** | Clear name for managers. Stored as `template_name` on generated links. |
| **`type`** | Admin types: `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `vip`. Frontend logic for `ms3ProductSets` depends on matching **`type`**. `auto` and `auto_sales` are snippet-only, not template types. |
| **`related_product_ids`** | Comma-separated product IDs (e.g. `12,34,56`) or picker selection if available. Order matters for output unless the snippet uses different sorting. |
| **`description`** | Internal note for the team. Not shown on the site. |
| **`sortorder`** | Number for ordering templates in the admin list (lower first). Exact sort depends on the UI. |

1. Save. The connector calls `save_template`. Empty **`name`** or invalid **`related_product_ids`** returns an error.
2. Confirm the new row appears in the list.

![New template form](/components/ms3productsets/screenshots/template-dialog-new.png)

![Product picker](/components/ms3productsets/screenshots/product-picker.png)

## Editing a template

1. Select the row in the list (click or **Edit**, depending on UI).
2. Change **`name`**, **`type`**, **`related_product_ids`**, **`description`**, **`sortorder`**.
3. Save.

![Edit template](/components/ms3productsets/screenshots/template-dialog-edit.png)

This updates the row in `ms3_product_set_templates`. A change of `name` or `type` is copied into already applied rows (`template_name`, `type`). The `related_product_id` list on those rows is not rewritten. To refresh IDs, run **Apply** again. Use **Replace** if you need to overwrite this template’s links.

## Deleting a template

![Delete confirmation](/components/ms3productsets/screenshots/delete-confirm.png)

Deleting a template also deletes its rows in `ms3_product_sets` (`template_name` + `type`). To drop links for a category without deleting the template, use **Unbind**.

## Apply template to a category

1. Select the **template** in the apply panel.
2. Pick **category** (or several) in the resource tree. Child categories with `msProduct` resources are included.
3. Optionally enable **“Replace existing sets of this template”** (`replace=true`). For products in that branch, only links of this **`type` + `template_name`** are removed, then new ones are inserted. Other templates and TV rows stay. Without replace, new links are added alongside existing ones.
4. Click **Apply**.

![Apply to category](/components/ms3productsets/screenshots/apply-category.png)

**Result:** rows in `ms3_product_sets` with **`template_name`** set to the template name.

## Unbind template

- Removes **only** links created by that template (`type` + `template_name`).
- Manual TV links and links from **other** templates stay.

## TVs on the product card

Supported TVs:

- `ms3productsets_buy_together`
- `ms3productsets_similar`
- `ms3productsets_popcorn`
- `ms3productsets_cart_suggestion`
- `ms3productsets_vip`

On product save, TVs sync into `ms3_product_sets`.

## Typical workflow

1. **Bulk** rules: create template → **Apply** to category.
2. **One-off** overrides: edit TVs on the product resource.
3. Verify the storefront with **`ms3ProductSets`** using the same **`type`** as the template/TV.

## See also

- [Product sets (interface)](interface/templates): UI areas and template types
- [Flows](flows): `save_template`, `apply_template`, `unbind_template`
- [API and interfaces](api): connector actions
