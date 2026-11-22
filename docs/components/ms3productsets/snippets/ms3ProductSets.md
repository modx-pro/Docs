---
title: ms3ProductSets
---
# Сниппет ms3ProductSets

Подборки товаров MiniShop3. Читает ручные связи из `ms3_product_sets`, убирает неопубликованные и удалённые ID. Пустой список при `ms3productsets.auto_recommendation` = 1 включает авто-логику типа. `vip` настройку не читает.

## Поддерживаемые типы

- `buy_together`
- `similar`
- `popcorn`
- `cart_suggestion`
- `auto_sales`
- `vip`
- `auto`
- `also-bought`, `cross-sell`: как `buy_together` (co-purchase, затем авто по категории)
- `custom`: как `auto`

Неизвестный `type` → `buy_together`.

## Параметры

| Параметр | Описание | По умолчанию |
| --- | --- | --- |
| `type` | Тип подборки | `buy_together` |
| `resource_id` / `productId` | ID товара (контекстный ресурс) | текущий ресурс |
| `category_id` | Категория для `msps_get_auto_recommendations`. Не влияет на `similar` и SQL `auto_sales` | `0` |
| `set_id` | VIP-набор (`vip_set_{set_id}`) | `0` |
| `max_items` | Лимит (1–100). Без параметра — свойство `10`, не системная настройка | `10` |
| `tpl` | Чанк карточки. `tplSetVIP` / `tplPopcorn` берут строку из `itemTpl` | `tplSetItem` |
| `itemTpl` | Чанк строки для обёртки VIP/popcorn | `''` |
| `set_title` | Заголовок обёртки VIP | `''` |
| `discount_percent` | Бейдж обёртки VIP. При `0` бейдж скрыт | `0` |
| `showLog` | Проброс в `msProducts` | `false` |
| `tplWrapper` | Обёртка блока: `output`, `type`, `count`, `product_ids` | `''`. Имя чанка, например `tplSetWrapper` |
| `emptyTpl` | Чанк пустого результата | `tplSetEmpty` |
| `hideIfEmpty` | `true` — пустая строка. `false` — `emptyTpl` | `true` |
| `exclude_ids` | ID товаров для исключения | `''` |
| `showUnpublished` | Проброс в `msProducts` | `false` |
| `showHidden` | Проброс в `msProducts` | `false` |
| `sortby` / `sortdir` | Сортировка вывода | порядок из подборки |
| `tvPrefix`, `includeTVs`, `includeThumbs` | Параметры pdoTools/msProducts | `''` |
| `return` | Формат: `data`, `ids`, `json` | `data` |
| `toPlaceholder` | Результат в плейсхолдер (в `msProducts` не передаётся) | `''` |

Остальные параметры вызова уходят в `msProducts`.

## Примеры

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

VIP-набор:

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'resource_id' => $_modx->resource.id,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &resource_id=`[[*id]]`
  &tpl=`tplSetVIP`
]]
```

:::

Только ID без HTML:

::: code-group

```fenom
{'ms3ProductSets' | snippet : ['type' => 'auto', 'return' => 'ids', 'category_id' => 5]}
```

```modx
[[!ms3ProductSets?
  &type=`auto`
  &return=`ids`
  &category_id=`5`
]]
```

:::
