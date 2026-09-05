---
title: Quick start
description: Install msBundles, create the first bundle, and verify the cart
---

# Quick start

In about 20 minutes you install the package, build a two-product bundle, show it on a product page, and check the cart.

## Before you start

You already have MODX 3, miniShop3, VueTools ≥ 1.1.2-pl, pdoTools, and PHP 8.2+. Your manager role will need `msbundles_view` and `msbundles_save`. Grant them right after install.

## Install

The package is paid. It installs only from [modstore.pro](https://modstore.pro/extras/). Without the provider, install fails with `Package provider not found`.

1. Open **System → Package Management → Providers** and add **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email and API key from your modstore.pro account
2. Find and install **msBundles**.
3. Clear the MODX cache.
4. Enable `msbundles_view` and `msbundles_save` on the manager policy.
5. Open **Extras → msBundles**. The list should load without a blank screen or VueTools errors.

On install the package creates tables, permissions, events, API routes, and binds the plugin to the miniShop3 cart.

## Step 1. Create a bundle

![Bundle list](/components/msbundles/screenshots/overview.png)

1. Click **Add bundle**.
2. Pick **Context** (defaults to `web`). Enter a name, for example “Laptop + headphones”. Add a description and image via the media browser if you want.
3. Turn on **Active**. While it is off, the storefront will not show the bundle.

![Bundle editor](/components/msbundles/screenshots/editor.png)

## Step 2. Add products and prices

In the composition search, type a name, SKU, or ID. Add at least two lines. The same product cannot appear twice.

For each line set quantity, price mode, and **Required**. Reorder by dragging the left handle.

| Mode | What you enter | Result |
| --- | --- | --- |
| Original | nothing | Product price from miniShop3 |
| Fixed | amount | Fixed unit price |
| Discount % | 0–100 | Percent off product price |
| Discount amount | amount | Subtracted from product price |
| Free | nothing | 0 per unit |

A simple start: leave the laptop on **Original**, set headphones to **Discount %** = 50. Check total and **Savings** in the editor footer.

## Step 3. Preview and save

![Storefront preview](/components/msbundles/screenshots/editor-preview.png)

On the right, **Summary** shows line and unit counts. **As on storefront** shows price, savings, and availability for one bundle.

If a required product is out of stock, a warning appears above the form. Click **Save**. The button stays disabled until the set has products.

## Step 4. Show it on the storefront

In the product template:

::: code-group

```fenom
{'!msBundles' | snippet : [
  'product' => $_modx->resource.id,
  'tpl' => 'tplMsBundlesItem',
  'wrapperTpl' => 'tplMsBundlesList',
  'emptyTpl' => 'tplMsBundlesEmpty',
  'activeOnly' => true
]}
```

```modx
[[!msBundles?
  &product=`[[*id]]`
  &tpl=`tplMsBundlesItem`
  &wrapperTpl=`tplMsBundlesList`
  &emptyTpl=`tplMsBundlesEmpty`
  &activeOnly=`1`
]]
```

:::

In `<head>` of the same page (or shared layout):

::: code-group

```fenom
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles.initialize]]
```

:::

Open any product from the set, for example “Headphones”. The “Laptop + headphones” card should be there.

## Step 5. Check the cart

On the bundle card set quantity and click add. In the cart table:

- the main bundle row shows a “Bundle” badge and “Remove bundle”
- other products in the set show “Part of bundle…”, quantity locked
- changing quantity on the main row moves the other lines with it

For the on-page cart HTML to refresh after add, pass `selector` to `msCart`. Under the product name in the cart chunk, call `tplMsBundlesCartInfo`. Details: [Frontend](frontend).

::: code-group

```fenom
{'!msCart' | snippet : [
  'tpl' => 'tpl.msCart',
  'return' => 'tpl',
  'selector' => '#ms-cart'
]}
```

```modx
[[!msCart?
  &tpl=`tpl.msCart`
  &return=`tpl`
  &selector=`#ms-cart`
]]
```

:::

## If something fails

| Problem | Check |
| --- | --- |
| Section will not open | VueTools ≥ 1.1.2-pl, `msbundles_view` |
| No card on the product | **Active** toggle, `msBundles` in the template |
| Add button does nothing | `msBundles.initialize` in head |
| Cart total and block do not update | `selector` on `msCart` |
| No “Bundle” badge in the cart | `tplMsBundlesCartInfo` in the cart chunk |

Next if you want: [flows](interface/flows), [settings](settings), [snippets](snippets/).
