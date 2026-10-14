---
title: Регистрация объектов
description: ObjectDefinition и relations для Extension API mxHeadless
---

# Регистрация объектов

Регистрируйте xPDO-классы через `ExtensionApi::registerObject` на `OnMxHeadlessRegister`.

## Минимум

```php
<?php
use MxHeadless\Definition\ObjectDefinition;

/** @var \MxHeadless\Extension\ExtensionApi $api */
$api = $modx->event->params['api'];

$api->registerObject(
    ObjectDefinition::create('products')
        ->setName('products')
        ->class(\MiniShop3\Model\msProduct::class)
        ->fields(['id', 'pagetitle', 'price'])
        ->filterable(['id', 'parent', 'price'])
        ->sorts(['id', 'price'])
        ->readable()
);
```

После freeze поздний `registerObject` бросает `RegistryFrozenException`.

## Relations

```php
use MxHeadless\Definition\RelationDefinition;

$api->registerRelation('products', RelationDefinition::create('category')
    ->to('categories')
    ->toOne()
    ->foreignKeyField('parent')
    ->localKeyField('id')
    ->fields(['id', 'pagetitle'])
    ->readable()
    ->maxDepth(1)
);
```

Типы: `to_one` и `to_many`. Клиент запрашивает `?include=category`.

`localKeyField` задаёт поле текущего объекта, по которому ищется родитель (по умолчанию `id`). `readable(false)` убирает связь из `include=`. `maxDepth` ограничивает вложенность вложенных `include`.

`to_many` грузится отдельным запросом на каждый объект списка, без батча и без пагинации: `?include=` на `to_many` связи даёт запрос на родителя. Не используйте `to_many` на больших листах.

## HTTP

Зарегистрированный object доступен как `/api/v1/objects/{name}`. Scope строится по шаблону `{name}.{action}`: `products.read`, `products.create`. См. [Objects API](/components/mxheadless/api/objects) и live `/schema`.

## См. также

- [Обзор](overview)
- [MiniShop3](minishop3)
