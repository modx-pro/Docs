---
title: msMCD
description: Dynamic mini-cart updates for miniShop2
logo: https://modstore.pro/assets/extras/msmcd/logo-md.png
author: modx-pro
modstore: https://modstore.pro/packages/integration/msmcd
repository: https://github.com/modx-pro/msMCD

dependencies: miniShop2
---

# msMCD (mini cart dynamic) for miniShop2

msMCD is a refactor of msMiniCartDynamic with improvements for updating the mini cart dynamically. msMiniCartDynamic is no longer supported.

You no longer need to add scripts manually; msMCD does it. Chunks use Fenom and Bootstrap4.

## Features

- Dynamic mini-cart updates
- Add to cart by button, manual input, or +/- buttons (optional)
- Add-to-cart animation (flying image) (optional)
- Choose which fields to pass to the mini cart (optional)
- Remove selected product
- Works with multiple contexts

## msMCDMiniCart snippet

Outputs the current mini cart.

After installation, use **msMCDMiniCart** instead of the default `msMiniCart`.

::: code-group

```modx
[[!msMCDMiniCart?
  &img=`50x50`
]]
```

```fenom
{'!msMCDMiniCart' | snippet: [
  'img' => '50x50',
]}
```

:::

### Parameters

| Name         | Default               | Description                                                                                                      |
|--------------|-----------------------|-------------------------------------------------------------------------------------------------------------------|
| **tpl**      | `msMCDMiniCartRowTpl`   | Chunk for each row                                                                                               |
| **tplOuter** | `msMCDMiniCartOuterTpl` | Wrapper chunk                                                                                                     |
| **jsUrl**    |                        | Path to script file                                                                                              |
| **img**      |                        | Product image size, same as in file source, e.g. `50x50` or `small`                                               |
| **animate**  | `false`                | Animate add to cart. Add class `msmcd-img` to the image in the product list chunk; image must be inside a form   |
| **dropdown** | `false`                | Open mini cart when adding a product                                                                             |
| **changeCount** | `false`              | Allow changing product quantity in the mini cart                                                                 |

## msMCDCount snippet

**msMCDCount** — for add-to-cart: shows an input with -/+ instead of a button. Used in chunk `msMCDProductsRowInputTpl`.

### Parameters

| Name    | Default          | Description                |
|---------|------------------|----------------------------|
| **tpl** | `msMCDCountTpl`  | Chunk for the input        |
| **jsUrl** |                 | Path to script file        |

## System settings

| Name                        | Default     | Description                                                                                                                       |
|-----------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------|
| **msmcd_fields_mini_cart**  | `pagetitle` | Fields to pass to the mini cart. All fields of: msProduct(modResource), msProductData, msVendor. Always in mini cart: id, price, count, options, weight, ctx, sum, img |
| **msmcd_animate_mini_cart** | `false`     | Enable add-to-cart animation                                                                                                     |
| **msmcd_dropdown_mini_cart** | `false`    | Open mini cart when adding a product                                                                                              |

Snippet parameters override system settings.

## Examples

msMCD includes two example product chunks: `msMCDProductsRowTpl` and `msMCDProductsRowInputTpl`.
To add to cart with a button, call **msProducts** like this:

::: code-group

```modx
[[!msProducts?
  &tpl=`msMCDProductsRowTpl`
]]
```

```fenom
{'!msProducts' | snippet: [
  'tpl' => 'msMCDProductsRowTpl',
]}
```

:::

For add by buttons/manual input:

::: code-group

```modx
[[!msProducts?
  &tpl=`msMCDProductsRowInputTpl`
]]
```

```fenom
{'!msProducts' | snippet: [
  'tpl' => 'msMCDProductsRowInputTpl',
]}
```

:::

These chunks are examples only. The product image must be inside a `form` tag with class `msmcd-img` for the flying-image animation.
