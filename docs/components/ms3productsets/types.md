---
title: Типы подборок
---
# Типы подборок ms3ProductSets

Документ для двух ролей:

- **Менеджер**: какой тип выбрать под задачу и что ожидать в выдаче.
- **Разработчик**: точная техническая логика, fallback и примеры вызова.

## Общие правила (для всех типов)

1. Сначала проверяются ручные связи в `ms3_product_sets` для (`product_id`, `type`).
2. Если ручных связей нет, включается авто-логика типа.
3. При пустом результате:
   - `hideIfEmpty=true` → возвращается пустая строка `''`;
   - `hideIfEmpty=false` → возвращается `emptyTpl`.
4. `max_items` ограничивается диапазоном `1..100`.
5. Если `return=ids`, сниппет возвращает только список ID.

## Параметры, которые чаще всего влияют на результат

- `resource_id` / `productId` — базовый товар.
- `category_id` — принудительная категория для авто-режимов.
- `set_id` — номер VIP-набора (`vip_set_{set_id}`).
- `exclude_ids` — исключаемые ID.

## 1. `buy_together`

### Для менеджера

Используйте для блока «С этим товаром покупают» на карточке товара.

### Для разработчика

Приоритет:

1. Ручные связи `type=buy_together`.
2. Если пусто — `msps_get_auto_recommendations` по категории товара/`category_id`.

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

## 2. `similar`

### Для менеджера

Показывает альтернативы из той же категории.

### Для разработчика

Приоритет:

1. Ручные связи `type=similar`.
2. Если пусто — `msps_get_similar_products`:
   - категория (`parent`) текущего товара;
   - исключаются текущий товар и `exclude_ids`.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'exclude_ids' => $_modx->resource.id,
  'max_items' => 8,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &exclude_ids=`[[*id]]`
  &max_items=`8`
  &tpl=`tplSetItem`
]]
```

:::

## 3. `popcorn`

### Для менеджера

Компактный блок импульсных/дополнительных покупок.

### Для разработчика

Приоритет:

1. Ручные связи `type=popcorn`.
2. Если пусто — авто по категории текущего товара.
3. Если снова пусто — fallback на общий авто-подбор.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'popcorn',
  'resource_id' => $_modx->resource.id,
  'max_items' => 4,
  'tpl' => 'tplPopcorn'
]}
```

```modx
[[!ms3ProductSets?
  &type=`popcorn`
  &resource_id=`[[*id]]`
  &max_items=`4`
  &tpl=`tplPopcorn`
]]
```

:::

## 4. `cart_suggestion`

### Для менеджера

Рекомендации в корзине или перед оформлением заказа.

### Для разработчика

Приоритет:

1. Ручные связи `type=cart_suggestion`.
2. Если пусто — авто по `category_id` или категории `resource_id`.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'cart_suggestion',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`cart_suggestion`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## 5. `auto_sales`

### Для менеджера

Рекомендации на основе фактических заказов («часто покупают вместе»).

### Для разработчика

Приоритет:

1. Ручные связи `type=auto_sales`.
2. Если пусто — SQL по заказам (`ms3_order_product` + `ms3_order`, статусы `2,4,5`).
3. Если статистики нет — fallback на `similar`.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'auto_sales',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto_sales`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## 6. `vip`

### Для менеджера

Ручные промо-наборы и акционные витрины.

### Для разработчика

Приоритет:

1. Ручные связи `type=vip`.
2. Если пусто — `ms3productsets.vip_set_{set_id}`.

Если `set_id` не задан или меньше 1, используется `set_id=1`.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'max_items' => 8,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &max_items=`8`
  &tpl=`tplSetVIP`
]]
```

:::

## 7. `auto`

### Для менеджера

Универсальные рекомендации для главной, категорий и лендингов.

### Для разработчика

Приоритет:

1. Ручные связи `type=auto`.
2. Если пусто — `msps_get_auto_recommendations`:
   - по категории товара (`resource_id`),
   - или по заданному `category_id`.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'auto',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 12,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`12`
  &tpl=`tplSetItem`
]]
```

:::

## 8. Синонимы

Типы ниже допустимы, но обрабатываются как `auto`:

- `also-bought`
- `cross-sell`
- `custom`

## 9. Краткая матрица fallback

| Тип | Если нет ручной подборки |
| --- | --- |
| `buy_together` | авто по категории |
| `similar` | похожие по категории |
| `popcorn` | авто по категории → fallback на общий авто |
| `cart_suggestion` | авто по категории/`category_id` |
| `auto_sales` | статистика заказов → fallback на `similar` |
| `vip` | системная настройка `vip_set_{set_id}` |
| `auto` | авто по категории/каталогу |

## 10. Практические рекомендации

1. Для больших каталогов начинайте с `auto`/`similar` и точечно добавляйте ручные связи только для важных SKU.
2. Для акций и сезонных подборок удобнее использовать `vip` + системные настройки.
3. Для `auto_sales` проверяйте, что в магазине есть достаточно заказов, иначе чаще будет fallback на `similar`.
4. Если нужен стабильный порядок, задавайте ручные связи или `sortby`; в авто-режиме порядок чаще случайный.
