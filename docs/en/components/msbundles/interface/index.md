---
title: Manager overview
description: Bundle list, editor, price modes, and storefront preview
---

# Manager overview

Open **Extras → msBundles** from the menu or via `manager/?a=index&namespace=msbundles`. The UI runs on Vue 3 and PrimeVue through VueTools.

![Bundle list](/components/msbundles/screenshots/overview.png)

Step-by-step flows: [Flows](flows).

## List screen

Top to bottom:

1. Section title.
2. Toolbar: name search, activity filter, **context** filter, counter, **Add bundle**.
3. Table: DnD order, name with thumb, **context**, status, product count, actions.

![List filter](/components/msbundles/screenshots/list-filter.png)

| Action | How |
| --- | --- |
| Open editor | Click the name |
| Duplicate | Copy icon → inactive copy, editor opens |
| Delete | Trash icon → confirm |
| Reorder | Drag the left handle |

Filters: name search (debounced), activity (all / active / inactive), context (all contexts or one: `web`, `en`, …). Empty list and “nothing found” show an empty state with a create CTA.

## Create and edit

1. **Add bundle** or click a name.
2. Pick **Context** (required). The bundle is shown only on that context’s storefront. On an **active** bundle the field is locked: turn **Active** off and save first.
3. Fill **Name** (required), description, image via the MODX media browser.
4. **Active** toggle: with `activeOnly=1` only active bundles appear on the storefront.
5. Add products by search (name, SKU, or ID). Search is scoped to the **selected context**. One product once per bundle.
6. Per line: quantity, price mode, **Required** flag.
7. Reorder products with DnD in the composition table.
8. Save. Without products, **Save** stays disabled.

![Editor](/components/msbundles/screenshots/editor.png)

The bundle shows on pages for **every** product in the set **in the chosen context**. For another language or storefront, create a separate bundle (duplicate, then change context and composition).

### Price mode examples in the editor

Desk set — several modes on one bundle:

![Editor: Desk set](/components/msbundles/screenshots/editor-desk.png)

Kitchen — `fixed` and optional lines:

![Editor: Kitchen](/components/msbundles/screenshots/editor-kitchen.png)

Travel — percent / amount discount and optional:

![Editor: Travel set](/components/msbundles/screenshots/editor-travel.png)

Price mode select on a line:

![Line price modes](/components/msbundles/screenshots/editor-price-modes.png)

### Right column

| Block | Shows |
| --- | --- |
| Summary | Line and unit counts |
| As on storefront | Price, savings, stock for 1 bundle. “Preview only” badge |

![Storefront preview](/components/msbundles/screenshots/editor-preview.png)

Total and savings also appear in the dialog footer. A shortfall on required lines shows a warning above the form. Saving with stock issues asks for confirmation.

## Line price modes

| Mode | Value field | Result |
| --- | --- | --- |
| Original | ignored | Product price from miniShop3 |
| Fixed | amount | Fixed unit price |
| Discount % | 0–100 | Percent off product price |
| Discount amount | amount | Subtracted from product price |
| Free | ignored | 0 per unit |

Bundle total = sum of lines × bundle count. **Savings** = difference vs original prices. Zero price on the storefront shows as “Free”.

## Required and optional products

- **Required** — without it the bundle is unavailable. Stock shortfalls follow `msbundles_stock_behavior`.
- **Optional** — skipped on add when short. API response includes `warnings`.

## Permissions

| Operation | Permission |
| --- | --- |
| Open section, list, view | `msbundles_view` |
| Create, edit, delete, reorder, duplicate | `msbundles_save` |

## Cart behavior

The `msBundles` plugin listens to miniShop3:

- `msOnBeforeChangeInCart` — changing one line qty syncs others with the same `bundle_hash`
- `msOnBeforeRemoveFromCart` — removing one line removes the whole bundle
- `msOnGetCart` — lead/member metadata for cart rows

Line quantity must be a multiple of the base quantity from bundle options.

On the storefront, load `msBundles.initialize` and call `tplMsBundlesCartInfo` in the cart chunk. Lead shows the badge and “Remove bundle”. Member qty is locked. After add/remove, `msCart` needs `selector`. Details: [Frontend](/components/msbundles/frontend).
