---
title: "combo"
description: "Single value from xPDO optionsSource via Select with search"
---

# Field combo

Version: **Pro**.

<!-- ![combo](/components/pagebuilder/screenshots/fields/combo.jpg) -->

## Why this type

A list from the database: resources, templates, and other allowed classes. Options load through `mgr/field/options` and the `pbOnFieldValues` event. Search stays in the dropdown, not in a window like [relation](relation).

## When to use

- Pick template, chunk, or TV by xPDO class
- Store a related record id when the chunk does not need pagetitle
- Dynamic enum from MODX tables

## Tips

Resource with pagetitle in data → [relation](relation). Multiple values → [multicombo](multicombo).

## Similar types

- [select](select) for a static `options` list
- [tablecombo](tablecombo) is also a list from a MODX class through `optionsSource`. The inspector grid is [table](table)

## Schema

```json
{
  "name": "related",
  "type": "combo",
  "label": "Related",
  "optionsSource": {
    "class": "modResource"
  },
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Selected value (string or id).

## Section data {#output-in-section-data}

Key `related` in the section data: string or id from `optionsSource`:

```json
{
  "related": 5
}
```

## Chunk example

::: code-group

```modx
[[+related]]
```

```fenom
{$related|pb_text}
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
