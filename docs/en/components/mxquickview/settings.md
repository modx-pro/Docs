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
| `mxquickview_modal_size` | `modal-lg` | `modal-sm` / `modal-lg` / `modal-xl` for `modalLibrary` `native` and `bootstrap` only |
| `mxquickview_debug` | `0` | `window.mxqvConfig.debug` when snippet `debug` is omitted or empty |
| `mxquickview_fancybox_css` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.css` | CSS override for `modalLibrary=fancybox` |
| `mxquickview_fancybox_js` | `[[++assets_url]]components/mxquickview/vendor/fancybox/fancybox.umd.js` | JS override for `modalLibrary=fancybox` |
| `mxquickview_bootstrap_css` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.css` | CSS override for `modalLibrary=bootstrap` |
| `mxquickview_bootstrap_js` | `[[++assets_url]]components/mxquickview/vendor/bootstrap/bootstrap.min.js` | JS override for `modalLibrary=bootstrap` |

## Assets URL override

`mxquickview.assets_url` is read via `getOption`. It is not in transport: after install the key is missing from the namespace. Create it by hand or keep the default `[[++assets_url]]components/mxquickview/`.

The key sets the base URL for CSS, JS, and `connector.php`.

## Snippet parameters vs system settings

A non-empty `mxQuickView.initialize` property overrides the matching `mxquickview_*` setting.

An empty property string means “not set”: the system setting or code default applies.

## Default behavior for libraries

With `modalLibrary=fancybox`: after path normalization, if the URL is empty, the component tries files under `assets/components/mxquickview/vendor/fancybox/`, then CDN `@fancyapps/ui`.

With `modalLibrary=bootstrap`: the same for `vendor/bootstrap/`, then Bootstrap 5.3.2 CDN.

System `mxquickview_fancybox_*` / `mxquickview_bootstrap_*` apply when the snippet parameter is omitted or empty.

## allowed_template logic

`template` is always checked against `mxquickview_allowed_template`.
If the list is empty, render with `data_action="template"` is denied and returns `Template not allowed`.

## Recommendations

- Keep the whitelist minimal and explicit.
- For hover, 250–400 ms is usually enough.
- If the site already has its own modal, use `data-mxqv-mode="selector"`.
- For quick view of non-products add `mxqv_resource` to `mxquickview_allowed_chunk`.
