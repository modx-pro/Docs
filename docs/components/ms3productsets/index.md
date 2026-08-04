---
title: ms3ProductSets
description: Динамические подборки товаров для MiniShop3 — ручные связи, авто-рекомендации, админка шаблонов
logo: https://modstore.pro/assets/extras/ms3productsets/logo.png
author: ibochkarev
modstore: https://modstore.pro/packages/ecommerce/ms3productsets
dependencies: miniShop3
categories: minishop3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Сценарии (flows)', link: 'interface/flows' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Типы подборок', link: 'types' },
  {
    text: 'Сниппеты',
    link: 'snippets/index',
    items: [
      { text: 'ms3ProductSets', link: 'snippets/ms3ProductSets' },
      { text: 'mspsLexiconScript', link: 'snippets/mspsLexiconScript' },
    ],
  },
  { text: 'Подключение на сайте', link: 'frontend' },
  { text: 'Интеграция и кастомизация', link: 'integration' },
  {
    text: 'Интерфейс админки',
    link: 'interface/index',
    items: [
      { text: 'Обзор интерфейса', link: 'interface/index' },
      { text: 'Подборки товаров', link: 'interface/templates' },
      { text: 'Руководство по админке', link: 'admin' },
      { text: 'Права доступа', link: 'permissions' },
    ],
  },
  {
    text: 'Для разработчика',
    link: 'api',
    items: [
      { text: 'Контракты и параметры (API)', link: 'api' },
      { text: 'Потоки (технические)', link: 'flows' },
      { text: 'Архитектура', link: 'architecture' },
    ],
  },
]
---
# ms3ProductSets

ms3ProductSets выводит блоки рекомендаций в MiniShop3: «С этим покупают», похожие, VIP, подсказки в корзине. Сначала берутся **ручные** связи (TV и шаблоны в админке). Если список пуст и `auto_recommendation=1`, включается авто-логика типа.

![Страница «Подборки товаров»](/components/ms3productsets/screenshots/page-overview.png)

## Возможности

- **Типы** — `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `auto_sales`, `vip`, `auto` и алиасы. Логика: [типы подборок](types)
- **Шаблоны в админке** — CRUD, применение и отвязка по категории ([админка](admin), [сценарии](interface/flows))
- **TV на товаре** — пять полей `ms3productsets_*`, синхронизация в БД при сохранении
- **Сайт** — сниппет `ms3ProductSets`, AJAX через `productsets.js` ([интеграция](integration))
- **Кеш** — `ms3productsets.cache_lifetime` ([настройки](settings))
- **Корзина** — `data-add-to-cart`, VIP «добавить весь набор» через connector `add_to_cart`

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- [MiniShop3](/components/minishop3/)
- [pdoTools](/components/pdotools/) 3.0.0+
- **VueTools** — страница «Подборки товаров»

## Установка

[Быстрый старт](quick-start): ModStore, MiniShop3, pdoTools, VueTools, очистка кеша.

Платный transport зашифрован — подключите провайдер [modstore.pro](https://modstore.pro/extras/).

## Термины

| Термин | Описание |
|--------|----------|
| **Подборка** | Список ID для контекста (`resource_id`, `type`, категория) |
| **Шаблон** | Запись в `ms3_product_set_templates` для массового применения |
| **Связь** | Строка в `ms3_product_sets` (товар → related_product + type) |
| **Авто-режим** | Подбор без ручных связей (категория, заказы, `vip_set_*`) |
