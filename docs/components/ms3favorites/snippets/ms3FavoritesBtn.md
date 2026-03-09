---
title: ms3FavoritesBtn
---
# Сниппет ms3FavoritesBtn

Выводит кнопку добавления/удаления из избранного. Показывает состояние «в избранном» / «не в избранном» и подсказку (tooltip) из лексикона.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **id** | ID ресурса/товара (обязательный) | `—` |
| **list** | Идентификатор списка | `default` |
| **resource_type** | Тип ресурсов: `products`, `resources` | `products` |
| **tpl** | Чанк кнопки | `tplMs3fBtn` |
| **remove** | `1` — перезагрузка при удалении; или префикс id элемента (product-item) для удаления `#product-item-{id}` | `—` |
| **label** | Метка для аналитики (передаётся в чанк) | `—` |
| **classes** | Дополнительные CSS-классы | `—` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+ms3f_id]]` | ID ресурса |
| `[[+ms3f_list]]` | Имя списка |
| `[[+ms3f_resource_type]]` | Тип ресурсов |
| `[[+ms3f_in_favorites]]` | 1 — в избранном, 0 — нет |
| `[[+ms3f_tooltip]]` | Текст подсказки |
| `[[+ms3f_label]]` | Метка для аналитики |
| `[[+ms3f_classes]]` | Дополнительные классы |
| `[[+ms3f_remove_attr]]` | data-атрибут для удаления |

## Примеры

**В карточке товара (MODX):**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[+id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $id]}
```
:::

**На странице товара:**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id]}
```
:::

**С перезагрузкой при удалении:**

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]` &remove=`1`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id, 'remove' => '1']}
```
:::

**С удалением блока по префиксу ID:**

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

**Кнопка в стиле box (wishlist, tooltip):**

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
