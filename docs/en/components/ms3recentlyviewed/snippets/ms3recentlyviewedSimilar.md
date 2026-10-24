---
title: ms3recentlyviewedSimilar
---
# Snippet ms3recentlyviewedSimilar

Outputs products from the same categories (parents) as the given viewed IDs. Excludes those IDs. “Similar to viewed” block.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated viewed product IDs | — |
| **tpl** | Product card chunk | tplSimilarItem |
| **tplOuter** | Wrapper chunk | *(empty)* |
| **limit** | Max items in result | `10` |
| **depth** | Category search depth. Values `< 2` are raised to 2 by the snippet and AJAX | **2** |
| **fromDB** | Load IDs from DB if the user is authenticated in the current context | `false` |
| **autoIdsFallback** | Demo IDs when `fromDB` and the list is empty. Default off, not in transport | `false` |
| **fallbackToRoot** / **fallbackReturnIds** | Catalog-wide fallback when the category query is empty. Not in transport | `true` |
| **where** | Extra `msProducts` `where` (JSON). Merged with `id:NOT IN` viewed IDs | — |
| **showUnpublished** / **showDeleted** | Passed to the product query | `false` |

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

If nothing is found by category, the snippet may use a catalog-wide selection with a higher depth.

Via connector (AJAX): POST with `action=similar`, parameters `ids`, optionally `limit`, `tpl`, `depth`. See [Frontend integration](/en/components/ms3recentlyviewed/frontend).
