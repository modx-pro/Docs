---
title: Dynamic list
description: "The dynamic_list section reads modx-resources, a PageBuilder table, or miniShop3. Pro layer"
---

# Dynamic list

Result: the page lists records at request time, not a copy stored in the section JSON. Requires PageBuilder Pro and capability `datasources` (a live query to a provider).

## Before you start

1. The resource is published and the template contains `[[!PageBuilder]]`.
2. Capability `datasources` is on. Without it the site shows lexicon `pagebuilder_fe_filter_error_unavailable` ("Datasources are not available."). The internal string before the lexicon is `Datasources are not available.`
3. For `modx-resources`, published child resources exist. For a table, `table_key` already exists. For miniShop3, the package is installed.

## Steps

1. Add a `dynamic_list` section.
2. In `datasource` pick a provider: `modx-resources`, `pagebuilder-tables`, or `minishop3`.
3. For a table set the key. Add filters, sort, and limit. A limit above 100 becomes 100 on the site and in `mgr/datasource/query`.
4. Operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` ignores case, including Cyrillic. Keys `sql`, `php`, `snippet`, `class`, `classname`, and `query` are rejected.
5. Manager preview goes through `mgr/datasource/query`.
6. **Save** on the resource publishes the section. The chunk receives `items` and `total`.

An empty provider uses lexicon `pagebuilder_fe_filter_error_config` ("Datasource is not configured."). The internal string before the lexicon is `Datasource is not configured.` An empty result uses lexicon `pagebuilder_fe_list_empty`. A row with `image` shows the picture. The section is part of the page context, so the HTML cache does not freeze it. An unknown type logs `Unknown section type` and prints an empty string.

## Example fields

Provider `modx-resources`. Allowed filter and sort fields:

| Field |
| --- |
| `id` |
| `pagetitle` |
| `alias` |
| `parent` |
| `template` |
| `context_key` |
| `published` |

Filter: field `parent`, operator `eq`, value `5` (parent id, an example). Sort: field `published`, direction `desc`. The query limit is the number in the datasource block. The default is 20. The section **Limit** field is used only when the provider config has no limit. It does not shrink a limit that is already set.

The same keys are in [section data](../sections/dynamic_list#output-in-section-data). Publishing or unpublishing a child of parent `5` updates the site list. You do not rewrite the section JSON for that.

## What to check

The site shows cards for children of the parent in the filter. A query with no rows prints `pagebuilder_fe_list_empty`.

## Rollback

Delete the section.

## See also

- [Dynamic list](../sections/dynamic_list)
- [Filterable grid](filterable-grid)
- [Shop landing](shop-landing)
