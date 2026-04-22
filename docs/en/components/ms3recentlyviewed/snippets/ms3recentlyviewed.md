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

**ids** is passed from outside (template, placeholder **`[[+viewedIds]]`**) or omitted when **fromDB=true** — then the snippet loads the list from DB. For guests with **`storage_type` = `cookie`**, the **ms3recentlyviewedViewedIdsPlaceholder** plugin sets the placeholder; in Fenom use **`$_modx->getPlaceholder('viewedIds')`**, not a non-existent `$viewedIds` variable.

## Examples

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : [
  'ids' => $_modx->getPlaceholder('viewedIds'),
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

::: code-group

```fenom
{'ms3recentlyviewed' | snippet : ['fromDB' => true]}
```

```modx
[[!ms3recentlyviewed?
  &fromDB=`1`
]]
```

:::

When there are no products, the snippet returns an empty string or `emptyTpl` content — the template can hide the block when the result is empty.
