---
title: Быстрый старт
---
# Быстрый старт

Подключение списка избранного (Wishlist) на сайте с MiniShop3.

**Имена сниппетов:** `ms3FavoritesBtn`, `ms3FavoritesCounter`, `ms3FavoritesIds`, `ms3FavoritesLists`.

Примеры на **Fenom** требуют [pdoTools](/components/pdotools/) **3.x**.

## Установка

### Требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MiniShop3 | установлен |
| pdoTools | 3.0.0+ |

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3** и **pdoTools**
4. Найдите **ms3Favorites** в списке и нажмите **Download**, затем **Install**
5. **Настройки → Очистить кэш**

### После установки

Плагин **ms3fFrontend** подключает CSS/JS и inline-конфиг. На сайте нужны кнопка в карточке и блок избранного.

## Шаг 1: Лексикон, стили и скрипт

**По умолчанию** достаточно включённого плагина **ms3fFrontend**. CSS/JS берутся из [ms3favorites.frontend_assets](settings) (`favorites.min.css`, `favorites.min.js`). Лексикон и `window.ms3fConfig`: **register_global_config** (как `ms3_frontend_assets` / `ms3_register_global_config` в MiniShop3). Ручные теги в шаблоне **не нужны**.

**Ручной режим:** плагин отключён, `register_global_config = Нет` или нужен полный контроль в шаблоне. Подключите **сначала** лексикон, затем CSS и JS:

::: code-group

```fenom
{'ms3fLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | config}components/ms3favorites/css/favorites.min.css">
<script src="{'assets_url' | config}components/ms3favorites/js/favorites.min.js" defer></script>
```

```modx
[[!ms3fLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3favorites/css/favorites.min.css">
<script src="[[++assets_url]]components/ms3favorites/js/favorites.min.js" defer></script>
```
:::

::: tip Fenom и `auto_escape`
Если после добавления строк страница пустая, проверьте лог MODX на ошибки `ms3fLexiconScript`. При включённом **auto_escape** в Fenom выводите сниппет как сырой HTML, например `{raw ('ms3fLexiconScript' | snippet)}` (точный синтаксис зависит от версии Fenom).
:::

Без лексикона (ни плагином, ни сниппетом) русскими остаются тосты очистки списка, шаринга, копирования списка и результата корзины. Остальные подписи показываются ключами `ms3favorites_*`.

## Шаг 2: Кнопка «В избранное»

В карточке товара: сниппет [ms3FavoritesBtn](snippets/ms3FavoritesBtn).

::: code-group

```modx
[[!ms3FavoritesBtn? &id=`[[*id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id]}
```
:::

В чанке карточки (например в выводе msProducts):

::: code-group

```modx
[[!ms3FavoritesBtn? &id=`[[+id]]`]]
```

```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $id]}
```
:::

**Перезагрузка страницы после удаления** (опционально):

::: code-group
```modx
[[!ms3FavoritesBtn? &id=`[[*id]]` &remove=`1`]]
```
```fenom
{'!ms3FavoritesBtn' | snippet : ['id' => $_modx->resource.id, 'remove' => 1]}
```
:::

Готовая кнопка с подсказкой: чанк `tplMs3fBtnWishlistBox`, параметр `tpl`. Вызов на странице [ms3FavoritesBtn](snippets/ms3FavoritesBtn).

**Удаление обёртки по префиксу ID** (например `#product-item-{id}`):

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

Параметры сниппета: `list`, `tpl`, `remove`, `classes`, `resource_type`, `label`. См. [ms3FavoritesBtn](snippets/ms3FavoritesBtn).

Уведомление показывается автоматически (iziToast / MiniShop3 `ms3Message` / свой `ms3fConfig.notify`). См. [Интеграцию](integration).

## Шаг 3: Счётчик избранного

**На клиенте** (JS подставляет значение при загрузке):

```html
<a href="/wishlist/">
  <span>Избранное</span>
  <span data-favorites-count style="display: none;">0</span>
</a>
```

Без `data-resource-type` или со значением `all` скрипт суммирует все типы. Тип задан, а `data-list` пуст или равен `all`: сумма списков этого типа. Оба атрибута заданы: один список.

Штатный чанк `tplMs3fCounter` пишет тип и список из параметров сниппета. Один список товаров: `<span data-favorites-count data-resource-type="products" data-list="default"></span>`.

**Серверный сниппет** [ms3FavoritesCounter](snippets/ms3FavoritesCounter):

