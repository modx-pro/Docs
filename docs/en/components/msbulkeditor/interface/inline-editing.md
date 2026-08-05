---
title: Inline editing
description: Edit grid cells through the preview/apply pipeline
---

# Inline editing

Quick edit of **one product** by clicking a cell, without opening the bulk operation dialog.

![Inline pagetitle cell](/components/msbulkeditor/screenshots/inline-edit.png)

---

## Supported fields

| Column | Behavior |
| --- | --- |
| **pagetitle** | Text input, Enter / blur → save |
| **article** | Text input, `text_set` |
| **price** | Number ≥ 0, set mode |
| **stock** | Number ≥ 0, set mode for `count` |
| **weight** | Number ≥ 0, `text_set` |
| **published** | Yes/no toggle |
| **TV (text, textarea, textfield, email, url)** | Text input, `tv` mode set; whitelist from catalog (`inlineCapable`) |
| **TV image** | Double-click → MODX media browser → save path; thumbnail preview in cell |
| **MS3 option (scalar)** | Text input, `option` mode `set`; key from `msbe:option:*` |

Static fallback: `inlineEditConfig.js` → `STATIC_INLINE_FIELDS`.
With the catalog API, the column’s `inlineCapable` flag decides.

---

## How to edit

1. Hover a cell — tooltip “Click to edit” (for image TV — “Double-click…”).
2. Click (or double-click for image TV) — edit mode or media browser.
3. Change the value.
4. Save: Enter, blur, toggle (published), or file pick in browser (image TV).
5. Toast **“Saved”** on success.

On API error, a message is shown; the table value reverts to the previous one.

---

## Technical details

Inline uses the same pipeline as bulk operations:

- `products/preview` + `products/apply` with a **single-ID** selection;
- unique `idempotencyKey` per save;
- **History** records a one-product operation (no preview block in the grid); snapshots support rollback.

Row patch after apply: `applyGridFieldPatch` in `gridFieldResolver.js` (scalar, `tvs`, `options`).

Image TV uses `openModxMediaBrowser()` (`modx-browser` in the MODX manager).

Options inline: `fieldType: option`, `valueKind: scalar`, `mode: set`, `key` + `value`.

---

## Planned

- Inline for multi-value options (tags).
- Modals by TV/option type for complex types.

TV/option binding before bulk — [binding wizard](binding-wizard).

---

## Limitations

- Requires **`msbulkeditor_edit`** permission.
- Cell shows loading (spinner) while saving.
- Invalid number for price/stock/weight — save is skipped.
- TV list/checkbox/file — bulk operation only.
- Multi-value options — bulk “Tags” only.
- Image TV inline works only inside the MODX manager (`MODx.load` required).

---

## See also

- [Column settings](column-settings)
- [MS3 options](options)
- [Product & prices](product-and-prices) — bulk changes for the same fields
