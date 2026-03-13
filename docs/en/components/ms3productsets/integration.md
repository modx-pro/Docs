---
title: Site integration
---
# Site integration

## 1. Load resources (required)

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js"></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js"></script>
```

:::

## 2. Block on product card

::: code-group

```fenom
{set $msps_buy_together = 'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
{if $msps_buy_together}
<section class="product-set">
  <h2>Frequently bought together</h2>
  {$msps_buy_together}
</section>
{/if}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
  &toPlaceholder=`msps_buy_together`
]]
[[+msps_buy_together:notempty=`
<section class="product-set">
  <h2>Frequently bought together</h2>
  [[+msps_buy_together]]
</section>
`]]
```

:::

## 3. Block for homepage or landing

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'auto',
  'category_id' => 5,
  'resource_id' => 0,
  'max_items' => 8,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`auto`
  &category_id=`5`
  &resource_id=`0`
  &max_items=`8`
  &tpl=`tplSetItem`
]]
```

:::

## 4. VIP set

1. Set `ms3productsets.vip_set_1`.
2. Output the block:

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'max_items' => 6,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &max_items=`6`
  &tpl=`tplSetVIP`
]]
```

:::

## 5. Empty result handling

By default the block is hidden when the set is empty.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'hideIfEmpty' => 0,
  'emptyTpl' => 'tplSetEmpty'
]}
```

```modx
[[!ms3ProductSets?
  &type=`similar`
  &resource_id=`[[*id]]`
  &hideIfEmpty=`0`
  &emptyTpl=`tplSetEmpty`
]]
```

:::

## 6. AJAX render via JS API

```html
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

## 7. Add-to-cart button in card

::: code-group

```fenom
<button type="button" data-add-to-cart="{$id}" data-count="1">Add to cart</button>
```

```modx
<button type="button" data-add-to-cart="[[+id]]" data-count="1">Add to cart</button>
```

:::

`productsets.js` sends the request to `connector.php`.

## 8. “Add whole set” button

Button with `data-add-set` adds all set products to cart. Used in chunks **tplSetVIP** and **tplSetWrapper** (when `count > 0`). Set container must have elements with `data-product-id` (cards from tplSetItem). JS finds container from the button (`.msps__vip-set`, `.msps__wrapper` or `[data-set-type]`) and calls `addToCart` for each product in sequence.

::: code-group

```fenom
<button type="button" class="msps__add-all-button" data-add-set="1">
  {$_modx->lexicon('msproductsets_add_all_to_cart')}
</button>
```

```modx
<button type="button" class="msps__add-all-button" data-add-set="1">
  [[%msproductsets_add_all_to_cart]]
</button>
```

:::

## Post-integration checklist

- Page has `mspsLexiconScript`, `productsets.css`, `productsets.js`.
- `ms3ProductSets` is called with valid `resource_id` or `category_id`.
- Products are published and available in current context.
- For `vip`, `vip_set_1` or manual links in table are set.
