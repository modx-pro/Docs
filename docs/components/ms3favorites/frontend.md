---
title: Подключение на сайте
---
# Подключение на сайте

CSS, JS и inline `ms3fLexicon` / `ms3fConfig` по умолчанию подключает плагин **ms3fFrontend**. См. [Системные настройки](settings) (`frontend_assets`, `register_global_config`). Ручное подключение — в [Быстром старте](quick-start).

## Проверка интеграции

Для гостей при пустой БД данные берутся из `localStorage/cookie`. Для авторизованных и гостей (при `guest_db_enabled`) — из БД по `user_id` или `session_id`.

**Чек-лист перед проверкой**

- Плагин **ms3fFrontend** включён (или в шаблоне вручную подключены лексикон и `favorites.min.js`).
- У кнопки избранного заданы атрибуты `data-favorites-toggle` и `data-id`.
- При работе гостей с БД в системных настройках включено `ms3favorites.guest_db_enabled` (**Да**).
- Авторизованный пользователь открывает сайт в контексте **web** (сессия совпадает с фронтом каталога).

## Коннектор (AJAX) {#connector-ajax}

**URL:** `assets/components/ms3favorites/connector.php`

**Метод:** POST. Любое действие принимает `cultureKey` — язык лексикона ответа. Имя списка передаётся как `list` или `list_name`.

::: warning Обязательный заголовок для изменяющих действий
Действия `sync`, `create_share`, `copy_share`, `update_comment`, `add_to_cart`, `clear` принимаются только с заголовком `X-Requested-With: XMLHttpRequest`. Без него коннектор отвечает `{ "success": false, "error": "Invalid request" }`. Ограничение не касается `get_share`, `get_popularity` и HTML-отрисовки списка.
:::

Действия:

- **Вывод списка избранного** — параметры `ids` (обязательно), опционально `limit`, `tpl`, `emptyTpl`, `list`, `resource_type`
- **sync** — синхронизация списков в БД (JSON). POST `lists` (JSON) или `ids`
- **create_share** — создание публичной ссылки (JSON). POST `list`. Только авторизованные
- **get_share** — получение данных по токену (JSON). POST `token` → `{ success, ids, list_name, resource_type }`
- **`copy_share`** — копирование чужого списка в свой (JSON). POST **`token=xxx`**, **`target_list=default`** → **`{ success, ids }`**. **Гости** получают **`ids`** для **localStorage**.
- **update_comment** — обновление заметки к элементу (JSON). POST `product_id`, `list`, `comment`. При `comments_enabled`
- **add_to_cart** — добавление товаров в корзину (JSON). POST `ids` или `product_id`. Ответ `{ success, added, message }`: `message` — `cart_success` при `added > 0`, иначе `cart_error`
- **get_popularity** — маппинг id→count (JSON). POST `ids`, `resource_type`
- **clear** — очистка списка (JSON). POST `list`, `resource_type`

**Ответ:** HTML списка. При отсутствии товаров — emptyTpl. Для действий (actions) — JSON.

Сниппет **ms3fLexiconScript** (или плагин **ms3fFrontend** при `register_global_config = Да`) передаёт в `window.ms3fConfig` готовые `connectorUrl` и `siteUrl`. Учитывается поддиректория MODX. Без них JS может собрать URL из `window.MODX_ASSETS_URL`, `window.MODX_BASE_URL` или `MODX.config.base_url`.

## Чанки

