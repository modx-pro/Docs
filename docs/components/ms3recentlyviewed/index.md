---
title: ms3RecentlyViewed
description: Блок «Недавно просмотренные товары» для MiniShop3 — хранение в браузере или БД, похожие товары, админка
logo: https://modstore.pro/assets/extras/ms3recentlyviewed/logo-lg.png
author: ibochkarev

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

Компонент для [MiniShop3](/components/minishop3/): вывод блока «Недавно просмотренные товары». Список хранится в браузере (localStorage или cookie) или в БД для авторизованных, заполняется автоматически при посещении страниц товаров.

**Именование:** для пользователя — **ms3RecentlyViewed**; в коде (папки, сниппеты, лексикон) — **ms3recentlyviewed**.

## Возможности

- **Блок «Недавно просмотренные»** — вывод по списку ID (AJAX через коннектор или серверный вызов сниппета)
- **Хранение в браузере** — localStorage (по умолчанию) или cookie, без регистрации
- **Синхронизация в БД** — для авторизованных: при входе данные из localStorage переносятся в БД
- **Автосинхронизация при входе** — анонимные просмотры из localStorage автоматически переносятся в БД при первом заходе после авторизации
- **Месячное архивирование** — настройка `archive_enabled` (по умолчанию включено): агрегация в сводную таблицу, уменьшение размера основной таблицы
- **Исключение ботов** — настройка `block_bots`: просмотры от краулеров (Googlebot, Yandex и др.) не сохраняются в БД
- **Сниппет «Похожие на просмотренные»** — товары из тех же категорий (ms3recentlyviewedSimilar)
- **Админка** — дашборд (KPI, топ товаров), история просмотров с фильтрами, экспорт CSV (BOM UTF-8, поддержка GET в connector-mgr для загрузки файла)
- **Локализация** — MODX Lexicon (ru, en), на фронте — сниппет ms3rvLexiconScript
- **Кастомизация** — Fenom-чанки, BEM-классы (префикс `ms3rv`), CSS-переменные

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — товары и категории
- **[pdoTools](/components/pdotools/) 3.0.0+** — для работы сниппетов и чанков @FILE

::: tip msProducts и parents
В MODX 3 сниппет msProducts требует указания параметра `parents` даже при использовании `resources`. Дополнение автоматически подставляет его при вызове msProducts для списка просмотренных.
:::

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3** и **pdoTools**
4. Найдите **ms3RecentlyViewed** в списке и нажмите **Download**, затем **Install**
5. **Управление → Очистить кэш**

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/).

### После установки

Подключите лексикон, CSS и JS на сайте, передайте ID товара на странице товара и выведите блок «Недавно просмотренные».

Подробнее: [Быстрый старт](quick-start) и [Подключение на сайте](frontend).

В админке: **Extras → ms3RecentlyViewed** — дашборд и история просмотров.

## Термины

| Термин | Описание |
|--------|----------|
| **Просмотренные** | Список ID товаров, которые пользователь открывал (в браузере или БД) |
| **Синхронизация** | Перенос списка из localStorage в БД при входе пользователя |
| **Похожие на просмотренные** | Товары из тех же категорий, что и просмотренные (сниппет ms3recentlyviewedSimilar) |
