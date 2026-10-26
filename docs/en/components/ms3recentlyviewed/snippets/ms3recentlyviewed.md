---
title: ms3recentlyviewed
---
# Snippet ms3recentlyviewed

Product list by given IDs. “Recently viewed” with server-side output or IDs from the connector.

Internally msProducts (pdoTools). The addon sets `parents` for MODX 3.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated product IDs | — |
| **tpl** | Product card chunk | tplViewedItem |
| **tplOuter** | Wrapper chunk. Empty = no wrapper | *(empty)* |
| **emptyTpl** | Empty state chunk | tplViewedEmpty |
| **limit** | Max items in result | from setting `ms3recentlyviewed.max_items` (`20`) |
| **includeThumbs** | Thumb aliases for `msProducts` | `thumb,small` |
| **fromDB** | Load IDs from DB if the user is authenticated in the current context. `sync_enabled` is not read. Not in transport | `false` |
| **autoIdsFallback** | If the ID list is empty, take the first catalog products (demo). Not in transport | `false` |
| **showUnpublished** / **showDeleted** / **showZeroPrice** | Passed to the product query. Not in transport | `false` |

**ids** from the template or **`[[+viewedIds]]`**, or omit when **fromDB=true** (authenticated user). `sync_enabled` does not gate this read. Guests with `storage_type=cookie`: plugin sets `viewedIds`. Fenom: **`$_modx->getPlaceholder('viewedIds')`**.

**`ms3rvDebugGetViews`** is a stub that returns an empty string. Do not call it.

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

With no IDs the snippet returns wrapper `div.ms3rv__list` with `data-ms3rv-hydrate="viewed"` and `emptyTpl` HTML. `viewed.js` fills the list from the browser via that marker.
