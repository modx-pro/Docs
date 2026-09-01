---
title: Extension API
description: OnMxHeadlessRegister event and ExtensionApi in mxHeadless
---

# Extension API

Third-party extras register objects without editing core. Entry point: event **`OnMxHeadlessRegister`**.

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

After listeners run, the registry freezes. Late registration throws `RegistryFrozenException`.

## ExtensionApi methods

| Method | Purpose |
| --- | --- |
| `registerObject(ObjectDefinition)` | xPDO class under public name |
| `registerRelation(string $object, RelationDefinition)` | Relation for `include=` |
| `registerEndpoint(...)` | Custom route with handler |

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

Flags: `readable`, `creatable`, `updatable`, `deletable`, `hiddenFields`, `protectedFields`, `contexts`.

## Next steps

- [Registering objects](objects)
- [Custom endpoints](endpoints)
- [MiniShop3](minishop3)
