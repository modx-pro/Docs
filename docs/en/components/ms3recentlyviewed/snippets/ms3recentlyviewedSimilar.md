---
title: ms3recentlyviewedSimilar
---
# Snippet ms3recentlyviewedSimilar

Outputs products from the same categories (parents) as the given viewed IDs, excluding those IDs. “Similar to viewed” block.

One `getCollection` query loads parent categories of all viewed products instead of N separate queries.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated viewed product IDs | — |
| **tpl** | Product card chunk | tplSimilarItem |
| **tplOuter** | Wrapper chunk | *(empty)* |
| **limit** | Max items in result | `10` |
| **depth** | Category search depth | Runtime **≥ 2** (snippet clamps). Transport property shows `1` and is ignored |
| **fromDB** | Load IDs from DB if the user is authenticated in the current context | `false` |
| **autoIdsFallback** | Demo IDs when `fromDB` and the list is empty. Default off, not in transport | `false` |
| **fallbackToRoot** / **fallbackReturnIds** | Catalog-wide fallback when the category query is empty. Not in transport | `true` |
| **where** | Extra `msProducts` `where` (JSON). Merged with `id:NOT IN` viewed IDs | — |
| **showUnpublished** / **showDeleted** | Passed to the product query | `false` |

**fromDB** reads the table for an authenticated user. Demo IDs run only with **`autoIdsFallback=1`**.

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

Via connector (AJAX): POST with `action=similar`, parameters `ids`, optionally `limit`, `tpl`, `depth`.