| Чанк | Назначение |
|------|------------|
| `tplFavoritesItem` | Карточка товара в списке «Избранное» |
| `tplFavoritesEmpty` | Пустое состояние (при отсутствии товаров) |
| `tplFavoritesPage` | Страница `/wishlist/` (табы, панель). При `resource_type=products` и `serverList=1` — SSR **pdoPage** + **msProducts** в чанке. При `serverList=0` или другом типе — карточки через `favorites.js` |
| `tplFavoritesPageItem` | Элемент для страницы `/wishlist/` (checkbox, заметка, кнопка удаления) |
| `tplFavoritesPageDemo` | Тот же файл, что и `tplFavoritesPage`: при `&tpl=tplFavoritesPageDemo` или `&extendedToolbar=1` включается панель «Каталог / Очистить / Поделиться» |
| `tplFavoritesListSelector` | Выпадающий список (`default`, `gifts`, `plans`) |
| `tplFavoritesSharePage` | Страница шаринга (обёртка) |
| `tplMs3fBtn` | Кнопка добавления/удаления в избранное (сниппет `ms3FavoritesBtn`) |
| `tplMs3fBtnWishlistBox` | Кнопка под шаблон: `li.wishlist`, `box-icon`, `icon-heart`, `tooltip` |
| `tplMs3fCounter` | Счётчик избранного (сниппет `ms3FavoritesCounter`) |
| `tplMs3fListsRow` | Строка списка избранного (сниппет `ms3FavoritesLists`) |
| `tplMs3fListsWrapper` | Обёртка для списка списков (`[[+output]]`) |
| `tplMs3fLexiconScript` | Присутствует в пакете, но в отрисовке не участвует: `ms3fLexiconScript` собирает `<script>` в PHP-хелпере |
| `tplCatalogRowMs3f` | Строка **каталога** (не страница избранного): `ms3FavoritesBtn` + заголовок. Для **pdoPage** + **msProducts** см. [Интеграцию](integration#catalog-pdopage-row) |

## data-атрибуты (страница /wishlist/)

| Атрибут | Элемент | Назначение |
|---------|---------|------------|
| `data-favorites-add-all` | button | Добавить все товары текущего списка в корзину |
| `data-favorites-add-selected` | button | Добавить выбранные (по checkbox) в корзину |
| `data-favorites-cart-checkbox` | input[checkbox] | Отметка товара для «Добавить выбранные» |
| `data-favorites-select-all` | input[checkbox] | Выбрать/снять все checkbox |
| `data-favorites-clear` | button | Очистить текущий список |
| `data-favorites-list-selector` | select | Выбор списка (чанк tplFavoritesListSelector) |
| `data-favorites-comment` | textarea | Заметка к элементу (при comments_enabled) |
| `data-favorites-toggle` | button | Кнопка добавления/удаления (атрибут `data-id`) |
| `data-favorites-count` | span | Счётчик количества элементов |
| `data-favorites-share` | button | Кнопка «Поделиться списком» (атрибут `data-list`) |
| `data-favorites-page-container` | div | Контейнер страницы wishlist |
| `data-favorites-page-tabs` | ul | Табы списков на `/wishlist/` |
| `data-favorites-tab-count` | span | Счётчик элементов на табе (значение атрибута — имя списка) |
| `data-current-list` | div | Активный список на контейнере `#ms3f-page` |
| `data-server-empty` | div | `1` — список на сервере пуст (cookie/sync). Выставляет **ms3FavoritesPage** |
| `data-ms3f-ssr-products` | div | `1` — SSR-список товаров в **tplFavoritesPage**. При «Очистить» и при удалении последней карточки возможна перезагрузка страницы |
| `data-favorites-mode="list"` | div | Режим удаления карточки при клике «Удалить» |

Чанки можно заменить своими (Fenom или MODX). Параметры `tpl` и `emptyTpl` задаются в сниппете и при вызове `render()` в JS.

## Стили и BEM

Классы с префиксом **ms3f** (BEM): `ms3f__list`, `ms3f__item` и др. Файлы стилей: `assets/components/ms3favorites/css/favorites.min.css` (по умолчанию) или `favorites.css`. Чанки пакета (`tplFavoritesItem`, `tplFavoritesPageItem`) используют классы `ms3f__item`, `ms3f__image` и не требуют Bootstrap. Селектор `.ms3-product-card` встречается в JS только как запасной — при удалении карточки каталога на `/wishlist/`.

На мобильных — горизонтальный скролл списка (`.ms3f__list`).

## CSS-переменные {#css-variables}

Переопределите в своей теме (`:root` или контейнер блока):

| Переменная | Описание |
|------------|----------|
| `--ms3f-bg` | Фон карточки |
| `--ms3f-border` | Граница |
| `--ms3f-radius` | Скругление |
| `--ms3f-color` | Цвет текста |
| `--ms3f-price-color` | Цвет цены |
| `--ms3f-button-active` | Акцентный цвет: активная кнопка избранного, основные кнопки на `/wishlist/`, outline фокуса, `accent-color` у чекбокса |

Переменные заданы в начале `favorites.css` в блоке `:root`. Они влияют на карточки списка, страницу `/wishlist/` (вкладки, панель, поля) и кнопку избранного. В отдельных правилах для `--ms3f-button-active` указан запасной цвет `#e74c3c`, если переменная не задана.

Пример:

```css
:root {
  --ms3f-bg: #fff;
  --ms3f-border: #eee;
  --ms3f-radius: 0.5rem;
  --ms3f-color: #333;
  --ms3f-price-color: #e74c3c;
  --ms3f-button-active: #e74c3c;
}
```

## Уведомления (toast)

Вместо встроенного DOM-toast используется цепочка:

1. **`ms3fConfig.notify(variant, text)`** — если функция задана и возвращает `true`, стандартный вывод не выполняется (полностью своё UI).
2. **`window.ms3Message.show`** (MiniShop3) — если доступен.
3. **iziToast** — если на странице уже есть глобальный `iziToast`. Иначе скрипт и стили один раз подгружаются из `ms3fConfig.iziToastBaseUrl` (по умолчанию задаётся в `ms3fLexiconScript`).

Отключить стандартные уведомления: `window.ms3fConfig.showToast = false` (до загрузки `favorites.js`).

Внешний вид iziToast — через API библиотеки после загрузки или через свой `notify`.

## JavaScript API

Объект из `assets/components/ms3favorites/js/favorites.js` (`window.ms3Favorites`).

```javascript
window.ms3Favorites = {
  // Списки и тип ресурса (второй/третий аргументы опциональны — берутся из контекста страницы / storage)
  getList(name?, resourceType?),
  getAllLists(resourceType?), // без аргумента — слияние по всем типам из byType. На /wishlist/ обычно передают тип страницы
  add(id, list?, resourceType?),
  remove(id, list?, resourceType?),
  clearList(list?, resourceType?), // локально очистить список и комментарии. Кнопка «Очистить» дополнительно шлёт POST action=clear
  switchList(name),

  render(selector, options), // selector: строка (querySelector) или DOM-элемент с id → регистрируется как #id. options: list, tpl, emptyTpl, limit, resource_type или resourceType
  updateCounter(),
  updateButtonStates(),
  refresh(), // публичный API после AJAX-подмены карточек: счётчики + состояние кнопок [data-favorites-toggle]

  sync(options?), // для каждого типа: POST action=sync с локальными списками, ответ пишется в storage. authoritative: true — «локальное состояние — источник правды» (см. flushToServer)
  flushToServer(), // обёртка: sync({ authoritative: true }) и событие ms3f:synced

  createShare(list?, resourceType?), // Promise → token | null (только авторизованные)
  copyFromShare(token), // Promise → массив ID. Список назначения — текущий активный (перед вызовом при необходимости switchList)

  addToCart(ids), // Promise → число добавленных в корзину MiniShop3
  addSelectedToCart(), // Promise — по отмеченным [data-favorites-cart-checkbox]
  updateComment(productId, list?, comment, resourceType?), // только localStorage/cookie, до 500 символов (COMMENT_MAX_LENGTH). В БД заметка уходит отдельно: POST update_comment по blur у [data-favorites-comment]

  // Дополнительно
  getData(), // объект из localStorage/cookie (byType, _defaultType, …)
  save(data), // записать после правок и обновить счётчики, кнопки и зарегистрированные render-цели
  getTotalCount(resourceType?), // без аргумента — сумма по всем типам и спискам
  getComment(productId, listName?, resourceType?),
  getResourceTypeFromElement(el), // data-resource-type
  getAll(), // устаревшее имя: getList('default') с типом ресурса из _defaultType в данных
  toast(text, variant?),
  getConnectorUrl(),
  ensureCookie(), // используется при data-server-empty на странице списка
};
```

## Интеграция mxQuickView, mFilter и AJAX-каталога

**Публичный API:** после подмены HTML карточек вызовите `window.ms3Favorites.refresh()`. Метод обновляет счётчики и состояние кнопок `[data-favorites-toggle]` в новом DOM.

**mxQuickView:** ms3Favorites подписывается на `mxqv:loaded` и `mxqv:open` и вызывает `refresh()` автоматически.

**mFilter:** по умолчанию подписка на `mfilter:contentLoaded`. Дополнительные события — через `ms3fConfig.refreshEvents` (массив строк).

Пример для каталога с MiniShop3 и mFilter (при необходимости синхронизировать и MiniShop3):

```html
<script>
document.addEventListener('mfilter:contentLoaded', () => {
  window.ms3?.refresh?.();
  window.ms3Favorites?.refresh?.();
});
</script>
```

Для своего AJAX-компонента подпишитесь на его событие после замены HTML и вызовите `window.ms3Favorites.refresh()`.

**Запасной MutationObserver:** если компонент не шлёт события, ms3Favorites следит за контейнером результатов (`[data-mfilter-results]`, `.mfilter-results`, `[data-mfilter-id]`) и вызывает `refresh()`. Свой селектор: `ms3fConfig.mfilterContainer`. Отключить: `ms3fConfig.mfilterMutationFallback = false`.

```html
<script>
window.ms3fConfig = window.ms3fConfig || {};
window.ms3fConfig.mfilterContainer = '.my-products';
window.ms3fConfig.refreshEvents = ['myCatalog:loaded'];
</script>
```
