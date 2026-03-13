---
title: ms3recentlyviewed
---
# Snippet ms3recentlyviewed

Outputs a list of products by given IDs. Used for the “Recently viewed” block with server-side output or after getting IDs from the connector.

Internally it calls msProducts (pdoTools); the addon automatically sets the `parents` parameter required in MODX 3.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated product IDs | — |
| **tpl** | Product card chunk | tplViewedItem |
| **emptyTpl** | Empty state chunk | tplViewedEmpty |
| **limit** | Max items in result | from setting ms3recentlyviewed.max_items (20) |
| **fromDB** | Load IDs from DB for logged-in user (when sync_enabled) | false |

**ids** is passed from outside (template, placeholder) or omitted when **fromDB=true** — then the snippet loads the list from DB.

## Examples

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : [
  'ids' => $viewedIds,
  'tpl' => 'tplViewedItem',
  'emptyTpl' => 'tplViewedEmpty'
]}
```

```modx
[[!ms3recentlyviewed?
  &ids=`[[+viewedIds]]`
  &tpl=`tplViewedItem`
  &emptyTpl=`tplViewedEmpty`
]]
```

:::

**From DB for logged-in user:**

```fenom
{'ms3recentlyviewed' | snippet : ['fromDB' => true]}
```

When there are no products, the snippet returns an empty string or `emptyTpl` content — the template can hide the block when the result is empty.
