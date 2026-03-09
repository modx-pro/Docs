---
title: ms3Favorites
---
# Сниппет ms3Favorites

Выводит список товаров или ресурсов по переданным ID. Используется для блока «Избранное» при серверном выводе или после получения ID из коннектора.

Поддерживает `resource_type`: `products` (msProducts), `resources` (pdoResources), `articles`, `pages`, `custom`. Для products требуется MiniShop3.

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **ids** | ID товаров/ресурсов через запятую | — |
| **list** | Имя списка (`default, gifts, plans`) | `default` |
| **resource_type** | Тип ресурсов: products, resources, articles, `pages`, `custom` | `products` |
| **tpl** | Чанк карточки товара | `tplFavoritesItem` |
| **emptyTpl** | Чанк пустого состояния | `tplFavoritesEmpty` |
| **limit** | Макс. количество в выборке | из настройки `ms3favorites.max_items` (20) |
| **page** | Номер страницы (для `pdoPage`) | 1 |
| **offset** | Смещение (для `pdoPage`) | (page-1)*limit |
| **totalVar** | Плейсхолдер для общего количества | — |

Параметр **ids** передаётся извне: из JS при вызове коннектора или из другого сниппета (`ms3FavoritesIds`). Для пагинации используйте **pdoPage** с `element=ms3Favorites`.

## Примеры

::: code-group

```fenom
{'!ms3Favorites' | snippet : [
  'ids' => $favoritesIds,
  'tpl' => 'tplFavoritesItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'limit' => 10
]}
```

```modx
[[!ms3Favorites?
  &ids=`[[+favorites_ids]]`
  &tpl=`tplFavoritesItem`
  &emptyTpl=`tplFavoritesEmpty`
  &limit=`10`
]]
```

:::

**С пагинацией через pdoPage:**

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'ms3Favorites',
  'ids' => $_modx->getPlaceholder('favorites_ids'),
  'list' => 'default',
  'limit' => 12,
  'tpl' => 'tplFavoritesPageItem',
  'emptyTpl' => 'tplFavoritesEmpty',
  'totalVar' => 'page.total',
  'pageNavVar' => 'page.nav'
]}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```

```modx
[[!pdoPage?
  &element=`ms3Favorites`
  &ids=`[[+favorites_ids]]`
  &list=`default`
  &limit=`12`
  &tpl=`tplFavoritesPageItem`
  &emptyTpl=`tplFavoritesEmpty`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

:::

При отсутствии товаров сниппет вернёт контент `emptyTpl`: в шаблоне можно не выводить блок при пустом результате.
