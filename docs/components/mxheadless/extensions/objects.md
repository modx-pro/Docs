---
title: Регистрация объектов
description: ObjectDefinition и relations для Extension API mxHeadless
---

# Регистрация объектов

Регистрируйте xPDO-классы через `ExtensionApi::registerObject` на `OnMxHeadlessRegister`.

## Минимум

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

После freeze поздняя регистрация выбрасывает `RegistryFrozenException`.

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

Типы: `to_one`, `to_many` (paginated batch load). Клиент запрашивает `?include=category`.

## HTTP

Зарегистрированный object доступен как `/api/v1/objects/{name}`. См. [Objects API](/components/mxheadless/api/objects) и live `/schema`.

## См. также

- [Обзор](overview)
- [MiniShop3](minishop3)
