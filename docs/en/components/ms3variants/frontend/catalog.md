---
title: Product catalog
---
# Product catalog

How to output variants in catalog cards and add the selected variant to the cart.

## Enabling variants

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'ms3_products_row_variants'
]}
```

With the `usePackages` parameter each product gets the [variant placeholders](#placeholders). The catalog gets only active variants, ordered by `position`.

::: warning The value `ms3Variants` is case-sensitive
With `ms3variants` or without `usePackages` there are no placeholders: the `{if $has_variants}` condition is false, and the card sells the product without a variant.
:::

A second `msProducts` call on the same page gets variant placeholders from the first one, even without `usePackages`. Products from the first list get their variants, the rest get empty values.

## ProductCardUI module {#product-card-ui}

The chunk with variants needs the `ProductCardUI.js` module from ms3Variants instead of the standard MiniShop3 module. Without the replacement, the variant list has no handler: only the first variant is visible and purchased, and the cart state is written into the forms of the first variant.

In the `ms3_frontend_assets` system setting (a JSON array of paths), replace the item with the standard module with the path to the ms3Variants module:

| Was | Becomes |
|-----|---------|
| `"[[+jsUrl]]web\/ui\/ProductCardUI.js"` | `"/assets/components/ms3variants/js/web/ProductCardUI.js"` |

- In the setting, the slashes of the standard path are escaped (`web\/ui\/`) — search for the string in this form.
- The path to the ms3Variants module is from the site root. If MODX is installed in a subfolder, adjust it.

How the ms3Variants module differs from the standard one:

- card selectors are fixed in it (`.ms3-product-card`, `.qty-input`), the `ms3Config.selectors` settings are ignored;
- it handles the "−/+" buttons itself in all cards, including cards without variants;
- the MiniShop3 hooks on "−/+" are named `beforeChangeCart` / `afterChangeCart` instead of `beforeQuantityChange` / `afterQuantityChange`. Handlers are added with `ms3.hooks.addHook('beforeChangeCart', fn)`; `fn` receives `{productKey, count}` (`afterChangeCart` also gets `response`), and `cancel = true` in this object cancels the change;
- after "−/+" in a card, cart blocks rendered by the server (for example, a mini cart in a chunk) show the old content until the page is reloaded;
- in cards added to the page after loading (lazy loading, filters), variant selection does not work, and there is no supported way to connect them.

A MiniShop3 update does not change this setting: the ms3Variants module stays, and fixes to the standard module do not reach the cards.

::: danger Before removing ms3Variants, restore the standard module
Removing the package deletes the module file, but the `ms3_frontend_assets` setting stays the same. The cart stops working on the whole site, and the browser console shows `ReferenceError: ProductCardUI is not defined`. First put `"[[+jsUrl]]web/ui/ProductCardUI.js"` back into the setting, then remove the package.
:::

## The ms3_products_row_variants chunk {#chunk}

The standard `ms3_products_row_variants` chunk is a ready card. Your own chunk works with the ProductCardUI module if it has this markup:

| Element | Markup | What it does |
|---------|--------|--------------|
| Card | `class="ms3-product-card"`, `data-product-id="{$id}"` | Without them the module does not see the card |
| Image | `<img class="product-image">` — the first such element in the card | Changes when a variant is selected |
| Wrapper | `.ms3v-catalog` | Contains the list and the variant blocks |
| List | `<select class="ms3v-select">`, options with `value="{$variant.id}"` | Variant selection |
| Variant block | `.ms3v-variant-block`, `data-variant-id`, `data-variant-image` | The block of the selected variant is shown |
| Add form | `.ms3_form.ms3v-add-form`, `data-cart-state="add"`, hidden `options` = `{"_variant_id": ID}` | Adds the variant to the cart |
| Change form | `.ms3v-change-form`, `data-cart-state="change"`, fields `product_key` and `count` (`.qty-input`) — leave them empty, the module fills them with the cart item data, `.qty-btn` buttons with `data-action="decrease"` / `"increase"` | Shown when the variant is in the cart |

When a variant is in the cart, the module shows its change form and adds " ✓" to the list option.

If `data-variant-image` is empty, the card keeps the image of the previous variant. Write `data-variant-image="{$variant.small ?: $variant.image_url}"`: the `small` thumbnail exists only if its name is passed in the `msProducts` parameter `includeThumbs` (for example, `'includeThumbs' => 'small'`, names come from the product media source settings), otherwise the original is used.

A JSON `options` field takes priority over `options[...]` fields, so standard MiniShop3 options are not sent in the variant form — see [Product page](product#cart-form).

A product without variants has no change form in the standard chunk: after adding to the cart, its card does not get "−/+". The standard MiniShop3 chunk `ms3_products_row` has them.

## Minimal chunk

A card without the ProductCardUI module: the variant list inside the form changes `_variant_id` in the `options` field.

```fenom
<div>
    {$pagetitle}
    <form method="post" class="ms3_form">
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="ms3_action" value="cart/add">
        {if $has_variants}
            <input type="hidden" name="options" value='{["_variant_id" => $variants[0].id] | json_encode}'>
            <select onchange="this.form.elements.options.value = JSON.stringify({_variant_id: this.value})">
                {foreach $variants as $v}
                    <option value="{$v.id}">{$v.options_array | join : ', '} — {$v.price}</option>
                {/foreach}
            </select>
        {/if}
        <button type="submit">Add to cart</button>
    </form>
