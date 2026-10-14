---
title: ms3FavoritesPopularity
---
# Сниппет ms3FavoritesPopularity

Показывает, сколько пользователей добавили ресурс в избранное. Пример: «У 12 пользователей в избранном».

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **resource_id** | ID ресурса (обязательный) | `—` |
| **resource_type** | Тип ресурсов: `products`, `resources`, `articles`, `pages`, `custom` | `products` |
| **tpl** | Чанк для вывода. Плейсхолдеры: `[[+count]]`, `[[+resource_id]]`, `[[+text]]`. Пусто — фраза лексикона «У N пользователей в избранном» | `—` |
| **minCount** | Не выводить, если `count < minCount` | `0` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+count]]` | Количество пользователей |
| `[[+resource_id]]` | ID ресурса |
| `[[+text]]` | Текст из лексикона (ms3favorites_popularity) |

Независимо от чанка сниппет ставит плейсхолдеры `[[+ms3f_popularity_count]]`, `[[+ms3f_popularity_resource_id]]`, `[[+ms3f_popularity_text]]`. Их можно использовать на странице после вызова.

## Примеры

**В карточке товара:**

::: code-group
```modx
[[!ms3FavoritesPopularity? &resource_id=`[[+id]]`]]
```

```fenom
{'!ms3FavoritesPopularity' | snippet : ['resource_id' => $id]}
```
:::

**С минимальным порогом (не показывать, если меньше 2):**

::: code-group
```modx
[[!ms3FavoritesPopularity?
  &resource_id=`[[+id]]`
  &minCount=`2`
]]
```

```fenom
{'!ms3FavoritesPopularity' | snippet : [
  'resource_id' => $id,
  'minCount' => 2
]}
```
:::

**Со своим чанком:**

::: code-group
```modx
[[!ms3FavoritesPopularity?
  &resource_id=`[[+id]]`
  &tpl=`tplPopularityBadge`
]]
```

```fenom
{'!ms3FavoritesPopularity' | snippet : [
  'resource_id' => $id,
  'tpl' => 'tplPopularityBadge'
]}
```
:::

**Клиентская загрузка** (connector action `get_popularity`):

```javascript
fetch(connectorUrl, {
  method: 'POST',
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  body: new URLSearchParams({ action: 'get_popularity', ids: '1,2,3', resource_type: 'products' })
}).then(r => r.json()).then(counts => { /* {1: 5, 2: 12, 3: 0} */ });
```
