---
title: Preview and apply
description: Preview diff, exclude rows, chunked apply, progress
---

# Preview and apply

Main flow: **preview, then apply**. You check the diff before writing to the database.

![Preview block below the table](/components/msbulkeditor/screenshots/preview-block.png)

---

## Steps

1. **Run operation** / quick actions / preset → parameter dialog.
2. **Preview** — `products/preview` request.
3. A **Preview** block appears below the table.
4. Optionally **exclude rows** (see below).
5. **Apply** — `products/apply` with the same definition + `excludeProductIds`.
6. **Progress** — poll `products/progress` until complete.

---

## Preview block

### Summary

| Metric | Value |
| --- | --- |
| Will change | Rows with status changed |
| Unchanged | unchanged |
| Skipped | skipped (no effect or scope rule) |

Detail row limit: `msbulkeditor_preview_detail_limit` (default 100).

### PreviewTable

Columns: product ID, field, before, after, status.

Statuses: `changed`, `unchanged`, `skipped`, `error`, after apply — `applied`, `rolled_back`.

---

## Excluding rows from apply

After preview, changed rows can be **unchecked** — the ID goes into `excludeProductIds` on apply.

- Hint above the table explains exclusion.
- Summary recalculates “Will change” excluding unchecked rows.
- **Cancel** — clears preview and definition, hides the block.

Rows with **`skipped`**, **`error`**, or **`unchanged`** (no value change) show a disabled checkbox with a tooltip. Only rows that will actually change can be excluded from apply.

![Exclusion checkboxes in preview](/components/msbulkeditor/screenshots/preview-exclude.png)

---

## Buttons

| Button | When active |
| --- | --- |
| **Preview** | In operation dialog, form valid |
| **Apply** | After preview, if “Will change” > 0 |
| **Cancel** (preview) | When preview block is visible |

**Apply** is disabled when `msbulkeditor_apply_no_changes` (0 changes).

Form validation errors (empty required field, invalid date, etc.) show in the dialog before the preview request — keys `msbulkeditor_validation_*`.

Over the expert limit the API returns `msbulkeditor_expert_limit_exceeded` — narrow filters on the [grid](products-grid#expert-mode).

---

## Chunked apply

Apply runs in **chunks** (`msbulkeditor_chunk_size`, default 50 products). Progress: “Processed X of Y”.

Each chunk fits the PHP time limit; the full catalog is processed as a series of chunks.

After completion, grid rows **refresh** without a full page reload.

---

## Apply progress

**ProgressPanel** appears below the grid:

![Apply progress panel](/components/msbulkeditor/screenshots/progress-panel.png)

- operation title;
- status (`running`, `completed`, `failed`, `cancelled`);
- `processed / total` counter and progress bar.

The SPA polls `products/progress` until a terminal status. While apply runs, a new **Apply** is blocked (`OperationQueue` — one active bulk operation per site). ProgressPanel has no “Cancel apply” button.

| Status | Action |
| --- | --- |
| `completed` | Check grid and **History** |
| `failed` | Open **History** — some items may be `applied`; partial rollback available |
| `cancelled` | Terminal API status (no mid-apply cancel in UI); then **History** |

Details: [history](history).

---

## TV operation

For type **TV** (`fieldType: tv`), the form adapts to field type from the catalog (`fields/catalog`, `tvType`, `tvOptions`):

| MODX TV type | Dialog widget |
| --- | --- |
| `list`, `dropdown`, `option`, … | Select with options from `elements` |
| `checkbox` | Toggle (values `1` / empty) |
| `image`, `file` | Path + **Browse** (MODX media browser) |
| others, dynamic `@SELECT`… | Text field (fallback) |

TV name is chosen from the template catalog when loaded.

---

## Idempotency

Each apply sends an **`idempotencyKey`**. A repeat request with the same key does not create a duplicate operation (double-click protection).

---

## Other operation types in the dialog

Full `fieldType` list: [Features](../features), [flows](flows#fieldtype-reference).

- **Resource fields:** boolean_toggle, text_replace, seo, link, dates, resource_group — [resource fields](resource-fields)
- **Other:** variant, gallery_regenerate, resource_utility, soft_delete — [product and prices](product-and-prices), [quick actions](quick-actions)

---

## See also

- [History and rollback](history)
- [Products grid](products-grid)
