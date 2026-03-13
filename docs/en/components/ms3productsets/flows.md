---
title: Flows
---
# Flows

## 1. Set block render on frontend

1. Template calls `[[!ms3ProductSets? ... ]]`.
2. Snippet validates parameters (`type`, `limit`, `resource_id`).
3. Gets product IDs via `msps_get_products_by_type` (respects `cache_lifetime` — cache key type+params — and `auto_recommendation`).
4. If result is empty: returns `''` or `emptyTpl`.
5. If IDs exist: with `return=ids` returns CSV IDs; otherwise calls `msProducts` and renders cards.
6. With `tplWrapper` wraps final HTML.
7. With `toPlaceholder` stores result in placeholder.

## 2. AJAX render via JS API

1. `window.ms3ProductSets.render('#selector', options)`.
2. JS sends POST `action=get_set` to `connector.php`.
3. Connector runs snippet `ms3ProductSets` with POST params (same `cache_lifetime` and `auto_recommendation`).
4. HTML is inserted into container; empty response hides container.

## 3. Add to cart from set card

1. Click on element with `data-add-to-cart`.
2. JS sends POST `action=add_to_cart` with `product_id`, `count`.
3. Connector calls `msCartAdd` (if miniShop3 available).
4. Returns JSON `{success,message}`.
5. JS shows toast and dispatches `msps:cart:update` on success.

## 4. Create set template (admin)

1. UI sends `save_template`.
2. Connector validates `name` and `related_product_ids`.
3. `msps_save_template` does INSERT/UPDATE in `ms3_product_set_templates`.
4. UI refreshes template list.

## 5. Apply template to category

1. UI sends `apply_template` (`template_id`, `parent_id/parent_ids`, `replace`).
2. Category is recursively expanded to all `msProduct`.
3. For each product, links are created in `ms3_product_sets`.
4. UI receives `applied` (number of inserted links).

## 6. Unbind template from category

1. UI sends `unbind_template`.
2. Connector gets template `type` and `name`.
3. Deletes only records matching `type + template_name`.
4. TV links and other templates are left unchanged.

## 7. Add whole set to cart

1. Click button with `data-add-set` (in tplSetVIP or tplSetWrapper).
2. JS finds container from button (`.msps__vip-set`, `.msps__wrapper` or `[data-set-type]`).
3. Collects product IDs from `[data-product-id]` and `[data-add-to-cart]`.
4. Calls `addToCart(productId, 1)` for each ID in sequence.
5. Shows toast `set_added` and dispatches `msps:cart:update` with `detail: { product_ids }`.

## 8. TV sync on product save

1. Plugin `OnDocFormSave` runs.
2. If product template has set TVs, sync runs.
3. **When TV has value:** all records of that type for the product are removed, new links from TV value are inserted.
4. **When TV is empty:** only records **without** `template_name` (from TV) are removed; template links (with `template_name`) are kept.
