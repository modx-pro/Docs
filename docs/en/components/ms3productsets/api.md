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
| `set_id` | `0` | VIP set number (for `type=vip`). 0 or omitted uses 1 — setting `ms3productsets.vip_set_1`. |
| `tpl` | `tplSetItem` | Card chunk |
| `emptyTpl` | `tplSetEmpty` | Empty result chunk |
| `hideIfEmpty` | `true` | `true` -> empty string, `false` -> `emptyTpl` |
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

- `window.mspsLexicon` (keys for frontend messages);
- `window.mspsConfig` (`maxItems`, `lang`).

Load before `productsets.js`.

**Fenom:** `{'mspsLexiconScript' | snippet}`
**MODX:** `[[!mspsLexiconScript]]`

## Connector `assets/components/ms3productsets/connector.php`

### Front (`web`)

| action | Method | Parameters | Response |
| --- | --- | --- | --- |
| `get_set` | POST | `type`, `resource_id`, `category_id`, `set_id`, `max_items`, `tpl`, `emptyTpl`, `hideIfEmpty` | HTML |
| `add_to_cart` | POST | `product_id`, `count` | JSON `{success,message}` |

### Manager (`mgr`, auth required)

| action | Purpose | Main parameters |
| --- | --- | --- |
| `get_templates` | List set templates | — |
| `save_template` | Create/update template | `id`, `name`, `type`, `related_product_ids`, `sortorder` |
| `delete_template` | Delete template | `id` |
| `apply_template` | Apply template to categories/products | `template_id`, `parent_id` or `parent_ids[]`, `replace` |
| `unbind_template` | Unbind template from category | `template_id`, `parent_id` or `parent_ids[]` |
| `get_resource_tree` | Category tree (no products) | `parent_id`, `context_key` |
| `get_resources` | Product list for picker | `parent_id`, `template_id`, `query`, `limit` |

## JS API (`window.ms3ProductSets`)

| Method | Purpose |
| --- | --- |
| `render(selector, options)` | Render set block via `action=get_set` |
| `addToCart(productId, count)` | Add product via `action=add_to_cart` |
| `addAllToCart(buttonOrContainer)` | Add whole set. DOM element (button with `data-add-set` or container) or CSS selector. Finds `[data-product-id]` and `[data-add-to-cart]`, calls `addToCart` for each, then toast and `msps:cart:update`. |
| `toast(message)` | Show frontend toast |

Events after successful add:

- `addToCart`: `msps:cart:update` with `detail: { product_id, count }`
- `addAllToCart`: `msps:cart:update` with `detail: { product_ids }`

## Plugins

| Plugin | Event | Purpose |
| --- | --- | --- |
| `ms3productsets_sync_tv` | `OnDocFormSave` | Sync set TVs into `ms3_product_sets` |
| `ms3productsets_on_resource_delete` | `OnResourceDelete` | Clean links for deleted resource |
