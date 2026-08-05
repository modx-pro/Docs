---
title: MiniShop3 options
description: Bulk change of scalar and multi-value product options
---

# MiniShop3 options

Bulk changes to MS3 **product options** (`ms3_product_options` table).

![Option operation dialog](/components/msbulkeditor/screenshots/operation-option.png)

---

## How to open

1. Select products or enable expert mode.
2. **Run operation** → type **Option**.

---

## Value type

| UI | API `valueKind` | When to use |
| --- | --- | --- |
| **Single value** | `scalar` | text/select/combobox with one string |
| **Tags (multi-value)** | `multi` | MS3 comboMultiple, tags, colors — multiple rows per key |

---

## Scalar (`valueKind: scalar`)

| Mode | API `mode` | Action |
| --- | --- | --- |
| **Set value** | `set` | Write string to option |
| **Replace value** | `replace` | Find substring and replace |
| **Remove value** | `remove` | Clear option |

Parameters: `key`, `value` (set), `search` + `replace` (replace).

The “Current value in selection” picker for replace is built from scalar values of selected products on the grid page.

---

## Tags (`valueKind: multi`)

![Option: multi-value tags](/components/msbulkeditor/screenshots/operation-option-multi.png)

MS3 stores multi-value as **multiple rows** in `ms3_product_options` with one key.

| Mode | API `mode` | Action |
| --- | --- | --- |
| **Add tags** | `add` | Add tags without duplicates (`values[]`) |
| **Replace tag** | `replace` | Exact match: `search` → `replace` |
| **Remove tag** | `remove` | Remove `search` from set |

Preview shows tag array before/after. Tag picker is built from the selection like scalar replace.

Legacy format “single string `red,green`” is read on preview, but apply for multi writes separate DB rows.

---

## Beta limitations

- Typed MS3 widgets (date, textarea) not available in bulk.
- Before preview/apply for options, link in `ms3_category_options` is checked; gaps open the [binding wizard](binding-wizard).
- Auto-detect option type from MS3 catalog is not implemented: choose `valueKind` manually.

---

## Example: add tag `sale` to option `tags`

1. Select products.
2. Operation → **Option** → type **Tags (multi-value)**.
3. Key: `tags`, mode **Add tags**, enter `sale`.
4. Preview → skipped where `sale` already exists.
5. Apply.

![Option operation preview](/components/msbulkeditor/screenshots/option-preview.png)

---

## Option columns in the table

Options can be added to the grid via [columns](column-settings) (key `msbe:option:*`). Multi-value displays comma-separated. Scalar options support inline editing — see [inline editing](inline-editing).

---

## Inline (scalar)

Clicking a single-value option cell writes `option` / `mode: set` / `valueKind: scalar` for one product. Multi-value (tags) — bulk only.

---

## See also

- [TV parameters](tv-parameters)
- [Product & prices](product-and-prices)
