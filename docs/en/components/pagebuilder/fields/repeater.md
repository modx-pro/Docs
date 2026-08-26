---
title: "repeater"
description: "Array of objects with nested fields and service _rowId"
---

# Field repeater

Layer: **Free**.

<!-- ![repeater](/components/pagebuilder/screenshots/fields/repeater.png) -->

## Why this type

- Any nested field schema per row
- `_rowId` stays stable for Vue keys and anchors
- Free way to build card, FAQ, or slide lists

## When to use

- Card items, FAQ questions, or slides
- Any "add row" list inside a section
- Nested image and text without a custom JSON type

## Tips

- In the chunk use `{foreach}` and `{$item._rowId|escape}` when needed
- A single object without a list fits [jsongrid](jsongrid) (Pro)

## Similar types

- [jsongrid](jsongrid) for one object row (Pro)
- [table](table) for column grid (Pro)

## Schema

```json
{
  "name": "items",
  "type": "repeater",
  "label": "Items",
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

Array of objects; each row has `_rowId`.

## Section data {#output-in-section-data}

Key `items` in the section data: an array of rows; each row has a stable `_rowId`:

```json
{
  "items": [
    {
      "_rowId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Item 1"
    },
    {
      "_rowId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Item 2"
    }
  ]
}
```

## Chunk example

```fenom
{foreach $items as $item}
  <article id="{$item._rowId|escape}">
    <h3>{$item.title|escape}</h3>
  </article>
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

- Also: `fields[]` is the row schema; each row in data has `_rowId`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
