---
title: ms3FavoritesPage
---
# Сниппет ms3FavoritesPage

Страница `/wishlist/` — вывод списков с табами, фильтрами, кнопкой «Добавить все в корзину».

Режимы: `usePdoPage=0` (по умолчанию) — контент заполняется через JS из `localStorage/cookie` `usePdoPage=1` — серверный вывод с pdoPage.

pdoPage работает только для авторизованных пользователей (ids из БД). Для гостей при пустой БД используется JS-режим.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **tpl** | Чанк обёртки страницы | `tplFavoritesPage` |
| **itemTpl** | Чанк элемента списка | `tplFavoritesPageItem` |
| **emptyTpl** | Чанк пустого состояния | `tplFavoritesEmpty` |
| **usePdoPage** | Серверный вывод через pdoPage (только авторизованные) | `false` |
| **limit** | Товаров на странице | `12` |
| **list** | Текущий список (или из `$_REQUEST['list']`) | `default` |
| **pageVarKey** | Имя параметра страницы в URL | `page` |
| **resource_type** | Тип ресурсов | `products` |
| **sortBy** | Сортировка: `added_at_desc`, `added_at_asc` | `added_at_desc` |

## Плейсхолдеры в чанке

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+ms3f.total]]` | Общее количество элементов |
| `[[+itemTpl]]` | Чанк элемента |
| `[[+emptyTpl]]` | Чанк пустого состояния |
| `[[+pageItems]]` | HTML списка (при usePdoPage) |
| `[[+pageNav]]` | Навигация пагинации |
| `[[+usePdoPageItems]]` | `1` — серверный вывод, `0` — JS |
| `[[+list]]` | Текущий список |
| `[[+resource_type]]` | Тип ресурсов |
| `[[+tabCounts]]` | Массив счётчиков по табам (`default`, `gifts`, `plans`) |

## Примеры

**Базовый:**

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```
:::

**С пагинацией:**

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

Гости при пустой БД по-прежнему видят JS-режим (данные из localStorage).
