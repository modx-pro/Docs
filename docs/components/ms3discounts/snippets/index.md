---
title: Сниппеты
description: Обзор сниппетов ms3Discounts для витрины MiniShop3
---

# Сниппеты ms3Discounts

| Сниппет | Назначение |
| --- | --- |
| [ms3discountsGetDiscount](ms3discountsGetDiscount) | Бейдж на карточке или `prepareSnippet` у `msProducts` |
| [ms3discountsBuyNow](ms3discountsBuyNow) | Id товаров по акциям и прокси в `msProducts` |
| [ms3discounts](ms3discounts) | Список акций с `show_in_catalog` |

Промокоды и JS корзины в пакет не входят. В чанк `msCart` эти сниппеты не ставьте. Корзину пересчитывает плагин: [Интеграция](../integration).

## Порядок на типовой странице

1. Карточка товара: `ms3discountsGetDiscount` с `id` ресурса.
2. Каталог: `msProducts` с `prepareSnippet=ms3discountsGetDiscount`.
3. Подборка «успей купить»: `ms3discountsBuyNow` (остальные свойства уходят в `msProducts`).
4. Список акций: `ms3discounts` с `return=tpl`.

Вызывайте сниппеты без кэша (`[[!...]]` или `{'!...' | snippet}`).
