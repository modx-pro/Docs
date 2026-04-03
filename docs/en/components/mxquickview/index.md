---
title: mxQuickView
description: Quick view of product card and any resources via AJAX for MODX 3
author: ibochkarev
logo: https://modstore.pro/assets/extras/mxquickview/logo.jpg
dependencies: ['minishop3', 'ms3Variants']

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

Quick view of product card and any resources via AJAX for MODX 3.

`mxQuickView` loads resource content via AJAX and shows it in a modal or in a given container (`selector`).

## Quick links

| Need | Document |
| --- | --- |
| Add mxQuickView to frontend (Fenom/MODX) | [Integration](integration) |
| Configure whitelist and parameters in manager | [Admin](admin) |
| Understand endpoint, payload and JSON responses | [API](api) |
| Flows (modal/selector, loop, variants) | [Flows](flows) |
| Choose render type (`chunk`, `snippet`, `template`) | [Render types](types) |

## Who reads what

- **Manager:** [Admin](admin) → [Integration](integration).
- **Developer:** [Architecture](architecture) → [API](api) → [Render types](types) → [Flows](flows).

## Features

- Renders three types: `chunk`, `snippet`, `template`.
- Modes: `modal` and `selector`.
- Modal libraries: `native`, `bootstrap`, `fancybox`.
- Prev/next navigation in product list when `data-mxqv-loop="true"`.
- Re-initializes MiniShop3 UI after dynamic load.
- ms3Variants support in quick view (`variants_html`, `variants_json`, `has_variants`).

## Requirements

- MODX Revolution 3+
- PHP 8.1+
- MiniShop3 (optional, for cart and product card UI)
- ms3Variants (optional, for variant selection in modal)

## Quick start

1. Install package `mxQuickView`.
2. Check namespace `mxquickview` in system settings (especially whitelist).
3. In template: Fenom — `{'!mxQuickView.initialize'|snippet}`, MODX — `[[!mxQuickView.initialize]]`.
4. Add trigger with data attributes (`data-mxqv-click`, `data-mxqv-action`, `data-mxqv-element`, `data-mxqv-id`).

## System settings (`mxquickview`)

| Key | Default | Purpose |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | Allowed chunks |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | Allowed snippets |
| `mxquickview_allowed_template` | `` | Allowed templates (empty = template render disabled) |
| `mxquickview_mouseover_delay` | `300` | Mouseover delay (ms) |
| `mxquickview_modal_size` | `modal-lg` | Modal size (`modal-sm`, `modal-lg`, `modal-xl`) |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | Fancybox CSS path/URL (override) |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | Fancybox JS path/URL (override) |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | Bootstrap CSS path/URL (override) |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | Bootstrap JS path/URL (override) |
