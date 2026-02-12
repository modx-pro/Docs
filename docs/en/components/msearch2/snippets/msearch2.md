# mSearch2

Snippet for search and output of results.

Uses pdoTools, so it supports TV, **&where**, **&select**, etc. In practice it is a modified [pdoResources][2] with two additions:

- It uses search for results and adds placeholder `[[+weight]]` with relevance score.
- It adds placeholder `[[+intro]]` with highlighted matches.

The snippet depends on the query from the request, so call it uncached.

## Parameters

| Name | Default | Description |
|------|---------|-------------|
| **&tpl** | `tpl.mSearch2.row` | Chunk for each result. Standard resource placeholders plus `[[+weight]]` and `[[+intro]]`. |
| **&returnIds** | `false` | Return only comma-separated IDs of matching pages. |
| **&showLog** | `false` | Show extra snippet debug info. Only for authenticated users in mgr context. |
| **&limit** | `10` | Max results. |
| **&offset** | `0` | Skip results from the start. |
| **&depth** | `10` | Search depth from each parent. |
| **&outputSeparator** | `\n` | Optional separator between results. |
| **&toPlaceholder** | | If set, output is saved to this placeholder instead of printed. |
| **&parents** | | Comma-separated parent IDs to limit results. |
| **&includeTVs** | | Comma-separated TV names to load, e.g. "action,time" → `[[+action]]`, `[[+time]]`. |
| **&tvPrefix** | | Prefix for TV placeholders, e.g. "tv.". |
| **&where** | | Extra query conditions as JSON. |
| **&showUnpublished** | `false` | Include unpublished resources. |
| **&showDeleted** | `false` | Include deleted resources. |
| **&showHidden** | `true` | Include menu-hidden resources. |
| **&hideContainers** | `false` | Exclude container resources. |
| **&introCutBefore** | `50` | Characters before first match in `[[+intro]]`. |
| **&introCutAfter** | `250` | Characters after first match in `[[+intro]]`. |
| **&htagOpen** | &lt;b&gt; | Opening tag for highlights in `[[+intro]]`. |
| **&htagClose** | &lt;/b&gt; | Closing tag for highlights in `[[+intro]]`. |
| **&parentsVar** | `parents` | Request variable name for parent filter. |
| **&queryVar** | `query` | Request variable name for search query. |
| **&tplWrapper** | | Wrapper chunk. Placeholders: `[[+output]]`, `[[+total]]`, `[[+query]]`, `[[+parents]]`. |
| **&wrapIfEmpty** | `false` | Output wrapper chunk even when there are no results. |
| **&forceSearch** | `true` | Require a search query; output nothing without it. |
| **&minQuery** | `3` | Minimum query length. |
| **&fields** | | Override indexed field weights, e.g. `pagetitle:5,content:3,comment:1`. Default: `mse2_index_fields`. |
| **&showSearchLog** | `false` | Show detailed search scoring when **&showLog** is on. |

## Lexicons

Search error messages are in system lexicons:

- **mse2_err_no_results** → "No matching results".
- **mse2_err_min_query** → "Search query too short" (shorter than **&minQuery**).
- **mse2_err_no_query** → "Empty search query".

Other default chunk/snippet strings are there too.

![Lexicons](https://file.modx.pro/files/2/e/b/2eb17463d4da9ddaa25bb0f80f197d8c.png)

## Search form

The snippet needs the search query in `$_REQUEST`. A simple form:

```modx
<form action="/search.html" method="get">
  <input type="text" name="query" value="[[+mse2_query]]" />
  <button type="submit">Search!</button>
</form>
```

The query must use the name from **&queryVar** (default *query*).

## Examples

Empty action submits to the current page:

```modx
<form action="" method="get">
  <input type="text" name="query" value="[[+mse2_query]]" />
  <button type="submit">Search!</button>
</form>

[[!mSearch2]]
```

Pagination with [pdoPage][3]. mSearch2 installs pdoTools, so pdoPage is available:

```modx
<form action="" method="get">
  <input type="text" name="query" value="[[+mse2_query]]" />
  <button type="submit">Search!</button>
</form>

[[!pdoPage?
  &element=`mSearch2`
]]

[[!+page.nav]]
```

With [mSearchForm][4]:

```modx
[[!mSearchForm]]

[[!pdoPage?
  &element=`mSearch2`
]]

[[!+page.nav]]
```

Search and output products with [msProducts][5]:

```modx
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &resources=`[[!mSearch2:default=`999999`?returnIds=`1`&limit=`0`]]`
  &sortby=`ids`
]]

[[!+page.nav]]
```

`returnIds` gives **msProducts** the list of found product IDs. The `default` filter uses a non-existent ID when nothing is found so **msProducts** does not list all products.

You can use all product fields in the output chunk.

[2]: /en/components/pdotools/snippets/pdoresources
[3]: /en/components/pdotools/snippets/pdopage
[4]: /en/components/msearch2/snippets/msearchform
[5]: /en/components/minishop2/snippets/msproducts
