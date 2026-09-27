---
title: Frontend integration
---
# Frontend integration

Full scenario — [Site integration](/en/components/mxquickview/integration).

1. Include `mxQuickView.initialize` once in the base template (set `mxquickview.assets_url` if needed).
2. Choose `modalLibrary`: `native`, `bootstrap`, or `fancybox`.
3. Add triggers with `data-mxqv-click` or `data-mxqv-mouseover`.
4. Set output mode (`modal`/`selector`) and render type (`chunk`/`snippet`/`template`).
5. Check the whitelist in system settings `mxquickview`.
6. If you use MiniShop3/ms3Variants, verify variant selection and add-to-cart in quick view.
