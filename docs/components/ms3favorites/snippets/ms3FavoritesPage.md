---
title: ms3FavoritesPage
---
# Сниппет ms3FavoritesPage

Страница `/wishlist/`: табы списков (`default`, `gifts`, `plans`), панель («Добавить все в корзину», выбор чекбоксов и т.д.), контейнер под карточки.

## Как выводятся карточки (products)

При **`resource_type=products`** и **`serverList=1`** (по умолчанию) список товаров собирается **на сервере** в чанке.

ID как у [ms3FavoritesIds](ms3FavoritesIds). Плейсхолдер: `-0` или `1,2,3`.

Затем **pdoPage** с **`element=msProducts`**. Сортировка `FIELD(msProduct.id,…)`. Флаги `showUnpublished=1` и `showZeroPrice=1`. Пагинация: плейсхолдеры `ms3f.page.*`.

Те же флаги стоят у сниппета [ms3Favorites](ms3Favorites). Число на вкладке совпадает с карточками, включая снятые с публикации и с нулевой ценой. Удалённые ресурсы в список не попадают.

**favorites.js** для этого списка **`render` не вызывает**. После sync обновляются счётчики на табах.

Удаление на странице снимает узел с `data-product-id` или `.swiper-slide`. Родитель `.ms3-product-card` снимается, только если `data-product-id` стоит внутри карточки. Когда карточек не осталось, страница перезагружается.

- При `&serverList=0` и `products`: список дорисовывает **favorites.js** (`render`, до **100** позиций на вкладку без серверной пагинации в чанке).
- Для **`resource_type` ≠ products** список через **JS** после sync. Параметр **serverList** серверный вывод не включает.

## Табы и панель

Табы: ссылки `?list=default|gifts|plans`. Смена вкладки перезагружает страницу.

**Что делает сервер для табов.** Для каждого таба считает ID из БД с учётом **`sortBy`**. Источник: авторизованный пользователь или гость с `session_id` при `ms3favorites.guest_db_enabled`. Если в БД пусто, для гостя подмешиваются ID из cookie. Результат: **`tabCounts`** и плейсхолдер **`ms3f.total`** (сумма по трём табам).

::: warning Удалены параметры встроенной пагинации страницы
Параметры **`usePdoPage`**, старый **`limit`** страницы и **`pageVarKey`** у сниппета **не используются**. Серверная разбивка для товаров на `/wishlist/` идёт через встроенный в чанк вызов **pdoPage** + **msProducts** при **`serverList=1`**. Для отдельного ресурса: цепочка **ms3FavoritesIds → pdoPage → ms3Favorites** (или `msProducts`). См. [Интеграцию](../integration).
:::

**Панель «Каталог / Очистить / Поделиться»:** `extendedToolbar=1` или `&tpl=tplFavoritesPageDemo` (тот же файл, что и `tplFavoritesPage`).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **tpl** | Чанк обёртки страницы | `tplFavoritesPage` |
| **serverList** | При **products**: `1` серверный вывод в чанке (**pdoPage** + **msProducts**). `0` список через **favorites.js** (`render`) | `1` |
| **extendedToolbar** | `1`: показать кнопки Каталог, Очистить, Поделиться | `false` (становится `true` при `tpl=tplFavoritesPageDemo`) |
| **catalogId** | ID ресурса каталога для кнопки «Перейти в каталог» (плейсхолдер `{$catalogUrl}` в чанке) | `0` (главная страница, `site_start`) |
| **itemTpl** | Чанк элемента списка (для `render()` в JS-режиме) | `tplFavoritesPageItem` |
| **emptyTpl** | Чанк пустого состояния (для `render()`) | `tplFavoritesEmpty` |
| **list** | Активный список (или из `$_GET['list']`) | `default` |
| **resource_type** | Тип ресурсов | `products` |
| **sortBy** | Порядок ID при подсчёте счётчиков: `added_at_desc`, `added_at_asc` | `added_at_desc` |
| **pageLimit** | Лимит серверного списка (pdoPage + msProducts) при `serverList=1`. Пустое значение берёт `ms3favorites.max_items`. Явный параметр важнее настройки. Потолок 100 | из `ms3favorites.max_items` (20) |
| **msProductsTpl** | Чанк карточки для msProducts в серверном списке. Пусто: используется `itemTpl` | `—` |

## Плейсхолдеры и данные для чанка

| Имя | Описание |
|-----|----------|
| `[[+ms3f.total]]` | Устанавливается через `$modx->setPlaceholder`. Суммарное число элементов по табам `default` + `gifts` + `plans` (для вывода вне чанка страницы) |

**В чанк `tpl` передаются:** `itemTpl`, `emptyTpl`, `list`, `resource_type`, `extendedToolbar`, **`tabCounts`**, **`useServerProductList`**, **`serverListIdsStr`** и др. (см. чанк `tplFavoritesPage`)

В Fenom-чанке используются, например, `{$tabCounts.default}`, `{$list}`, `{$resource_type}`.

## Примеры

**Базовый (серверный вывод товаров по умолчанию):**

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```
:::

**Только JS-список товаров (без серверного вывода в чанке):**

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

Своя страница без **ms3FavoritesPage** или особая вёрстка: **[ms3FavoritesIds](ms3FavoritesIds) → [pdoPage](/components/pdotools/snippets/pdopage) → [ms3Favorites](ms3Favorites)** (или `msProducts`). См. [Интеграцию](../integration).

Гости при пустой БД видят данные из браузера после инициализации JS. Серверные счётчики могут быть нулевыми, пока нет записей в БД или cookie.

**Очистка списка при серверном выводе.** После «Очистить» или удаления последней карточки страница может перезагрузиться. Так пустое состояние в разметке совпадает.
