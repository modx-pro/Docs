---
title: Сниппет ms3discountsGetDiscount
description: Бейдж скидки на товаре и prepareSnippet для msProducts
---

# Сниппет ms3discountsGetDiscount

Считает скидку одного товара. Работает в двух режимах.

**prepareSnippet** у `msProducts`: в свойствах уже есть строка товара (`id` и `pagetitle`). Сниппет дописывает поля продажи и возвращает массив строки. Чанк не выводит.

**Карточка**: нет `pagetitle` в свойствах. Сниппет берёт `id` или `product`, иначе id текущего ресурса. Подключает CSS/JS и выводит чанк.

Из нескольких подходящих акций выбирает строку с большей скидкой, затем с большим процентом.

На карточке учитывается `show_in_product`. В каталоге (`prepareSnippet`) учитывается `show_in_catalog`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `id` | id текущего ресурса | Id товара. Алиас: `product` |
| `sale` | пусто | Id акций через запятую. Пусто — плейсхолдер `ms3discounts.sale` (его ставит `ms3discountsBuyNow`), иначе все активные |
| `tpl` | `tpl.ms3discounts.get` | Чанк для режима карточки |
| `return` | `tpl` на карточке, массив в prepare | `data`, `json`, `tpl`. В prepare `tpl` игнорируется |
| `frontend_css` | пусто | CSS. Пусто или `0` — не подключать, настройку не читать. Без свойства сниппета берётся `ms3discounts_frontend_css` |
| `frontend_js` | пусто | JS таймера. То же правило, что у `frontend_css` |

Дополнительно можно передать `price`, `category_ids`, `vendor_id`, `article`, `count`, `options`. Иначе сниппет читает снимок товара MiniShop3.

## Плейсхолдеры

| Плейсхолдер | Смысл |
| --- | --- |
| `sale_discount` | Процент, иначе сумма скидки |
| `remains` | Секунды до `date_end`. Нет даты — пусто |
| `price` | Цена после скидки |
| `base_price` | Цена до скидки |
| `discount` | Сумма скидки |
| `percent` | Процент |
| `name` | Название акции |
| `id` | На карточке — id акции. В prepare остаётся id товара |
| `sale_id` | Id акции в режиме prepare |
| `date_end` | Дата окончания |
| `potential` | Актуальность расчёта движка |

## Примеры

Карточка товара:

::: code-group

```fenom
{'!ms3discountsGetDiscount' | snippet : ['id' => $_modx->resource.id]}
```

```modx
[[!ms3discountsGetDiscount? &id=`[[*id]]`]]
```

:::

Каталог. Таймер в чанке `tpl.ms3discounts.buynow.row`: класс `.ms3d_remains` и `data-remain`.

::: code-group

```fenom
{'!msProducts' | snippet : [
  'parents' => 0,
  'prepareSnippet' => 'ms3discountsGetDiscount',
  'tpl' => 'tpl.ms3discounts.buynow.row',
]}
```

```modx
[[!msProducts?
  &parents=`0`
  &prepareSnippet=`ms3discountsGetDiscount`
  &tpl=`tpl.ms3discounts.buynow.row`
]]
```

:::
