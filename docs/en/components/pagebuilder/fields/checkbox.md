---
title: "checkbox"
description: "Single boolean flag: true or false"
---

# Field checkbox

Version: **Free**.

<!-- ![checkbox](/components/pagebuilder/screenshots/fields/checkbox.png) -->

## Why this type

Explicit checkbox for one option. Boolean value, not string "1"/"0". Pairs with showWhen for conditional fields.

## When to use

- "Show button", "Open in new tab"
- Enable block or overlay flag
- showWhen trigger for dependent fields

## Tips

Multiple independent flags use [checkboxgroup](checkboxgroup). Visible on/off switch fits [toggle](toggle) better.

## Similar types

- [toggle](toggle) for switch UI
- [yesno](yesno) for classic MODX yes/no

## Schema

```json
{
  "name": "featured",
  "type": "checkbox",
  "label": "Featured",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Boolean.

## Section data {#output-in-section-data}

Key `featured` in the section data:

```json
{
  "featured": true
}
```

## Chunk example

```fenom
{if $featured}<span class="badge">Featured</span>{/if}
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
