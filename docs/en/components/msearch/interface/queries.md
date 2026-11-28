# Queries

Tab with search query statistics.

## Purpose

The search query history helps you:

- Understand what visitors are looking for
- Optimize the index and [aliases](/en/components/msearch/interface/aliases)
- Find queries with zero results
- Plan content based on demand

::: tip What gets into the statistics
Visitors' **meaningful queries** are recorded — a submitted search form (Enter or the button) and the first page of results. **Not logged** on purpose:

- autocomplete — intermediate input (`ip`, `iph`, `ipho`…) does not clutter the statistics;
- pagination pages (2nd and further) — only the first request counts;
- checks on the [Search](/en/components/msearch/interface/search) tab in the manager (manager context).

The `mSearch` snippet can be excluded from the statistics altogether with the `&log=`0`` property — e.g. for a service `return=ids` call.
:::

The query is recorded after [aliases](/en/components/msearch/interface/aliases) are applied: with a "Full replace" alias the table shows the replaced query, with a synonym — the query with the synonym appended.

::: warning Clicks on suggestions
A search that ends with a click right on an autocomplete suggestion (the visitor goes straight to the resource, bypassing the results page) does not get into the statistics. If you need autocomplete analytics, you have to collect it separately.
:::

## Interface

![Queries tab: query statistics with count, number of results and sorting](/components/msearch/img/queries-tab.png)

### Queries table

| Column | Description |
|--------|-------------|
| Query | Search query text |
| Count | How many times this query was searched |
| Results | How many results were found |
| Found | Whether at least one result was found |

By default the table is sorted by count (descending). The "Query", "Count" and "Results" columns are clickable for re-sorting. Records are paginated, 20 per page.

### Actions

| Button | Description |
|--------|-------------|
| Remove (trash icon) | Remove a single query |
| Remove all | Clear the whole query history |

## Use cases

### Content optimization

Analyze popular queries without results:

1. Find queries with `Found: No`
2. Check whether the site has relevant content
3. If it does, check the indexing
4. If it does not, consider creating it

### Setting up aliases

If users search for synonyms or make typos:

1. Find queries with zero results
2. Determine the correct spelling
3. Create an [alias](/en/components/msearch/interface/aliases) for the replacement

### Analysis example

| Query | Count | Results | Action |
|-------|-------|---------|--------|
| iphone 15 | 150 | 12 | OK |
| `aifon 15` | 45 | 0 | Add the alias `aifon` → `iphone` |
| iphome 15 | 8 | 0 | Add the alias "iphome" → "iphone" (typo) |
| delivery | 30 | 0 | Create a delivery page |

## Clearing the history

::: warning Attention
Removing queries is irreversible — the statistics will be lost. A confirmation is requested before removing (a single record or all of them).
:::

You may need to clear the history to:

- Clean up outdated data
- Reset the statistics after an index update
- Remove test queries
