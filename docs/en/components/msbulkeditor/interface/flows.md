---
title: Flows
description: "Step-by-step flows A–J: filter, operations, inline, import, rollback"
---

# User flows

Step-by-step guide to msBulkEditor: filtering, operations, rollback. Flows A–J. Screenshots are inline below.

---

## Application map

```mermaid
flowchart TB
  subgraph tabs [Tabs]
    P[Products]
    H[History]
    PR[Presets]
    IE[Import and export]
  end

  subgraph products [Products tab]
    F[Filters and category tree]
    S[Row selection / expert mode]
    T[Toolbar: operations, quick actions, presets, columns]
    G[Grid + inline]
    PV[Preview block]
    PG[Apply progress]
  end

  P --> F --> S --> T
  T --> G
  T --> PV --> PG
  PG --> H
```

![Products tab overview](/components/msbulkeditor/screenshots/overview.png)

| Tab | Route | Permission | Main actions |
| --- | --- | --- | --- |
| Products | `#/products` | `msbulkeditor_view` | Filter, selection, operations, preview, apply, inline |
| History | `#/history` | `msbulkeditor_view` | Log, rollback, item detail |
| Presets | `#/presets` | `msbulkeditor_presets` | CRUD JSON operations |
| Import & export | `#/import-export` | `msbulkeditor_import_export` | CSV/XLSX export, import round-trip |

Tabs without permission are hidden. A direct URL without permission redirects to **Products**.

![Navigation tabs](/components/msbulkeditor/screenshots/tabs.png)

---

## Selection scope

Every bulk operation, export, or preset apply needs a **selection scope**.

| Mode | How to enable | What is included |
| --- | --- | --- |
| **Selected rows** | Row checkboxes (or header checkbox for current page) | `selectedIds` only |
| **All matching filter** | **Expert mode** toggle + active filters | All IDs matching `filterSpec` (limit `msbulkeditor_expert_limit`, default 5000) |

KPI **Matching filter** and **Selected** show selection size. The label next to expert mode explains the apply scope.

![Expert mode](/components/msbulkeditor/screenshots/expert-mode.png)

**Toolbar lock:** without selected rows and without expert mode, **Run operation**, **Quick actions**, and **Presets** menu are disabled.

