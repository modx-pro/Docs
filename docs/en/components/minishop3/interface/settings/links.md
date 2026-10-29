---
title: Product links
---
# Product links

Open **Extras → MiniShop3 → Settings → Product links**.

## Purpose

Types of relationships between products:

- **Similar products** are alternatives to the current product
- **Related products** are add-ons to the purchase
- **Bundles** are products sold together
- **Upsell** is a more expensive alternative
- **Cross-sell** is a product offered on top of the purchase

## Link type fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Link type name (for example "Similar" or "Bought together") |
| `type` | string | Cardinality: `one_to_one`, `one_to_many`, `many_to_one`, `many_to_many` |
| `description` | text | Description of the link type |

The package does not ship ready-made keys such as `similar` or `upsell`. You set the meaning in `name` and the behavior in `type`.

## Creating links between products

### Through the interface

1. Open the product card
2. Open the **Links** tab
3. Pick the link type
4. Add the related products through search

### Through the API

```php
// Create a link
// msProductLink has a composite primary key link + master + slave,
// and fromArray() skips key fields — use set()
$link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link->set('link', 1);      // Link type ID (msLink)
$link->set('master', 10);   // Master product ID
$link->set('slave', 20);    // Related product ID
$link->save();

// Shorter, and it honours the link cardinality:
$modx->services->get('ms3_product_link_service')->create(10, 20, 1);
```

## Showing related products

The `msProducts` snippet shows related products when you pass `link`:

```fenom
{* Similar products for the current product *}
{$_modx->runSnippet('msProducts', [
    'link' => 1,                  // Link type ID
    'master' => $_modx->resource.id,
    'tpl' => 'tpl.msProducts.row',
    'limit' => 4
])}
```

## Two-way links

Behavior depends on the `type` of the `msLink` row:

| `type` | What is written to `ms3_product_links` |
| --- | --- |
| `one_to_many` | One row: master to slave |
| `many_to_one` | One row with master and slave swapped |
| `one_to_one`, `many_to_many` | Two rows: A to B and B to A (`ProductLinkService` creates them) |

For `many_to_many` the service goes beyond the pair of rows: after creating a link it builds the **full graph** between every product already linked by that type. Add a third product to a pair and you get six rows, not two. You do not set the master/slave pair yourself, and an edit of one row is overwritten by the service.

Deletion for `many_to_many` is symmetric: every row where `slave` appears is removed regardless of `master` — the product leaves the whole group at once.

## Use in the cart

The link type for "with this product" offers in the cart:

```fenom
{* In the cart chunk *}
{var $cartProductIds = []}
{foreach $products as $product}
    {$cartProductIds[] = $product.id}
{/foreach}

{* Add-on products: the `master` parameter accepts only one id. For several ids,
  set the join and the condition yourself
*}
{'msProducts' | snippet : [
    'innerJoin' => ['Link' => ['class' => 'msProductLink', 'alias' => 'Link', 'on' => '`msProduct`.`id` = `Link`.`slave` AND `Link`.`link` = 4']],
    'where' => ['Link.master:IN' => $cartProductIds],
    'tpl' => 'tpl.msCrosssell.row',
    'limit' => 3
]}
```

## Bulk link management

The package has no product-save event of its own. Use the core `OnDocFormSave` and check that the saved resource is an `msProduct`:

```php
<?php
// Plugin on OnDocFormSave (events: OnDocFormSave)
if ($modx->event->name !== 'OnDocFormSave') {
    return;
}
// $mode is 'create' on create, 'cmp_update' when the card is saved
if ($mode === 'cmp_update' || $resource->class_key !== 'msProduct') {
    return;
}
$product = $resource;

// Create links to products in the same category
$categoryId = $product->get('parent');

// Products in the same category
$siblings = $modx->getCollection(\MiniShop3\Model\msProduct::class, [
    'parent' => $categoryId,
    'id:!=' => $product->get('id'),
    'published' => 1,
]);

foreach ($siblings as $sibling) {
    // Skip when the link already exists
    $existing = $modx->getObject(\MiniShop3\Model\msProductLink::class, [
        'link' => 1,
        'master' => $product->get('id'),
        'slave' => $sibling->get('id'),
    ]);

    if (!$existing) {
        $link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
        $link->set('link', 1);
        $link->set('master', $product->get('id'));
        $link->set('slave', $sibling->get('id'));
        $link->save();
    }
}
```
