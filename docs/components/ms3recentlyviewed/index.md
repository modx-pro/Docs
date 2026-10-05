---
title: ms3RecentlyViewed
description: 'Блок «Недавно просмотренные товары» для MiniShop3 — хранение в браузере или БД, похожие товары, админка'
categories: catalog
author: Ibochkarev
logo: https://modstore.pro/assets/extras/ms3recentlyviewed/logo.png
modstore: https://modstore.pro/packages/ecommerce/ms3recentlyviewed

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
      { text: 'ms3recentlyviewed', link: 'snippets/ms3recentlyviewed' },
      { text: 'ms3recentlyviewedSimilar', link: 'snippets/ms3recentlyviewedSimilar' },
      { text: 'ms3rvLexiconScript', link: 'snippets/ms3rvLexiconScript' },
    ],
  },
  {
    text: 'Интерфейс админки',
    link: 'interface',
    items: [
      { text: 'Дашборд', link: 'interface/dashboard' },
      { text: 'История просмотров', link: 'interface/history' },
    ],
  },
  { text: 'Подключение на сайте', link: 'frontend' },
  { text: 'Права доступа', link: 'permissions' },
]
---
# ms3RecentlyViewed

Блок «Недавно просмотренные товары» для [MiniShop3](/components/minishop3/). Список хранится в браузере (`localStorage` или cookie) или в БД для авторизованных. Заполняется при открытии страниц товаров.

**Именование:** для пользователя — **ms3RecentlyViewed**. В коде (папки, сниппеты, лексикон) — **ms3recentlyviewed**.

## Возможности

- **Блок «Недавно просмотренные»** — вывод по списку ID: клиентский **JS** (`render()`), серверный сниппет с **`fromDB`**, либо **`ids`** из плейсхолдера / cookie. См. [Быстрый старт](/components/ms3recentlyviewed/quick-start).
- **Хранение в браузере** — `localStorage` (по умолчанию) или cookie, без регистрации
- **Синхронизация в БД** — при входе анонимные просмотры из `localStorage` переносятся в БД (первый заход после авторизации)
- **Месячное архивирование** — настройка `archive_enabled` (по умолчанию включено): сводка в `ms3recentlyviewed_monthly` без удаления строк `items`
- **Исключение ботов** — `block_bots` + `block_bots_detector` (`crawler_detect` — библиотека CrawlerDetect, либо `regex` как запасной вариант)
- **Серверный вывод при cookie** — плагин **ms3recentlyviewedViewedIdsPlaceholder** (`OnWebPageInit`, приоритет **-5**). Плейсхолдер **`[[+viewedIds]]`** из cookie `ms3_recently_viewed`, если **`ms3recentlyviewed.storage_type` = `cookie`**. В Fenom: `$_modx->getPlaceholder('viewedIds')`. Переменная `$viewedIds` сама не появляется.
- **Сниппет «Похожие на просмотренные»** — товары из тех же категорий (`ms3recentlyviewedSimilar`)
- **Админка** — дашборд (KPI, топ товаров), история просмотров с фильтрами, экспорт CSV (BOM UTF-8, GET в connector-mgr для загрузки файла)
- **Локализация** — MODX Lexicon (ru, en), на сайте — сниппет `ms3rvLexiconScript`
- **Чанки и стили** — Fenom-чанки, BEM-классы (префикс `ms3rv`). Карточки витрины на классах Bootstrap, не на переменных `--ms3rv-*`

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — товары и категории
- **[pdoTools](/components/pdotools/) 3.0.0+** — сниппеты и чанки `@FILE`

::: tip msProducts и parents
В MODX 3 сниппет msProducts требует параметр `parents` даже при `resources`. Дополнение подставляет его при вызове msProducts для списка просмотренных.
:::

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3** и **pdoTools**
4. Найдите **ms3RecentlyViewed** в списке и нажмите **Download**, затем **Install**
5. **Управление → Очистить кэш**

### После установки

Подключите лексикон, CSS и JS. Передайте ID товара на странице товара. Выведите блок. [Быстрый старт](/components/ms3recentlyviewed/quick-start), [Подключение на сайте](/components/ms3recentlyviewed/frontend).

В админке: **Extras → ms3RecentlyViewed** — дашборд и история просмотров.

## Термины

| Термин | Описание |
|--------|----------|
| **Просмотренные** | Список ID товаров, которые пользователь открывал (в браузере или БД) |
| **Синхронизация** | Перенос списка из `localStorage` в БД при входе пользователя |
| **Похожие на просмотренные** | Товары из тех же категорий, что и просмотренные (сниппет `ms3recentlyviewedSimilar`) |
