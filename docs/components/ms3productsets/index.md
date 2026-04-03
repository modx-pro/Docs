---
title: ms3ProductSets
description: Динамические подборки товаров для MiniShop3 — ручные связи, авто-рекомендации, админка шаблонов
logo: https://modstore.pro/assets/extras/ms3productsets/logo.png
author: ibochkarev

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Типы подборок', link: 'types' },
  {
    text: 'Сниппеты',
    link: 'snippets',
    items: [
      { text: 'ms3ProductSets', link: 'snippets/ms3ProductSets' },
      { text: 'mspsLexiconScript', link: 'snippets/mspsLexiconScript' },
    ],
  },
  { text: 'Подключение на сайте', link: 'frontend' },
  { text: 'Интеграция и кастомизация', link: 'integration' },
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

ms3ProductSets — компонент для [MiniShop3](/components/minishop3/), который выводит блоки рекомендаций: «С этим товаром покупают», «Похожие», «VIP-наборы», подсказки в корзине и другие сценарии. Сначала используются **ручные** связи (TV на товаре и/или шаблоны в админке), при пустом результате подключается **авто**-логика по типу подборки (категория, заказы, системные настройки для VIP).

## Возможности

- **Типы подборок** — `buy_together`, `similar`, `popcorn`, `cart_suggestion`, `auto_sales`, `vip`, `auto` и синонимы (`also-bought`, `cross-sell`, `custom` → как `auto`); логика и fallback — в [типах подборок](types)
- **Ручной режим** — таблица `ms3_product_sets`, TV `ms3productsets_*` на карточке товара, массовое применение **шаблонов** к категориям в админке
- **Авто-режим** — подбор по категории, похожие товары, статистика заказов (`auto_sales`), запасной VIP из настроек `ms3productsets.vip_set_*`; отключается опцией **`auto_recommendation=0`** ([системные настройки](settings))
- **Вывод на сайте** — сниппет **`ms3ProductSets`**, опционально AJAX через коннектор **`get_set`** и **`window.ms3ProductSets.render()`** ([API](api), [интеграция](integration))
- **Кеш** — TTL задаётся **`ms3productsets.cache_lifetime`**; при **`0`** кеш отключён ([системные настройки](settings))
- **Корзина** — кнопки с **`data-add-to-cart`**, «добавить весь набор» (**`data-add-set`**) через **`productsets.js`** и коннектор **`add_to_cart`**
- **Админка** — раздел **Компоненты → Подборки товаров** (VueTools + PrimeVue): шаблоны, применение к категориям, отвязка ([админка](admin), [интерфейс](interface))
- **Плагины** — синхронизация TV в БД при сохранении товара, очистка связей при удалении ресурса ([архитектура](architecture))
- **Локализация** — лексикон компонента, на фронте — сниппет **`mspsLexiconScript`** (`window.mspsLexicon`, `window.mspsConfig`)

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Зависимости

- **[MiniShop3](/components/minishop3/)** — товары и категории
- **[pdoTools](/components/pdotools/) 3.0.0+**
- **VueTools** — страница админки «Подборки товаров»

## Установка

Подробная инструкция с требованиями и шагами через ModStore — в [быстром старте](quick-start).

### Через ModStore

1. [Подключите репозиторий ModStore](https://modstore.pro/info/connection)
2. Перейдите в **Extras → Installer** и нажмите **Download Extras**
3. Убедитесь, что установлены **MiniShop3**, **pdoTools** и **VueTools**
4. Найдите **ms3ProductSets** в списке и нажмите **Download**, затем **Install**
5. **Настройки → Очистить кэш**

Пакет доступен в каталоге [modstore.pro](https://modstore.pro/).

### После установки

Подключите **`mspsLexiconScript`**, **`productsets.css`** и **`productsets.js`**, выведите вызов **`ms3ProductSets`** в шаблоне карточки товара или лендинга. При необходимости задайте лимиты и кеш в [системных настройках](settings) (namespace **`ms3productsets`**).

Подробнее: [быстрый старт](quick-start) и [подключение на сайте](frontend).

## Термины

| Термин | Описание |
|--------|----------|
| **Подборка (set)** | Список рекомендуемых товаров для заданного контекста (`resource_id`, тип, категория) |
| **Тип подборки** | Режим логики: `buy_together`, `similar`, `vip` и др. |
| **Ручные связи** | Строки в **`ms3_product_sets`** (и/или значения TV), заданные менеджером |
| **Шаблон подборки** | Запись в **`ms3_product_set_templates`** для массового применения к категориям |
| **Авто-рекомендации** | Подбор ID без ручных связей (категория, заказы, общий каталог) |
| **VIP-набор** | Тип **`vip`**; при отсутствии ручных связей — fallback из настройки **`vip_set_{set_id}`** |
