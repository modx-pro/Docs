---
title: ms3FavoritesShare
---
# Snippet ms3FavoritesShare

Share page for a list by token. URL: `/wishlist/share?token=xxx`. Outputs the product list and “Copy to my list” button.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **token** | Token from URL (usually `$_REQUEST['token']`) | — |
| **tpl** | Product card chunk | `tplFavoritesItem` |
| **emptyTpl** | Empty state chunk | `tplFavoritesEmpty` |
| **wrapperTpl** | Page wrapper chunk | `tplFavoritesSharePage` |

## wrapperTpl placeholders

| Placeholder | Description |
|-------------|-------------|
| `[[+list]]` | Product list HTML |
| `[[+token]]` | Token |
| `[[+count]]` | Product count |

## Examples

::: code-group
```modx
[[!ms3FavoritesShare]]
```

```fenom
{'!ms3FavoritesShare' | snippet}
```
:::

**With custom chunks:**

::: code-group
```modx
[[!ms3FavoritesShare?
  &tpl=`tplFavoritesItem`
  &emptyTpl=`tplFavoritesEmpty`
  &wrapperTpl=`tplFavoritesSharePage`
]]
```

```fenom
{'!ms3FavoritesShare' | snippet : [
  'tpl' => 'tplFavoritesItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'wrapperTpl' => 'tplFavoritesSharePage'
]}
```
:::

When token is missing or expired, the lexicon string `ms3favorites_share_not_found` is shown. Use a separate template for the share page so the error message displays correctly.
