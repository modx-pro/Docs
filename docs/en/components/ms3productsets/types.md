---
title: Set types
---
# ms3ProductSets set types

This page helps choose the right `type` and understand where products in the set come from.

## Logic for all types

1. Component first looks for manual links in `ms3_product_sets`.
2. If none, auto branch for the chosen `type` runs.
3. When result is empty:
   - `hideIfEmpty=true` → empty string
   - `hideIfEmpty=false` → `emptyTpl` is rendered

## Quick type reference

| Type | Where to show | When no manual links |
| --- | --- | --- |
| `buy_together` | Product card | Auto by product category |
| `similar` | Product card | Similar from same category |
| `popcorn` | Compact blocks | Auto by category, then general auto |
| `cart_suggestion` | Cart / checkout | Auto by `category_id` or product category |
| `auto_sales` | Card / cart | By order stats, then `similar` |
| `vip` | Promo blocks | `ms3productsets.vip_set_{set_id}` |
| `auto` | Homepage / landings | Auto by category or catalog |

## Type details

### `buy_together`

- Usually “Frequently bought together”.
- Best for cross-sell accessories to a specific SKU.

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

- Shows alternatives from the same category.
- Supports `exclude_ids`.

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

- Compact impulse block.
- If category is empty, uses general auto set.

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

- For cart and checkout.
- Often used with `category_id`.

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

- Based on order history (`ms3_order_product` + `ms3_order`, statuses `2,4,5`).
- With little data often falls back to `similar`.

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

- For promo sets.
- With no manual set, uses IDs from `vip_set_{set_id}`.

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

- General mode for homepage, categories, landings.
- Can run without current product (`resource_id=0`).

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

## Type aliases

`also-bought`, `cross-sell`, `custom` are supported and handled as `auto`.
