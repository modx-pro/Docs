---
title: "multicombo"
description: "Value array from xPDO optionsSource via MultiSelect with search"
---

# Field multicombo

Layer: **Pro**.

<!-- ![multicombo](/components/pagebuilder/screenshots/fields/multicombo.png) -->

## Why this type

Multiple ids from one xPDO class. Same `optionsSource` contract as combo. Scalar ids, not pagetitle objects like relation.

## When to use

- Several template or category ids
- Multiple foreign keys in a custom section
- Tags from a DISTINCT SQL query

## Tips

Resource objects with titles → [multirelation](multirelation). Fixed list → [multiselect](multiselect).

## Similar types

- [combo](combo) for a single xPDO value
- [tablemulticombo](tablemulticombo) for custom table ids

## Schema

```json
{
  "name": "ids",
  "type": "multicombo",
  "label": "ID",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of values.

## Section data {#output-in-section-data}

Key `ids` in the section data: array of values:

```json
{
  "ids": [
    "admin",
    "editor"
  ]
}
```

## Chunk example

```fenom
{foreach $ids as $id}
  <span>{$id|escape}</span>
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
