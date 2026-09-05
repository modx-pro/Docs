---
title: FAQ
description: 'Common msBundles issues: VueTools, permissions, initialize, selector, stock'
---

# FAQ

## Install fails with Package provider not found

The package is paid. Add the [modstore.pro](https://modstore.pro/extras/) provider with URL `https://modstore.pro/extras/`, plus email and API key from your account. Without it the encrypted transport will not install. Steps: [Quick start](quick-start).

## Manager section will not open / blank screen

Check that **VueTools** ≥ 1.1.2-pl is installed and the role has `msbundles_view`. Open `manager/?a=index&namespace=msbundles` and read the browser console.

## Menu item is missing

Usually `msbundles_view` is missing, or the cache was not cleared after install. Check the access policy and clear the MODX cache.

## Bundle card does not appear on the product

Walk the list:

1. **Active** is on in the editor.
2. The current product is in the composition.
3. The bundle **context** matches the page context (`web`, `en`, …).
4. The template calls:

```fenom
{'!msBundles' | snippet : ['product' => $_modx->resource.id]}
```

1. If a required line has zero stock, `msbundles_stock_behavior` is not `hide`.

## Bundle needed on another language / context

Each bundle has one `context_key`. For `en` or `de`, create a separate bundle: **Duplicate**, change context (while the copy is **inactive**), name, and composition. One ID does not span all storefronts.

## After updating to 1.1.0

The upgrade resolver sets `context_key = web` on existing bundles. If the storefront runs on another context, open the bundle, turn **Active** off, change context, and save.

## “Add bundle” button does nothing

Call `msBundles.initialize` in `<head>`. Without CSS and JS, `data-msbundles-action="add-bundle"` buttons stay plain markup.

## Toast appears, on-page cart block does not update

Set `selector` on `msCart`, for example `#ms-cart`. After add the front end reloads the cart and redraws registered blocks only. Without `selector` you get a toast and stale HTML.

## No “Bundle” badge in the cart

Under the product name in the cart chunk, call `tplMsBundlesCartInfo`. Without that hook the badge and “Remove bundle” will not appear. Example: [Frontend](frontend#hook-in-tplmscart).

## Cannot save a bundle

The composition has no lines. Add products. Saving needs `msbundles_save`.

## Bundle disappeared from the storefront at zero stock

Likely `msbundles_stock_behavior` = `hide`. Switch to `block` or `message`, or restock required lines.

## After a package update, old cart rows lost bundle labels

The **msBundles** plugin must listen to `msOnGetCart`. Open **Elements → Plugins → msBundles → System Events** and confirm the checkbox. The plugin fills legacy rows for the badge. The product key in the cart does not change.
