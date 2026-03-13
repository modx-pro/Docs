---
title: ms3Favorites
---
# Snippet ms3Favorites

Outputs a list of products or resources by given IDs. Used for the Favorites block with server-side output or after getting IDs from the connector.

Supports `resource_type`: `products` (msProducts), `resources` (pdoResources), `articles`, `pages`, `custom`. MiniShop3 is required for products.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **ids** | Comma-separated product/resource IDs | — |
| **list** | List name (`default`, `gifts`, `plans`) | `default` |
| **resource_type** | Resource type: products, resources, articles, `pages`, `custom` | `products` |
| **tpl** | Product card chunk | `tplFavoritesItem` |
| **emptyTpl** | Empty state chunk | `tplFavoritesEmpty` |
| **limit** | Max items in result | from `ms3favorites.max_items` (20) |
| **page** | Page number (for `pdoPage`) | 1 |
| **offset** | Offset (for `pdoPage`) | (page-1)*limit |
| **totalVar** | Placeholder for total count | — |

Parameter **ids** is passed from outside: from JS when calling the connector or from another snippet (`ms3FavoritesIds`). For pagination use **pdoPage** with `element=ms3Favorites`.

## Examples

::: code-group

```fenom
{'!ms3Favorites' | snippet : [
  'ids' => $favoritesIds,
  'tpl' => 'tplFavoritesItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'limit' => 10
]}
```

```modx
[[!ms3Favorites?
  &ids=`[[+favorites_ids]]`
  &tpl=`tplFavoritesItem`
  &emptyTpl=`tplFavoritesEmpty`
  &limit=`10`
]]
```

:::

**With pdoPage pagination:**

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'ms3Favorites',
  'ids' => $_modx->getPlaceholder('favorites_ids'),
  'list' => 'default',
  'limit' => 12,
  'tpl' => 'tplFavoritesPageItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'totalVar' => 'page.total',
  'pageNavVar' => 'page.nav'
]}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```

```modx
[[!pdoPage?
  &element=`ms3Favorites`
  &ids=`[[+favorites_ids]]`
  &list=`default`
  &limit=`12`
  &tpl=`tplFavoritesPageItem`
  &emptyTpl=`tplFavoritesEmpty`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

:::

When there are no items the snippet returns `emptyTpl` content; you can skip outputting the block for empty results in the template.
