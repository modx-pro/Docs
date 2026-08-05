---
title: TV parameters
description: Bulk set/add/replace/remove for template variables
---

# TV parameters

Bulk work with resource **Template Variables (TVs)** on products.

![TV parameter operation dialog](/components/msbulkeditor/screenshots/operation-tv.png)

---

## How to open

1. Select products or enable expert mode.
2. **Run operation** → type **TV parameter**.

---

## Modes

| Mode | `mode` | Description |
| --- | --- | --- |
| **Set** | `set` | New TV value |
| **Append to value** | `add` | Concatenate to current |
| **Replace text** | `replace` | Find/replace in TV string |
| **Remove** | `remove` | Clear value |

Parameters:

- **TV name** — `name` (not caption);
- for **replace**: `search`, `replace`, optional `useRegex`, `caseInsensitive`;
- for **set/add**: `value`.

---

## Value input in bulk

The operation dialog provides **typed widgets** by TV type from the field catalog (B-11):

| TV type | Bulk UI |
| --- | --- |
| text, textarea, email, url | Text field |
| list | Select from `elements` |
| image | Path + media browser button |
| file, checkbox, date, etc. | Text value or basic input |

---

## Inline in grid

| TV type | Inline |
| --- | --- |
| text, textarea, textfield, email, url | Click → text input, `tv` mode `set` |
| image | Double-click → MODX media browser |
| list, checkbox, file | Bulk operation only |

See [inline editing](inline-editing).

---

## Template binding

Before preview/apply for TVs, template binding is checked; gaps open the [binding wizard](binding-wizard).

With mixed templates, checkbox “primary template only” is available.

---

## Example: replace text in TV `subtitle`

1. Expert mode, filter by category.
2. TV → **Replace text**.
3. Name: `subtitle`, find: `2024`, replace with: `2025`.
4. Preview → apply.

![TV change preview](/components/msbulkeditor/screenshots/tv-preview.png)

---

## TV export

Columns `tv:name` or `msbe:tv:name` are supported in export — see [import and export](import-export).

---

## See also

- [MS3 options](options)
- [Inline editing](inline-editing)
