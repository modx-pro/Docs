---
title: mxQuickView
description: Быстрый просмотр карточки товара и блоков по AJAX для MODX 3 и MiniShop3
author: ibochkarev
dependencies: ['minishop3', 'ms3Variants']

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Системные настройки', link: 'settings' },
      { text: 'Типы рендера', link: 'types' },
    ],
  },
  {
    text: 'Интеграция на сайте',
    link: 'integration',
    items: [
      { text: 'Интеграция', link: 'integration' },
      { text: 'Подключение на сайте', link: 'frontend' },
      { text: 'Сниппеты (обзор)', link: 'snippets' },
      { text: 'Сниппет mxQuickView.initialize', link: 'snippets/mxquickview-initialize' },
    ],
  },
  {
    text: 'Администрирование',
    link: 'admin',
    items: [
      { text: 'Руководство по админке', link: 'admin' },
      { text: 'Права доступа', link: 'permissions' },
    ],
  },
  {
    text: 'Для разработчика',
    link: 'api',
    items: [
      { text: 'Контракты и параметры (API)', link: 'api' },
      { text: 'Потоки и сценарии работы', link: 'flows' },
      { text: 'Архитектура', link: 'architecture' },
    ],
  },
]
---
# mxQuickView

`mxQuickView` загружает контент ресурса по AJAX и показывает его в модальном окне или в указанном контейнере на странице.

## Кому и что читать

- **Менеджеру**: [Быстрый старт](quick-start) -> [Системные настройки](settings) -> [Руководство по админке](admin).
- **Разработчику**: [Интеграция](integration) -> [API](api) -> [Архитектура](architecture).

## Что умеет дополнение

- Рендерит контент тремя способами: `chunk`, `snippet`, `template`.
- Поддерживает два режима вывода: `modal` и `selector`.
- Работает по `click` и `mouseover` триггерам (`data-mxqv-click`, `data-mxqv-mouseover`).
- Даёт навигацию prev/next внутри списка товаров при `data-mxqv-loop="true"`.
- Переинициализирует MiniShop3 карточку в модалке после загрузки контента.
- Поддерживает вывод вариантов ms3Variants (`variants_html`, `variants_json`).

## Требования

- MODX Revolution 3+
- PHP 8.1+
- MiniShop3 (опционально, для корзины и карточки товара)
- ms3Variants (опционально, для выбора вариантов в quick view)

## Системные настройки

Все настройки находятся в namespace `mxquickview`. Подробности: [Системные настройки](settings).
