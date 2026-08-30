---
title: MiniShop3
description: Каталог и заказы MiniShop3 через mxHeadless Extension API
---

# MiniShop3

[MiniShop3](https://github.com/modx-pro/MiniShop3) подключают через Extension API. В core mxHeadless нет зависимости от магазина. Документация MS3 на сайте: [/components/minishop3/](/components/minishop3/).

## Типичные objects

| Public name | Описание |
| --- | --- |
| `products` | Товары (price, SKU, options) |
| `categories` | Категории |
| `orders` | Заказы (protected, не public) |
| `order_addresses` | Адреса |
| `product_options` | Опции |
| `product_links` | Связи / upsell |

Orders требуют scope `orders.read` (паттерн `{name}.read`) и ACL. Никогда не public.

## Пример регистрации

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

Полный пример с `orders` см. в [репозитории](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/ru/extensions/minishop3.md).

## Витрина

```bash
# Сетка категории
curl -s 'https://example.com/api/v1/objects/products?filter[parent]=15&filter[published]=1&sort=price&limit=24'

# Карточка с категорией
curl -s 'https://example.com/api/v1/objects/products/101?include=category'
```

## Два API

| | mxHeadless | MiniShop3 Web API |
| --- | --- | --- |
| Назначение | Каталог, CMS, admin orders | Cart, checkout, customer token |
| Вход | `/api/v1/...` | `assets/components/minishop3/api.php?route=/api/v1/...` |
| Envelope | `{ data, meta, links }` | `{ success, message, data, ... }` |

Pretty URL `/api/v1/cart/...` перехватит плагин mxHeadless и вернёт `404`. Cart вызывайте через `api.php?route=`.

CORS: выровняйте `mxheadless_cors_*` и `ms3_cors_allowed_origins`.

## Фронтенд

Два base URL (cms + shop), либо BFF, либо осторожный split на nginx. Подробные гайды Nuxt/Next: [docs/examples в репозитории](https://github.com/Ibochkarev/mxHeadless/tree/main/docs/examples).
