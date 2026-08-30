---
title: Расширение API
description: Событие OnMxHeadlessRegister и ExtensionApi mxHeadless
---

# Расширение API

Сторонние Extras регистрируют объекты без правок core. Точка входа: событие **`OnMxHeadlessRegister`**.

## Event hook

```php
<?php
/** @var \MODX\Revolution\modX $modx */
switch ($modx->event->name) {
    case 'OnMxHeadlessRegister':
        /** @var \MxHeadless\Extension\ExtensionApi $api */
        $api = $modx->event->params['api'];
        $api->registerObject(
            \MxHeadless\Definition\ObjectDefinition::create('products')
                ->setName('products')
                ->class(\MiniShop3\Model\msProduct::class)
                ->fields(['id', 'pagetitle', 'price', 'article'])
                ->filterable(['id', 'price', 'parent'])
                ->sorts(['id', 'price', 'pagetitle'])
                ->readable()
        );
        break;
}
```

После listeners registry замораживается. Поздняя регистрация выбрасывает `RegistryFrozenException`.

## Методы ExtensionApi

| Метод | Назначение |
| --- | --- |
| `registerObject(ObjectDefinition)` | xPDO-класс под public name |
| `registerRelation(string $object, RelationDefinition)` | Связь для `include=` |
| `registerEndpoint(...)` | Custom route с handler |

## ObjectDefinition

```php
ObjectDefinition::create('locations')
    ->setName('locations')
    ->class(YmlLocation::class)
    ->fields(['id', 'title', 'lat', 'lng'])
    ->filterable(['id', 'city_id'])
    ->sorts(['id', 'title'])
    ->readable()
    ->creatable(false)
    ->hiddenFields(['internal_note'])
    ->protectedFields(['owner_id'])
    ->contexts(['web']);
```

Флаги: `readable`, `creatable`, `updatable`, `deletable`, `hiddenFields`, `protectedFields`, `contexts`.

## Дальше

- [Регистрация объектов](objects)
- [MiniShop3](minishop3)
