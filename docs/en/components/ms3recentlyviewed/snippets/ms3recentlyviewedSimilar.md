---
title: ms3recentlyviewedSimilar
---
# Snippet ms3recentlyviewedSimilar

Products from the same categories (parents) as the given viewed IDs. Those IDs are excluded. “Similar to viewed” block.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated viewed product IDs | — |
| **tpl** | Product card chunk | tplSimilarItem |
| **tplOuter** | Wrapper chunk | *(empty)* |
| **limit** | Max items in result | `10` |
| **depth** | Category search depth. Values `< 2` are raised to 2 by the snippet and AJAX | **2** |
| **fromDB** | Load IDs from DB if the user is authenticated in the current context. Not in transport | `false` |
| **autoIdsFallback** | Demo IDs when `fromDB` and the list is empty. Default off, not in transport | `false` |
| **fallbackToRoot** / **fallbackReturnIds** | Catalog-wide fallback when the category query is empty. Not in transport | `true` |
| **where** | Extra `msProducts` `where` (JSON). Merged with `id:NOT IN` viewed IDs. Not in transport | — |
| **showUnpublished** / **showDeleted** | Passed to the product query. Not in transport | `false` |

## Examples

::: code-group

```fenom
{'ms3recentlyviewedSimilar' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
  'limit' => 8,
  'depth' => 2,
  'tpl' => 'tplSimilarItem'
]}
```

```modx
[[!ms3recentlyviewedSimilar?
  &ids=`[[+viewedIds]]`
  &limit=`8`
  &depth=`2`
  &tpl=`tplSimilarItem`
]]
```

:::

If the category query is empty, the snippet may search the whole catalog with higher depth. No IDs: empty string.

`renderSimilar()` in `viewed.js` defaults to 8 products, excludes the current product, and does not send `depth`. The server keeps 2. An empty response hides the container. Snippet default limit is 10.

Connector (AJAX): POST `action=similar`, `ids`, optionally `limit`, `tpl`, `depth`. Context: `ms3recentlyviewed.context` (default `web`). See [Frontend integration](/en/components/ms3recentlyviewed/frontend).
