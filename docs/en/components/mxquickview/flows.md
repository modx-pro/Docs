---
title: Flows
---
# Flows

## 1. Render in modal on click

1. Click on element with `data-mxqv-click`.
2. JS reads `mode`, `data_action`, `element`, `id`, `title`.
3. For `native`/`bootstrap` the modal opens immediately (loading state), then POST is sent to `connector.php` (`action=render`, including `modal_library`).
4. For `fancybox` POST runs first, then Fancybox opens with the returned HTML.
5. On success HTML is inserted into the chosen mode container:
   - `native` → `#mxqv-modal-body .qv-modal__content-area`;
   - `bootstrap` → `#mxqv-bootstrap-modal-body .qv-modal__content-area`;
   - `fancybox` → current Fancybox slide.
6. After insert, `mxqv:loaded` is dispatched.

## 2. Render on mouseover

1. Hover over element with `data-mxqv-mouseover`.
2. Timer starts using `mouseoverDelay` from `window.mxqvConfig`.
3. If cursor is still there when timer ends, the same `render` request runs.
4. If cursor leaves earlier, timer is cancelled.

## 3. `selector` mode (no built-in modal)

1. Trigger has `data-mxqv-mode="selector"` and `data-mxqv-output`.
2. JS inserts loading indicator into the target container.
3. After response, replaces container content with `html` or error message.

## 4. Prev/next navigation in list

1. Trigger is inside container with `data-mxqv-parent data-mxqv-loop="true"`.
2. JS builds list of triggers inside that container.
3. Buttons `[data-mxqv-nav="prev|next"]` change current index.
4. At list boundaries buttons are hidden.

## 5. Add to cart from quick view

1. Render uses MiniShop3 form (`data-ms3-form`, `ms3_action=cart/add`).
2. After HTML is inserted, `ms3.productCardUI.reinit()` is called (if available).
3. Add to cart works without page reload.

## 6. ms3Variants inside quick view

1. Processor for `msProduct` adds `has_variants`, `variants_html` and `variants_json` (when ms3Variants is installed).
2. In chunk, `variants_json` is put in `data-mxqv-variants-json` via `:htmlent`.
3. JS finds `.qv-product[data-mxqv-variants]` and only handles flag `true|1|yes|on`.
4. JS listens for `click` on `[data-variant-id]` and `change` on `select/input` in `.qv-product__variants`.
5. On variant change it updates price, old price and image.

## 7. Error flow

1. On validation error connector returns `{success:false, message, html:''}`.
2. In `modal` mode the message is shown in modal content.
3. In `selector` mode the message is inserted into the target container.
