---
title: Подключение на сайте
---
# Подключение на сайте

Подробное описание подключения лексикона, стилей и скриптов — в [Быстром старте](quick-start). Ниже — коннектор, кастомизация и чанки.

## Проверка интеграции

Для гостей при пустой БД данные берутся из `localStorage/cookie`. Для авторизованных и гостей (при `guest_db_enabled`) — из БД по `user_id` или `session_id`.

**Чек-лист перед проверкой**

- На каждой странице карточки товара подключены лексикон и скрипт `favorites.js`.
- У кнопки избранного заданы атрибуты `data-favorites-toggle` и `data-id`.
- При работе гостей с БД в системных настройках включено `ms3favorites.guest_db_enabled` (**Да**).
- Авторизованный пользователь открывает сайт в контексте **web** (сессия совпадает с фронтом каталога).

## Коннектор (AJAX) {#connector-ajax}

**URL:** `assets/components/ms3favorites/connector.php`

**Метод:** POST.

Действия:

- **Вывод списка избранного** — параметры `ids` (обязательно), опционально `limit`, `tpl`, `emptyTpl`, `list`, `resource_type`
- **sync** — синхронизация списков в БД (JSON). POST `lists` (JSON) или `ids`
- **create_share** — создание публичной ссылки (JSON). POST `list`. Только авторизованные
- **get_share** — получение данных по токену (JSON). POST `token`
- **`copy_share`** — копирование чужого списка в свой (JSON). POST **`token=xxx`**, **`target_list=default`** → **`{ success, ids }`**. **Гости** получают **`ids`** для **localStorage**.
- **update_comment** — обновление заметки к элементу (JSON). POST `product_id`, `list`, `comment`. При `comments_enabled`
- **add_to_cart** — добавление товаров в корзину (JSON). POST `ids` или `product_id`
- **get_popularity** — маппинг id→count (JSON). POST `ids`, `resource_type`
- **clear** — очистка списка (JSON). POST `list`, `resource_type`

**Ответ:** HTML списка; при отсутствии товаров — emptyTpl. Для действий (actions) — JSON. Если заданы `window.MODX_ASSETS_URL` или `window.MODX_BASE_URL`, JS сам формирует URL коннектора.

## Чанки

