---
title: "tablemulticombo"
description: "Id array from a custom table via MultiSelect"
---

# Field tablemulticombo

Version: **Pro**.

<!-- ![tablemulticombo](/components/pagebuilder/screenshots/fields/tablemulticombo.png) -->

## Why this type

Multiple row ids from the same table source. Pair to [tablecombo](tablecombo). Only ids in data, no inline rows.

## When to use

- Multi-brand filter ids
- Several category row keys from a table
- Curated id list without a relation modal

## Tips

Objects with pagetitle → [multirelation](multirelation). Static list → [multiselect](multiselect).

## Similar types

- [tablecombo](tablecombo) for a single table id
- [multicombo](multicombo) for an xPDO class list

## Schema

```json
{
  "name": "templates",
  "type": "tablemulticombo",
  "label": "Templates",
  "optionsSource": {
    "class": "modTemplate"
  },
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of ids.

## Section data {#output-in-section-data}

Key `templates` in the section data: array of values:

```json
{
  "templates": [
    "admin",
    "editor"
  ]
}
```

## Chunk example

```fenom
{foreach $templates as $id}
  <span>{$id}</span>
{/foreach}
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
- [Pro in manager](../integration)
