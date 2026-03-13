---
title: Architecture
---
# mxQuickView architecture

## Component overview

- **Init snippet**: `mxQuickView.initialize`
  Loads CSS/JS, publishes `window.mxqvConfig`, prepares modal modes `native`/`bootstrap`/`fancybox`.
- **Frontend JS**: `assets/components/mxquickview/js/mxqv.min.js`
  Event delegation, AJAX to connector, modal/selector render, loop navigation, ms3Variants helpers.
- **Connector**: `assets/components/mxquickview/connector.php`
  Single HTTP entry for action `render`.
- **Processor**: `core/components/mxquickview/src/Processors/Render.php`
  Whitelist and resource access checks, render `chunk|snippet|template`.
- **Base product chunk**: `core/components/mxquickview/elements/chunks/mxqv_product.tpl`
  Card markup for quick view with cart form and variants block.

## Data flow (high level)

1. User clicks or hovers on element with `data-mxqv-*`.
2. `mxqv.js` builds POST to `connector.php` (`mode`, `data_action`, `element`, `id`, `context`, `output`, `modal_library`).
3. Connector validates HTTP method and `action=render`, then calls `Render::run(...)`.
4. Processor:
   - checks `id`, `element`, `data_action`;
   - loads resource and view permission;
   - validates element against whitelist;
   - renders HTML via `getChunk` or `runSnippet`.
5. Connector returns JSON `{success, html|message}`.
6. JS inserts HTML into the chosen modal (`native`/`bootstrap`/`fancybox`) or the selector container.

## Render placeholders

Passed into render:

- resource fields (`$resource->toArray()`);
- resource `content`;
- `assets_url`;
- with MiniShop3: `msProductData` fields;
- with ms3Variants: `has_variants`, `variants_html`, `variants_json`.

## Security

- Connector accepts only `POST`.
- Resource existence (`id`, `deleted=0`) and `view`/`load` permission are checked.
- Whitelist is required for `chunk` and `snippet`.
- Whitelist is required for `template`; empty `mxquickview_allowed_template` disables template render.

## Data storage

The component does not create its own DB tables for quick view: it uses MODX resources and (optionally) MiniShop3/ms3Variants models.

## Files and roles

| File | Role |
| --- | --- |
| `assets/components/mxquickview/connector.php` | AJAX entry point |
| `core/components/mxquickview/src/Processors/Render.php` | Render business logic |
| `core/components/mxquickview/elements/snippets/mxqv_initialize.php` | Frontend and modal markup loading |
| `assets/components/mxquickview/js/mxqv.min.js` | Client behavior (minified) |
| `assets/components/mxquickview/css/mxqv.min.css` | Modal and card styles (minified) |
