---
title: Типы подборок
---
# Типы подборок ms3ProductSets

Эта страница помогает быстро выбрать подходящий `type` и понять, откуда берутся товары в выдаче.

## Общая логика для всех типов

1. Сначала компонент ищет ручные связи в `ms3_product_sets`.
2. Если связей нет, запускается авто-ветка для выбранного `type`.
3. При пустом результате:
  - `hideIfEmpty=true` -> возвращается пустая строка
  - `hideIfEmpty=false` -> рендерится `emptyTpl`

## Быстрый выбор типа

| Тип | Где показывать | Если ручных связей нет |
| --- | --- | --- |
| `buy_together` | Карточка товара | Авто по категории товара |
| `similar` | Карточка товара | Похожие из той же категории |
| `popcorn` | Компактные блоки | Авто по категории, затем общий авто |
| `cart_suggestion` | Корзина / checkout | Авто по `category_id` или категории товара |
| `auto_sales` | Карточка / корзина | По статистике заказов, затем `similar` |
| `vip` | Акции / промо-блоки | `ms3productsets.vip_set_{set_id}` |
| `auto` | Главная / лендинги | Авто по категории или каталогу |

## Подробности по типам

### `buy_together`

- Обычно блок «С этим товаром покупают».
- Лучший выбор для допродажи аксессуаров к конкретному SKU.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6
]}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
]]
```

:::

### `similar`

- Показывает альтернативы из той же категории.
- Поддерживает исключения через `exclude_ids`.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'exclude_ids' => $_modx->resource.id,
  'max_items' => 8
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &exclude_ids=`[[*id]]`
  &max_items=`8`
]]
```

:::

### `popcorn`

- Компактный блок импульсных покупок.
- Если по категории пусто, берет общий авто-набор.

::: code-group

```fenom
{'!ms3ProductSets' | snippet : [
  'type' => 'popcorn',
  'resource_id' => $_modx->resource.id,
  'max_items' => 8,
  'tpl' => 'tplPopcorn',
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

### `cart_suggestion`

- Для страницы корзины и шага оформления.
- Удобно задавать через `category_id`.

::: code-group

```fenom
{'!ms3ProductSets' | snippet : [
  'type' => 'cart_suggestion',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 6
]}
```

```modx
[[!ms3ProductSets?
  &type=`cart_suggestion`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`6`
]]
```

:::

### `auto_sales`

- Основан на истории заказов (`ms3_order_product` + `ms3_order`, статусы `2,4,5`).
- Если статистики мало, блок часто откатывается к `similar`.

::: code-group

```fenom
{'!ms3ProductSets' | snippet : [
  'type' => 'auto_sales',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto_sales`
  &resource_id=`[[*id]]`
  &max_items=`6`
]]
```

:::

### `vip`

- Для промо-наборов и акций.
- Если ручной подборки нет, берет IDs из `vip_set_{set_id}`.

::: code-group

```fenom
{'!ms3ProductSets' | snippet : [
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

### `auto`

- Универсальный режим для главной, категорий, лендингов.
- Можно запускать без привязки к текущему товару (`resource_id=0`).

::: code-group

```fenom
{'!ms3ProductSets' | snippet : [
  'type' => 'auto',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 12
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`12`
]]
```

:::

## Синонимы типов

`also-bought`, `cross-sell`, `custom` поддерживаются, но обрабатываются как `auto`.
