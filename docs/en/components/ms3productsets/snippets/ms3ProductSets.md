---
title: ms3ProductSets
---
# Snippet ms3ProductSets

Product sets for MiniShop3. Reads manual links from `ms3_product_sets` and drops unpublished or deleted IDs. An empty list with `ms3productsets.auto_recommendation` = 1 runs the type auto logic. `vip` ignores that setting.

## Supported types

- `buy_together`
- `similar`
- `popcorn`
- `cart_suggestion`
- `auto_sales`
- `vip`
- `auto`
- `also-bought`, `cross-sell` (same auto path as `buy_together`)
- `custom` (same as `auto`)

Unknown `type` uses `buy_together`.

## Parameters

| Parameter | Description | Default |
| --- | --- | --- |
| `type` | Set type | `buy_together` |
| `resource_id` / `productId` | Product ID (context resource) | current resource |
| `category_id` | Category for `msps_get_auto_recommendations`. Does not affect `similar` or `auto_sales` SQL | `0` |
| `set_id` | VIP set (`vip_set_{set_id}`) | `0` |
| `max_items` | Limit (1–100). Omitted calls use property `10`, not the system setting | `10` |
| `tpl` | Card chunk. `tplSetVIP` / `tplPopcorn` use `itemTpl` for the row | `tplSetItem` |
| `itemTpl` | Row chunk for VIP/popcorn wrappers | `''` |
| `set_title` | VIP wrapper title | `''` |
| `discount_percent` | VIP wrapper badge. At `0` the badge is hidden | `0` |
| `showLog` | Passed to `msProducts` | `false` |
| `tplWrapper` | Block wrapper: `output`, `type`, `count`, `product_ids` | `''`. Chunk name such as `tplSetWrapper` |
| `emptyTpl` | Empty result chunk | `tplSetEmpty` |
| `hideIfEmpty` | `true` returns empty string. `false` returns `emptyTpl` | `true` |
| `exclude_ids` | Product IDs to exclude | `''` |
| `showUnpublished` | Passed to `msProducts` | `false` |
| `showHidden` | Passed to `msProducts` | `false` |
| `sortby` / `sortdir` | Output sort | order from set |
| `tvPrefix`, `includeTVs`, `includeThumbs` | pdoTools/msProducts params | `''` |
| `return` | Format: `data`, `ids`, `json` | `data` |
| `toPlaceholder` | Result in a placeholder (not passed to `msProducts`) | `''` |

Other call parameters go to `msProducts`.

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
