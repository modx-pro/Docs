---
title: ms3FavoritesLists
---
# Snippet ms3FavoritesLists

Outputs the current user’s favorites lists (or for user set via `user`) with item count per list. For guests with empty DB, data is taken from cookie.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **user** | MODX user ID; `0` — current logged-in user or guest | `0` |
| **resource_type** | Resource type: `products`, `resources` | `products` |
| **withItems** | Pass ID string to chunk (`ms3f_ids`). `1` — yes, `0` — name and count only | `1` |
| **limit** | Max lists in result; `0` — no limit | `0` |
| **offset** | Skip lists from start | `0` |
| **sortby** | Sort: `name` (by name), `count` (by count) | `name` |
| **sortdir** | Direction: `ASC`, `DESC` | `ASC` |
| **tpl** | Row chunk | `tplMs3fListsRow` |
| **tplWrapper** | Wrapper chunk (e.g. `<ul>`); empty — no wrapper | — |

List page links use **ms3favorites.list_page** (default `wishlist/`).

## Row chunk placeholders

| Placeholder | Description |
|-------------|-------------|
| `[[+ms3f_list_name]]` | List name |
| `[[+ms3f_list_title]]` | Title from lexicon or name |
| `[[+ms3f_list_url]]` | List page URL (from `ms3favorites.list_page`) |
| `[[+ms3f_count]]` | Item count |
| `[[+ms3f_ids]]` | Comma-separated IDs (when withItems=1) |

## Examples

::: code-group
```modx
[[!ms3FavoritesLists? &tplWrapper=`tplMs3fListsWrapper`]]
```

```fenom
{'!ms3FavoritesLists' | snippet : [
  'tpl' => 'tplMs3fListsRow',
  'tplWrapper' => 'tplMs3fListsWrapper',
  'sortby' => 'count',
  'sortdir' => 'DESC'
]}
```
:::

**Without wrapper:**

::: code-group
```modx
[[!ms3FavoritesLists? &tpl=`tplMs3fListsRow` &withItems=`0`]]
```

```fenom
{'!ms3FavoritesLists' | snippet : ['tpl' => 'tplMs3fListsRow', 'withItems' => '0']}
```
:::
