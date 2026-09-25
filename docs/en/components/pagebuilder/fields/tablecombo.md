---
title: "tablecombo"
description: "Dropdown from a MODX class through optionsSource"
---

# Field tablecombo

Version: **Pro**.

<!-- ![tablecombo](/components/pagebuilder/screenshots/fields/tablecombo.jpg) -->

## Why this type

A dropdown. Options load from a MODX class through `optionsSource` and the `mgr/field/options` processor. It is not a grid in the inspector. The row grid is [table](table). It needs PageBuilder Pro and the `advanced-fields` capability. Without `optionsSource` the list is empty.

## When to use

- A MODX class such as `modTemplate`
- One row of your own xPDO class, when it has an id and a label field
- When a [relation](relation) window is not needed

## Tips

ModResource picker → [relation](relation) or [combo](combo). Multiple ids → [tablemulticombo](tablemulticombo).

## Similar types

- [combo](combo) for a standard xPDO class
- [embeddedTable](embeddedTable) to render many rows by `table_key`

## Schema

```json
{
  "name": "template",
  "type": "tablecombo",
  "label": "Template",
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

`valueField` value.

## Section data {#output-in-section-data}

Key `template` in the section data: `valueField` from `optionsSource`:

```json
{
  "template": 3
}
```

## Chunk example

::: code-group

```modx
[[+template]]
```

```fenom
{if $template}{$template}{/if}
```

:::

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
