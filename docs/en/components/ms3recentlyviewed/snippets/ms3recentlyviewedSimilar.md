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
| **depth** | Category search depth (nesting levels) | **2** (the snippet enforces a minimum depth of 2 for category-based selection) |
| **fromDB** | Load viewed IDs from DB for logged-in user (instead of **ids**) | false |

**fromDB** mirrors **ms3recentlyviewed**: with sync on and an authenticated **web** context, IDs are read from the table. For guests, a demo ID fallback may apply (see the package code).

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

If nothing is found by category, the snippet may use a **fallback** (e.g. catalog-wide selection with a higher depth) — see the package changelog.

Via connector (AJAX): POST with `action=similar`, parameters `ids`, optionally `limit`, `tpl`, `depth`.
