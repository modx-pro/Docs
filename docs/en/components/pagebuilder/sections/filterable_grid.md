---
title: "Filterable grid"
description: "Datasource rows with GET filters, sort, and pagination. Pro layer."
---

# Filterable grid

Section `filterable_grid` shows rows with filters in the URL. Chunk: `pagebuilderpro_filterable_grid`. Requires PageBuilder Pro and capability `datasources`.

1. Pick a datasource: `modx-resources`, `pagebuilder-tables`, or `minishop3`.
2. For tables set the `table` key.
3. On the site the filter form updates the URL (`pb_fg_{sectionId}_*`). Pagination keeps search, sort, and `f_*`.

Pagination in the chunk uses `range` and `foreach`. Fenom `{for}` is not supported here.

Query operators match the [dynamic list](dynamic_list): `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. Keys `sql`, `php`, `snippet`, and `class` are rejected. Page size is at most 100.

The section is part of the page context so the HTML cache does not freeze the filter.

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `datasource` | datasource | yes | Provider and query |
| `limit` | number | no | Page size |

## Render

The form uses `method="get"`. Parameter prefix is `pb_fg_{id}_`. `DatasourceSectionEnricher` writes it to `filter_param_prefix`. Names: `search`, `sort`, `dir`, `f_{field}`, `page`. Field `id` is skipped in the filter inputs.

Pagination is drawn when `page_count` is greater than 1. An empty result uses lexicon `pagebuilder_fe_filter_empty`, fallback `No items.` Errors match [dynamic list](dynamic_list).

## Section data {#output-in-section-data}

```json
{
  "title": "Catalog",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [],
    "sort": [{ "field": "menuindex", "direction": "asc" }],
    "search": "",
    "limit": 12
  },
  "limit": 12
}
```

## Similar sections

- [Dynamic list](dynamic_list) without a filter form
- [Products grid](products_grid) for a miniShop3 storefront via `msProducts`

## Related pages

- [Section catalog](index)
- [PageBuilder Pro](../pro)
