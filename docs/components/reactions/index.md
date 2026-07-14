---
title: Reactions
description: Универсальная система реакций для MODX 3 — лайки, наборы в стиле GitHub, топы и trending на любом объекте
author: ibochkarev
repository: https://github.com/Ibochkarev/Reactions
logo: https://modstore.pro/assets/extras/reactions/logo.png
categories: utilities

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Системные настройки', link: 'settings' },
    ],
  },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'Обзор', link: 'snippets/index' },
      { text: 'Reactions', link: 'snippets/reactions' },
      { text: 'ReactionsCount', link: 'snippets/reactions-count' },
      { text: 'TopLiked', link: 'snippets/top-liked' },
      { text: 'TopRated', link: 'snippets/top-rated' },
      { text: 'Trending', link: 'snippets/trending' },
      { text: 'ReactionsSchema', link: 'integrations/seo' },
    ],
  },
  {
    text: 'Интеграции',
    link: 'integrations/pdotools',
    items: [
      { text: 'pdoTools', link: 'integrations/pdotools' },
      { text: 'miniShop3', link: 'integrations/minishop3' },
      { text: 'Tickets', link: 'integrations/tickets' },
      { text: 'Collections', link: 'integrations/collections' },
      { text: 'SEO / Schema.org', link: 'integrations/seo' },
    ],
  },
  { text: 'JavaScript-виджет', link: 'js' },
  { text: 'REST API', link: 'api' },
  { text: 'CLI', link: 'cli' },
  { text: 'События MODX', link: 'events' },
  { text: 'Webhooks', link: 'webhooks' },
]
---

# Reactions

Универсальная система реакций для [MODX Revolution 3](https://modx.com/). От пары «нравится / не нравится» до набора в стиле GitHub — на ресурсе, товаре miniShop3 или любом другом объекте.

Компонент headless: менеджерского интерфейса нет. Управление через системные настройки, REST API и CLI.

Исходники: [modx-pro/Reactions](https://github.com/Ibochkarev/Reactions) (MIT).

## Возможности

- Три встроенных набора: `updown`, `github`, `full` (24 типа)
- Compact picker для `github` / `full` (`layout=auto`): чипы + кнопка `+`; `layout=bar` — полная полоса
- Свои типы и наборы через CLI или admin API
- Реакции на любой объект (`class` / `class_key`; в БД — `object_class`)
- Повторное нажатие снимает реакцию; в exclusive-наборе другая реакция заменяет предыдущую
- Стратегии идентификации: `auth_only`, `ip`, `ip_cookie`, `session`
- Топы за день / неделю / месяц / год / всё время; trending по формуле Reddit
- Rate limit, блок ботов, CSRF, Origin check
- События MODX, webhooks (Telegram, Discord, Slack), уведомления автору

## Требования

| | |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2–8.4 |
| СУБД | MySQL / MariaDB (InnoDB) |

## Установка

1. Установите транспортный пакет **Reactions** через «Управление пакетами».
2. Пакет создаёт таблицы, пресеты (`updown`, `github`, `full`), сниппеты, чанки и системные настройки.
3. **Настройки → Очистить кэш**.

Сборка из исходников (нужны Node.js и `npm`):

```bash
composer install
php _build/build.php
```

`build.php` собирает виджет из `frontend/` в `assets/components/reactions/js/web/`.

## Быстрый путь

1. Подключите CSS/JS и вызовите `[[!Reactions]]` — [Быстрый старт](quick-start).
2. При необходимости смените набор и стратегию идентификации — [Системные настройки](settings).
3. Для витрины: [miniShop3](integrations/minishop3), [pdoTools](integrations/pdotools), [SEO](integrations/seo).

## Встроенные наборы

| Ключ | Реакции | Режим |
| --- | --- | --- |
| `updown` | 👍 `like`, 👎 `dislike` | Взаимоисключающие (`exclusive`) |
| `github` | 👍 👎 ❤️ 😂 😮 😢 😡 🎉 | Несколько реакций одновременно |
| `full` | `github` + 🚀👀🔥👏🤔🥳⭐🍺✨💯🙏💪😎😍😕🙌 | 24 типа; подмножество через `reactions_full_types` |

Свои типы и наборы: [CLI](cli) или [admin API](api#admin).

## Сниппеты

| Сниппет | Назначение |
| --- | --- |
| [Reactions](snippets/reactions) | Кнопки с счётчиками (picker / bar) |
| [ReactionsCount](snippets/reactions-count) | Счётчики без кнопок |
| [TopLiked](snippets/top-liked) | Топ по лайкам |
| [TopRated](snippets/top-rated) | Топ по рейтингу (likes − dislikes) |
| [Trending](snippets/trending) | Горячие материалы (формула Reddit) |
| [ReactionsSchema](integrations/seo) | JSON-LD `AggregateRating` |

## Права доступа

| Политика | Описание |
| --- | --- |
| `reactions_view` | Просмотр данных реакций |
| `reactions_manage` | Типы, наборы и баны через API |
| `reactions_stats` | Статистика |

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Вывести блок на странице | [Быстрый старт](quick-start) |
| Ключи `reactions_*` | [Системные настройки](settings) |
| AJAX и стили | [JavaScript-виджет](js) |
| Endpoint и коды ошибок | [REST API](api) |
| recount, ban, type | [CLI](cli) |
| Плагины | [События](events) |
| Telegram / Discord / Slack | [Webhooks](webhooks) |
