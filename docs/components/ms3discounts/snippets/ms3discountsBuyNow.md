---
title: Сниппет ms3discountsBuyNow
description: Выборка товаров по акциям и прокси в msProducts
---

# Сниппет ms3discountsBuyNow

Собирает id товаров по активным акциям с `show_in_catalog` и вызывает `msProducts`. Остальные свойства уходят в `msProducts` как есть.

Как собираются цели include:

- `product` — id как есть
- `category` — товары категории (`msCategoryMember` и `parent`)
- `vendor` — товары производителя

Акция «все товары» без целей include (товар, категория, производитель) в выборку id не входит. Иначе сниппет развернул бы весь каталог.

По умолчанию в `msProducts` уходят `parents=0`, `tpl=tpl.ms3discounts.buynow.row` и `prepareSnippet=ms3discountsGetDiscount`, если вы их не задали.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `sale` | пусто | Id акций через запятую |
| `force_date` | `1` | `1` — только акции с `date_end` |
| `tpl` | `tpl.ms3discounts.buynow.row` | Чанк строки `msProducts` |
| `prepareSnippet` | `ms3discountsGetDiscount` | Подготовка строки. Пустая строка и отсутствие параметра дают то же имя. Отключить prepare из этого сниппета нельзя |
| `frontend_css` / `frontend_js` | из настроек | Файлы таймера. Свойств сниппета нет, пустой вызов читает настройки |

Чанк по умолчанию выводит `.ms3d_remains` с `data-remain`.

Если подходящих id нет, сниппет возвращает пустую строку и `msProducts` не вызывает.

## Примеры

::: code-group

```fenom
{'!ms3discountsBuyNow' | snippet : [
  'force_date' => 1,
  'limit' => 8,
]}
```

```modx
[[!ms3discountsBuyNow?
  &force_date=`1`
  &limit=`8`
]]
```

:::

Параметр `sale` уходит в плейсхолдер `ms3discounts.sale`. Его читает `ms3discountsGetDiscount` в режиме prepare.

Остальные свойства (`limit` и свои `parents`) уходят в `msProducts`. Список id сниппет кладёт в `resources`. Если `parents` не передан, `ms3discountsBuyNow` ставит `0`.
