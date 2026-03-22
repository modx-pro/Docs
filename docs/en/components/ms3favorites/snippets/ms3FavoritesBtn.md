---
title: ms3FavoritesBtn
---
# Snippet ms3FavoritesBtn

Outputs the add/remove from favorites button. Shows “in favorites” / “not in favorites” state and tooltip from the lexicon.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **id** | Resource/product ID (required) | — |
| **list** | List identifier | `default` |
| **resource_type** | Resource type: `products`, `resources`, `articles`, `pages`, `custom` | `products` |
| **tpl** | Button chunk | `tplMs3fBtn` |
| **remove** | `1` — reload on remove; or element id prefix (e.g. product-item) to remove `#product-item-{id}` | — |
| **label** | Label for analytics (passed to chunk) | — |
| **classes** | Extra CSS classes | — |

## Chunk placeholders

| Placeholder | Description |
|-------------|-------------|
| `[[+ms3f_id]]` | Resource ID |
| `[[+ms3f_list]]` | List name |
| `[[+ms3f_resource_type]]` | Resource type |
| `[[+ms3f_in_favorites]]` | 1 — in favorites, 0 — not |
| `[[+ms3f_tooltip]]` | Tooltip text |
| `[[+ms3f_label]]` | Analytics label |
| `[[+ms3f_classes]]` | Extra classes |
| `[[+ms3f_remove_attr]]` | data attribute for remove |

## Examples

**In product card (MODX):**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[+id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $id]}
```
:::

**On product page:**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id]}
```
:::

**With reload on remove:**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]` &remove=`1`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id, 'remove' => '1']}
```
:::

**Remove block by id prefix:**

::: code-group
```modx
<div id="product-item-[[+id]]">
  ...
  [[!ms3FavoritesBtn? &id=`[[+id]]` &remove=`product-item`]]
</div>
```

```fenom
<div id="product-item-{$id}">
  ...
  {'!ms3FavoritesBtn' | snippet : ['id' => $id, 'remove' => 'product-item']}
</div>
```
:::

**Box-style button (wishlist, tooltip):**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]` &tpl=`tplMs3fBtnWishlistBox`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : [
  'id' => $_modx->resource.id,
  'tpl' => 'tplMs3fBtnWishlistBox'
]}
```
:::
