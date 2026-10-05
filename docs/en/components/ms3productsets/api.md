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
| `max_items` | `ms3productsets.max_items` | Limit (1..100) |
| `category_id` | `0` | Category for auto pick |
| `set_id` | `0` | VIP set number for `type=vip`. `0` or omitted uses 1 (`ms3productsets.vip_set_1`). |
| `tpl` | `tplSetItem` | Card chunk (`tplSetVIP` / `tplPopcorn` use `itemTpl` for the row) |
| `itemTpl` | `''` | Row chunk when `tpl` is a VIP/popcorn wrapper |
| `set_title` / `discount_percent` | `''` | Placeholders for the VIP wrapper |
| `showLog` | `false` | Passed to `msProducts` |
| `emptyTpl` | `tplSetEmpty` | Empty result chunk |
| `hideIfEmpty` | `true` | `true`: empty string. `false`: `emptyTpl`. |
| `exclude_ids` | `''` | Excluded IDs |
| `tplWrapper` | `''` | Wrapper with placeholders `output`, `type`, `count` |
| `sortby` / `sortdir` | `''` / `ASC` | If `sortby` is empty, set order is preserved |
| `showUnpublished` | `false` | Passed to `msProducts` |
| `showHidden` | `false` | Passed to `msProducts` |
| `includeTVs`, `includeThumbs`, `tvPrefix` | `''` | Passed to `msProducts` |
| `return` | `data` | `data`, `ids`, `json` |
| `toPlaceholder` | `''` | Write output to placeholder |

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

```json
{"success": true, "added": 1, "message": ""}
```

```json
{"success": false, "added": 0, "message": "Product not found"}
```

### Manager (`mgr`, auth required)

| action | Purpose | Main parameters |
| --- | --- | --- |
| `get_templates` | List set templates | — |
| `save_template` | Create/update template | `id`, `name`, `type`, `related_product_ids`, `description`, `sortorder` |
| `delete_template` | Delete template and its `template_name`+`type` links | `id` |
| `apply_template` | Apply template to categories/products | `template_id`, `parent_id` or `parent_ids[]`, `replace`, optional `product_ids` |
| `unbind_template` | Unbind template from category | `template_id`, `parent_id` or `parent_ids[]` |
| `get_resource_tree` | Category tree (no products) | `parent_id`, `context_key` |
| `get_resources` | Product list for picker | `parent_id`, `template_id`, `query`, `limit`, `ids[]` |

## JS API (`window.ms3ProductSets`)

| Method | Purpose |
| --- | --- |
| `render(selector, options)` | Render set via `get_set`. JS default `type` is `auto`. Snippet default is `buy_together`. |
| `addToCart(productId, count)` | MiniShop3 Web API first. Connector `add_to_cart` is fallback. |
| `addAllToCart(buttonOrContainer)` | Collects `data-msps-product-ids`, then cards, then `input[name="id"]` |
| `toast(message)` | Show frontend toast |

Events after successful add:

- `addToCart`: `msps:cart:update` with `detail: { product_id, count }`. MiniShop3 API path also fires `ms3:cart:updated`.
- `addAllToCart`: `msps:cart:update` with `detail: { product_ids }`

## Plugins

| Plugin | Event | Purpose |
| --- | --- | --- |
| `ms3ProductSets SyncTV` (file `ms3productsets_sync_tv`) | `OnDocFormSave` | Sync set TVs into `ms3_product_sets` |
| `ms3ProductSets Cleanup` (file `ms3productsets_on_resource_delete`) | `OnResourceDelete` | Clean links for deleted resource |
