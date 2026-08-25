---
title: msBundles
description: Snippet that renders product bundles on the storefront
---

# msBundles

Renders HTML for product bundles. Put it in the product template or anywhere you need set cards.

## Selection order

1. `bundle` > 0 — one bundle by ID. If it is inactive and `activeOnly=1`, the result is empty.
2. Else `product` > 0 — bundles that include that product.
3. Otherwise `emptyTpl` is returned.

With `msbundles_stock_behavior=hide` and unavailable required stock, the card is omitted. `block` and `message` keep the card with `--blocked` / `--warning` modifiers.

With no bundle image and `imageFallback=1`, the first product thumb is used.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `product` | `0` | Product resource ID. Bundles that include it |
| `bundle` | `0` | Single bundle ID (instead of `product`) |
| `tpl` | `tplMsBundlesItem` | Card chunk |
| `wrapperTpl` | `tplMsBundlesList` | List wrapper |
| `emptyTpl` | `tplMsBundlesEmpty` | Empty result |
| `productTpl` | `tplMsBundlesProduct` | Composition line chunk |
| `imageFallback` | `0` | No bundle image → first product thumb |
| `activeOnly` | `1` | Active bundles only |
| `quantity` | `1` | Bundle count for price and stock |
| `toPlaceholder` | — | Placeholder name. Snippet returns an empty string |

## Examples

On a product page:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'product' => $_modx->resource.id,
  'tpl' => 'tplMsBundlesItem',
  'wrapperTpl' => 'tplMsBundlesList',
  'emptyTpl' => 'tplMsBundlesEmpty',
  'activeOnly' => true,
  'quantity' => 1
]}
```

```modx
[[!msBundles?
  &product=`[[*id]]`
  &tpl=`tplMsBundlesItem`
  &wrapperTpl=`tplMsBundlesList`
  &emptyTpl=`tplMsBundlesEmpty`
  &activeOnly=`1`
  &quantity=`1`
]]
```

:::

Single bundle by ID:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'bundle' => 5,
  'tpl' => 'tplMsBundlesItem',
  'wrapperTpl' => 'tplMsBundlesList'
]}
```

```modx
[[!msBundles?
  &bundle=`5`
  &tpl=`tplMsBundlesItem`
  &wrapperTpl=`tplMsBundlesList`
]]
```

:::

To a placeholder:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'product' => $_modx->resource.id,
  'toPlaceholder' => 'bundlesHtml'
]}
{$_modx->getPlaceholder('bundlesHtml')}
```

```modx
[[!msBundles?
  &product=`[[*id]]`
  &toPlaceholder=`bundlesHtml`
]]
[[+bundlesHtml]]
```

:::

Card and composition placeholders: [Frontend](/components/msbundles/frontend). Always call [msBundles.initialize](msBundles.initialize) nearby.
