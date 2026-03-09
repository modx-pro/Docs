---
title: ms3FavoritesIds
---
# Сниппет ms3FavoritesIds

Возвращает ID элементов списка избранного. Данные берутся из БД по user_id или session_id (гости при включённом guest_db). При пустой БД — из cookie.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **list** | Идентификатор списка | default |
| **resource_type** | Тип ресурсов: products, resources | products |
| **return** | `str` — строка ID через запятую; `data` — массив | str |
| **toPlaceholder** | Имя плейсхолдера; если задано — результат в плейсхолдер, иначе вывод | — |
| **sortBy** | Сортировка: `added_at_desc`, `added_at_asc` | added_at_desc |

## Возвращаемое значение

- Пустой список: строка `-0` (для проверки `[[+name:is="-0":then=...]]`)
- Непустой: строка ID через запятую или массив (при `return=data`)

## Примеры

**В плейсхолдер:**

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
```
:::

**Проверка пустоты и вывод:**

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`favorites_ids`]]
[[!+favorites_ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!ms3Favorites?
    &ids=`[[+favorites_ids]]`
    &tpl=`tplFavoritesItem`
    &emptyTpl=`tplFavoritesEmpty`
  ]]
`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'favorites_ids']}
{set $idsStr = $_modx->getPlaceholder('favorites_ids')}
{if $idsStr == '-0'}
  <p>{$_modx->lexicon('ms3favorites_empty')}</p>
{else}
  {'!ms3Favorites' | snippet : ['ids' => $idsStr, 'tpl' => 'tplFavoritesItem']}
{/if}
```
:::
