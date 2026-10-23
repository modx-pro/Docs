---
title: ms3Favorites
description: Списки избранного для MiniShop3 и других ресурсов. Хранение в браузере, синхронизация в БД
categories: catalog
author: Ibochkarev
logo: https://modstore.pro/assets/extras/ms3favorites/logo.png
modstore: https://modstore.pro/packages/ecommerce/ms3favorites

compatibility:
  - modx3
  - php81
  - minishop3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'ms3Favorites', link: 'snippets/ms3Favorites' },
      { text: 'ms3FavoritesBtn', link: 'snippets/ms3FavoritesBtn' },
      { text: 'ms3FavoritesCounter', link: 'snippets/ms3FavoritesCounter' },
      { text: 'ms3FavoritesIds', link: 'snippets/ms3FavoritesIds' },
      { text: 'ms3fMergeIds', link: 'snippets/ms3fMergeIds' },
      { text: 'ms3FavoritesPage', link: 'snippets/ms3FavoritesPage' },
      { text: 'ms3FavoritesLists', link: 'snippets/ms3FavoritesLists' },
      { text: 'ms3FavoritesPopularity', link: 'snippets/ms3FavoritesPopularity' },
      { text: 'ms3FavoritesShare', link: 'snippets/ms3FavoritesShare' },
      { text: 'ms3fLexiconScript', link: 'snippets/ms3fLexiconScript' },
    ],
  },
  { text: 'Подключение на сайте', link: 'frontend' },
  { text: 'Интеграция и кастомизация', link: 'integration' },
]
---
# ms3Favorites

ms3Favorites хранит списки избранного для товаров [MiniShop3](/components/minishop3/) и других ресурсов (`resources`, `articles`, `pages`, `custom`). Список лежит в браузере (`localStorage` или `cookie`) и синхронизируется в БД для авторизованных и гостей (при `guest_db_enabled`).

## Возможности

- Блок «Избранное» по списку ID: AJAX-коннектор или серверный сниппет
- Хранение: `localStorage` (по умолчанию) или `cookie`
- Синхронизация в БД при входе. Гости: при `guest_db_enabled` по `session_id`
- Несколько списков: `default`, `gifts`, `plans` и др. (до `max_lists`)
- Шаринг: `/wishlist/share?token=xxx`, копирование чужого списка
- Страница `/wishlist/`: `ms3FavoritesPage`. Товары при `serverList=1`: **pdoPage** + **msProducts**. При `serverList=0` и других типах: JS
- Корзина: «Добавить все в корзину», «Добавить выбранные»
- Популярность: «У N пользователей в избранном»
- Типы: `products`, `resources`, `articles`, `pages`, `custom`
- Лексикон ru, en. Фронт: плагин **ms3fFrontend** или `ms3fLexiconScript`
- Вид: Fenom-чанки, BEM (`ms3f`), CSS-переменные
- Каталог: чанк `tplCatalogRowMs3f` ([интеграция](integration#catalog-pdopage-row))
- CSS/JS: плагин `ms3fFrontend`, файлы в `ms3favorites.frontend_assets`, конфиг через `register_global_config` (как `ms3_frontend_assets` в MiniShop3)
- AJAX-каталог: `window.ms3Favorites.refresh()`, `mfilter:contentLoaded`, `ms3fConfig.refreshEvents`, MutationObserver
- Уведомления: `ms3fConfig.notify` → `window.ms3Message.show` → [iziToast](https://marcelodolza.github.io/iziToast/). Файлы: `assets/components/ms3favorites/vendor/izitoast/`. URL: `ms3fConfig.iziToastBaseUrl` из `ms3fLexiconScript`

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |

### Зависимости

- **[MiniShop3](/components/minishop3/):** товары и категории
- **[pdoTools](/components/pdotools/) 3.0.0+**

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3** и **pdoTools**
4. Найдите **ms3Favorites** в списке и нажмите **Download**, затем **Install**
5. **Настройки → Очистить кэш**

### После установки

Плагин **ms3fFrontend** подключает CSS/JS и inline-конфиг. На сайте нужны кнопка в карточке и блок избранного. Ручное подключение в шаблоне: если плагин выключен или `register_global_config = Нет`.

Подробнее: [Быстрый старт](quick-start) и [Подключение на сайте](frontend).

## Термины

| Термин | Описание |
|--------|----------|
| **Wishlist** | Список избранных товаров (по умолчанию `default`) |
| **Синхронизация** | Перенос списка из `localStorage` в БД при входе пользователя |
| **Шаринг** | Публичная ссылка на список по токену |
| **Популярность** | Количество пользователей, добавивших ресурс в избранное |
