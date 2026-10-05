---
title: Dynamic list
description: "The dynamic_list section reads modx-resources, a PageBuilder table, or miniShop3. Pro layer"
---

# Dynamic list

Result: the page lists records at request time, not a copy stored in the section JSON. Requires PageBuilder Pro and capability `datasources` (a live query to a provider).

## Before you start

1. The resource is published and the template contains `[[!PageBuilder]]`.
2. Capability `datasources` is on. Without it the text is `Datasources are not available.`
3. For `modx-resources`, published child resources exist. For a table, `table_key` already exists. For miniShop3, the package is installed.

## Steps

1. Add a `dynamic_list` section.
2. In `datasource` pick a provider: `modx-resources`, `pagebuilder-tables`, or `minishop3`.
3. For a table set the key. Add filters, sort, and limit. `QueryPolicy` rejects a limit above 100.
4. Operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` ignores case, including Cyrillic. Keys `sql`, `php`, `snippet`, and `class` are rejected.
5. Manager preview goes through `mgr/datasource/query`.
6. **Save** on the resource publishes the section. The chunk receives `items` and `total`.

An empty provider: `Datasource is not configured.` An empty result uses lexicon `pagebuilder_fe_list_empty`. A row with `image` shows the picture. The section is part of the page context, so the HTML cache does not freeze it. Without Pro the published HTML is not rebuilt.

## Example fields

Provider `modx-resources`. The filter from the section page: field `parent`, operator `eq`, value `5` (parent id, an example). Sort: field `publishedon`, direction `desc`. Query limit `20`. The section **Limit** field can be `8`.

The same keys are in [section data](../sections/dynamic_list#output-in-section-data). Publishing or unpublishing a child of parent `5` updates the site list. You do not rewrite the section JSON for that.

## What to check

Manager preview returns rows through `mgr/datasource/query`. The site shows cards for children of the parent in the filter. A query with no rows prints `pagebuilder_fe_list_empty`.

## Rollback

Delete the section.

## See also

- [Dynamic list](../sections/dynamic_list)
- [Filterable grid](filterable-grid)
- [Shop landing](shop-landing)
