---
title: Products grid
description: Filters, category tree, KPI, expert mode, selection
---

# Products grid

Main screen of the **Products** tab: MiniShop3 table with filters, row selection, and bulk operation launch.

![Products grid with stats bar and toolbar](/components/msbulkeditor/screenshots/products-grid.png)

---

## Table

Default columns:

| Key | Field | Description |
| --- | --- | --- |
| *(fixed)* | Preview | Product thumbnail (`thumb` → `image` → first MS3 gallery photo); column is always left of data columns |
| `id` | Resource ID | Number |
| `pagetitle` | Title | Inline editing |
| `price` | Price | Inline |
| `stock` | Stock | MS3 `count` field |
| `published` | Published | Inline (toggle) |
| `variant_count` | Variants | When ms3Variants is installed |

Layout and order are configured in [columns](column-settings). TVs and options (`msbe:tv:*`, `msbe:option:*`) render in cells. Scalar text-TVs and scalar options support inline editing (see [inline editing](inline-editing)). Long text is truncated with a tooltip (`title`).

The product list API normalizes `fields.thumb` on the backend (`ProductThumbNormalizer`: `thumb` → `image` → first MS3 gallery photo). The client renders preview only from `fields.thumb`.

The table uses **lazy pagination** and is built for catalogs with thousands of items. Compact row density (13 px body / 12 px headers).

**Column-header sorting is not implemented in the UI.** Row order comes from the backend (`products/list`).

### Pagination

- Default page size is **25** rows (`bulkStore.rows`).
- The paginator changes pages. Page size is not configurable in the current UI.
- KPI **Matching filter** counts all products matching filters, not just the current page.
- Header checkbox selects **current page only**. Use **expert mode** for the full filtered set.

---

## Category tree

A **category tree** sits to the left of the table. The “All products” node clears the parent filter. Clicking a category applies `parent` / `parentIds` (respecting “Include subcategories” at the bottom of the sidebar and in the filter row).

![Category tree beside the grid](/components/msbulkeditor/screenshots/category-sidebar.png)

The tree stays in sync with the **Category** dropdown in the filter panel.

---

## Search and filters

Primary row: **search**, **category** (with subcategory toggle when a category is selected), **publication status**, **Apply** / **Reset**. Rare filters (template, vendor, additional category, image, MS3 flags, deleted, duplicate URI) live under **More filters**. The button is highlighted when advanced filters are active.

![Filter panel](/components/msbulkeditor/screenshots/filters.png)

| Element | API `filterSpec` | Action |
| --- | --- | --- |
| **Category** | `parent` or `parentIds` | Filter by parent; “Include subcategories” expands to descendants |
| **Additional category** | `additional_category` or `additionalCategoryIds` | Products linked in `ms3_product_categories`; subcategories optional |
| **Template** | `template` | MODX template ID |
| **Vendor** | `vendor_id` | MS3 vendor ID |
| **Image** | `has_image` | With / without row in `ms3_product_files` |
| **Deleted** | `includeDeleted` | Show products with `deleted = 1` |
| **Duplicate URI** | `duplicate_uri` | Only products whose `uri` matches another msProduct (non-empty) |
| **MS3 flag** | `new`, `popular`, `favorite` | Flag in `ms3_products`: pick flag and Yes/No |
| **Search** | `query` | Substring in `pagetitle` or `article` |
| **Publication status** | `published` | All / published / hidden |
| **Apply filters** | — | Refreshes list and “Matching filter” count |
| **Reset** | — | Restores default values |

Template, vendor, and category reference data load from `filters/references`.

Filters **persist** when switching msBulkEditor tabs (Pinia store).

After the list loads, the field catalog updates from active `template`/`parent` filters or from the first product on the page.

---

## Product selection

| Action | Result |
| --- | --- |
| Row checkbox | One ID in `selectedIds` |
| Header checkbox | All rows on the **current page** |
| “Selected: N” in stats bar | Count of checked IDs |
| **Select only this row** | Crosshair in the `⋯` column — see below |

Without selected rows and without expert mode, **Run operation**, **Quick actions**, and the **Presets** menu are disabled. Hint: `msbulkeditor_select_products_first`.

---

## KPI and operation scope

A compact row above the table (same panel as filters and actions):

| Metric | Meaning |
| --- | --- |
| **Matching filter** | `total` — products matching current filters |
| **Selected** | Number of checked IDs |

Apply scope label next to them:

| State | Meaning |
| --- | --- |
| Rows selected | “Operation scope: N selected rows” |
| Expert mode | “all N products matching current filters” |
| No selection, expert off | `msbulkeditor_selection_scope_none` |

---

## Expert mode

The **Expert mode** toggle changes `selectionMode`:

| Mode | Apply / export scope |
| --- | --- |
| Off | `selectedIds` only |
| On | `all_filtered` — all IDs matching `filterSpec` |

**Limit:** `msbulkeditor_expert_limit` (default 5000). Over the limit, preview/apply return `msbulkeditor_expert_limit_exceeded` — narrow the filters.

An administrator can disable the mode: `msbulkeditor_expert_mode = No`.

![Expert mode and stats bar](/components/msbulkeditor/screenshots/expert-mode.png)

### Actions column (expert mode only)

With expert mode on, a right-hand column headed `⋯` appears:

1. Click the crosshair (**Select only this row**).
2. `selectedIds` becomes `[id]` for that row.
3. Expert mode stays on; further checkbox-based ops use `selectedIds` until you change selection.

Use this to shrink a mass selection to one product without turning expert off.

---

## Toolbar

| Button / menu | Purpose |
| --- | --- |
| **Run operation** | [OperationDialog](preview-and-apply) |
| **Quick actions** | Preset operations (icon) → [quick actions](quick-actions) |
| **Table settings** | Columns (icon) → [columns](column-settings) |
| **Presets** | Saved operations (icon) → [presets](presets) |

While the page loads or filters change, a skeleton overlay covers the table.

---

## Inline editing

Fields `pagetitle`, `price`, `stock`, `published`, `article`, `weight`, text/image TVs, and scalar options are editable by clicking a cell. See [inline editing](inline-editing).

---

## Column widths

Drag the right edge of a column header: width changes in the 40–480 px range and is saved in `ui/state` (when per-user UI persistence is enabled). The same `columnWidths` key is used in the Table settings dialog.

---

## Empty and error states

| State | What you see |
| --- | --- |
| No products match filters | Empty state “No products found” — change filters or clear search |
| Empty category tree | Sidebar hint |
| List load failure | Empty state error + reload; `msbulkeditor_products_load_failed` |
| Filter references failure | Sidebar message `msbulkeditor_filter_references_failed` |
| No selection | Operation toolbar disabled; scope meta `selection_scope_none` |
| Expert limit | Toast / error `msbulkeditor_expert_limit_exceeded` on preview or apply |

---

## Related sections

- [Preview and apply](preview-and-apply)
- [Quick actions](quick-actions)
- [Column settings](column-settings)
