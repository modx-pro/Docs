---
title: ms3ProductSets
---
# Сниппет ms3ProductSets

Выводит подборки товаров для MiniShop3. Логика: сначала пытается получить ручные связи из таблицы `ms3_product_sets`, при пустом результате применяет авто-логику по типу.

## Поддерживаемые типы

- `buy_together`
- `similar`
- `popcorn`
- `cart_suggestion`
- `auto_sales`
- `vip`
- `auto`
- `also-bought`, `cross-sell`, `custom` (обрабатываются как авто-режим)

Если передан неизвестный `type`, используется `buy_together`.

## Параметры

| Параметр | Описание | По умолчанию |
| --- | --- | --- |
| `type` | Тип подборки | `buy_together` |
| `resource_id` / `productId` | ID товара (контекстный ресурс) | текущий ресурс |
| `category_id` | ID категории для авто-режима | `0` |
| `set_id` | Номер VIP-набора (`vip_set_{set_id}`) | `0` |
| `max_items` | Лимит товаров (1–100) | `ms3productsets.max_items` |
| `tpl` | Чанк карточки | `tplSetItem` |
| `tplWrapper` | Чанк-обёртка блока (`output`, `type`, `count`) | `''` (без обёртки; задайте имя чанка, например `tplSetWrapper`) |
| `emptyTpl` | Чанк пустого результата | `tplSetEmpty` |
| `hideIfEmpty` | `true`: вернуть пустую строку, `false`: вернуть `emptyTpl` | `true` |
| `exclude_ids` | ID товаров для исключения | `''` |
| `showUnpublished` | Проброс в `msProducts` | `false` |
| `showHidden` | Проброс в `msProducts` | `false` |
| `sortby` / `sortdir` | Сортировка вывода | порядок из подборки |
| `tvPrefix`, `includeTVs`, `includeThumbs` | Параметры pdoTools/msProducts | `''` |
| `return` | Формат: `data`, `ids`, `json` | `data` |
| `toPlaceholder` | Записать результат в плейсхолдер | `''` |

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
