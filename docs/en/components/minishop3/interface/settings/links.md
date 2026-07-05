---
title: Product links
---
# Product links

Product relationship types are managed via **Extras → MiniShop3 → Settings → Links**.

## Purpose

Links define relationships between products:

- **Similar products** — alternatives to the current product
- **Related products** — add-ons to the purchase
- **Bundles** — products sold together
- **Upsell** — higher-priced alternatives
- **Cross-sell** — products for additional sales

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
| `crosssell` | Cross-sell | Cart add-ons |

## Creating links between products

### Via the interface

1. Open the product card
2. Go to the **Links** tab
3. Select link type
4. Add related products via search

### Via API

```php
// Create a link
$link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link->fromArray([
    'link_id' => 1,        // Link type ID (e.g. "similar")
    'master' => 10,        // Master product ID
    'slave' => 20,         // Related product ID
]);
$link->save();
```

## Displaying related products

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

### On the product page

```fenom
{* Related products *}
<div class="related-products">
    <h3>Frequently bought together</h3>
    {'msProducts' | snippet : [
        'link' => 2,
        'master' => $id,
        'tpl' => 'tpl.msRelated.row',
        'limit' => 6
    ]}
</div>

{* Similar products *}
<div class="similar-products">
    <h3>Similar products</h3>
    {'msProducts' | snippet : [
        'link' => 1,
        'master' => $id,
        'tpl' => 'tpl.msSimilar.row',
        'limit' => 4
    ]}
</div>
```

## Bidirectional links

By default a link is one-way: product A is linked to B, but not vice versa.

For bidirectional links create the reverse link programmatically:

```php
// Create bidirectional link
$linkTypeId = 1; // Link type ID
$productA = 10;
$productB = 20;

// Forward: A → B
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

## Use in the cart

`crosssell` links work well in the cart:

```fenom
{* In cart chunk *}
{var $cartProductIds = []}
{foreach $products as $product}
    {$cartProductIds[] = $product.id}
{/foreach}

{* Cross-sell products *}
<div class="cart-crosssell">
    <h4>Recommended add-ons</h4>
    {'msProducts' | snippet : [
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
// Plugin on msOnProductSave
switch ($modx->event->name) {
    case 'msOnProductSave':
        // Auto-create links to products in the same category
        $product = $modx->getOption('product', $scriptProperties);
        $categoryId = $product->get('parent');

        // Products in the same category
        $siblings = $modx->getCollection(\MiniShop3\Model\msProduct::class, [
            'parent' => $categoryId,
            'id:!=' => $product->get('id'),
            'published' => 1,
        ]);

        foreach ($siblings as $sibling) {
            // Check if link already exists
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
