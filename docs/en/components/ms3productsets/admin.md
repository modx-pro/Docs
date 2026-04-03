---
title: Manager guide
---
# Manager guide

The **Product sets** page is for **set templates** (a fixed list of recommended products + a **type**) and **bulk application** of those templates to categories. Per-product overrides use TVs — see [TVs on the product card](#tvs-on-the-product-card).

For UI zones and template types, see [Product sets (interface)](interface/templates).

## Manager section

- Menu: **Components → Product sets**
- Controller: `namespace=ms3productsets`, `action=index`
- **VueTools** is required (without it the page will not load).

> **Screenshot placeholder** — file `images/admin-menu.png`: manager menu **Components → Product sets**.  
> Filenames and subjects: [images/README.md](images/README.md).

## Page layout

Typically you will see:

1. **Template list** — table of existing templates (ID, name, type, related products).
2. **Create/edit form** — template fields (`name`, `type`, `related_product_ids`, `description`, `sortorder`).
3. **Apply to category** — pick template, category tree, replace option, apply action.
4. Optionally **unbind** template from a category.

> **Screenshot placeholder** — `images/admin-page-overview.png`: full page (list + form / tree panel).

> **Screenshot placeholder** — `images/admin-template-list.png`: template table only.

## Creating a template

A template is a **preset**: a fixed **type** and **product list** that is copied into `ms3_product_sets` for each product in the chosen category when you **Apply** (see below).

### Steps

1. Open **Components → Product sets**.
2. Use the UI action to **create** a new template (button label may vary by version).
3. Fill in the form:

| Field | What to enter |
|-------|----------------|
| **`name`** | Clear name for managers (stored as `template_name` on generated links). |
| **`type`** | One of the admin types: `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `vip`. Frontend logic for `ms3ProductSets` depends on matching **`type`**. Types like `auto`, `auto_sales` are snippet-only, not template types. |
| **`related_product_ids`** | Comma-separated product IDs (e.g. `12,34,56`) or picker selection if available. Order matters for output unless the snippet uses different sorting. |
| **`description`** | Internal note for the team; not shown on the site. |
| **`sortorder`** | Number for ordering templates in the admin list (lower first; exact sort depends on the UI). |

4. Save. The connector calls `save_template`; empty **`name`** or invalid **`related_product_ids`** will be rejected with an error.

5. Confirm the new row appears in the list.

> **Screenshot placeholder** — `images/admin-template-form-create.png`: create form with labelled fields (annotations on the image are fine).

> **Screenshot placeholder** — `images/admin-product-picker.png`: product selection if a separate modal/picker exists.

## Editing a template

1. In the list, select the row (click or **Edit**, depending on UI).
2. Change **`name`**, **`type`**, **`related_product_ids`**, **`description`**, **`sortorder`**.
3. Save.

**Important:** this updates the row in `ms3_product_set_templates`. Links already **applied** to categories in `ms3_product_sets` are **not** rebuilt automatically — to refresh products for a whole category, run **Apply to category** again (use **Replace** for that type if needed).

> **Screenshot placeholder** — `images/admin-template-form-edit.png`: edit form with sample data.

## Deleting a template

The UI can remove a template from the list. That deletes the template record; **existing** product links with that `template_name` in `ms3_product_sets` **do not** disappear by themselves. To bulk-remove such links for a category, use **Unbind** (below).

> **Screenshot placeholder** — optional `images/admin-template-delete-confirm.png` if a confirmation dialog exists.

## Apply template to a category

1. Select the **template** in the apply panel.
2. Pick **category** (or several) in the resource tree — child categories with `msProduct` resources are usually included.
3. Optionally enable **“Replace existing sets of this type”** — `replace=true`: for products in that branch, existing links of that **`type`** are removed first, then new ones are created from the template. Without replace, new links are **added** alongside existing ones (watch for unwanted duplicates).
4. Click **Apply**.

**Result:** rows in `ms3_product_sets` with **`template_name`** set to the template name.

> **Screenshot placeholder** — `images/admin-apply-category.png`: template selected, category tree, replace checkbox, **Apply**.

## Unbind template

- Removes **only** links created by that template (matching **`type`** + **`template_name`**).
- Manual TV links and links from **other** templates stay.

> **Screenshot placeholder** — `images/admin-unbind.png`: unbind UI with category + template.

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

- [Product sets (interface)](interface/templates) — UI areas and template types
- [Flows](flows) — `save_template`, `apply_template`, `unbind_template`
- [API and interfaces](api) — connector actions
