---
title: FAQ
description: 'Common ms3OptionsColor errors: VueTools, CSS, mFilter, variants'
---

# FAQ

## Manager section does not open / blank screen

Check that **VueTools** ≥ 1.1.2-pl is installed. Open `manager/?a=index&namespace=ms3optionscolor` and check browser console errors. Without VueTools the section and product tab will not open.

## Dictionary will not save / access error

The manager role needs `msproduct_save` (same as saving a miniShop3 product). The package does not add its own permissions. Check the access policy.

## Swatches tab is empty or has no values

First on **Product properties** add option values (`color` or keys from `ms3optionscolor_default_option_key`) and save the product. Then open **Swatches**. Color lives in the package dictionary, not in the miniShop3 option properties.

## Storefront swatches have no size / are invisible

Enable `ms3optionscolor_frontend_css` or load manually:

::: code-group

```fenom
<link rel="stylesheet" href="{'assets_url' | option}components/ms3optionscolor/css/web/main.css">
```

```modx
<link rel="stylesheet" href="[[++assets_url]]components/ms3optionscolor/css/web/main.css">
```

:::

Without CSS the `[data-ms3oc-swatch]` element often stays zero width, especially in the cart.

## Select without colored squares in the list

Include `js/web/select.js`:

::: code-group

```fenom
<script src="{'assets_url' | option}components/ms3optionscolor/js/web/select.js"></script>
```

```modx
<script src="[[++assets_url]]components/ms3optionscolor/js/web/select.js"></script>
```

:::

For Select2 you need jQuery and Select2 on the page. Otherwise set `native=1` and keep a plain `<select>` with `data-color` / `data-pattern` on each option.

## mFilter without swatches

In the Filter Set set `"type": "ms3oc"`, not the built-in `colors`. The type appears only when mFilter is installed and `OnMFilterInit` fired. On the storefront call `mFilter` (results) first, then `mFilterForm`. In some mFilter versions set `&tplItem=tplMFilterMs3OptionsColor`. Details: [mFilter](mfilter).

## No `variants[].swatches` in the catalog

Checklist and markup: [ms3variants](ms3variants). The package does not load variants itself. It only enriches an already prepared `row.variants`.

## Another product does not see my color

The dictionary is shared by `option_key` + `value`. Values must match literally: `Синий` and `синий` are different records. Check the **Not set** filter in the CMP.
