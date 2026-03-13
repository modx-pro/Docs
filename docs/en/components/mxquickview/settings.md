---
title: System settings
---
# System settings

All settings use the `mxquickview_` prefix and live in namespace `mxquickview`.

## Settings list

| Key | Default | Where used |
| --- | --- | --- |
| `mxquickview_allowed_chunk` | `mxqv_product,mxqv_resource,ms3_product_content,ms3_products_row` | `data_action=chunk` in Render |
| `mxquickview_allowed_snippet` | `msCart,msMiniCart` | `data_action=snippet` in Render |
| `mxquickview_allowed_template` | '' | `data_action=template` in Render |
| `mxquickview_mouseover_delay` | `300` | `window.mxqvConfig.mouseoverDelay` |
| `mxquickview_modal_size` | `modal-lg` | size of built-in native/bootstrap modal |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | override CSS for `modalLibrary=fancybox` |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | override JS for `modalLibrary=fancybox` |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | override CSS for `modalLibrary=bootstrap` |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | override JS for `modalLibrary=bootstrap` |

## Default behavior for libraries

- With `modalLibrary=fancybox`: if `mxquickview_fancybox_css/js` are empty, the component tries bundled files from `assets/components/mxquickview/vendor/fancybox/`, then CDN.
- With `modalLibrary=bootstrap`: if `mxquickview_bootstrap_css/js` are empty, the component tries bundled files from `assets/components/mxquickview/vendor/bootstrap/`, then CDN.

## allowed_template logic

`template` is always checked against `mxquickview_allowed_template`. If the list is empty, render with `data_action="template"` is denied and returns `Template not allowed`.

## Recommendations

- Keep the whitelist minimal and explicit.
- For hover UX, 250–400 ms is usually enough.
- If the project uses its own modal, use `data-mxqv-mode="selector"`.
- For quick view of non-products add `mxqv_resource` to `mxquickview_allowed_chunk`.
