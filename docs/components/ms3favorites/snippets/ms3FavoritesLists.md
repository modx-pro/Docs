---
title: ms3FavoritesLists
---
# Сниппет ms3FavoritesLists

Выводит списки избранного текущего пользователя (или указанного по `user`) с количеством элементов в каждом. Для гостей при пустой БД данные берутся из cookie.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **user** | ID пользователя MODX; `0` — текущий авторизованный или гость | `0` |
| **resource_type** | Тип ресурсов: `products`, `resources` | `products` |
| **withItems** | Передавать в чанк строку ID (`ms3f_ids`). `1` — да, `0` — только имя и счётчик | `1` |
| **limit** | Лимит списков в выборке; `0` — без лимита | `0` |
| **offset** | Пропуск списков с начала | `0` |
| **sortby** | Сортировка: `name` (по имени), `count` (по количеству) | `name` |
| **sortdir** | Направление: `ASC`, `DESC` | `ASC` |
| **tpl** | Чанк строки списка | `tplMs3fListsRow` |
| **tplWrapper** | Чанк-обёртка (например `<ul>`); пусто — без обёртки | `—` |

## Плейсхолдеры в чанке строки

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+ms3f_list_name]]` | Имя списка |
| `[[+ms3f_list_title]]` | Заголовок из лексикона или имя |
| `[[+ms3f_list_url]]` | URL страницы списка (из `ms3favorites.list_page`) |
| `[[+ms3f_count]]` | Количество элементов |
| `[[+ms3f_ids]]` | Строка ID через запятую (при withItems=1) |

## Примеры

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

**Без обёртки:**

::: code-group
```modx
[[!ms3FavoritesLists? &tpl=`tplMs3fListsRow` &withItems=`0`]]
```

```fenom
{'!ms3FavoritesLists' | snippet : ['tpl' => 'tplMs3fListsRow', 'withItems' => '0']}
```
:::
