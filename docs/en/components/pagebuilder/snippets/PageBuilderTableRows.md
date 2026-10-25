---
title: PageBuilderTableRows
description: Output rows from a PageBuilder resource data table
---

# PageBuilderTableRows snippet

Returns rows from a resource **data table** (manager **Tables** tab). Output: JSON or a Fenom chunk.

Write your own markup in a template, widget, or chunk. Pro section [data_table](../sections/data_table) already uses built-in chunk `pagebuilder_data_table`.

## Where to call

- Template, chunk, or another section via a snippet field
- The table must exist on the same or specified `resource_id`

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `resource_id` | `0` | Resource ID. `0` means the current resource. The response stays empty (`[]` or an empty string) only when no resource can be resolved |
| `table_key` | empty | Table key on the resource |
| `table_id` | `0` | Database table ID instead of `table_key` |
| `limit` | `20` | Max rows (1–100) |
| `return` | `json` | `json` or `chunk` |
| `tpl` | `pagebuilder_table_rows` | Chunk when `return=chunk` |

### Filtering and pagination

Every key works in the snippet. The manager processor `mgr/datatable/rows/list` accepts only `page`, `limit`, `search`, and `filters`. Context and UTM filters are not sent to it.

| Parameter | Default | Description |
| --- | --- | --- |
| `page` | `1` | Page number |
| `search` | empty | Row search |
| `filters` | empty | JSON column filters |
| `context_column` | empty | Column for context filter |
| `use_context` | `1` | Use current resource `context_key` in `context_column` |
| `context_key` | empty | Explicit context instead of current |
| `use_utm` | `0` | Add filters from UTM session |
| `utm` / `utm_filters` | empty | JSON UTM filters for columns |

Example `filters`:

```json
{"price": {"op": "gte", "value": "100"}}
```

Operators: `eq`, `contains`, `in`, `gt`, `lt`, `gte`, `lte`, `between`, `empty`, `not_empty`. Details: [System settings → Tabular resource data](../settings#tabular-resource-data).

Event `pbOnBeforeTableGetList` receives `table`, `query`, and `criteria` by reference:

- The row query reads `search`, `filters`, `page`, and `limit` from `query`
- Pairs from `criteria` other than `table_id` go into the where clause
- After the plugin, `table_id` is written again: a plugin cannot switch the table
- The list event runs from the snippet and from `mgr/datatable/rows/list`

`pbOnTableRowSave` passes `data` by reference. That value is stored on the row.

## JSON

Missing table → `[]`. Otherwise a JSON array of row objects (each row's `data`).

::: code-group

```modx
[[!PageBuilderTableRows?
  &resource_id=`[[*id]]`
  &table_key=`offices`
  &limit=`50`
]]
```

```fenom
{'!PageBuilderTableRows' | snippet : [
  'resource_id' => $_modx->resource.id,
  'table_key' => 'offices',
  'limit' => 50
]}
```

:::

## Chunk

The chunk gets Fenom variables `rows` (array of row `data`) and `table` (table metadata).

::: code-group

```modx
[[!PageBuilderTableRows?
  &resource_id=`[[*id]]`
  &table_key=`offices`
  &return=`chunk`
  &tpl=`my_table_rows`
]]
```

```fenom
{'!PageBuilderTableRows' | snippet : [
  'resource_id' => $_modx->resource.id,
  'table_key' => 'offices',
  'return' => 'chunk',
  'tpl' => 'my_table_rows'
]}
```

:::

## See also

- [data_table section](../sections/data_table)
- [Developer → Resource data tables](../developer#resource-data-tables)
