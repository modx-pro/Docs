---
title: ms3Favorites
description: Списки избранного для MiniShop3 и других ресурсов — хранение в браузере, синхронизация в БД
logo: https://modstore.pro/assets/extras/ms3favorites/logo.png
author: ibochkarev

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

ms3Favorites — компонент реализует функционал создания списков избранного для товаров [MiniShop3](/components/minishop3/) и других типов ресурсов (`resources`, `articles`, `pages`, `custom`). Пользователи сохраняют товары в список для последующих покупок. Список хранится в браузере (`localStorage` или `cookie`), с синхронизацией в БД для авторизованных и гостей (при `guest_db_enabled`).

## Возможности

- **Блок «Избранное»** — вывод по списку ID (AJAX через коннектор или серверный вызов сниппета)
- **Хранение в браузере** — `localStorage` (по умолчанию) или `cookie`, без регистрации
- **Синхронизация в БД** — для авторизованных: при входе данные из localStorage переносятся в БД
- **Гости в БД** — при `guest_db_enabled` список гостя сохраняется по session_id
- **Несколько списков** — `default`, `gifts`, `plans` и др. (до `max_lists`)
- **Шаринг списка** — публичная ссылка `/wishlist/share?token=xxx`, копирование чужого списка
- **Страница /wishlist/** — серверный вывод с pdoPage или JS-режим
- **Интеграция с корзиной** — «Добавить все в корзину», «Добавить выбранные»
- **Популярность** — «У N пользователей в избранном»
- **Типы ресурсов** — `products`, `resources`, `articles`, `pages`, `custom`
- **Локализация** — MODX Lexicon (ru, en), на фронте — сниппет `ms3fLexiconScript`
- **Кастомизация** — Fenom-чанки, BEM-классы (префикс `ms3f`), CSS-переменные

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — товары и категории
- **[pdoTools](/components/pdotools/) 3.0.0+** — для сниппетов (pdoPage, Fenom)

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3** и **pdoTools**
4. Найдите **ms3Favorites** в списке и нажмите **Download**, затем **Install**
5. **Настройки → Очистить кэш**

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/).

### После установки

Подключите лексикон, CSS и JS на сайте, разместите кнопку в карточке товара и выведите блок избранного.

Подробнее: [Быстрый старт](quick-start) и [Подключение на сайте](frontend).

## Термины

| Термин | Описание |
|--------|----------|
| **Wishlist** | Список избранных товаров (по умолчанию — `default`) |
| **Синхронизация** | Перенос списка из localStorage в БД при входе пользователя |
| **Шаринг** | Публичная ссылка на список по токену |
| **Популярность** | Количество пользователей, добавивших ресурс в избранное |
