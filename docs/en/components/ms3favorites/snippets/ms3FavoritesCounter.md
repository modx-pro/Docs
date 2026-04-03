---
title: ms3FavoritesCounter
---
# Snippet ms3FavoritesCounter

Outputs the number of items in favorites. Used in header, menu, or Favorites icon.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **id** | ID of page where the list is shown (optional) | — |
| **list** | List (`default`); empty or `all` — total across all lists | `default` |
| **resource_type** | Resource type: `products`, `resources` | `products` |
| **tpl** | Chunk | `tplMs3fCounter` |

## Chunk placeholders

| Placeholder | Description |
|-------------|-------------|
| `[[+ms3f_count]]` | Item count |
| `[[+ms3f_page_id]]` | Page ID (if passed) |

## Examples

::: code-group
```modx
[[!ms3FavoritesCounter]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

**Total across all lists:**

::: code-group
```modx
[[!ms3FavoritesCounter? &list=`all`]]
```

```fenom
{'!ms3FavoritesCounter' | snippet : ['list' => 'all']}
```
:::

**Alternative — client-side counter:**

```html
<span data-favorites-count style="display: none;">0</span>
```

After load the script sets the text to 1–99 or `99+` for larger counts; when the total is zero the element stays hidden.
