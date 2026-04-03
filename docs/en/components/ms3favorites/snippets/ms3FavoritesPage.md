---
title: ms3FavoritesPage
---
# Snippet ms3FavoritesPage

The `/wishlist/` page — tabs (`default`, `gifts`, `plans`), toolbar (add all to cart, checkboxes, etc.), and a container for item cards.

## How cards are rendered (products)

- With **`resource_type=products`** and **`serverList=1`** (default), the product grid is built **server-side** in the chunk: IDs are resolved like [ms3FavoritesIds](ms3FavoritesIds) (`-0` or `1,2,3`), then **pdoPage** with **`element=msProducts`**, `FIELD(msProduct.id,…)` sort, pagination placeholders `ms3f.page.*`. Tabs use `?list=default|gifts|plans` (full reload on tab change). **`favorites.js` does not call `render`** for that list; after sync only tab counters refresh.
- With `&serverList=0` and `products` — legacy mode: **`favorites.js`** fills the list (`render`, up to **100** items per tab, no in-chunk server paging).
- For **`resource_type` ≠ products** the list still comes from **JS** after sync; **serverList** does not turn on SSR.

Custom pages without **ms3FavoritesPage** — still **[ms3FavoritesIds](ms3FavoritesIds) → [pdoPage](/en/components/pdotools/snippets/pdopage) → [ms3Favorites](ms3Favorites)** (or `msProducts`) — see [Integration](../integration).

**Server-side tab math:** for each tab, IDs come from the DB (logged-in user or guest `session_id` when `ms3favorites.guest_db_enabled`), ordered by **`sortBy`**; if the DB is empty for a guest, cookie IDs are merged in. Result fills **`tabCounts`** and **`ms3f.total`**.

::: warning Built-in page pagination parameters removed
Snippet parameters **`usePdoPage`**, old page **`limit`**, and **`pageVarKey`** are **not used**. Server paging for products on `/wishlist/` uses the chunk-embedded **pdoPage** + **msProducts** path when **`serverList=1`**; for another resource use **ms3FavoritesIds → pdoPage → ms3Favorites** (or `msProducts`) — see [Integration](../integration).
:::

**Extended toolbar (Catalog / Clear / Share):** `extendedToolbar=1` or `&tpl=tplFavoritesPageDemo` (same file as `tplFavoritesPage`).

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **tpl** | Page wrapper chunk | `tplFavoritesPage` |
| **serverList** | For **products**: `1` — SSR in chunk (**pdoPage** + **msProducts**); `0` — list via **`favorites.js`** (`render`) | `1` |
| **extendedToolbar** | `1` — show Catalog, Clear list, Share | `false` (forced `true` when `tpl` is `tplFavoritesPageDemo`) |
| **itemTpl** | Item chunk (for `render()` in JS mode) | `tplFavoritesPageItem` |
| **emptyTpl** | Empty-state chunk (for `render()`) | `tplFavoritesEmpty` |
| **list** | Active list (or from `$_REQUEST['list']`) | `default` |
| **resource_type** | Resource type | `products` |
| **sortBy** | ID order for tab counts: `added_at_desc`, `added_at_asc` | `added_at_desc` |

## Placeholders and chunk properties

| Name | Description |
|------|-------------|
| `[[+ms3f.total]]` | Set via `$modx->setPlaceholder` — total items across `default` + `gifts` + `plans` |
| **Passed into chunk `tpl`:** `itemTpl`, `emptyTpl`, `list`, `resource_type`, `extendedToolbar`, **`tabCounts`**, **`useServerProductList`**, **`serverListIdsStr`**, etc. (see chunk `tplFavoritesPage`) |

In the Fenom chunk: e.g. `{$tabCounts.default}`, `{$list}`, `{$resource_type}`.

## Examples

**Default (SSR products):**

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```
:::

**JS-only product list (no SSR in chunk):**

::: code-group
```modx
[[!ms3FavoritesPage? &serverList=`0`]]
```

```fenom
{'!ms3FavoritesPage' | snippet : ['serverList' => false]}
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

## Pagination outside /wishlist/

Use a separate resource or block as in [Integration](../integration) (**ms3FavoritesIds** + **pdoPage** + **ms3Favorites** / **msProducts**).

Guests with an empty DB still get list data from the browser after JS init; server-side tab totals may stay zero until DB or cookie data exists.

**Clear list with SSR:** on a server-rendered product list, “Clear” or removing the last card may trigger a full page reload so the empty state markup matches.
