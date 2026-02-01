# Queries

Tab with statistics of visitor search queries.

## Purpose

Shows the history of all search queries on the site. Use it to:

- See what visitors search for
- Tune the index and [aliases](/en/components/msearch/interface/aliases)
- Find zero-result queries
- Plan content from demand

## Interface

### Queries table

| Column | Description |
|--------|-------------|
| Query | Search query text |
| Count | How many times it was searched |
| Results | How many results were found |
| Found | Whether at least one result was found |

Default sort is by query count (descending).

### Actions

| Button | Description |
|--------|-------------|
| Delete (trash) | Delete a single query |
| Delete all | Clear entire query history |

## Use cases

### Content optimization

Analyze popular zero-result queries:

1. Find queries with “Found: No”
2. Check if relevant content exists on the site
3. If it does — check indexing
4. If not — consider creating content

### Setting up aliases

When users search with synonyms or typos:

1. Find zero-result queries
2. Determine correct spelling
3. Create an [alias](/en/components/msearch/interface/aliases) for replacement

### Example analysis

| Query | Count | Results | Action |
|-------|-------|---------|--------|
| iphone 15 | 150 | 12 | OK |
| iphone 15 (typo) | 45 | 0 | Add alias for typo → “iphone” |
| delivery | 30 | 0 | Create delivery page |

## Autocomplete

Queries that returned results are used for [mSearchForm](/en/components/msearch/snippets/msearchform) autocomplete. Zero-result queries are not shown in suggestions.

## Deleting history

::: warning Note
Deleting queries is irreversible. Statistics will be lost.
:::

You might delete history to:

- Clear old data
- Reset stats after index update
- Remove test queries