::: code-group

```modx
[[!ms3FavoritesCounter]]
```

```fenom
{'!ms3FavoritesCounter' | snippet}
```
:::

::: code-group
```modx
<a href="/wishlist/">Избранное [[!ms3FavoritesCounter]]</a>
```
```fenom
<a href="/wishlist/">Избранное {'!ms3FavoritesCounter' | snippet}</a>
```
:::

Сумма по всем спискам: `&list=all` / `['list' => 'all']`.

После загрузки скрипт подставит в счётчик число от 1 до 99 или подпись «99+», если позиций больше. Если в избранном ничего нет, элемент остаётся скрытым.

## Шаг 4: Блок избранного

**Клиентская отрисовка (JS).** Класс `ms3f__list`: flex и горизонтальный скролл на мобильных. Контейнер заполняется из **localStorage/cookie** через коннектор:

```html
<div id="wishlist-list" class="ms3f__list"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.ms3Favorites) {
    window.ms3Favorites.render('#wishlist-list');
  }
});
</script>
```

Опции `render`: `limit`, `tpl`, `emptyTpl`, `list`, `resource_type`. Те же имена, что у [коннектора](frontend#connector-ajax).

Если локальный список пуст, коннектор не вызывается: в контейнер подставляется `<p class="ms3f__empty">` с текстом из лексикона. Опция `emptyTpl` уходит на сервер только при непустом списке ID.

**Серверный вывод.** Плейсхолдер с ID: сниппет [ms3FavoritesIds](snippets/ms3FavoritesIds).

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
  {'!ms3Favorites' | snippet : [
    'ids' => $idsStr,
    'tpl' => 'tplFavoritesItem',
    'emptyTpl' => 'tplFavoritesEmpty'
  ]}
{/if}
```

:::

### Перечень именованных списков (табы / меню)

Сниппет [ms3FavoritesLists](snippets/ms3FavoritesLists) выводит списки пользователя с количеством элементов. Ссылки формируются по [системной настройке](settings) `ms3favorites.list_page` (по умолчанию `wishlist/`).

::: code-group
```modx
[[!ms3FavoritesLists? &tplWrapper=`tplMs3fListsWrapper`]]
```
```fenom
{'!ms3FavoritesLists' | snippet : ['tplWrapper' => 'tplMs3fListsWrapper']}
```
:::

Без `tplWrapper` выводятся только строки чанка `tplMs3fListsRow`.

### Своя страница с пагинацией (pdoPage + msProducts)

Отдельный ресурс со **своим** шаблоном и постраничным выводом. На `/wishlist/` при `serverList=1` и `resource_type=products` пагинация уже в **ms3FavoritesPage**. Цепочка здесь: ID → проверка пустоты → вывод и кнопка «Очистить».

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`myf.ids`]]
[[!+myf.ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!pdoPage?
    &element=`msProducts`
    &parents=`0`
    &limit=`12`
    &resources=`[[!+myf.ids]]`
    &sortby=`FIELD(msProduct.id, [[!+myf.ids]])`
  ]]
  <button type="button" data-favorites-clear>[[%ms3favorites_clear_list]]</button>
  [[!+page.nav]]
`]]
```
```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'myf.ids']}
{set $idsStr = $_modx->getPlaceholder('myf.ids')}
{if $idsStr == '-0'}
  <p>{$_modx->lexicon('ms3favorites_empty')}</p>
{else}
  {'pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'limit' => 12,
    'resources' => $idsStr,
    'sortby' => 'FIELD(msProduct.id, ' ~ $idsStr ~ ')'
  ]}
  <button type="button" data-favorites-clear>{$_modx->lexicon('ms3favorites_clear_list')}</button>
  {$_modx->getPlaceholder('page.nav')}
{/if}
```
:::

### Каталог: pdoPage + msProducts, счётчик и кнопка в строке

Обычный **каталог** с пагинацией. В строке: список `default`. Сверху: счётчик. Для строки каталога используйте чанк **`tplCatalogRowMs3f`**.

AJAX-каталог с этим чанком: [Интеграция](integration#catalog-pdopage-row).

::: code-group
```modx
<p>В избранное [[!ms3FavoritesCounter? &list=`default` &resource_type=`products`]]</p>
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &limit=`10`
  &tpl=`tplCatalogRowMs3f`
  &totalVar=`page.total`
  &pageNavVar=`page.nav`
]]
<nav class="pagination">[[!+page.nav]]</nav>
```

```fenom
<p>В избранное {'!ms3FavoritesCounter' | snippet : ['list' => 'default', 'resource_type' => 'products']}</p>
{'!pdoPage' | snippet : [
  'element' => 'msProducts',
  'parents' => 0,
  'limit' => 10,
  'tpl' => 'tplCatalogRowMs3f',
  'totalVar' => 'page.total',
  'pageNavVar' => 'page.nav'
]}
<nav class="pagination">{$_modx->getPlaceholder('page.nav')}</nav>
```
:::

### Пагинация: pdoPage + ms3Favorites

Тот же **ms3FavoritesIds**, но **pdoPage** оборачивает сниппет **ms3Favorites** (не msProducts). Параметры **`page`**, **`offset`**, **`totalVar`** у **ms3Favorites** рассчитаны на работу с **pdoPage**. Подробнее: [Интеграция](integration).

::: code-group
```modx
[[!ms3FavoritesIds? &toPlaceholder=`myf.ids` &list=`default`]]
[[!+myf.ids:is=`-0`:then=`
  <p>[[%ms3favorites_empty]]</p>
`:else=`
  [[!pdoPage?
    &element=`ms3Favorites`
    &ids=`[[!+myf.ids]]`
    &list=`default`
    &limit=`12`
    &tpl=`tplFavoritesItem`
    &emptyTpl=`tplFavoritesEmpty`
    &totalVar=`page.total`
    &pageNavVar=`page.nav`
  ]]
  [[!+page.nav]]
`]]
```

```fenom
{'!ms3FavoritesIds' | snippet : ['toPlaceholder' => 'myf.ids', 'list' => 'default']}
{set $idsStr = $_modx->getPlaceholder('myf.ids')}
{if $idsStr == '-0'}
  <p>{'ms3favorites_empty' | lexicon}</p>
{else}
  {'!pdoPage' | snippet : [
    'element' => 'ms3Favorites',
    'ids' => $idsStr,
    'list' => 'default',
    'limit' => 12,
    'tpl' => 'tplFavoritesItem',
    'emptyTpl' => 'tplFavoritesEmpty',
    'totalVar' => 'page.total',
    'pageNavVar' => 'page.nav'
  ]}
  {$_modx->getPlaceholder('page.nav')}
{/if}
```
:::

## Шаг 5: Страница /wishlist/

Создайте ресурс с alias `wishlist` и шаблон с включённым плагином **ms3fFrontend** (или ручным подключением из шага 1). В контенте:

::: code-group
```modx
[[!ms3FavoritesPage]]
```

```fenom
{'!ms3FavoritesPage' | snippet}
```

:::

При `resource_type=products` и `serverList=1` карточки на `/wishlist/` выводятся на сервере (**pdoPage** + **msProducts**). При `serverList=0` список дорисовывает `favorites.js` (до 100 позиций на вкладку). Другие типы: JS после sync. См. [Интеграцию](integration#wishlist-serverlist) и [ms3FavoritesPage](snippets/ms3FavoritesPage).

Своя страница с пагинацией: **ms3FavoritesIds → pdoPage → ms3Favorites** (или `msProducts`). Примеры выше и в [Интеграции](integration).

**Расширенная панель** (Каталог / Очистить / Поделиться): `extendedToolbar` или чанк `tplFavoritesPageDemo`. См. [ms3FavoritesPage](snippets/ms3FavoritesPage).

## Стилизация (кратко)

Переопределите [CSS-переменные](frontend#css-variables): `--ms3f-button-active`, `--ms3f-bg`, `--ms3f-border`, `--ms3f-color` и др.

```css
:root {
  --ms3f-button-active: #e74c3c;
  --ms3f-bg: #fff;
  --ms3f-color: #333;
}
```

## Автоочистка гостей (cron)

Чтобы по `guest_ttl_days` удалять устаревшие записи гостей, добавьте в cron:

```bash
php /полный/путь/к/сайту/core/components/ms3favorites/cli/cleanup_guests.php
```

Скрипт ищет `config.core.php` в корне сайта и на уровень выше. Если `guest_ttl_days = 0`, очистка по TTL не выполняется.

## Что дальше

- [Системные настройки](settings): лимит, хранилище, гости в БД
- [Сниппеты](snippets/): параметры ms3Favorites, ms3FavoritesBtn, ms3FavoritesIds и др.
- [Подключение на сайте](frontend): чанки и стили
- [Интеграция и кастомизация](integration): сценарии, msProducts, корзина
