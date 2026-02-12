# mSearch

Snippet for running search and outputting results.

Uses pdoTools for output, so it supports TV, **&where** conditions, etc.

::: warning Uncached call
Call the snippet **uncached** (with `!`), as it depends on the search query from `$_REQUEST`.
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **query** | `$_REQUEST['mse_query']` | Search query |
| **tpl** | `mSearch.row` | Chunk for each result |
| **tplWrapper** | | Chunk wrapping all results |
| **limit** | `10` | Max results |
| **offset** | `0` | Offset for pagination |
| **outputSeparator** | `\n` | Separator between results |
| **toPlaceholder** | | Save results to placeholder instead of output |
| **return** | `chunks` | Output format: `chunks`, `ids`, `json`, `data` |

### return parameter

| Value | Description |
|-------|-------------|
| `chunks` | Output via chunks (default) |
| `ids` | Comma-separated IDs only |
| `json` | JSON array of resource data |
| `data` | Data array (for other snippets) |

## Placeholders

### Global placeholders

After run the snippet sets:

| Placeholder | Description |
|-------------|-------------|
| `[[+mse.total]]` | Total results |
| `[[+mse.query]]` | Search query |

### Placeholders in tpl chunk

| Placeholder | Description |
|-------------|-------------|
| `[[+id]]` | Resource ID |
| `[[+pagetitle]]` | Title |
| `[[+longtitle]]` | Long title |
| `[[+introtext]]` | Intro text |
| `[[+content]]` | Content |
| `[[+weight]]` | Result relevance (weight) |
| `[[+intro]]` | Text with highlighted matches |
| `[[+idx]]` | Index in list |
| *other resource fields...* | |

### Placeholders in tplWrapper chunk

| Placeholder | Description |
|-------------|-------------|
| `[[+output]]` | All results |
| `[[+total]]` | Result count |
| `[[+query]]` | Search query |

## Examples

### Basic call

```fenom
{'!mSearch' | snippet}
```

### Custom chunk

```fenom
{'!mSearch' | snippet: [
    'tpl' => 'mySearchResult',
    'limit' => 20
]}
```

### With wrapper

```fenom
{'!mSearch' | snippet: [
    'tpl' => 'mSearch.row',
    'tplWrapper' => 'mSearch.wrapper',
    'limit' => 10
]}
```

Chunk `mSearch.wrapper`:

```fenom
{if $total > 0}
<div class="search-results">
    <p>Found: {$total} for "{$query}"</p>
    <div class="results-list">
        {$output}
    </div>
</div>
{else}
<p>No results</p>
{/if}
```

### Pagination with pdoPage

```fenom
{'!pdoPage' | snippet: [
    'element' => 'mSearch',
    'tpl' => 'mSearch.row',
    'limit' => 10
]}

{$_modx->getPlaceholder('page.nav')}
```

### Get IDs only

Useful for passing to other snippets:

```fenom
{set $ids = '!mSearch' | snippet: [
    'return' => 'ids',
    'limit' => 0
]}

{if $ids}
{'msProducts' | snippet: [
    'resources' => $ids,
    'sortby' => 'ids'
]}
{else}
<p>No products found</p>
{/if}
```

### MiniShop3 product search

```fenom
{'!pdoPage' | snippet: [
    'element' => 'msProducts',
    'parents' => 0,
    'resources' => '!mSearch' | snippet: ['return' => 'ids', 'limit' => 0] | default : '999999',
    'sortby' => 'ids',
    'tpl' => 'tpl.msProducts.row'
]}

{$_modx->getPlaceholder('page.nav')}
```

::: tip default filter
`| default : '999999'` uses a non-existent ID when search returns nothing, so an empty query does not list all products.
:::

### JSON for AJAX

```fenom
{'!mSearch' | snippet: [
    'return' => 'json',
    'limit' => 5
]}
```

## Default chunk

Chunk `mSearch.row`:

```fenom
<div class="search-result">
    <h3>
        <a href="{$id | url}">{$pagetitle}</a>
        <span class="weight">{$weight}</span>
    </h3>
    {if $intro}
    <p class="intro">{$intro}</p>
    {/if}
</div>
```

## Highlighting

Placeholder `[[+intro]]` contains a text fragment with highlighted matches. By default words are wrapped in `<mark>`.

Highlight settings (via Highlighter service):

- Max fragment length: 200 characters
- Text is truncated with ellipsis around the first match

## Search algorithm

1. **Split query** — query split into words
2. **Aliases** — synonyms and replacements applied
3. **Morphology** — base forms found for each word
4. **Index search** — words looked up in index table
5. **LIKE search** — additional full-text search
6. **Bonuses** — weight added for exact matches
7. **Sort** — results sorted by relevance

## Events

The snippet fires:

- **mseOnBeforeSearch** — before search, can modify query
- **mseOnAfterSearch** — after search, can modify results
