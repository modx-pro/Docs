---
title: ms3ProductSets
---
# Snippet ms3ProductSets

Outputs product sets for MiniShop3. Logic: first tries manual links from `ms3_product_sets`, then applies auto logic by type when result is empty.

## Supported types

- `buy_together`
- `similar`
- `popcorn`
- `cart_suggestion`
- `auto_sales`
- `vip`
- `auto`
- `also-bought`, `cross-sell`, `custom` (handled as auto)

Unknown `type` falls back to `buy_together`.

## Parameters

| Parameter | Description | Default |
| --- | --- | --- |
| `type` | Set type | `buy_together` |
| `resource_id` / `productId` | Product ID (context resource) | current resource |
| `category_id` | Category ID for auto mode | `0` |
| `set_id` | VIP set number (`vip_set_{set_id}`) | `0` |
| `max_items` | Product limit (1–100) | `ms3productsets.max_items` |
| `tpl` | Card chunk | `tplSetItem` |
| `tplWrapper` | Block wrapper chunk (`output`, `type`, `count`) | `''` (no wrapper; set a chunk name such as `tplSetWrapper`) |
| `emptyTpl` | Empty result chunk | `tplSetEmpty` |
| `hideIfEmpty` | `true`: empty string, `false`: `emptyTpl` | `true` |
| `exclude_ids` | Product IDs to exclude | `''` |
| `showUnpublished` | Passed to `msProducts` | `false` |
| `showHidden` | Passed to `msProducts` | `false` |
| `sortby` / `sortdir` | Output sort | order from set |
| `tvPrefix`, `includeTVs`, `includeThumbs` | pdoTools/msProducts params | `''` |
| `return` | Format: `data`, `ids`, `json` | `data` |
| `toPlaceholder` | Write result to placeholder | `''` |

## Examples

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

VIP set:

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

IDs only, no HTML:

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
