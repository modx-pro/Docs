---
title: msBundles.initialize
description: Load msBundles CSS and JS on the storefront
---

# msBundles.initialize

Loads storefront assets in order: `msbundles.css`, `msbundles-helpers.js`, `msbundles-cart.js`, `msbundles.js`. Before the scripts it outputs `window.msbundlesConfig` and `window.msbundlesLexicon`.

No parameters. Call it in `<head>` on pages with bundle cards and the cart. Without it, add buttons and styles do not work.

## Example

::: code-group

```fenom
{'!msBundles.initialize' | snippet}
```

```modx
[[!msBundles.initialize]]
```

:::

## Config

| Key | Default | Purpose |
| --- | --- | --- |
| `autoBind` | `true` | Auto-bind handlers after load |
| `apiBaseUrl` | `''` | API prefix if the miniShop3 router is not on the default path |
| `maxBundleQuantity` | from setting | “Bundles” field limit |
| `calculateDebounceMs` | `350` | Pause before price recalculation while typing qty |
| `confirmRemoveBundle` | `false` | Dialog before “Remove bundle”. Off by default, like a miniShop3 product |

Set a custom config before the snippet call. The snippet merges it with `Object.assign`:

```html
<script>window.msbundlesConfig = { confirmRemoveBundle: true };</script>
```

Cart, data attributes, and theme notes: [Frontend](/components/msbundles/frontend#loading-css-and-js). Cards: [msBundles](msBundles).
