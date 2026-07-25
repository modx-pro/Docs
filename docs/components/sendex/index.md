---
title: Sendex
description: Email-рассылки в MODX — подписчики, очередь писем и форма подписки на сайте
logo: https://modstore.pro/assets/extras/sendex/logo-lg.jpg
author: modx-pro
modstore: https://modstore.pro/packages/alerts-mailing/sendex
repository: https://github.com/modx-pro/Sendex
categories: utilities

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  {
    text: 'Сниппеты',
    items: [
      { text: 'Sendex', link: 'snippets/sendex' },
    ],
  },
  {
    text: 'Интерфейс',
    items: [
      { text: 'Подписки', link: 'interface/subscriptions' },
      { text: 'Очередь писем', link: 'interface/queue' },
    ],
  },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'События', link: 'integration/events' },
  { text: 'PHP API', link: 'integration/api' },
  { text: 'FAQ', link: 'faq' },
]
---
# Sendex

Компонент для email-рассылок в MODX Revolution: рассылки и подписчики в менеджере, очередь писем и форма подписки на сайте через сниппет `Sendex`.

## Возможности

- **Рассылки в менеджере** — шаблон письма, тема, отправитель, подписчики
- **Подписка на сайте** — авторизованные пользователи подписываются в один клик; гости подтверждают email
- **Групповая подписка** — добавление активных незаблокированных пользователей из группы MODX
- **Очередь писем** — формирование, ручная отправка или cron
- **Экспорт подписчиков** — CSV из менеджера
- **Слияние guest → user** — при регистрации или активации аккаунта с тем же email

## Системные требования

| Требование | Описание |
| --- | --- |
| MODX Revolution | 2.8+ или 3.x |
| PHP | 7.4–8.4 |
| ExtJS | менеджер MODX (MODX 3 — namespace + action) |

Проверено на MODX **3.2.0-pl**. Модели xPDO — глобальные классы `sx*` (не namespaced).

## Установка

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Найдите **Sendex** и нажмите **Download**, затем **Install**
4. **Управление → Очистить кэш**

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/packages/alerts-mailing/sendex).

При установке и обновлении resolver `migrations` запускает Phinx-миграции схемы БД. Таблицы при удалении пакета **не удаляются**.

### После установки

Меню **Компоненты → Sendex**. Создайте рассылку, разместите `[[!Sendex]]` на странице и настройте cron для очереди.

Подробнее: [Быстрый старт](quick-start) и [Системные настройки](settings).

## Быстрые ссылки

| Раздел | Описание |
| --- | --- |
| [Быстрый старт](quick-start) | Первая рассылка и тест подписки |
| [Сниппет Sendex](snippets/sendex) | Параметры, чанки, AJAX |
| [Подписки](interface/subscriptions) | Рассылки и подписчики в менеджере |
| [Очередь писем](interface/queue) | Отправка и cron |
| [Системные настройки](settings) | Ключи `sendex_*` |
| [События](integration/events) | Хуки `sxOn*` |
| [PHP API](integration/api) | Подписка и очередь из кода |
| [FAQ](faq) | Типичные проблемы |

## История

Компонент изначально написан как учебный пример на bezumkin.ru. Текущая версия поддерживается в репозитории [modx-pro/Sendex](https://github.com/modx-pro/Sendex).
