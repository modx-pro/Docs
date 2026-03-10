---
title: Подключение на сайте
---
# Подключение на сайте

Подробное описание подключения лексикона, стилей и скриптов — в [Быстром старте](quick-start). Ниже — коннектор, кастомизация и чанки.

## Проверка интеграции

Для гостей при пустой БД данные берутся из `localStorage/cookie`. Для авторизованных и гостей (при `guest_db_enabled`) — из БД по `user_id` или `session_id`.

**Чек-лист:** лексикон и `favorites.js` подключены на каждой странице товара; кнопка имеет `data-favorites-toggle` и `data-id`; `ms3favorites.guest_db_enabled` = Да; для авторизованных — пользователь авторизован в контексте **web**.

## Коннектор (AJAX)

**URL:** `assets/components/ms3favorites/connector.php`

**Метод:** POST.

Действия:

- **Вывод списка избранного** — параметры `ids` (обязательно), опционально `limit`, `tpl`, `emptyTpl`, `list`, `resource_type`
- **sync** — синхронизация списков в БД (JSON). POST `lists` (JSON) или `ids`
- **create_share** — создание публичной ссылки (JSON). POST `list`. Только авторизованные
- **get_share** — получение данных по токену (JSON). POST `token`
- **copy_share** — копирование чужого списка в свой (JSON). POST `token`, `target_list`
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
| `tplFavoritesPage` | Страница `/wishlist/` (обёртка с табами, кнопками корзины) |
| `tplFavoritesPageItem` | Элемент для страницы `/wishlist/` (checkbox, заметка, кнопка удаления) |
| `tplFavoritesPageDemo` | Demo: табы + кнопки Каталог/Очистить/Поделиться, `?list=` |
| `tplFavoritesListSelector` | Dropdown выбора списка (`default`, `gifts`, `plans`) |
| `tplFavoritesSharePage` | Страница шаринга (обёртка) |
| `tplMs3fBtn` | Кнопка добавления/удаления в избранное (сниппет `ms3FavoritesBtn`) |
| `tplMs3fBtnWishlistBox` | Кнопка под шаблон: `li.wishlist`, `box-icon`, `icon-heart`, `tooltip` |
| `tplMs3fCounter` | Счётчик избранного (сниппет `ms3FavoritesCounter`) |
| `tplMs3fListsRow` | Строка списка избранного (сниппет `ms3FavoritesLists`) |
| `tplMs3fListsWrapper` | Обёртка для списка списков (`[[+output]]`) |
| `tplMs3fLexiconScript` | Fenom-чанк лексикона (используется сниппетом `ms3fLexiconScript`) |

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
| `data-favorites-mode="list"` | div | Режим удаления карточки при клике «Удалить» |

Чанки можно переопределять своими (Fenom или MODX); параметры `tpl` и `emptyTpl` задаются в сниппете и при вызове `render()` в JS.

## Стили и BEM

Классы с префиксом **ms3f** (BEM): `ms3f__list`, `ms3f__item` и др. Файл стилей: `assets/components/ms3favorites/css/favorites.css`. Карточки по умолчанию используют Bootstrap (`ms3-product-card`, `product-image-wrapper`); для корректного отображения подключите Bootstrap и при необходимости стили каталога.

На мобильных устройствах — горизонтальный скролл списка (`.ms3f__list`).

## CSS-переменные

Переопределяйте в своей теме (`:root` или контейнер блока):

| Переменная | Описание |
|------------|----------|
| `--ms3f-bg` | Фон карточки |
| `--ms3f-border` | Граница |
| `--ms3f-radius` | Скругление |
| `--ms3f-color` | Цвет текста |
| `--ms3f-price-color` | Цвет цены |
| `--ms3f-button-active` | Цвет активной кнопки (товар в списке) |
| `--toast-bg` | Фон toast-уведомления |
| `--toast-color` | Текст toast |
| `--toast-radius` | Скругление toast |

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

## JavaScript API

```javascript
window.ms3Favorites = {
  getList(name),        // Получить ID списка
  getAllLists(),        // Все списки {default:[], gifts:[]}
  add(id, list),        // Добавить товар в список
  remove(id, list),     // Удалить из списка
  switchList(name),     // Переключить активный список
  render(selector, options),  // options: list, tpl, emptyTpl, limit
  updateCounter(), updateButtonStates(),
  sync(),               // Синхронизация (POST lists)
  createShare(list),    // Создать share-ссылку → token (только авторизованные)
  copyFromShare(token), // Скопировать чужой список (target_list опционально)
  addToCart(ids),       // Добавить товары в корзину MiniShop3
  addSelectedToCart(),  // Добавить выбранные (checkbox)
  updateComment(productId, list, comment),  // Сохранить заметку (до 500 символов)
  clear(list)           // Очистить список (action=clear)
};
```

## Интеграция mxQuickView и mFilter

**mxQuickView:** ms3Favorites подписывается на события `mxqv:loaded` и `mxqv:open`. После загрузки контента в модальное окно вызывается `updateButtonStates()` — кнопки избранного работают без дополнительной настройки.

**mFilter:** При наличии контейнера результатов (`[data-mfilter-results]`, `.mfilter-results` или `[data-mfilter-id]`) `ms3Favorites` использует `MutationObserver` и вызывает `updateButtonStates()` при обновлении DOM. Для кастомного селектора задайте `window.ms3fConfig.mfilterContainer` до загрузки `favorites.js`.
