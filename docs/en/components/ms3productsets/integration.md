---
title: Site integration
---
# Site integration

For two audiences:

- **Manager:** what to enable and how to verify.
- **Developer:** how to wire snippets in Fenom and standard MODX.

## 1. Load assets (required)

In the template (or shared head/footer), load **lexicon first**, then CSS and JS.

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js" defer></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js" defer></script>
```

:::

## 2. Block in the product card: “Frequently bought together”

**Manager:** after adding the call, a recommendations block should appear on the product card. If there are no products, the block is not shown.

::: code-group

```fenom
{set $buyTogether = 'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
{if $buyTogether != ''}
<section class="product-set">
  <h2>{'ms3productsets_type_buy_together' | lexicon}</h2>
  {$buyTogether}
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
  <h2>[[%ms3productsets_type_buy_together? &namespace=`ms3productsets` &topic=`default`]]</h2>
  [[+msps_buy_together]]
</section>
`]]
```

:::

## 3. Auto recommendations by category

**Manager:** handy for home or landing when you need a block from a specific category.

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

**Manager:**

1. Fill system setting `ms3productsets.vip_set_1` (`1,2,3,...`).
2. Ensure products are published.

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

## 5. Empty result: hide block or show `emptyTpl`

Default `hideIfEmpty=true` returns an empty string.

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'similar',
  'resource_id' => $_modx->resource.id,
  'hideIfEmpty' => false,
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

## 6. AJAX block render (JS API)

`render()` works the same; templates differ in `resource_id` and container markup.

::: code-group

```fenom
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      resource_id: {$_modx->resource.id},
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

```modx
<div id="msps-auto"></div>
<script>
document.addEventListener('DOMContentLoaded', function () {
  if (window.ms3ProductSets) {
    window.ms3ProductSets.render('#msps-auto', {
      type: 'auto',
      category_id: 5,
      resource_id: [[*id]],
      max_items: 8,
      tpl: 'tplSetItem'
    });
  }
});
</script>
```

:::

On pages without a current resource (home, etc.) pass `resource_id: 0` or omit the field — see [API](/en/components/ms3productsets/api).

## 7. “Add to cart” in set card

Button label from MiniShop3 lexicon (`ms3_cart_add`), same as chunk **tplSetItem**.

::: code-group

```fenom
<button type="button" data-add-to-cart="{$id}" data-count="1">{'ms3_cart_add' | lexicon}</button>
```

```modx
<button type="button" data-add-to-cart="[[+id]]" data-count="1">[[%ms3_cart_add? &namespace=`minishop3` &topic=`default`]]</button>
```

:::

`productsets.js` handles the click and POSTs to `connector.php`.

## 8. “Add entire set” button

`data-add-set` adds all products in the set. Used in **tplSetVIP** and **tplSetWrapper** (when `count > 0`).

The set container must include `data-product-id` (cards from tplSetItem). JS finds the container from the button (`.msps__vip-set`, `.msps__wrapper`) and calls `addToCart` for each product.

::: code-group

```fenom
<button type="button" class="msps__add-all-button" data-add-set="1">
  {'msproductsets_add_all_to_cart' | lexicon}
</button>
```

```modx
<button type="button" class="msps__add-all-button" data-add-set="1">
  [[%msproductsets_add_all_to_cart? &namespace=`ms3productsets` &topic=`default`]]
</button>
```

:::

Use component lexicon (`ms3productsets`, topic `default`) for the label, not hard-coded text.

## Post-integration checklist

- The page loads `mspsLexiconScript`, `productsets.css`, and `productsets.js`.
- Snippet `ms3ProductSets` is called with a valid `resource_id` or `category_id`.
- Products are published and available in the current context.
- For type `vip`, `vip_set_1` is configured or manual set rows exist in the database.
