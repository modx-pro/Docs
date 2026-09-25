---
title: ms3Discounts
description: Правила скидок для MiniShop3. Без промокодов
author: Ibochkarev
categories: minishop3
dependencies: miniShop3

compatibility:
  - modx3
  - php82
  - minishop3
  - vue3
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
    text: 'Витрина',
    link: 'snippets/index',
    items: [
      { text: 'Сниппеты (обзор)', link: 'snippets/index' },
      { text: 'Сниппет ms3discounts', link: 'snippets/ms3discounts' },
      { text: 'Сниппет ms3discountsGetDiscount', link: 'snippets/ms3discountsGetDiscount' },
      { text: 'Сниппет ms3discountsBuyNow', link: 'snippets/ms3discountsBuyNow' },
    ],
  },
  { text: 'Интеграция', link: 'integration' },
  { text: 'FAQ', link: 'faq' },
]
---

# ms3Discounts

**ms3Discounts** — дополнение для [MODX Revolution 3](https://modx.com/) и [MiniShop3](/components/minishop3/): правила скидок в менеджере и пересчёт `price` / `cost` в draft-корзине.

Промокоды в пакет не входят. Купоны подключает отдельный пакет через `DiscountActivatorInterface`.

## Минимальный путь

1. Установите **MiniShop3**, **VueTools**, **pdoTools** и **ms3Discounts**.
2. Включите `ms3discounts_enabled`.
3. В меню **Компоненты → Скидки** создайте правило: тип действия, цели, период.
4. На карточке товара вызовите `ms3discountsGetDiscount`. В каталоге передайте его как `prepareSnippet` в `msProducts`.
5. Очистите кэш и проверьте цену в корзине после добавления товара.

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Установить и вывести бейдж | [Быстрый старт](quick-start) |
| Ключи `ms3discounts_*` | [Системные настройки](settings) |
| Сниппеты и параметры | [Сниппеты](snippets/index) |
| Корзина: что делает плагин | [Интеграция](integration) |
| `prepareSnippet`, `force_date`, акция «все товары» | [FAQ](faq) |

## Что считает движок

Типы действий: процент, фиксированная сумма, фиксированная цена, N-й товар, подарок.

Цели правила: товар, категория, производитель. Без целей include (товар, категория, производитель) правило действует на весь каталог в корзине. Сниппет `ms3discountsBuyNow` такие правила в выборку id не берёт.

Флаги витрины: `show_in_catalog` (список и `prepareSnippet`), `show_in_product` (карточка). Флаг «только после активации» (`activation_required`) пропускает правило, пока другой пакет не вызовет `DiscountActivatorInterface`.

## Политики

| Политика | Поведение |
| --- | --- |
| `exclusive` | Одна такая акция с эффектом перекрывает остальные |
| `best` | Из акций с этой политикой берётся большая выгода |
| `stackable` | Складывается с выбранной `best` (после эксклюзивной не применяется) |
| `fallback` | Срабатывает, если ни `exclusive`, ни `best`, ни `stackable` не дали эффекта |

## Условия и расписание

Цели `product`, `category`, `vendor` — те же типы, что правила include. Дополнительно движок проверяет `option`, `customer`, `customer_group`, `cart`, `date`, `context`.

Период правила: `date_start`, `date_end`, `time_start`, `time_end`, `weekdays` (1–7), `contexts`. Вне окна правило пропускается.