</div>
```

The list has no `name` attribute, so it is not sent with the form itself. Out-of-stock variants are not blocked in this chunk, and the "in cart" state is not shown.

## Product placeholders {#placeholders}

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$has_variants}` | bool | Whether the product has variants to output |
| `{$variants_count}` | int | Number of variants |
| `{$variants}` | array | Variants — fields in the [Variant fields](#variant-fields) section |
| `{$variants_json}` | string | The same data as a JSON array. The structure differs from `{$variants_json}` of the `msProductVariants` snippet |

A product without variants has `{$has_variants}` = false, `{$variants_count}` = 0, `{$variants}` — an empty array, `{$variants_json}` — `[]`.

## Variant fields {#variant-fields}

```php
[
    'id' => 1,
    'product_id' => 42,
    'sku' => 'ABC-123-red',        // may be empty
    'price' => 1500.00,
    'old_price' => 2000.00,        // may be empty
    'count' => 10,
    'weight' => 0.5,
    'active' => true,
    'position' => 0,
    'in_stock' => true,
    'file_id' => 7,                // may be empty
    'image_url' => '/assets/images/42/product.jpg', // empty without an image
    'small' => '/assets/images/42/small/product.jpg', // only with includeThumbs
    'options' => [['key' => 'color', 'value' => 'Red']],
    'options_array' => ['color' => 'Red'],
    'created_at' => '2026-01-01 12:00:00',
    'updated_at' => '2026-01-01 12:00:00',
]
```

`price` is the price from the variant record. MiniShop3 price modifiers (the `msOnGetProductPrice` event, customer group discounts) are not applied to it.

## Stock filtering

Depends on the [`ms3variants_show_out_of_stock`](../settings#ms3variants_show_out_of_stock) and [`ms3variants_check_stock`](../settings#ms3variants_check_stock) settings:

- **Show out-of-stock = Yes** (default) — all active variants are shown. In the standard chunk the button of an out-of-stock variant is disabled only if stock control is on. With `ms3variants_check_stock` = No, a variant with stock 0 counts as "in stock" and can be bought.
- **Show out-of-stock = No** — variants with stock 0 are hidden. With `ms3variants_check_stock` = No such variants count as "in stock", so nothing is hidden.

::: warning A product whose variants are all out of stock is sold at the base price
With show out-of-stock = No such a product has `{$has_variants}` = false. The chunk renders a regular form without a variant, and the product goes to the cart at the base price, without checking variant stock.
:::

## Performance

Do not set `usePackages` where variants are not output. Queries per page:

- one query for the variants of all products;
- one options query per variant;
- one file query per variant with an image;
- one more thumbnails query with `includeThumbs`.