| Чанк | Назначение |
|------|------------|
| `tplFavoritesItem` | Карточка товара в списке «Избранное» |
| `tplFavoritesEmpty` | Пустое состояние (при отсутствии товаров) |
| `tplFavoritesPage` | Страница `/wishlist/` (табы, тулбар; при `resource_type=products` и `serverList=1` — SSR **pdoPage** + **msProducts** в чанке; при `serverList=0` или другом типе — карточки через `favorites.js`) |
| `tplFavoritesPageItem` | Элемент для страницы `/wishlist/` (checkbox, заметка, кнопка удаления) |
| `tplFavoritesPageDemo` | Тот же файл, что и `tplFavoritesPage`: при `&tpl=tplFavoritesPageDemo` или `&extendedToolbar=1` включается панель «Каталог / Очистить / Поделиться» |
| `tplFavoritesListSelector` | Dropdown выбора списка (`default`, `gifts`, `plans`) |
| `tplFavoritesSharePage` | Страница шаринга (обёртка) |
| `tplMs3fBtn` | Кнопка добавления/удаления в избранное (сниппет `ms3FavoritesBtn`) |
| `tplMs3fBtnWishlistBox` | Кнопка под шаблон: `li.wishlist`, `box-icon`, `icon-heart`, `tooltip` |
| `tplMs3fCounter` | Счётчик избранного (сниппет `ms3FavoritesCounter`) |
| `tplMs3fListsRow` | Строка списка избранного (сниппет `ms3FavoritesLists`) |
| `tplMs3fListsWrapper` | Обёртка для списка списков (`[[+output]]`) |
| `tplMs3fLexiconScript` | Fenom-чанк лексикона (используется сниппетом `ms3fLexiconScript`) |
| `tplCatalogRowMs3f` | Строка **каталога** (не страница избранного): `ms3FavoritesBtn` + заголовок; для **pdoPage** + **msProducts** — см. [Интеграцию](integration#catalog-pdopage-row) |

## data-атрибуты (страница /wishlist/)

| Атрибут | Элемент | Назначение |
|---------|---------|------------|
| `data-favorites-add-all` | button | Добавить все товары текущего списка в корзину |
| `data-favorites-add-selected` | button | Добавить выбранные (по checkbox) в корзину |
| `data-favorites-cart-checkbox` | input[checkbox] | Отметка товара для «Добавить выбранные» |
| `data-favorites-select-all` | input[checkbox] | Выбрать/снять все checkbox |
| `data-favorites-clear` | button | Очистить текущий список |
| `data-favorites-list-selector` | select | Dropdown выбора списка (чанк tplFavoritesListSelector) |
| `data-favorites-comment` | textarea | Заметка к элементу (при comments_enabled) |
| `data-favorites-toggle` | button | Кнопка добавления/удаления (атрибут `data-id`) |
| `data-favorites-count` | span | Счётчик количества элементов |
| `data-favorites-share` | button | Кнопка «Поделиться списком» (атрибут `data-list`) |
| `data-favorites-page-container` | div | Контейнер страницы wishlist |
| `data-server-empty` | div | `1` — список на сервере пуст (cookie/sync); выставляет **ms3FavoritesPage** |
| `data-ms3f-ssr-products` | div | `1` — SSR-список товаров в **tplFavoritesPage**; при «Очистить» и при удалении последней карточки возможна перезагрузка страницы |
| `data-favorites-mode="list"` | div | Режим удаления карточки при клике «Удалить» |

Чанки можно переопределять своими (Fenom или MODX); параметры `tpl` и `emptyTpl` задаются в сниппете и при вызове `render()` в JS.

## Стили и BEM

Классы с префиксом **ms3f** (BEM): `ms3f__list`, `ms3f__item` и др. Файл стилей: `assets/components/ms3favorites/css/favorites.css`. Карточки по умолчанию используют Bootstrap (`ms3-product-card`, `product-image-wrapper`); для корректного отображения подключите Bootstrap и при необходимости стили каталога.

На мобильных устройствах — горизонтальный скролл списка (`.ms3f__list`).

## CSS-переменные {#css-variables}

Переопределяйте в своей теме (`:root` или контейнер блока):

| Переменная | Описание |
|------------|----------|
| `--ms3f-bg` | Фон карточки |
| `--ms3f-border` | Граница |
| `--ms3f-radius` | Скругление |
| `--ms3f-color` | Цвет текста |
| `--ms3f-price-color` | Цвет цены |
| `--ms3f-button-active` | Акцентный цвет: активная кнопка избранного, основные кнопки на `/wishlist/`, outline фокуса, `accent-color` у чекбокса |

Переменные заданы в начале `favorites.css` в блоке `:root` и влияют на карточки списка, страницу `/wishlist/` (вкладки, тулбар, поля) и кнопку избранного. В отдельных правилах для `--ms3f-button-active` указан запасной цвет `#e74c3c`, если переменная не переопределена.

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
3. **iziToast** — если на странице уже есть глобальный `iziToast`; иначе скрипт и стили один раз подгружаются из `ms3fConfig.iziToastBaseUrl` (по умолчанию задаётся в `ms3fLexiconScript`).

Отключить стандартные уведомления: `window.ms3fConfig.showToast = false` (до загрузки `favorites.js`).

Кастомизация внешнего вида iziToast — через API библиотеки после загрузки или через свой `notify`.

## JavaScript API

Актуально для объекта, который экспортирует `assets/components/ms3favorites/js/favorites.js` (`window.ms3Favorites`).

```javascript
window.ms3Favorites = {
  // Списки и тип ресурса (второй/третий аргументы опциональны — берутся из контекста страницы / storage)
  getList(name?, resourceType?),
  getAllLists(resourceType?), // без аргумента — слияние списков по всем типам из byType (для /wishlist/ обычно передают тип страницы)
  add(id, list?, resourceType?),
  remove(id, list?, resourceType?),
  clearList(list?, resourceType?), // локально очистить список и комментарии к позициям; кнопка «Очистить» дополнительно шлёт POST action=clear
  switchList(name),

  render(selector, options), // selector: строка (querySelector) или DOM-элемент с id → регистрируется как #id; options: list, tpl, emptyTpl, limit, resource_type или resourceType
  updateCounter(),
  updateButtonStates(),

  sync(options?), // для каждого типа: POST action=sync с локальными списками, ответ сервера записывается в storage; authoritative: true — флаг «локальное состояние — источник правды» (см. flushToServer)
  flushToServer(), // обёртка: sync({ authoritative: true }) и событие ms3f:synced

  createShare(list?, resourceType?), // Promise → token | null (только авторизованные)
  copyFromShare(token), // Promise → массив ID; список назначения — текущий активный (перед вызовом при необходимости switchList)

  addToCart(ids), // Promise → число добавленных в корзину MiniShop3
  addSelectedToCart(), // Promise — по отмеченным [data-favorites-cart-checkbox]
  updateComment(productId, list?, comment, resourceType?), // заметка до лимита COMMENT_MAX_LENGTH в коде (500)

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

## Интеграция mxQuickView и mFilter

**mxQuickView:** ms3Favorites подписывается на события `mxqv:loaded` и `mxqv:open`. После загрузки контента в модальное окно вызывается `updateButtonStates()` — кнопки избранного работают без дополнительной настройки.

**mFilter:** При наличии контейнера результатов (`[data-mfilter-results]`, `.mfilter-results` или `[data-mfilter-id]`) `ms3Favorites` использует `MutationObserver` и вызывает `updateButtonStates()` при обновлении DOM. Для кастомного селектора задайте `window.ms3fConfig.mfilterContainer` до загрузки `favorites.js`.
