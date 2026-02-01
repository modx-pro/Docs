---
title: Product links
---
# Product links

Product link type management is available via **Extras → MiniShop3 → Settings → Links**.

## Purpose

Links define relationships between products:

- **Similar products** — alternatives to the current product
- **Related products** — add-ons to the purchase
- **Bundles** — products sold together
- **Upsell** — higher-priced alternatives
- **Cross-sell** — additional products to sell

## Link type fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Link type name |
| `type` | string | System key (unique) |
| `description` | text | Link type description |

## Built-in link types

| type | Name | Use |
|------|------|-----|
| `similar` | Similar products | Alternatives for comparison |
| `related` | Related | Accessories, consumables |
| `upsell` | Upsell | Premium versions |
| `crosssell` | Cross-sell | Add-ons in cart |

## Creating product links

### Via interface

1. Open the product card
2. Go to the **Links** tab
3. Select link type
4. Add linked products via search

### Via API

```php
// Create link
$link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link->fromArray([
    'link_id' => 1,        // Link type ID (e.g. "similar")
    'master' => 10,        // Main product ID
    'slave' => 20,         // Linked product ID
]);
$link->save();
```

## Outputting linked products

### msProducts snippet with link parameter

```fenom
{* Similar products for current product *}
{$_modx->runSnippet('msProducts', [
    'link' => 1,                  // Link type ID
    'master' => $_modx->resource.id,
    'tpl' => 'tpl.msProducts.row',
    'limit' => 4
])}
```

### Output in product card

```fenom
{* Related products *}
<div class="related-products">
    <h3>Frequently bought together</h3>
    {'msProducts' | snippet: [
        'link' => 2,
        'master' => $id,
        'tpl' => 'tpl.msRelated.row',
        'limit' => 6
    ]}
</div>

{* Similar products *}
<div class="similar-products">
    <h3>Similar products</h3>
    {'msProducts' | snippet: [
        'link' => 1,
        'master' => $id,
        'tpl' => 'tpl.msSimilar.row',
        'limit' => 4
    ]}
</div>
```

## Bidirectional links

By default a link is one-way: product A is linked to B, but not vice versa.

For bidirectional links, create the reverse link in code:

```php
// Create bidirectional link
$linkTypeId = 1;
$productA = 10;
$productB = 20;

// Direct: A → B
$link1 = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link1->fromArray([
    'link_id' => $linkTypeId,
    'master' => $productA,
    'slave' => $productB,
]);
$link1->save();

// Reverse: B → A
$link2 = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link2->fromArray([
    'link_id' => $linkTypeId,
    'master' => $productB,
    'slave' => $productA,
]);
$link2->save();
```

## Using in cart

The `crosssell` link type is useful in the cart:

```fenom
{* In cart chunk *}
{var $cartProductIds = []}
{foreach $products as $product}
    {$cartProductIds[] = $product.id}
{/foreach}

{* Cross-sell products *}
<div class="cart-crosssell">
    <h4>You might also like</h4>
    {'msProducts' | snippet: [
        'link' => 4,
        'master' => $cartProductIds | join : ',',
        'tpl' => 'tpl.msCrosssell.row',
        'limit' => 3
    ]}
</div>
```

## Bulk link management

### Via plugin on product save

```php
<?php
// Plugin on msOnProductSave event
switch ($modx->event->name) {
    case 'msOnProductSave':
        $product = $modx->getOption('product', $scriptProperties);
        $categoryId = $product->get('parent');

        $siblings = $modx->getCollection(\MiniShop3\Model\msProduct::class, [
            'parent' => $categoryId,
            'id:!=' => $product->get('id'),
            'published' => 1,
        ]);

        foreach ($siblings as $sibling) {
            $existing = $modx->getObject(\MiniShop3\Model\msProductLink::class, [
                'link_id' => 1,
                'master' => $product->get('id'),
                'slave' => $sibling->get('id'),
            ]);

            if (!$existing) {
                $link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
                $link->fromArray([
                    'link_id' => 1,
                    'master' => $product->get('id'),
                    'slave' => $sibling->get('id'),
                ]);
                $link->save();
            }
        }
        break;
}
```
