---
title: ms3recentlyviewed
---
# Snippet ms3recentlyviewed

Outputs a list of products by given IDs. Used for the “Recently viewed” block with server-side output or after getting IDs from the connector.

Internally it calls msProducts (pdoTools). The addon sets the `parents` parameter required in MODX 3.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated product IDs | — |
| **tpl** | Product card chunk | tplViewedItem |
| **tplOuter** | Wrapper chunk. Empty = no wrapper | *(empty)* |
| **emptyTpl** | Empty state chunk | tplViewedEmpty |
| **limit** | Max items in result | from setting `ms3recentlyviewed.max_items` (`20`) |
| **includeThumbs** | Thumb aliases for `msProducts` | `thumb,small` |
| **fromDB** | Load IDs from DB if the user is authenticated in the current context. `sync_enabled` is not read | `false` |
| **autoIdsFallback** | If the ID list is empty, take the first catalog products (demo). Not in transport | `false` |
| **showUnpublished** / **showDeleted** / **showZeroPrice** | Passed to the product query. Not in transport | `false` |

**ids** comes from the template or placeholder **`[[+viewedIds]]`**, or is omitted when **fromDB=true** (authenticated user). `sync_enabled` does not gate this read. Guests + `storage_type=cookie`: plugin fills `viewedIds`. Fenom: **`$_modx->getPlaceholder('viewedIds')`**.

Stub snippet **`ms3rvDebugGetViews`** returns an empty string. Do not call it.

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

When there are no products, the snippet returns an empty string or `emptyTpl` content. The template can hide the block when the result is empty.
