---
title: "table"
description: "Row array by columns with typed cells"
---

# Field table

Version: **Pro** (`advanced-fields`).

<!-- ![table](/components/pagebuilder/screenshots/fields/table.jpg) -->

## Why this type

The editor edits rows in an inspector grid. Columns can be text, number, image, color, date, tag, currency, or URL. Rows live in section data.

## When to use

- Product spec table
- Comparison matrix with images in cells
- A small set of characteristics in a section

## Tips

Empty `columns` gives a free 1×1 grid: the editor adds columns. A filled list locks `name`, `label`, and `type`. The draft `key|Key|text` is no longer inserted when you pick the type. Large DB sets use [embeddedTable](embeddedTable).

## Similar types

- [keyvalue](keyvalue) for simple key/value pairs
- [embeddedTable](embeddedTable) for `table_key` and runtime rows

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

Schema limits:

| Key | Role |
| --- | --- |
| `rows` | Exact row count. Wins over `maxRows` |
| `maxRows` | Row limit |
| `columnCount` | Exact column count. Wins over `maxColumns`. Free grid only |
| `maxColumns` | Column limit |
| `columnWidth` | Column width, px |
| `headerDefault` | Default column label |

## Inspector

**Add column** and **Remove column** stay on the toolbar, with group and CSV import. In a free grid they respect `columnCount` and `maxColumns`. When the type sets `columns[]`, the buttons stay visible and disabled. A status line under the toolbar explains the mode. Below the grid sits a live preview: header, groups, `colspan`/`rowspan`, images and colors as on the site.

- Columns are added only in a free grid.
- Column width follows `type` unless `columnWidth` is set.
- **Clear** appears when cells have data. Removing a non-empty row or column, clearing, and CSV replace ask for confirmation.
- Merge right and down open on hover and focus.
- The grid never shrinks below 1×1.

## Value

With columns set: an array of objects keyed by `columns[].name`. An empty table with no extra rows is stored as `[]`.

Without columns: an object with `columns` and `rows`. New column keys are `col_1`, `col_2`. The label comes from `headerDefault` or “Column N”. In a free grid you edit it in the header. `columnCount` pads empty columns and keeps that count.

```mermaid
flowchart TD
  schema["table field schema"] --> check{"columns[] in CMP"}
  check -->|"list set"| fixed["Fixed columns"]
  fixed --> valArray["Value: array of objects by name"]
  check -->|"list empty"| free["Free 1×1 grid"]
  free --> valObj["Value: object columns and rows"]
  free --> editor["Editor adds col_N"]
```

- Group row: `"_pbGroup": true`, text in the first column.
- Merge lives in `"_span"` by column name (`label` / `value`). Cell text stays a string.
- `_pbGroup` and `_span` are stored on the row. On the site `_pb_cells` (`hidden`, `colspan`, `rowspan`) is written only by the `spec_table` section, into `spec_rows`. A plain `table` field does not get that key.

## Section data {#output-in-section-data}

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

Free grid:

```json
{
  "sheet": {
    "columns": [{ "name": "col_1", "label": "Column 1", "type": "text" }],
    "rows": [{ "col_1": "North" }]
  }
}
```

## Chunk example

Fenom loop. In MODX use a snippet or an indexed placeholder.

::: code-group

```modx
[[+specs.0.key]]
[[+specs.0.value]]
```

```fenom
{foreach $specs as $row}
  {$row.key|pb_text}
  {$row.value|pb_text}
{/foreach}
```

:::

```fenom
{foreach $specs|pb_table:3 as $row}
  {$row.value|pb_text}
{/foreach}
{$specs|pb_table:'cell':'last':'last'}
```

`pb_table` slices rows: first argument is count, second is offset. Modes `row`, `column`, and `cell` take an index, a column name, `first`, or `last`.

## Notes

CMP columns: `columnsText` (`name|Label|type`). CMP hint: text, number, image, color, date, tag, currency, url. The inspector also opens `yesno`, `toggle`, `checkbox`, `colorpalette`, `time`, `datetime`.

## Common properties

For fields with `name` stored in section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25, 33, 50, 66, 75, 100 | Field width as % of the row (flex). The CMP offers only these values | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

- Also: `columns[]` (`name`, `label`, `type`) or an empty list for a free grid.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
