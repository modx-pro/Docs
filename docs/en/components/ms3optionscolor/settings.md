---
title: System settings
description: ms3optionscolor namespace keys and when to enable each
---

# System settings

Open **System → System settings**, then filter by namespace **ms3optionscolor**.

After changing values, clear the MODX cache. If you edited the manager (RAL, option key), reload the manager page: the Vue config is read on open.

The database key always uses an underscore: `ms3optionscolor_<name>`.

## Summary table

| Key | Type | Default | Summary |
| --- | --- | --- | --- |
| `ms3optionscolor_default_option_key` | textfield | `color` | Which product options count as "color" |
| `ms3optionscolor_ral_enabled` | combo-boolean | Yes | RAL tab and search in the manager |
| `ms3optionscolor_frontend_css` | combo-boolean | Yes | Auto-load swatch styles on the storefront |
| `ms3optionscolor_variants_decorate` | combo-boolean | Yes | Dictionary colors on ms3variants rows in the catalog |

## `ms3optionscolor_default_option_key`

Which option (or options) appear on the **Swatches** tab, in color requests for chips on **Product properties**, and in the snippet when you omit `&options`.

| Value | When to use |
| --- | --- |
| `color` | One "Color" option key (typical shop) |
| `color,material` | Swatches for both color and material |

Write multiple keys comma-separated, with or without spaces after commas: the package trims spaces. Do not leave the field empty: set a real option key.

Example: the miniShop3 option is named `color`. Keep the default. The Swatches tab shows all values of that option for the product. The snippet without `&options` also uses `color`.

If the option key differs (for example `obivka`), set it here. Otherwise the Swatches tab stays empty even when values exist on **Product properties**.

## `ms3optionscolor_ral_enabled`

| Value | Effect |
| --- | --- |
| Yes | The CMP shows a **RAL** tab; the color dialog can search RAL codes |
| No | The RAL tab is hidden and RAL search in the form is unavailable. Saved codes in the dictionary are not deleted |

Turn off if RAL is not needed and distracts managers. HEX and patterns work regardless of this setting.

## `ms3optionscolor_frontend_css`

| Value | Effect |
| --- | --- |
| Yes | Styles from `css/web/main.css` load on site pages and when the snippet runs |
| No | Styles do not load. `[data-ms3oc-swatch]` squares often have no size, especially in the cart |

Keep **Yes** if you use stock chunks. Set **No** only when you include theme CSS yourself and do not want to duplicate the package file.

Manual include:

::: code-group

```fenom
<link rel="stylesheet" href="{'assets_url' | option}components/ms3optionscolor/css/web/main.css">
```

```modx
<link rel="stylesheet" href="[[++assets_url]]components/ms3optionscolor/css/web/main.css">
```

:::

## `ms3optionscolor_variants_decorate`

Works only with [ms3variants](/components/ms3variants/) and a listing call with `usePackages=ms3Variants`.

| Value | Effect |
| --- | --- |
| Yes | Each catalog variant gets dictionary colors (`variants[].swatches`) |
| No | Variants behave like ms3variants without dictionary colors |

This setting does not affect the cart, price, or variant selection on the product page. More details and markup examples: [ms3variants](ms3variants).

## Access permissions

The package does not create separate permissions.

| Action | Required permission |
| --- | --- |
| Open the section, edit dictionary and RAL | `msproduct_save` (same as saving a miniShop3 product) |
| Swatches tab on a product | same `msproduct_save` |

Without the permission, saves in the manager fail. Check the manager role policy and clear the cache.

## Related pages

- First run: [Quick start](quick-start)
- Snippet parameters: [ms3OptionsColor](snippets/ms3OptionsColor)
- Common issues: [FAQ](faq)
