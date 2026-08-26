---
title: "jsongrid"
description: "Single object with nested field keys not an array"
---

# Field jsongrid

Layer: **Pro**.

<!-- ![jsongrid](/components/pagebuilder/screenshots/fields/jsongrid.png) -->

## Why this type

Fields schema like repeater but single row object. Compact than one-row repeater. Pro for fixed-shape config block.

## When to use

- SEO object title description in one field
- Overlay settings bundle
- Single row table without array foreach

## Tips

Row list is [repeater](repeater). Flat keys without wrapper object is [fieldset](fieldset).

## Similar types

- [repeater](repeater) for arrays (Free)
- [fieldset](fieldset) for flat nested keys (Pro)

## Schema

```json
{
  "name": "row",
  "type": "jsongrid",
  "label": "Row",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "label": "Title"
    }
  ],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object with nested field keys.

## Section data {#output-in-section-data}

Key `row` in the section data: one object with nested field keys:

```json
{
  "row": {
    "title": "SEO title",
    "description": "SEO description"
  }
}
```

## Chunk example

```fenom
{if $row.title}
  <h4>{$row.title|escape}</h4>
{/if}
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

- Also: `fields[]`: one row = one object in data (not an array).

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
