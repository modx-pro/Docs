---
title: FAQ
description: prepareSnippet, корзина без сниппета, force_date и акция на все товары
---

# FAQ

## Почему в каталоге нет бейджа, а на карточке есть?

У правила выключен `show_in_catalog`. `ms3discountsGetDiscount` в `prepareSnippet` смотрит только этот флаг. На карточке товара нужен `show_in_product`.

## Как сниппет понимает режим prepareSnippet?

Если в свойствах есть `id` товара и ключ `pagetitle`, это строка `msProducts`. Сниппет возвращает массив и не выводит чанк. Id товара не затирается: id акции пишется в `sale_id`.

## Почему BuyNow ничего не вывел?

1. У акции включён `show_in_catalog`.
2. При `force_date=1` (значение по умолчанию) у акции задан `date_end`.
3. В правиле есть цель include: товар, категория или производитель.

Акция «на все товары» без таких целей в выборку id не входит. Иначе сниппет подставил бы весь каталог в `msProducts`.

Если id нашлись, а витрина пустая, проверьте `parents`. `ms3discountsBuyNow` сам ставит `parents=0`, если вы его не передали.

## Остаётся сырое число секунд вместо таймера

Подключите JS витрины. `ms3discountsBuyNow` берёт путь из `ms3discounts_frontend_js`. У `ms3discountsGetDiscount` пустое свойство `frontend_js` файл не подключает. В чанке нужен элемент `.ms3d_remains` с `data-remain`.

```fenom
<span class="ms3d_remains" data-remain="{$remains}"></span>
```

## Нужно ли вызывать сниппет в корзине?

Нет. Корзину пересчитывает плагин. `ms3discountsGetDiscount` и `ms3discountsBuyNow` на draft-заказ не пишут.

## Почему в корзине цена без скидки?

1. Включён `ms3discounts_enabled`, правило активно, попадает в расписание и контекст.
2. Флаги витрины (`show_in_catalog`, `show_in_product`) корзину не включают и не выключают.
3. После сохранения правила очистите кэш и измените корзину. `msOnGetStatusCart` только суммирует уже записанный `discount_cost`.
4. Правило с «только после активации» ждёт вызов `ms3discounts_activator`.

## Есть ли промокоды?

Нет. Промокоды — отдельный пакет. ms3Discounts принимает активацию через `DiscountActivatorInterface`. Как подключить: [Интеграция](integration).
