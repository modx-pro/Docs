---
title: "tablemulticombo"
description: "Several values from a MODX class through optionsSource"
---

# Field tablemulticombo

Version: **Pro**.

<!-- ![tablemulticombo](/components/pagebuilder/screenshots/fields/tablemulticombo.jpg) -->

## Why this type

Several values from the same source as [tablecombo](tablecombo): `optionsSource` or a static `options` list. In the inspector this is a searchable list, not a grid. The data stores `valueField` values only, not the rows.

The list is empty only when both `options` and `optionsSource` are missing. A non-empty static `options` is used first.

## When to use

- Multi-brand filter ids
- Several category row keys from a table
- Curated id list without a relation modal

## Tips

Objects with pagetitle: [multirelation](multirelation). Static list: [multiselect](multiselect).

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
    "class": "modTemplate",
    "valueField": "id",
    "labelField": "templatename",
    "limit": 50
  },
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of `valueField` values.

## Section data {#output-in-section-data}

Key `templates` in the section data: array of values:

```json
{
  "templates": [3, 5]
}
```

## Chunk example

::: code-group

```modx
<span>[[+templates.0]]</span>
```

```fenom
{foreach $templates as $id}
  <span>{$id}</span>
{/foreach}
```

:::

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25, 33, 50, 66, 75, 100 | Field width as % of the row (flex). The CMP offers only these values | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
