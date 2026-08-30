---
title: MiniShop3
description: MiniShop3 catalog and orders via mxHeadless Extension API
---

# MiniShop3

[MiniShop3](https://github.com/modx-pro/MiniShop3) connects through the Extension API. mxHeadless core has no shop dependency. MS3 docs on this site: [/components/minishop3/](/components/minishop3/).

## Typical objects

| Public name | Description |
| --- | --- |
| `products` | Products (price, SKU, options) |
| `categories` | Categories |
| `orders` | Orders (protected, not public) |
| `order_addresses` | Addresses |
| `product_options` | Options |
| `product_links` | Links / upsell |

Orders need scope `orders.read` (pattern `{name}.read`) and ACL. Never public.

## Registration example

```php
<?php
use MxHeadless\Definition\ObjectDefinition;
use MxHeadless\Definition\RelationDefinition;

/** @var \MxHeadless\Extension\ExtensionApi $api */
$api = $modx->event->params['api'];

$api->registerObject(
    ObjectDefinition::create('products')
        ->setName('products')
        ->class('MiniShop3\\Model\\msProduct')
        ->fields(['id', 'pagetitle', 'alias', 'uri', 'price', 'article', 'parent', 'published'])
        ->filterable(['id', 'parent', 'price', 'published', 'article'])
        ->sorts(['id', 'price', 'pagetitle'])
        ->readable()
);

$api->registerRelation('products', RelationDefinition::create('category')
    ->to('categories')
    ->toOne()
    ->foreignKeyField('parent')
    ->fields(['id', 'pagetitle', 'alias'])
);
```

Full example with `orders` is in the [repository](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/ru/extensions/minishop3.md).

## Storefront

```bash
# Category grid
curl -s 'https://example.com/api/v1/objects/products?filter[parent]=15&filter[published]=1&sort=price&limit=24'

# Product with category
curl -s 'https://example.com/api/v1/objects/products/101?include=category'
```

## Two APIs

| | mxHeadless | MiniShop3 Web API |
| --- | --- | --- |
| Purpose | Catalog, CMS, admin orders | Cart, checkout, customer token |
| Entry | `/api/v1/...` | `assets/components/minishop3/api.php?route=/api/v1/...` |
| Envelope | `{ data, meta, links }` | `{ success, message, data, ... }` |

Pretty URL `/api/v1/cart/...` is intercepted by mxHeadless → 404. Call cart via `api.php?route=`.

CORS: align `mxheadless.cors.*` and `ms3_cors_allowed_origins`.

## Frontend

Two base URLs (cms + shop), a BFF, or careful nginx split. Nuxt/Next guides: [docs/examples in the repository](https://github.com/Ibochkarev/mxHeadless/tree/main/docs/examples).
