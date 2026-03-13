---
title: Admin guide
---
# Admin guide

## Where to configure

- Manager: **Settings → System settings**
- Filter: `namespace = mxquickview`
- Area: `mxquickview_main`

The component has no dedicated manager page: configuration is done via system settings and site templates/chunks.

## Key settings

| Key | Default | Controls |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | Which chunks can be rendered (`mxqv_resource` — for news, articles, pages) |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | Which snippets can be rendered |
| `mxquickview_allowed_template` | `` | Which templates can be rendered |
| `mxquickview_mouseover_delay` | `300` | Delay before load on hover |
| `mxquickview_modal_size` | `modal-lg` | Built-in modal size |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | Override path/URL for Fancybox CSS |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | Override path/URL for Fancybox JS |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | Override for Bootstrap CSS; empty — bundled `vendor/bootstrap`, then CDN |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | Override for Bootstrap JS; empty — bundled, then CDN |

Snippet parameter `modalLibrary` supports `native`, `bootstrap`, `fancybox`.

## Recommended setup order

1. Keep only trusted elements in the whitelist.
2. Tune `modal_size` and `mouseover_delay` for your template UX.
3. Include `mxQuickView.initialize` in the base template.
4. Add quick view triggers to catalog cards.
5. Test: click, mouseover, selector, loop.

## Practical scenarios

### Product card via chunk

- Add chunk (e.g. `mxqv_product`) to `mxquickview_allowed_chunk`.
- On product button use:
  - `data-mxqv-click`
  - `data-mxqv-mode="modal"`
  - `data-mxqv-action="chunk"`
  - `data-mxqv-element="mxqv_product"`
  - `data-mxqv-id="..."`

### Cart via snippet

- Add snippet (e.g. `msCart`) to `mxquickview_allowed_snippet`.
- On button use `data-mxqv-action="snippet"` and `data-mxqv-element="msCart"`.

### Render into custom container (no built-in modal)

- On trigger set `data-mxqv-mode="selector"`.
- Set `data-mxqv-output=".css-selector"`.
- JS will insert HTML into that container.

### Native modal customization via CSS variables

- For `modalLibrary = native` modal styles can be changed without editing HTML/JS.
- Override `--mxqv-*` in your theme after loading `mxqv.css`.
- For `modalLibrary = fancybox` the component uses bundled files in `assets/components/mxquickview/vendor/fancybox/`; if missing, CDN `@fancyapps/ui` is used.
- For `modalLibrary = bootstrap` it uses bundled files in `assets/components/mxquickview/vendor/bootstrap/`; if missing, Bootstrap CDN.
- Commonly overridden:
  - `--mxqv-modal-size-lg`, `--mxqv-modal-size-xl`
  - `--mxqv-backdrop-bg`
  - `--mxqv-header-padding`, `--mxqv-body-padding`
  - `--mxqv-modal-bg`, `--mxqv-modal-shadow`
- Full variable list: [API and interfaces](/en/components/mxquickview/api) → “Native modal CSS variables”.

## `allowed_template` logic

`template` is always checked against whitelist `mxquickview_allowed_template`.
If the list is empty, `data_action="template"` returns `Template not allowed`.

## Pre-release checklist

1. No extra elements in whitelist.
2. All triggers have a valid `data-mxqv-id`.
3. Connector error responses checked (`Chunk/Snippet/Template not allowed`).
4. For `mode=selector`, target container exists in the DOM.
5. If using MiniShop3, add to cart from quick view is tested.
