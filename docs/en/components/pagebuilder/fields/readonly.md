---
title: "readonly"
description: "Read-only string still shown in the inspector"
---

# Field readonly

Version: **Free**.

<!-- ![readonly](/components/pagebuilder/screenshots/fields/readonly.png) -->

## Why this type

Editors see value but cannot edit. Same scalar in data as text. Fits SKU, id, sync from external system.

## When to use

- SKU or article from MS3 on product section
- Preview slug or id after save
- Hint that value is auto-filled

## Tips

Fully hidden value use [hidden](hidden). Editable copy is [text](text).

## Similar types

- [hidden](hidden) with no UI
- [text](text) for normal input

## Schema

```json
{
  "name": "sku",
  "type": "readonly",
  "label": "SKU",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Read-only string.

## Section data {#output-in-section-data}

Key `sku` in the section data:

```json
{
  "sku": "sku-001"
}
```

## Chunk example

```html
<span class="sku">{$sku|escape}</span>
```

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25–100 | Field width as % of the row (flex) | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
