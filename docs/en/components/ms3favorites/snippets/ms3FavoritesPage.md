---
title: ms3FavoritesPage
---
# Snippet ms3FavoritesPage

The `/wishlist/` page — lists with tabs, filters, and “Add all to cart” button.

Modes: `usePdoPage=0` (default) — content is filled via JS from `localStorage`/cookie; `usePdoPage=1` — server output with pdoPage.

pdoPage works only for logged-in users (IDs from DB). For guests with empty DB, JS mode is used.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **tpl** | Page wrapper chunk | `tplFavoritesPage` |
| **itemTpl** | List item chunk | `tplFavoritesPageItem` |
| **emptyTpl** | Empty state chunk | `tplFavoritesEmpty` |
| **usePdoPage** | Server output via pdoPage (logged-in only) | `false` |
| **limit** | Items per page | `12` |
| **list** | Current list (or from `$_REQUEST['list']`) | `default` |
| **pageVarKey** | URL page parameter name | `page` |
| **resource_type** | Resource type | `products` |
| **sortBy** | Sort: `added_at_desc`, `added_at_asc` | `added_at_desc` |

## Chunk placeholders

| Placeholder | Description |
|-------------|-------------|
| `[[+ms3f.total]]` | Total item count |
| `[[+itemTpl]]` | Item chunk |
| `[[+emptyTpl]]` | Empty state chunk |
| `[[+pageItems]]` | List HTML (when usePdoPage) |
| `[[+pageNav]]` | Pagination nav |
| `[[+usePdoPageItems]]` | `1` — server output, `0` — JS |
| `[[+list]]` | Current list |
| `[[+resource_type]]` | Resource type |
| `[[+tabCounts]]` | Tab count array (`default`, `gifts`, `plans`) |

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

**With pagination:**

::: code-group
```modx
[[!ms3FavoritesPage?
  &usePdoPage=`1`
  &limit=`12`
]]
```

```fenom
{'!ms3FavoritesPage' | snippet : [
  'usePdoPage' => 1,
  'limit' => 12
]}
```
:::

Guests with empty DB still see JS mode (data from localStorage).
