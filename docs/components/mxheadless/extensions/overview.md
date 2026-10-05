---
title: Расширение API
description: Событие OnMxHeadlessRegister и ExtensionApi mxHeadless
---

# Расширение API

Сторонние Extras регистрируют объекты без правок core. Точка входа: событие **`OnMxHeadlessRegister`**.

## Событие

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

После обработчиков реестр замораживается. Поздняя регистрация выбрасывает `RegistryFrozenException`.

## Методы ExtensionApi

| Метод | Назначение |
| --- | --- |
| `registerObject(ObjectDefinition)` | xPDO-класс под публичным именем |
| `registerRelation(string $object, RelationDefinition)` | Связь для `include=` |
| `registerEndpoint(...)` | Свой маршрут с обработчиком |

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

Флаги: `readable`, `creatable`, `updatable`, `deletable`, `hiddenFields`, `protectedFields`, `immutableFields`, `requiredFields`, `searchable`, `primaryKey`, `contexts`.

## События цепочки

| Событие | Когда |
| --- | --- |
| `OnMxHeadlessRegister` | Регистрация objects, relations, endpoints |
| `OnMxHeadlessRegisterMiddleware` | До freeze стека. `registrar`: `prepend` / `append` |
| `OnMxHeadlessBeforeRequest` | После auth, до handler. Можно подменить `request` через `$modx->event->returned` |
| `OnMxHeadlessAfterRequest` | После handler. Можно подменить `response` |

## Дальше

- [Регистрация объектов](objects)
- [Custom endpoints](endpoints)
- [MiniShop3](minishop3)
