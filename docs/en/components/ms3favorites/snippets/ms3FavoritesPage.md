---
title: ms3FavoritesPage
---
# Snippet ms3FavoritesPage

The `/wishlist/` page — tabs (`default`, `gifts`, `plans`), toolbar (add all to cart, checkboxes, etc.), and a container for item cards.

**Card HTML:** the list is **not** built with PHP pagination. The inline script in chunk `tplFavoritesPage` calls `window.ms3Favorites.render()` using `localStorage`/cookie and DB sync (same as elsewhere).

**Server-side:** for each tab, IDs are resolved from the DB (logged-in user or guest `session_id` when `ms3favorites.guest_db_enabled`), ordered by **`sortBy`**; if the DB is empty for a guest, cookie IDs are used. The result fills **`tabCounts`** and the **`ms3f.total`** placeholder (sum of the three tabs) so tab labels are correct before/after JS runs.

::: warning Parameter `usePdoPage` removed
Current package builds **no longer** embed pdoPage in the page chunk. Snippet parameters **`usePdoPage`**, page **`limit`**, and **`pageVarKey`** are **gone**. For server-side pagination use a separate chain: **[ms3FavoritesIds](ms3FavoritesIds) → [pdoPage](/en/components/pdotools/snippets/pdopage) → [ms3Favorites](ms3Favorites)** (or `msProducts`) — see [Integration](../integration).
:::

**Extended toolbar (Catalog / Clear / Share):** `extendedToolbar=1` or `&tpl=tplFavoritesPageDemo` (same file as `tplFavoritesPage`).

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **tpl** | Page wrapper chunk | `tplFavoritesPage` |
| **extendedToolbar** | `1` — show Catalog, Clear list, Share | `false` (forced `true` when `tpl` is `tplFavoritesPageDemo`) |
| **itemTpl** | Item chunk (for `render()`) | `tplFavoritesPageItem` |
| **emptyTpl** | Empty-state chunk (for `render()`) | `tplFavoritesEmpty` |
| **list** | Active list (or from `$_REQUEST['list']`) | `default` |
| **resource_type** | Resource type | `products` |
| **sortBy** | ID order for tab counts: `added_at_desc`, `added_at_asc` | `added_at_desc` |

## Placeholders and chunk properties

| Name | Description |
|------|-------------|
| `[[+ms3f.total]]` | Set via `$modx->setPlaceholder` — total items across `default` + `gifts` + `plans` (for use outside the page chunk) |
| **Passed into chunk `tpl`:** `itemTpl`, `emptyTpl`, `list`, `resource_type`, `extendedToolbar`, **`tabCounts`** (array keys `default`, `gifts`, `plans`) |

In the Fenom chunk: e.g. `{$tabCounts.default}`, `{$list}`, `{$resource_type}`.

## Examples

**Basic:**

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```
:::

**Extended toolbar:**

::: code-group
```modx
[[!ms3FavoritesPage? &extendedToolbar=`1`]]
```

```fenom
{'!ms3FavoritesPage' | snippet : ['extendedToolbar' => 1]}
```
:::

Same as `&tpl=tplFavoritesPageDemo`.

**Another resource type and tab-count sort:**

::: code-group
```modx
[[!ms3FavoritesPage?
  &resource_type=`articles`
  &sortBy=`added_at_asc`
]]
```

```fenom
{'!ms3FavoritesPage' | snippet : [
  'resource_type' => 'articles',
  'sortBy' => 'added_at_asc'
]}
```
:::

## Pagination

Not via `ms3FavoritesPage`. Use a separate resource or block as in [Integration](../integration) (ms3FavoritesIds + pdoPage + ms3Favorites / msProducts).

Guests with an empty DB still get list data from the browser after JS init; server-side tab totals may stay zero until DB or cookie data exists.
