---
title: ms3PromoCode
description: Промо-коды для MiniShop3 с гибкими правилами, генерацией по маске и интеграцией в позиции заказа
logo: https://modstore.pro/assets/extras/ms3promocode/logo.png
author: biz87

compatibility:
  - modx3
  - php82
  - minishop3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  {
    text: 'Сниппеты',
    link: 'snippets/',
    items: [
      { text: 'ms3PromoCodeForm', link: 'snippets/ms3promocodeform' },
    ],
  },
  {
    text: 'Интерфейс админки',
    link: 'interface/',
    items: [
      { text: 'Управление кодами', link: 'interface/codes' },
      { text: 'Аналитика', link: 'interface/analytics' },
      { text: 'Вкладка в заказе', link: 'interface/order-tab' },
    ],
  },
  {
    text: 'Фронтенд',
    link: 'frontend/',
    items: [
      { text: 'Шаблон формы', link: 'frontend/template' },
      { text: 'JS API', link: 'frontend/js-api' },
    ],
  },
  { text: 'Web API', link: 'api' },
  {
    text: 'Разработка',
    link: 'development/',
    items: [
      { text: 'События плагина', link: 'development/events' },
      { text: 'Сервисы', link: 'development/services' },
      { text: 'Правила (Rules)', link: 'development/rules' },
      { text: 'Модели и БД', link: 'development/models' },
    ],
  },
  {
    text: 'Интеграции',
    link: 'integration/',
    items: [
      { text: 'MiniShop3', link: 'integration/minishop3' },
    ],
  },
  {
    text: 'История версий',
    link: 'changelog/',
    items: [
      { text: '1.0.0-beta1', link: 'changelog/1.0.0-beta1' },
    ],
  },
]

dependencies: MiniShop3, pdoTools, VueTools
categories: discounts
---

# ms3PromoCode

Промо-коды для [MiniShop3](/components/minishop3/) — гибкие правила применения, ручная и пакетная генерация, Vue-админка, готовая форма для покупателя и учёт скидки прямо в позициях заказа.

![Главный экран админки — список промо-кодов со всеми статусами: Активен, Запланирован, Истёк, Исчерпан, Отключён; серверная пагинация и фильтры](/components/ms3promocode/screenshots/index-codes-list.jpg)

## Возможности

- **Два типа скидки** — процент или фиксированная сумма.
- **Две области применения** — вся корзина или только подпадающие под правила позиции.
- **Учёт скидки в позициях** — цена со скидкой записывается в `msOrderProduct.price`. Чек 54-ФЗ, email-уведомления и личный кабинет показывают корректные суммы без правок типовых шаблонов MS3 (детали — [Интеграция с MiniShop3](integration/minishop3)).
- **Точная сумма скидки** — копейки от пропорционального распределения автоматически компенсируются.
- **Правила отбора позиций** — товары, категории, бренды (с включающими и исключающими списками), универсальный фильтр по любому полю карточки товара с операторами (`=`, `!=`, `<`, `IN`, `BETWEEN`, `LIKE`, `CONTAINS` и др.), фильтр по опциям товара.
- **Жизненный цикл** — старт/конец действия, лимит применений, минимальная сумма заказа, ручное отключение. Автоматические статусы (`scheduled`, `expired`, `exhausted`, `disabled`).
- **Маскирующая безопасность** — отключённый код для покупателя выглядит как «не найден», существование кода не раскрывается.
- **Генерация по маске** — `SALE-####-??`, безошибочный набор символов, защита от дублирования, предпросмотр.
- **Современная Vue 3 админка** — таблица с фильтрами, редактор кода, аналитика, вкладка в карточке заказа.
- **Форма приходит с сервера готовой** — без «мигания» при загрузке.
- **Headless JS API** — глобальный `window.ms3PromoCode` для собственных интеграций в любой фронтенд.
- **Папка переопределений** — любой фронтенд-ассет из списка плагина (CSS, headless-JS, UI-JS) можно подменить файлом в `assets/components/ms3promocode-overrides/` без правок пакета.

## Системные требования

| Требование       | Версия      |
|------------------|-------------|
| MODX Revolution  | 3.0+        |
| MiniShop3        | 1.10+       |
| PHP              | 8.2+        |
| MySQL / MariaDB  | 8.0+ / 10.3+|

### Зависимости

- **MiniShop3** — основа магазина: корзина и заказы.
- **pdoTools** — отрисовка фронтенд-чанка через Fenom.
- **[VueTools](/components/vuetools/)** — админ-панель.

## Установка

### Через менеджер пакетов

1. Перейдите в **Extras → Installer**.
2. Нажмите **Download Extras**, найдите **ms3PromoCode**.
3. Нажмите **Download** и затем **Install**.

После установки:

1. В дереве админ-меню появится раздел **Промо-коды** с двумя вкладками: «Управление кодами» и «Аналитика».
2. Phinx-миграции применятся автоматически — таблицы `ms3_promo_codes` и `ms3_promo_code_usages` будут созданы.
3. При необходимости задайте настройки — см. [Системные настройки](settings).

## Быстрый старт

```fenom
{* В шаблоне корзины *}
{'!ms3PromoCodeForm' | snippet}
```

Готово — покупатель видит форму ввода промо-кода, скидка применяется и распределяется по позициям заказа.

Подробнее: [Быстрый старт →](quick-start)

## Архитектура

```
┌─────────────────────────────────────────────────────────────┐
│                       Покупатель                            │
├──────────────────────┬──────────────────────────────────────┤
│   SSR-сниппет        │       Headless JS-API                │
│ (ms3PromoCodeForm)   │      (window.ms3PromoCode)           │
├──────────────────────┴──────────────────────────────────────┤
│                       Web API                               │
│       /api/v1/promo/{apply,remove,validate,current}         │
├─────────────────────────────────────────────────────────────┤
│                       Сервисы                               │
│   ApplicationService → ValidationService → DiscountCalc.    │
│              → RuleEngine → UsageTracker                    │
├─────────────────────────────────────────────────────────────┤
│                  Плагин ms3PromoCode                        │
│  Корзина: msOnAddToCart / msOnChangeInCart /                │
│           msOnChangeOptionInCart / msOnRemoveFromCart       │
│  Админ:   msOn{Create,Update,Remove}OrderProduct            │
│  Жизнь:   msOnCreateOrder / msOnChangeOrderStatus           │
│  Загруз.: msOnManagerCustomCssJs / OnLoadWebDocument        │
├─────────────────────────────────────────────────────────────┤
│                      База данных                            │
│      ms3_promo_codes  │  ms3_promo_code_usages              │
└─────────────────────────────────────────────────────────────┘
```

## Учёт скидки в позициях

В отличие от классических компонентов, ms3PromoCode не выводит скидку отдельной строкой в итогах. Скидка распределяется по подпадающим позициям и записывается в `msOrderProduct.price`. Оригинальная цена сохраняется в `properties.ms3promocode.original_price`.

Что это даёт:

- Чек 54-ФЗ бьётся по строкам, email и личный кабинет показывают уценённые цены без доработок типовых шаблонов MS3.
- При снятии кода или правке корзины оригинальные цены восстанавливаются, пересчёт идёт заново.

Подробнее: [Интеграция с MiniShop3 →](integration/minishop3)
