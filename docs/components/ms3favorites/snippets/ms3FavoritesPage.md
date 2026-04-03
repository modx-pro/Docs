---
title: ms3FavoritesPage
---
# Сниппет ms3FavoritesPage

Страница `/wishlist/` — табы списков (`default`, `gifts`, `plans`), тулбар («Добавить все в корзину», выбор чекбоксов и т.д.), контейнер под карточки.

## Как выводятся карточки (products)

- При **`resource_type=products`** и **`serverList=1`** (по умолчанию) список товаров собирается **на сервере** в чанке: ID берутся тем же способом, что у [ms3FavoritesIds](ms3FavoritesIds) (плейсхолдер `-0` или `1,2,3`), затем **pdoPage** с **`element=msProducts`**, сортировка `FIELD(msProduct.id,…)`, пагинация через плейсхолдеры `ms3f.page.*`. Табы — ссылки `?list=default|gifts|plans` (полная перезагрузка при смене вкладки). **favorites.js** для этого списка **`render` не вызывает**; после sync обновляются счётчики на табах.
- При `&serverList=0` и `products` — прежний режим: список дорисовывает **favorites.js** (`render`, до **100** позиций на вкладку без серверной пагинации в чанке).
- Для **`resource_type` ≠ products** список по-прежнему через **JS** после sync; параметр **serverList** не включает SSR.

Кастомная страница без **ms3FavoritesPage** или особая вёрстка — по-прежнему **[ms3FavoritesIds](ms3FavoritesIds) → [pdoPage](/components/pdotools/snippets/pdopage) → [ms3Favorites](ms3Favorites)** (или `msProducts`) — см. [Интеграцию](../integration).

**Что делает сервер для табов:** для каждого таба подсчитываются ID из БД (авторизованный пользователь или гость с `session_id` при `ms3favorites.guest_db_enabled`) с учётом **`sortBy`**; если в БД пусто, для гостя подмешиваются ID из cookie. Результат попадает в **`tabCounts`** и в плейсхолдер **`ms3f.total`** (сумма по трём табам).

::: warning Удалены параметры встроенной пагинации страницы
Параметры **`usePdoPage`**, старый **`limit`** страницы и **`pageVarKey`** у сниппета **не используются**. Серверная разбивка для товаров на `/wishlist/` идёт через встроенный в чанк вызов **pdoPage** + **msProducts** при **`serverList=1`**; для отдельного ресурса — цепочка **ms3FavoritesIds → pdoPage → ms3Favorites** (или `msProducts`) — см. [Интеграцию](../integration).
:::

**Панель «Каталог / Очистить / Поделиться»:** `extendedToolbar=1` или `&tpl=tplFavoritesPageDemo` (тот же файл, что и `tplFavoritesPage`).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **tpl** | Чанк обёртки страницы | `tplFavoritesPage` |
| **serverList** | При **products**: `1` — SSR в чанке (**pdoPage** + **msProducts**); `0` — список через **favorites.js** (`render`) | `1` |
| **extendedToolbar** | `1` — показать кнопки Каталог, Очистить, Поделиться | `false` (становится `true` при `tpl=tplFavoritesPageDemo`) |
| **itemTpl** | Чанк элемента списка (для `render()` в JS-режиме) | `tplFavoritesPageItem` |
| **emptyTpl** | Чанк пустого состояния (для `render()`) | `tplFavoritesEmpty` |
| **list** | Активный список (или из `$_REQUEST['list']`) | `default` |
| **resource_type** | Тип ресурсов | `products` |
| **sortBy** | Порядок ID при подсчёте счётчиков: `added_at_desc`, `added_at_asc` | `added_at_desc` |

## Плейсхолдеры и данные для чанка

| Имя | Описание |
|-----|----------|
| `[[+ms3f.total]]` | Устанавливается через `$modx->setPlaceholder` — суммарное число элементов по табам `default` + `gifts` + `plans` (для вывода вне чанка страницы) |
| **В чанк `tpl` передаются:** `itemTpl`, `emptyTpl`, `list`, `resource_type`, `extendedToolbar`, **`tabCounts`**, **`useServerProductList`**, **`serverListIdsStr`** и др. (см. чанк `tplFavoritesPage`) |

В Fenom-чанке используются, например, `{$tabCounts.default}`, `{$list}`, `{$resource_type}`.

## Примеры

**Базовый (SSR товаров по умолчанию):**

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```
:::

**Только JS-список товаров (без SSR в чанке):**

::: code-group
```modx
[[!ms3FavoritesPage? &serverList=`0`]]
```

```fenom
{'!ms3FavoritesPage' | snippet : ['serverList' => false]}
```
:::

**Расширенная панель инструментов:**

::: code-group
```modx
[[!ms3FavoritesPage? &extendedToolbar=`1`]]
```

```fenom
{'!ms3FavoritesPage' | snippet : ['extendedToolbar' => 1]}
```
:::

Эквивалентно вызову с `&tpl=tplFavoritesPageDemo`.

**Другой тип ресурсов и сортировка счётчиков:**

::: code-group
```modx
[[!ms3FavoritesPage?
  &resource_type=`articles`
  &sortBy=`added_at_asc`
]]
```

```fenom
{'!ms3FavoritesPage' | snippet : [
  'resource_type' => 'articles',
  'sortBy' => 'added_at_asc'
]}
```
:::

## Пагинация вне /wishlist/

Отдельный ресурс или блок: схема из [Интеграции](../integration) (**ms3FavoritesIds** + **pdoPage** + **ms3Favorites** / **msProducts**).

Гости при пустой БД видят данные из браузера после инициализации JS; серверные счётчики могут быть нулевыми до появления записей в БД или cookie.

**Очистка списка при SSR:** на странице с серверным выводом товаров после «Очистить» или удаления последней карточки может выполняться перезагрузка страницы, чтобы совпало пустое состояние в разметке.
