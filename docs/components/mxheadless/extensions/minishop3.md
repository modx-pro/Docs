---
title: MiniShop3
description: Каталог и заказы MiniShop3 через mxHeadless Extension API
---

# MiniShop3

[MiniShop3](https://github.com/modx-pro/MiniShop3) подключают через Extension API. В core mxHeadless нет зависимости от магазина. Документация MS3 на сайте: [/components/minishop3/](/components/minishop3/).

## Типичные объекты

| Имя | Описание |
| --- | --- |
| `products` | Товары (price, SKU, options) |
| `ms_categories` | Категории товаров. Имя `categories` занято `modCategory` в core |
| `orders` | Заказы. Не публичные: только по scope и ACL |
| `order_addresses` | Адреса |
| `product_options` | Опции |
| `product_links` | Связи товаров |

Заказы требуют scope по шаблону `{name}.read`, то есть `orders.read`, и ACL в MODX.

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
| Назначение | Каталог, CMS, заказы в админке | Корзина, оформление, токен покупателя |
| Вход | `/api/v1/...` | `assets/components/minishop3/api.php?route=/api/v1/...` |
| Envelope | `{ data, meta, links }` | `{ success, message, data, ... }` |

ЧПУ `/api/v1/cart/...` перехватит плагин mxHeadless и вернёт `404`. Корзину вызывайте через `api.php?route=`.

## CORS

`ms3_cors_allowed_origins` это настройка MiniShop3, а не mxHeadless. Её читает MS3 при сборке Web API middleware в `core/components/minishop3/config/routes/web.php` и передаёт в `MiniShop3\Middleware\CorsMiddleware` вместе с жёстко заданным `allow_credentials: true`. Пустое значение означает CORS только same-origin.

Пакет mxHeadless такого ключа не знает: у него только `mxheadless_cors_*`. Если SPA в браузере бьёт в оба API, продублируйте origin в обеих настройках.

## Фронтенд

Два базовых URL (CMS и магазин), серверный прокси или разделение на nginx. Примеры Nuxt и Next: [docs/examples в репозитории](https://github.com/Ibochkarev/mxHeadless/tree/main/docs/examples).
