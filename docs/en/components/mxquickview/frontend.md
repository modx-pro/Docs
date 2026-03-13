---
title: Frontend integration
---
# Frontend integration

For the full integration scenario see [Site integration](/en/components/mxquickview/integration).

Quick minimum:

1. Include `mxQuickView.initialize` once in the base template.
2. Choose `modalLibrary`: `native`, `bootstrap`, or `fancybox` as needed.
3. Add triggers with `data-mxqv-click` or `data-mxqv-mouseover`.
4. Set output mode (`modal`/`selector`) and render type (`chunk`/`snippet`/`template`).
5. Check whitelist in system settings `mxquickview`.
6. If using MiniShop3/ms3Variants, verify variant selection and add-to-cart in quick view.
