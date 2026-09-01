---
title: "table"
description: "Row array by columns with typed cells"
---

# Field table

Version: **Pro**.

<!-- ![table](/components/pagebuilder/screenshots/fields/table.png) -->

## Why this type

Columns text number image color date tag currency url. All rows stored in section data. Editors edit grid in inspector.

## When to use

- Product spec table
- Comparison matrix with images in cells
- Spec rows when count is small and lives in section

## Tips

Columns sets name label type per column. Large DB-backed sets use [embeddedTable](embeddedTable).

## Similar types

- [keyvalue](keyvalue) for simple key value pairs
- [embeddedTable](embeddedTable) for table_key and runtime rows

## Schema

```json
{
  "name": "specs",
  "type": "table",
  "label": "Specifications",
  "columns": [
    {
      "name": "key",
      "label": "Key",
      "type": "text"
    },
    {
      "name": "value",
      "label": "Value",
      "type": "text"
    }
  ],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of row objects keyed by `columns[].name`.

## Section data {#output-in-section-data}

Key `specs` in the section data: array of rows keyed by `columns[].name`:

```json
{
  "specs": [
    {
      "key": "Weight",
      "value": "1.2 kg"
    },
    {
      "key": "Color",
      "value": "#111827"
    },
    {
      "key": "Photo",
      "value": {
        "url": "assets/images/hero.jpg",
        "id": 12,
        "path": "assets/images/",
        "filename": "hero.jpg",
        "extension": "jpg",
        "name": "hero",
        "title": "hero.jpg",
        "width": 1920,
        "height": 1080,
        "size": 245760,
        "type": "image"
      }
    }
  ]
}
```

- Cells with `type: image` store a media object, same as the `image` field.

## Chunk example

```fenom
{foreach $specs as $row}
  <div class="spec">
    <span class="spec__key">{$row.key|escape}</span>
    <span class="spec__value">{$row.value|escape}</span>
  </div>
{/foreach}
```

## Notes

Columns in CMP: `columnsText` (`name|Label|type`). Cell types: text, number, image, color, date, tag, currency, url.

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

- Also: `columns[]` with `name`, `label`, `type` (text, number, image, color, …).

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
