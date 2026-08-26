---
title: "combo"
description: "Single value from xPDO optionsSource via Select with search"
---

# Field combo

Layer: **Pro**.

<!-- ![combo](/components/pagebuilder/screenshots/fields/combo.png) -->

## Why this type

Database list: modResource, modTemplate, and other whitelist classes. Loaded via `mgr/field/options` and `pbOnFieldValues`. Dropdown search without a relation modal.

## When to use

- Pick template, chunk, or TV by xPDO class
- Store a related record id when the chunk does not need pagetitle
- Dynamic enum from MODX tables

## Tips

Resource with pagetitle in data → [relation](relation). Multiple values → [multicombo](multicombo).

## Similar types

- [select](select) for a static `options` list
- [tablecombo](tablecombo) for a custom table row id

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

```fenom
{$related|escape}
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