In expert mode the `⋯` column offers **Select only this row** (crosshair) — `selectedIds = [id]` without turning expert off. Details: [products grid](products-grid#actions-column-expert-mode-only).

---

## Flow A — Bulk operation (full cycle)

Use for price, stock, TV, options, and other types from **Run operation**.

```mermaid
sequenceDiagram
  participant U as User
  participant UI as SPA
  participant API as connector.php

  U->>UI: Filter + selection / expert
  U->>UI: Run operation
  U->>UI: Type + parameters
  U->>UI: Preview
  UI->>API: products/preview
  API-->>UI: row diffs
  U->>UI: Exclude rows (optional)
  U->>UI: Apply
  UI->>API: products/apply (chunks)
  loop polling
    UI->>API: products/progress
  end
  API-->>UI: completed
  U->>UI: History → verify / rollback
```

### Steps

1. **Products** → set [filters](products-grid#search-and-filters) and/or category tree.
2. Select rows **or** enable **expert mode** and check “Matching filter: N”.
3. **Run operation** → pick type in **Operation type** (see [type table](#fieldtype-reference)).
4. Fill the form (fields depend on type).
5. **Preview** — diff table appears below the grid.
6. Uncheck rows if needed ([preview](preview-and-apply)).
7. **Apply** — progress shows “X of Y”.
8. **History** — verify; on error use **Rollback**.

![Preview block](/components/msbulkeditor/screenshots/preview-block.png)

![Exclude rows from apply](/components/msbulkeditor/screenshots/preview-exclude.png)

![Apply progress panel](/components/msbulkeditor/screenshots/progress-panel.png)

Details: [preview](preview-and-apply).

---

## Flow B — Quick actions

Shortcut for frequent operations without picking type in the Select.

1. Selection (rows or expert).
2. **Quick actions** (lightning icon).
3. Menu item → dialog with **locked** operation type.
4. Parameters → **Preview** → **Apply**.

![Quick actions menu](/components/msbulkeditor/screenshots/combo-menu.png)

![Template dialog after quick action](/components/msbulkeditor/screenshots/combo-template-dialog.png)

![Change parent](/components/msbulkeditor/screenshots/combo-change-parent.png)

![Change vendor](/components/msbulkeditor/screenshots/combo-vendor.png)

![Set text](/components/msbulkeditor/screenshots/combo-set-text.png)

![Regenerate gallery thumbnails](/components/msbulkeditor/screenshots/combo-gallery-regenerate.png)

![Clear resource cache](/components/msbulkeditor/screenshots/combo-clear-cache.png)

![Regenerate URI](/components/msbulkeditor/screenshots/combo-regenerate-uri.png)

![Soft delete](/components/msbulkeditor/screenshots/combo-soft-delete.png)

![Change file source](/components/msbulkeditor/screenshots/combo-source.png)

![Change content type](/components/msbulkeditor/screenshots/combo-content-type.png)

![Assign resource group](/components/msbulkeditor/screenshots/combo-resource-group.png)

![Change dates](/components/msbulkeditor/screenshots/combo-dates.png)

![Change user](/components/msbulkeditor/screenshots/combo-user.png)

![Confirm: soft delete](/components/msbulkeditor/screenshots/confirm-soft-delete.png)

![Confirm: clear cache](/components/msbulkeditor/screenshots/confirm-clear-cache.png)

![Confirm: regenerate URI](/components/msbulkeditor/screenshots/confirm-regenerate-uri.png)

| Menu item | `fieldType` |
| --- | --- |
| Change template | `template` |
| Change parent | `category` (`change_parent`) |
| Change vendor | `vendor` |
| Set text | `text_set` |
| Regenerate gallery previews | `gallery_regenerate` |
| Clear resource cache | `resource_utility` (`clear_cache`) |
| Regenerate URI | `resource_utility` (`regenerate_uri`) |
| Soft delete | `soft_delete` |
| Change file source | `source` |
| Change content type | `content_type` |
| Assign resource group | `resource_group` |
| Change dates | `dates` |
| Change user | `user` |

Details: [quick actions](quick-actions).

---

## Flow C — Preset

1. On **Products**, build an operation and verify preview **or** write JSON manually.
2. **Presets** → name + JSON → **Save**.
3. Rename: load preset → new name → **Save** (old name is removed).
4. To run again:
   - **Presets** → **Apply** on the row, **or**
   - **Products** → **Presets** toolbar menu → click name.

![Presets tab](/components/msbulkeditor/screenshots/presets-tab.png)

![Preset JSON form](/components/msbulkeditor/screenshots/presets-form.png)

![Presets toolbar menu](/components/msbulkeditor/screenshots/preset-menu.png)

Details: [presets](presets).

---

## Flow D — Inline edit (single cell)

No bulk operation dialog.

1. Click cell (`pagetitle`, `price`, `stock`, `published`, `article`, `weight`, text TV, scalar option).
2. **Image TV** — double-click → MODX media browser.
3. Enter / blur / toggle → save via preview/apply pipeline for **one ID**.

![Inline edit cell](/components/msbulkeditor/screenshots/inline-edit.png)

Details: [inline editing](inline-editing).

---

## Flow E — Column settings

1. **Products** → **Table settings** (columns icon).
2. Move columns between Available and Visible; reorder with arrows or drag.
3. Width — in dialog or by dragging column header border.
4. **Save** — persisted in `ui/state` (per MODX user).
5. **Restore** — browser localStorage snapshot, not factory defaults.

![Column manager dialog](/components/msbulkeditor/screenshots/column-manager.png)

Details: [columns](column-settings).

---

## Flow F — Catalog filtering

1. **Search**, **category**, **published** → **Apply filters**.
2. **More filters** — template, vendor, additional category, image, MS3 labels, deleted, duplicate URI.
3. Category tree syncs with **Category** filter.
4. **Reset** — defaults.

![Filter panel](/components/msbulkeditor/screenshots/filters.png)

![Grid with KPI and toolbar](/components/msbulkeditor/screenshots/products-grid.png)

Details: [products grid](products-grid).

---

## Flow G — Export

1. On **Products** — filter + selection (rows or expert).
2. **Import & export** → **Export** block.
3. CSV/XLSX, column list → **Run export** (file download).

![Import & export tab](/components/msbulkeditor/screenshots/import-export-tab.png)

![Export form](/components/msbulkeditor/screenshots/export-form.png)

Details: [import and export](import-export).

---

## Flow H — Import (round-trip)

1. Export → edit in Excel (`price`, `count`, etc.).
2. **Import & export** → **Choose file** → parse (then **Replace file** if needed).
3. Column mapping → **Import preview** → **Apply import**.
4. Optionally **Clear preview**.

![Import mapping](/components/msbulkeditor/screenshots/import-mapping.png)

Alternative: JSON + mapping in **Advanced** block — [import and export](import-export).

---

## Flow I — History and rollback

### Full rollback

1. **History** → row with **Completed** status.
2. **Rollback** → confirm → restore `old` values from `msbe_operation_items`.

![History tab](/components/msbulkeditor/screenshots/history-tab.png)

![Rollback confirmation](/components/msbulkeditor/screenshots/history-rollback-confirm.png)

![Bulk rollback confirmation](/components/msbulkeditor/screenshots/history-bulk-rollback-confirm.png)

### Partial rollback

1. **Changes** on the operation row.
2. Select items with status `applied`.
3. **Rollback selected**.
4. Click the **ID** in the panel to copy it (toast).

![Changes panel](/components/msbulkeditor/screenshots/history-detail.png)

### Bulk rollback

Select multiple completed operations → checkboxes → **Rollback selected**.

Details: [history](history). Requires `msbulkeditor_rollback`.

---

## Flow J — TV / option binding wizard

Before preview on **TV** or **Option** operations:

1. Fill TV name or option key → **Preview**.
2. If bindings are missing, the wizard dialog opens.
3. Review templates/categories without links.
4. For mixed templates — optionally enable “primary scope only”.
5. **Apply and continue** → `bindings/apply` → preview.
6. **Cancel** — operation stops.

![TV/option binding wizard](/components/msbulkeditor/screenshots/binding-wizard.png)

Details: [binding wizard](binding-wizard).

---

## `fieldType` reference

Types in **Run operation** (Operation type Select):

| UI (EN) | `fieldType` | Document |
| --- | --- | --- |
| Price | `price` | [product and prices](product-and-prices) |
| Stock | `stock` | [product and prices](product-and-prices) |
| Boolean toggle | `boolean_toggle` | [resource fields](resource-fields) |
| Categories | `category` | [product and prices](product-and-prices) |
| Option | `option` | [options](options) |
| TV parameter | `tv` | [TVs](tv-parameters) |
| Vendor | `vendor` | [product and prices](product-and-prices) |
| Template | `template` | [quick actions](quick-actions) |
| File source | `source` | [quick actions](quick-actions) |
| Content type | `content_type` | [quick actions](quick-actions) |
| User | `user` | [quick actions](quick-actions) |
| Text field | `text_set` | [product and prices](product-and-prices) |
| Text replace | `text_replace` | [resource fields](resource-fields) |
| SEO | `seo` | [resource fields](resource-fields) |
| Product link | `link` | [resource fields](resource-fields) |
| Dates | `dates` | [resource fields](resource-fields) |
| Resource group | `resource_group` | [resource fields](resource-fields) |
| Variant (ms3Variants) | `variant` | [product and prices](product-and-prices) |

**Quick actions only** (not in main Select): `gallery_regenerate`, `resource_utility`, `soft_delete`.

### Dialog screenshots

| Type | Screenshot |
| --- | --- |
| Price | ![](/components/msbulkeditor/screenshots/operation-price.png) |
| Price (transfer) | ![](/components/msbulkeditor/screenshots/operation-price-transfer.png) |
| Stock | ![](/components/msbulkeditor/screenshots/operation-stock.png) |
| Boolean | ![](/components/msbulkeditor/screenshots/operation-boolean.png) |
| Categories | ![](/components/msbulkeditor/screenshots/operation-categories.png) |
| Categories (remove_all) | ![](/components/msbulkeditor/screenshots/operation-categories-remove-all.png) |
| Option | ![](/components/msbulkeditor/screenshots/operation-option.png) |
| Option (tags) | ![](/components/msbulkeditor/screenshots/operation-option-multi.png) |
| TV | ![](/components/msbulkeditor/screenshots/operation-tv.png) |
| Vendor | ![](/components/msbulkeditor/screenshots/operation-vendor.png) |
| Template | ![](/components/msbulkeditor/screenshots/operation-template.png) |
| File source | ![](/components/msbulkeditor/screenshots/operation-source.png) |
| Content type | ![](/components/msbulkeditor/screenshots/operation-content-type.png) |
| User | ![](/components/msbulkeditor/screenshots/operation-user.png) |
| Resource group | ![](/components/msbulkeditor/screenshots/operation-resource-group.png) |
| Text field | ![](/components/msbulkeditor/screenshots/operation-text-set.png) |
| Dates | ![](/components/msbulkeditor/screenshots/operation-dates.png) |
| Text replace | ![](/components/msbulkeditor/screenshots/operation-text-replace.png) |
| SEO | ![](/components/msbulkeditor/screenshots/operation-seo.png) |
| Product links | ![](/components/msbulkeditor/screenshots/operation-link.png) |
| Variant | ![](/components/msbulkeditor/screenshots/operation-variant.png) |
| TV preview | ![](/components/msbulkeditor/screenshots/tv-preview.png) |
| Option preview | ![](/components/msbulkeditor/screenshots/option-preview.png) |
| Category tree | ![](/components/msbulkeditor/screenshots/category-sidebar.png) |

---

## Typical business scenarios

### −10% discount on a category

1. Category tree → branch → **Include subcategories**.
2. Expert mode → check matching filter count.
3. **Run operation** → **Price** → **Percent**, “−”, `10`, rounding.
4. Optionally **Copy current price to old_price**.
5. Preview → apply.

### Bulk template change

1. Filter by old template (more filters).
2. Expert or page selection.
3. **Quick actions** → **Change template** → new ID → preview → apply.

### Stock update from Excel

1. Export `id,stock` (or `id,count`).
2. Edit in Excel → import → target field Stock → mapping → preview → apply.

### Undo a bad promotion

1. **History** → operation → **Rollback** or **Changes** → partial rollback.

### Weekly repeatable operation

1. Save a **preset** once.
2. Next time: filter → selection → **Apply** preset.

---

## Permissions and limits

| Permission | Actions |
| --- | --- |
| `msbulkeditor_view` | Grid, preview, history read |
| `msbulkeditor_edit` | Apply, inline, import apply |
| `msbulkeditor_rollback` | Rollback |
| `msbulkeditor_presets` | Preset CRUD |
| `msbulkeditor_import_export` | File import/export |

System settings: `msbulkeditor_expert_limit`, `msbulkeditor_preview_detail_limit`, `msbulkeditor_chunk_size`, `msbulkeditor_import_max_rows` — [System settings](../settings).

---

## Operation data shape

```mermaid
flowchart LR
  D[definition: fieldType + parameters]
  SEL[selection: ids or all_filtered]
  EX[excludeProductIds from preview]
  D --> PRE[preview]
  SEL --> PRE
  PRE --> EX
  EX --> APP[apply chunks]
  APP --> OP[msbe_operations]
  APP --> IT[msbe_operation_items]
```

---

## See also

- [Interface overview](./)
- [Quick start](../quick-start)
- [Features](../features)
- [Binding wizard](binding-wizard)
- [Resource fields](resource-fields)
