---
title: Filterable grid
description: "filterable_grid: search, sort, and pages over Ajax, with GET when JavaScript is off. Pro layer"
---

# Filterable grid

Result: the visitor filters rows without a full reload. Without JavaScript the form stays a normal GET. Requires PageBuilder Pro and capability `datasources`.

## Before you start

1. The resource is published and the template contains `[[!PageBuilder]]`.
2. Capability `datasources` is on.
3. The provider already returns rows: child resources, a table with `table_key`, or miniShop3.

## Steps

1. Add a `filterable_grid` section.
2. Pick a datasource: `modx-resources`, `pagebuilder-tables`, or `minishop3`. For a table set the key.
3. **Save** the resource. On the site the form, sort, and pagination run through `pagebuilder-filterable-grid.js`. The address updates with `history.pushState`.
4. Parameters: `pb_fg_{id}_search`, `_sort`, `_dir`, `_page`, `_f_{field}`. `DatasourceSectionEnricher` writes the prefix `pb_fg_{id}_` into `filter_param_prefix`.
5. The operator follows the field type: text → `contains`, number and currency → `gte`, color → `eq`. An `image` column is left out of filters and sorting. The filter label comes from the column `label`.

A page number past the last page is clamped. An empty result uses `pagebuilder_fe_filter_empty`. The reset button uses `pagebuilder_fe_filter_clear`.

## Example fields

Title `Catalog`. Datasource `pagebuilder-tables`, with the same table key as on the **Tables** tab. **Limit** `12` (page size).

After you save, open the page and type a word into search. The address gains `pb_fg_{id}_search`, where `{id}` is the section id. Reset restores the list and uses lexicon `pagebuilder_fe_filter_clear`. An empty match prints `pagebuilder_fe_filter_empty`.

## What to check

With JavaScript the list updates without a full reload, and the query stays in the address. Turn JavaScript off and submit the form: it is a normal GET with the same parameters. An `image` column does not appear in the filters.

## Rollback

Delete the section.

## See also

- [Filterable grid](../sections/filterable_grid)
- [Dynamic list](dynamic-list)
