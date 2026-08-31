---
title: Custom endpoints
description: registerEndpoint в Extension API mxHeadless
---

# Custom endpoints

`ExtensionApi::registerEndpoint()` добавляет маршруты вне generic `/objects/{name}`. Регистрация в bootstrap или на `OnMxHeadlessRegister`. См. [обзор](/components/mxheadless/extensions/overview).

## Базовая регистрация

```php
$app->extension()->registerEndpoint(
    'newsletter.subscribe',
    ['POST'],
    '/newsletter/subscribe',
    static fn (ServerRequestInterface $request, array $params): array => [
        'data' => ['subscribed' => true],
    ],
    'newsletter.write',
    false,
);
```

Аргументы: имя маршрута, методы, path (от `/v1`), handler, scope, флаг public read.

## Метаданные для catalog и OpenAPI

Опциональные аргументы попадают в `GET /meta/endpoints` и live OpenAPI:

```php
use MxHeadless\Routing\RouteParameter;

$app->extension()->registerEndpoint(
    'newsletter.subscribe',
    ['POST'],
    '/newsletter/subscribe',
    $handler,
    'newsletter.write',
    false,
    [],
    'Подписка email на рассылку',
    ['Newsletter'],
    [
        new RouteParameter('email', 'query', true, 'Email подписчика', ['type' => 'string', 'format' => 'email']),
    ],
);
```

Path-параметры в `{фигурных}` выводятся автоматически. `RouteParameter` с тем же именем переопределяет inferred path param.

## См. также

- [Swagger и OpenAPI](/components/mxheadless/api/swagger)
- [Регистрация объектов](objects)
