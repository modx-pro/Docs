---
title: msBundles
description: Snippet that renders product bundles on the storefront
---

# msBundles

Renders HTML for product bundles. Put it in the product template or anywhere you need set cards.

## Selection order

1. `bundle` > 0 — one bundle by ID. Inactive with `activeOnly=1`, or a `context_key` that does not match the current request context → empty.
2. Else non-empty `bundles` — bundles by ID list (order as in the parameter). IDs from another context are skipped.
3. Else `list=all` — all bundles in the **current context** (by `sortorder`).
4. Else `product` > 0 — bundles that include the product in the current context.
5. Otherwise `emptyTpl`.

With `msbundles_stock_behavior=hide` and unavailable required stock, the card is omitted. `block` and `message` keep the card with `--blocked` / `--warning` modifiers.

With no bundle image and `imageFallback=1`, the first product thumb is used.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `product` | `0` | Product resource ID. Bundles that include it in the current context |
| `bundle` | `0` | Single bundle ID (instead of `product`) |
| `bundles` | — | Comma-separated IDs: `5,8,12` |
| `list` | — | `all` — all bundles in the current context (by `sortorder`) |
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

Several bundles on a landing page:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'bundles' => '5,8,12',
  'wrapperTpl' => 'tplMsBundlesList',
  'tpl' => 'tplMsBundlesItem'
]}
```

```modx
[[!msBundles?
  &bundles=`5,8,12`
  &wrapperTpl=`tplMsBundlesList`
  &tpl=`tplMsBundlesItem`
]]
```

:::

All active bundles in the current context:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'list' => 'all',
  'wrapperTpl' => 'tplMsBundlesList'
]}
```

```modx
[[!msBundles?
  &list=`all`
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
