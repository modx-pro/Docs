---
title: ms3recentlyviewedSimilar
---
# Snippet ms3recentlyviewedSimilar

Outputs products from the same categories (parents) as the given viewed IDs, excluding those IDs. “Similar to viewed” block.

**Optimization:** a single getCollection query for parent categories of all viewed products instead of N separate queries.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated viewed product IDs | — |
| **tpl** | Product card chunk | tplSimilarItem |
| **limit** | Max items in result | 10 |
| **depth** | Category search depth (nesting levels) | 1 |

## Examples

::: code-group

```fenom
{'ms3recentlyviewedSimilar' | snippet : [
  'ids' => $viewedIds,
  'limit' => 8,
  'tpl' => 'tplViewedItem'
]}
```

```modx
[[!ms3recentlyviewedSimilar?
  &ids=`[[+viewedIds]]`
  &limit=`8`
  &tpl=`tplViewedItem`
]]
```

:::

If viewed products have no categories or those categories have no other products, the snippet returns an empty string.

Via connector (AJAX): POST with `action=similar`, parameters `ids`, optionally `limit`, `tpl`, `depth`.
