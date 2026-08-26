---
title: "tablecombo"
description: "Single id from a custom table row via optionsSource table"
---

# Field tablecombo

Layer: **Pro**.

<!-- ![tablecombo](/components/pagebuilder/screenshots/fields/tablecombo.png) -->

## Why this type

Select with search over embedded/custom table rows. Combo alternative when the source is not an xPDO class. Requires Pro and `advanced-fields` capability.

## When to use

- Pick a brand or vendor row from an MS table
- id from a Collections column
- Dynamic pick when modResource is wrong

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
    "labelField": "templatename"
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

```fenom
{if $template}{$template}{/if}
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
