---
title: Custom endpoints
description: registerEndpoint в Extension API mxHeadless
---

# Custom endpoints

`ExtensionApi::registerEndpoint()` добавляет маршруты вне generic `/objects/{name}`. Экземпляр `ExtensionApi` лежит в параметрах события `OnMxHeadlessRegister` под ключом `api`. У `Application` есть только геттер `extensionApi()`; метода `extension()` нет. См. [обзор](overview).

## Базовая регистрация

```php
<?php
use Psr\Http\Message\ServerRequestInterface;

/** @var \MxHeadless\Extension\ExtensionApi $api */
$api = $modx->event->params['api'];

$api->registerEndpoint(
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

Аргументы: имя маршрута, методы, path (от `/v1`), handler, scope, флаг public read. Handler получает `ServerRequestInterface` и массив path-параметров и возвращает `array`.

Два особых случая в `RouteDispatcher`:

- Handler может вернуть `ResponseInterface`, тогда ответ уходит как есть, без envelope.
- `POST` на маршрут с именем, оканчивающимся на `.create`, получает статус `201`. Остальные ответы `200`.

После `freeze()` поздний `registerEndpoint` бросает `RuntimeException` с текстом `Route collection is frozen`.

## Метаданные для catalog и OpenAPI

Опциональные аргументы попадают в `GET /meta/endpoints` и live OpenAPI:

```php
use MxHeadless\Routing\RouteParameter;

$api->registerEndpoint(
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
