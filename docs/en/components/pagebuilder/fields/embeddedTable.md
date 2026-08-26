---
title: "embeddedTable"
description: "table_key limit filters config without table rows in data"
---

# Field embeddedTable

Layer: **Pro**.

<!-- ![embeddedTable](/components/pagebuilder/screenshots/fields/embeddedTable.png) -->

## Why this type

Rows load via PageBuilderTableRows snippet on front. Filters limit use_context utm in data object. Fits catalog-scale data.

## When to use

- Products grid from Collections table
- Any registered table_key
- When rows are too many for field table

## Tips

Chunk `[[!PageBuilderTableRows? &table_key=`...`]]`. Static 5–10 rows stay in [table](table).

## Similar types

- [table](table) for inline section rows
- [combo](combo) when you only need one id from table

## Schema

```json
{
  "name": "table",
  "type": "embeddedTable",
  "label": "Table",
  "table_key": "products",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ table_key, limit, filters, … }`.

## Section data {#output-in-section-data}

Key `table` in the section data: query config (table rows are not stored in data):

```json
{
  "table": {
    "table_key": "products",
    "limit": 10,
    "filters": {
      "category": "phones"
    },
    "use_context": true,
    "context_column": "context_key",
    "use_utm": false,
    "utm": {}
  }
}
```

- Rows on the frontend: `PageBuilderTableRows` snippet with the same `table_key`.

## Chunk example

```html
[[!PageBuilderTableRows? &table_key=`products` &limit=`10`]]
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

- Also: `table_key`, `limit`, `filters`, `use_context`, `utm`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
