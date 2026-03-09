---
title: ms3FavoritesPopularity
---
# Сниппет ms3FavoritesPopularity

Показывает, сколько пользователей добавили ресурс в избранное (например: «У 12 пользователей в избранном»).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **resource_id** | ID ресурса (обязательный) | `—` |
| **resource_type** | Тип ресурсов: `products`, `resources` | `products` |
| **tpl** | Чанк для вывода. Плейсхолдеры: `[[+count]]`, `[[+resource_id]]`, `[[+text]]`. Пусто — только число | `—` |
| **minCount** | Не выводить, если `count < minCount` | `0` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+count]]` | Количество пользователей |
| `[[+resource_id]]` | ID ресурса |
| `[[+text]]` | Текст из лексикона (ms3favorites_popularity) |

## Примеры

**В карточке товара:**

::: code-group
```modx
<span class="ms3f__popularity">[[!ms3FavoritesPopularity? &resource_id=`[[+id]]`]]</span>
```

```fenom
<span class="ms3f__popularity">{'!ms3FavoritesPopularity' | snippet : ['resource_id' => $id]}</span>
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

**С кастомным чанком:**

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
  body: new URLSearchParams({ action: 'get_popularity', ids: '1,2,3', resource_type: 'products' })
}).then(r => r.json()).then(counts => { /* {1: 5, 2: 12, 3: 0} */ });
```
