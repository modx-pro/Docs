---
title: Registering objects
description: ObjectDefinition and relations for mxHeadless Extension API
---

# Registering objects

Register xPDO classes via `ExtensionApi::registerObject` on `OnMxHeadlessRegister`.

## Minimum

```php
$api->registerObject(
    \MxHeadless\Definition\ObjectDefinition::create('products')
        ->setName('products')
        ->class(\MiniShop3\Model\msProduct::class)
        ->fields(['id', 'pagetitle', 'price'])
        ->filterable(['id', 'parent', 'price'])
        ->sorts(['id', 'price'])
        ->readable()
);
```

After freeze, late registration throws `RegistryFrozenException`.

## Relations

```php
use MxHeadless\Definition\RelationDefinition;

$api->registerRelation('products', RelationDefinition::create('category')
    ->to('categories')
    ->toOne()
    ->foreignKeyField('parent')
    ->fields(['id', 'pagetitle'])
);
```

Types: `to_one`, `to_many` (paginated batch load). Client requests `?include=category`.

## HTTP

Registered object is available at `/api/v1/objects/{name}`. See [Objects API](/components/mxheadless/api/objects) and live `/schema`.

## See also

- [Overview](overview)
- [MiniShop3](minishop3)
