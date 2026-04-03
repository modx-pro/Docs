---
title: Flows
---
# Flows

## 1. Render a set block on the frontend

1. Template calls the snippet: **MODX** — `[[!ms3ProductSets? ... ]]`, **Fenom** — `{'ms3ProductSets' | snippet : [ ... ]}`.
2. Snippet validates and normalizes parameters (`type`, `max_items`, `resource_id`, `category_id`, …).
3. Product IDs come from `msps_get_products_by_type`.
4. If the result is empty:
   - returns `''` or `emptyTpl`.
5. If IDs exist:
   - with `return=ids` returns CSV of IDs;
   - else calls `msProducts` and renders cards.
6. With `tplWrapper`, wraps the final HTML.
7. With `toPlaceholder`, stores output in a placeholder.

## 2. AJAX render via JS API

1. `window.ms3ProductSets.render('#selector', options)`.
2. JS POSTs `action=get_set` to `connector.php`.
3. Connector runs snippet `ms3ProductSets` with POST params.
4. HTML is injected into the container; empty response hides the container.

## 3. Add to cart from a set card

1. Click on an element with `data-add-to-cart`.
2. JS POSTs `action=add_to_cart` with `product_id`, `count`.
3. Connector calls `msCartAdd` (if miniShop3 is available).
4. Returns JSON `{success,message}`.
5. JS shows a toast and dispatches `msps:cart:update` on success.

## 4. Create a set template (manager)

1. UI sends `save_template`.
2. Connector validates `name` and `related_product_ids`.
3. `msps_save_template` INSERT/UPDATE in `ms3_product_set_templates`.
4. UI refreshes the template list.

## 5. Apply template to a category

1. UI sends `apply_template` (`template_id`, `parent_id/parent_ids`, `replace`).
2. Category expands recursively to all `msProduct` resources.
3. For each product, links are created in `ms3_product_sets`.
4. UI receives `applied` (number of inserted links).

## 6. Unbind template from a category

1. UI sends `unbind_template`.
2. Connector resolves template `type` and `name`.
3. Deletes only rows matching `type + template_name`.
4. TV links and other templates are untouched.

## 7. Add entire set to cart

1. Click a button with `data-add-set` (in tplSetVIP or tplSetWrapper).
2. JS finds the container from the button (`.msps__vip-set`, `.msps__wrapper` or `[data-set-type]`).
3. Collects product IDs from `[data-product-id]` and `[data-add-to-cart]`.
4. Calls `addToCart(productId, 1)` for each ID in order.
5. Shows toast `set_added` and dispatches `msps:cart:update` with `product_ids`.

## 8. TV sync when saving a product

1. Plugin `OnDocFormSave` runs.
2. If the product template has set TVs, sync runs.
3. **Empty TV:** only rows without `template_name` (from TV) are removed; template-based links keep `template_name`.
4. **Non-empty TV:** all rows of that type for the product are removed, new links are inserted from the TV value.
