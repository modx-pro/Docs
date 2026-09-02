---
title: Custom endpoints
description: registerEndpoint in the mxHeadless Extension API
---

# Custom endpoints

`ExtensionApi::registerEndpoint()` adds routes outside generic `/objects/{name}`. Register in bootstrap or on `OnMxHeadlessRegister`. See [overview](/components/mxheadless/extensions/overview).

## Basic registration

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

Arguments: route name, methods, path (from `/v1`), handler, scope, public read flag.

## Metadata for catalog and OpenAPI

Optional arguments appear in `GET /meta/endpoints` and live OpenAPI:

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
    'Subscribe email to newsletter',
    ['Newsletter'],
    [
        new RouteParameter('email', 'query', true, 'Subscriber email', ['type' => 'string', 'format' => 'email']),
    ],
);
```

Path parameters in `{braces}` are inferred automatically. A `RouteParameter` with the same name overrides the inferred path param.

## See also

- [Swagger and OpenAPI](/components/mxheadless/api/swagger)
- [Object registration](objects)
