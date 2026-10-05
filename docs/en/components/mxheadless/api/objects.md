---
title: Objects
description: Generic CRUD at /objects/{name} for registered xPDO objects
---

# Objects

Generic CRUD for objects from `ObjectRegistry`. The URL uses a name (`products`, `orders`), not a PHP class.

| Method | Path | Scope |
| --- | --- | --- |
| GET | `/objects/{name}` | `{name}.read` |
| GET | `/objects/{name}/{id}` | `{name}.read` |
| POST | `/objects/{name}` | `{name}.create` |
| PUT / PATCH | `/objects/{name}/{id}` | `{name}.update` |
| DELETE | `/objects/{name}/{id}` | `{name}.delete` |

The pattern is fixed in `RoutesRegistrar`: `{name}.{action}`. Not `objects.{name}.read`.

```bash
curl -s 'https://example.com/api/v1/objects/products?limit=10' \
  -H 'Authorization: Bearer mxh_...'
```

## Registry

An object appears in the API only after registration via core bootstrap or the `OnMxHeadlessRegister` event. See [Extensions](/components/mxheadless/extensions/overview).

Unregistered name → `404`.

## MiniShop3

Typical names: `products`, `ms_categories`, `orders`. Core `categories` is `modCategory` elements. Orders are usually `protected`. Details: [MiniShop3](/components/mxheadless/extensions/minishop3).

## Query and mutations

Same [querying](querying) and [mutations](mutations) rules as resources. Fields and filters come from the object definition.
