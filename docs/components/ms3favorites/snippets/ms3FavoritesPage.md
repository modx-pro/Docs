---
title: ms3FavoritesPage
---
# Сниппет ms3FavoritesPage

Страница `/wishlist/` — табы списков (`default`, `gifts`, `plans`), тулбар («Добавить все в корзину», выбор чекбоксов и т.д.), контейнер под карточки.

**Вывод карточек:** HTML списка **не собирается PHP-пагинацией**. Встроенный скрипт в чанке `tplFavoritesPage` вызывает `window.ms3Favorites.render()` — данные из `localStorage`/`cookie` и синхронизации с БД (как у остального фронта).

**Что делает сервер:** для каждого таба подсчитываются ID из БД (авторизованный пользователь или гость с `session_id` при `ms3favorites.guest_db_enabled`) с учётом **`sortBy`**; если в БД пусто, для гостя подмешиваются ID из cookie. Результат попадает в **`tabCounts`** и в плейсхолдер **`ms3f.total`** (сумма по трём табам). Так корректно отображаются числа в табах до и после загрузки JS.

::: warning Удалён параметр `usePdoPage`
В актуальных сборках пакета встроенный вызов pdoPage в чанке страницы **убран**. Параметры `usePdoPage`, `limit` (для страницы), `pageVarKey` у сниппета **не используются**. Серверную пагинацию собирайте отдельно: **[ms3FavoritesIds](ms3FavoritesIds) → [pdoPage](/components/pdotools/snippets/pdopage) → [ms3Favorites](ms3Favorites)** (или `msProducts`) — см. [Интеграция и кастомизация](../integration).
:::

**Панель «Каталог / Очистить / Поделиться»:** `extendedToolbar=1` или `&tpl=tplFavoritesPageDemo` (тот же файл, что и `tplFavoritesPage`).

## Параметры

| Параметр | Описание | По умолчанию |
|----------|----------|--------------|
| **tpl** | Чанк обёртки страницы | `tplFavoritesPage` |
| **extendedToolbar** | `1` — показать кнопки Каталог, Очистить, Поделиться | `false` (становится `true` при `tpl=tplFavoritesPageDemo`) |
| **itemTpl** | Чанк элемента списка (для `render()`) | `tplFavoritesPageItem` |
| **emptyTpl** | Чанк пустого состояния (для `render()`) | `tplFavoritesEmpty` |
| **list** | Активный список (или из `$_REQUEST['list']`) | `default` |
| **resource_type** | Тип ресурсов | `products` |
| **sortBy** | Порядок ID при подсчёте счётчиков: `added_at_desc`, `added_at_asc` | `added_at_desc` |

## Плейсхолдеры и данные для чанка

| Имя | Описание |
|-----|----------|
| `[[+ms3f.total]]` | Устанавливается через `$modx->setPlaceholder` — суммарное число элементов по табам `default` + `gifts` + `plans` (для вывода вне чанка страницы) |
| **В чанк `tpl` передаются:** `itemTpl`, `emptyTpl`, `list`, `resource_type`, `extendedToolbar`, **`tabCounts`** (массив с ключами `default`, `gifts`, `plans`) |

В Fenom-чанке используются, например, `{$tabCounts.default}`, `{$list}`, `{$resource_type}`.

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

## Пагинация

Не через `ms3FavoritesPage`. Соберите отдельный ресурс или блок по схеме из [Интеграции](../integration) (ms3FavoritesIds + pdoPage + ms3Favorites / msProducts).

Гости при пустой БД видят данные из браузера после инициализации JS; счётчики на сервере могут быть нулевыми до появления записей в БД или cookie.
