---
title: "datasource"
description: "Provider, filters, and limit object. Capability datasources. Pro layer."
---

# Field datasource

Version: **Pro**, capability `datasources`.

A query object, not a row list. Providers: `modx-resources`, `pagebuilder-tables`, `minishop3`. Rows appear at render time in [dynamic list](../sections/dynamic_list) and [filterable grid](../sections/filterable_grid).

Filter operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. Keys `sql`, `php`, `snippet`, and `class` are rejected. `limit` is at most 100. Manager preview: `mgr/datasource/query`.

## Schema

```json
{
  "name": "source",
  "type": "datasource",
  "label": "Source"
}
```

## Section data {#output-in-section-data}

```json
{
  "source": {
    "provider": "modx-resources",
    "table": "",
    "filters": [{ "field": "parent", "op": "eq", "value": "5" }],
    "sort": [{ "field": "menuindex", "direction": "asc" }],
    "search": "",
    "limit": 20
  }
}
```

For `pagebuilder-tables`, set `table` to the table key.

## Similar types

- [resourcelist](resourcelist) to pick resources by hand
