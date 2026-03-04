---
title: ms3ProductSets
description: Динамические подборки товаров для MiniShop3
logo: https://modstore.pro/assets/extras/ms3productsets/logo.png
author: ibochkarev

items: [
  {
    text: 'Начало работы',
    link: 'quick-start',
    items: [
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Системные настройки', link: 'settings' },
      { text: 'Типы подборок', link: 'types' },
    ],
  },
  {
    text: 'Интеграция на сайте',
    link: 'integration',
    items: [
      { text: 'Интеграция', link: 'integration' },
      { text: 'Подключение на сайте', link: 'frontend' },
      { text: 'Сниппеты (обзор)', link: 'snippets' },
      { text: 'Сниппет ms3ProductSets', link: 'snippets/ms3ProductSets' },
      { text: 'Сниппет mspsLexiconScript', link: 'snippets/mspsLexiconScript' },
    ],
  },
  {
    text: 'Интерфейс админки',
    link: 'interface',
    items: [
      { text: 'Обзор интерфейса', link: 'interface' },
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
      { text: 'Потоки и сценарии работы', link: 'flows' },
      { text: 'Архитектура', link: 'architecture' },
    ],
  },
]
---
# ms3ProductSets

`ms3ProductSets` добавляет в MiniShop3 блоки рекомендаций: «С этим товаром покупают», «Похожие», «VIP-наборы», рекомендации в корзине и другие сценарии.

## Кому и что читать

- **Менеджеру**: [Быстрый старт](quick-start) -> [Типы подборок](types) -> [Руководство по админке](admin).
- **Разработчику**: [Интеграция](integration) -> [API](api) -> [Архитектура](architecture).

## Что умеет дополнение

- Выводит подборки по типам: `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `auto_sales`, `vip`, `auto`.
- Работает в двух режимах:
  - **ручной**: связи товаров из TV и шаблонов в админке
  - **авто**: fallback по категории или по статистике заказов
- Поддерживает массовое применение шаблонов к категориям.
- Даёт фронтовый JS API для AJAX-рендера и add-to-cart.

## Требования

- MODX Revolution 3+
- PHP 8.1+
- MiniShop3
- pdoTools 3.x
- VueTools (для страницы админки)

## Системные настройки

Настройки `ms3productsets.cache_lifetime` и `ms3productsets.auto_recommendation` **применяются** при вызове сниппета и при AJAX `get_set` (коннектор вызывает сниппет через runSnippet). Подробнее: [Системные настройки](settings).
