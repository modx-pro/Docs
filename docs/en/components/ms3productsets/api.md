---
title: API and interfaces
---
# API and interfaces

## Snippet `ms3ProductSets`

### Key parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `type` | `buy_together` | Set type |
| `resource_id` / `productId` | current resource | Base product ID |
| `max_items` | `10` | Limit (1..100). A call without the property uses the snippet default `10`, not the current `ms3productsets.max_items` |
| `category_id` | `0` | Category for `msps_get_auto_recommendations`. It does not affect `similar` or the `auto_sales` SQL |
| `set_id` | `0` | VIP set number for `type=vip`. `0` or omitted uses 1 (`ms3productsets.vip_set_1`). |
| `tpl` | `tplSetItem` | Card chunk (`tplSetVIP` / `tplPopcorn` use `itemTpl` for the row) |
| `itemTpl` | `''` | Row chunk when `tpl` is a VIP/popcorn wrapper |
| `set_title` | `''` | VIP wrapper title |
| `discount_percent` | `0` | VIP wrapper badge. At `0` the badge is hidden |
| `showLog` | `false` | Passed to `msProducts` |
| `emptyTpl` | `tplSetEmpty` | Empty result chunk |
| `hideIfEmpty` | `true` | `true`: empty string. `false`: `emptyTpl`. |
| `exclude_ids` | `''` | Excluded IDs |
| `tplWrapper` | `''` | Wrapper with placeholders `output`, `type`, `count`, `product_ids` |
| `sortby` / `sortdir` | `''` / `ASC` | If `sortby` is empty, set order is preserved |
| `showUnpublished` | `false` | Passed to `msProducts` |
| `showHidden` | `false` | Passed to `msProducts` |
| `includeTVs`, `includeThumbs`, `tvPrefix` | `''` | Passed to `msProducts` |
| `return` | `data` | `data`, `ids`, `json` |
| `toPlaceholder` | `''` | Write the result into a placeholder. It is not passed to `msProducts` |

Call parameters that are not snippet properties are passed to `msProducts`. VIP and popcorn wrappers also receive `product_ids`. VIP also receives `set_id`, `set_title`, and `discount_percent`.

### Supported `type` values

`auto`, `vip`, `cross-sell`, `popcorn`, `also-bought`, `buy_together`, `similar`, `cart_suggestion`, `auto_sales`, `custom`.

Per-type logic: [Set types](/en/components/ms3productsets/types).

### Call examples

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## Snippet `mspsLexiconScript`

Outputs:

- `window.mspsLexicon` (keys for frontend messages)
- `window.mspsConfig` (`maxItems`, `lang`, `toastTimeout: 4000`, `toastPosition: 'topRight'`)

Load before `productsets.js`.

**Fenom:** `{'mspsLexiconScript' | snippet}`
**MODX:** `[[!mspsLexiconScript]]`

## Connector `assets/components/ms3productsets/connector.php`

### Front (`web`)

| action | Method | Parameters | Response |
| --- | --- | --- | --- |
| `get_set` | POST | `type`, `resource_id` (alias `product_id`), `category_id`, `set_id`, `max_items`, `tpl`, `tplWrapper`, `emptyTpl`, `hideIfEmpty` | HTML |
| `add_to_cart` | POST | `product_id`, `count` | JSON `{success, added, message}` |

Sample `add_to_cart` responses (connector fallback path):

`added` is a boolean. A `count` below 1 is sent to the cart as 1. The message comes from the lexicon. If the key is missing, success uses `Product added to cart`. A cart failure uses `Could not add product to cart`. A request without `product_id` uses the string `error`.

```json
{"success": true, "added": true, "message": "<msproductsets_added>"}
```

```json
{"success": false, "added": false, "message": "<msproductsets_error>"}
```

```json
{"success": false, "added": false, "message": "<msproductsets_add_failed>"}
```

The first failure is a request without `product_id`. The second is a cart failure. When POST has no `max_items`, `get_set` uses `ms3productsets.max_items`.

### Manager (`mgr`, auth required)

| action | Purpose | Main parameters |
| --- | --- | --- |
| `get_templates` | List set templates | — |
| `save_template` | Create/update template | `id`, `name`, `type`, `related_product_ids`, `description`, `sortorder`. Errors: `invalid_type`, `template_not_found`, `name_required`, `related_ids_required` |
| `delete_template` | Delete template and its `template_name`+`type` links | `id`. Response `{success}` without `message` |
| `apply_template` | Apply template to categories/products | `template_id`, `parent_id` or `parent_ids[]`, `replace`. `product_ids` is used when category expansion yields no product ids, including when a category was passed but has no published products. `product_ids` parsing stops at 10000. Response `{ success, applied }`. Errors: `template_or_products_required`, `no_products_in_category`, `template_not_found`, `template_empty`. `replace=true` deletes only rows with the same `template_name` |
| `unbind_template` | Unbind template from category | `template_id`, `parent_id` or `parent_ids[]`. Response `{ success, removed }`. Errors: `template_or_products_required`, `no_products_in_category`, `template_not_found` |
| `get_resource_tree` | Category tree (no products) | `parent_id`, `context_key`. Depth stops after 5 |
| `get_resources` | Product list for picker | `parent_id`, `template_id` (MODX template id of the resource, not a set-template id), `query`, `limit` from 1 to 100, default 50, `ids[]`. Without `parent_id` the parent is not filtered. Only published, not deleted `msProduct`. The picker asks for 200. The server returns at most 100 |

When the lexicon has `ms3productsets_<code>`, that translation becomes `message`. Otherwise the code stays.

## JS API (`window.ms3ProductSets`)

| Method | Purpose |
| --- | --- |
| `render(selector, options)` | Render set via `get_set`. JS default `type` is `auto`. Snippet default is `buy_together`. |
| `addToCart(productId, count)` | MiniShop3 Web API first. Connector `add_to_cart` is fallback. |
| `addAllToCart(buttonOrContainer)` | A DOM button walks up to `.msps__vip-set`, `.msps__wrapper`, or `[data-set-type]`. A selector string is the container itself. It must point at the element with `data-msps-product-ids` or the cards, not at the button. Then `data-msps-product-ids`, then `[data-product-id]` / `[data-add-to-cart]`, then `input[name="id"]`. |
| `toast(message, kind)` | iziToast. `kind` `'error'` is an error. Any other value is success. |

Events after successful add:

- `addToCart`: `msps:cart:update` with `detail: { product_id, count }`. MiniShop3 API path also fires `ms3:cart:updated`.
- `addAllToCart`: `msps:cart:update` with `detail: { product_ids }`

## Plugins

| Plugin | Event | Purpose |
| --- | --- | --- |
| `ms3ProductSets SyncTV` (file `ms3productsets_sync_tv`) | `OnDocFormSave` | Sync set TVs into `ms3_product_sets` |
| `ms3ProductSets Cleanup` (file `ms3productsets_on_resource_delete`) | `OnResourceDelete` | Clean links for deleted resource |
