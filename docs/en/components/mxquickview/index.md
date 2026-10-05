---
title: mxQuickView
description: Quick view of product card and any resources via AJAX for MODX 3
author: Ibochkarev
logo: https://modstore.pro/assets/extras/mxquickview/logo.png
modstore: https://modstore.pro/packages/ecommerce/mxquickview
categories: catalog

compatibility:
  - modx3
  - php81
  - minishop3
items: [
  {
    text: 'Getting started',
    link: 'quick-start',
    items: [
      { text: 'Quick start', link: 'quick-start' },
      { text: 'System settings', link: 'settings' },
      { text: 'Render types', link: 'types' },
    ],
  },
  {
    text: 'Site integration',
    link: 'integration',
    items: [
      { text: 'Integration', link: 'integration' },
      { text: 'Frontend setup', link: 'frontend' },
      { text: 'Snippets overview', link: 'snippets' },
      { text: 'Snippet mxQuickView.initialize', link: 'snippets/mxquickview-initialize' },
    ],
  },
  {
    text: 'Administration',
    link: 'admin',
    items: [
      { text: 'Manager guide', link: 'admin' },
      { text: 'Permissions', link: 'permissions' },
    ],
  },
  {
    text: 'For developers',
    link: 'api',
    items: [
      { text: 'Contracts and parameters (API)', link: 'api' },
      { text: 'Flows and scenarios', link: 'flows' },
      { text: 'Architecture', link: 'architecture' },
    ],
  },
]
---
# mxQuickView

`mxQuickView` loads resource content via AJAX and shows it in a modal or in a given container (`selector`).

## Quick links

| Need | Document |
| --- | --- |
| Add it to the site (Fenom/MODX) | [Integration](/en/components/mxquickview/integration) |
| Configure the whitelist in the manager | [Admin](/en/components/mxquickview/admin) |
| Endpoint, request body, and JSON responses | [API](/en/components/mxquickview/api) |
| Flows (`modal`/`selector`, loop, variants) | [Flows](/en/components/mxquickview/flows) |
| Render type (`chunk`, `snippet`, `template`) | [Render types](/en/components/mxquickview/types) |

## Who reads what

- **Manager:** [Admin](/en/components/mxquickview/admin) → [Integration](/en/components/mxquickview/integration).
- **Developer:** [Architecture](/en/components/mxquickview/architecture) → [API](/en/components/mxquickview/api) → [Render types](/en/components/mxquickview/types) → [Flows](/en/components/mxquickview/flows).

## Features

- Renders three types: `chunk`, `snippet`, `template`.
- Modes: `modal` and `selector`.
- Modal libraries: `native`, `bootstrap`, `fancybox`.
- Prev/next navigation in a list when `data-mxqv-loop="true"` (`modalLibrary` `native` or `bootstrap` only, not Fancybox).
- After load calls `ms3.cartUI`, `ms3.quantityUI`, `ms3.productCardUI.reinit()` and `ms3:cart:updated` (when MiniShop3 is on the page).
- ms3Variants in quick view (`variants_html`, `variants_json`, `has_variants`).

## Requirements

- MODX Revolution 3+
- PHP 8.1+
- MiniShop3 (optional, for cart and product card UI)
- ms3Variants (optional, for variant selection in modal)
- pdoTools 3.x with Fenom (recommended). Bundled chunks `mxqv_product` and `mxqv_resource` use Fenom. Without pdoTools, raw `{$…}` stays in HTML.

## Quick start

1. Install package `mxQuickView`.
2. Check namespace `mxquickview` in system settings (especially the whitelist).
3. In the template: Fenom — `{'!mxQuickView.initialize'|snippet}`, MODX — `[[!mxQuickView.initialize]]`.
4. Add a trigger with `data-mxqv-click`, `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`.

Keys `mxquickview_*` and snippet property overrides are in [system settings](/en/components/mxquickview/settings).
