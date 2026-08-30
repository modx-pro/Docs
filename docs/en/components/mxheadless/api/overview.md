---
title: API overview
description: Envelope, full endpoint list, discovery, health, schema, and OpenAPI in mxHeadless
---

# API overview

Base URL: `{prefix}/v1`, default `/api/v1`.

Live catalog on an installed site: `GET /meta/endpoints` and Swagger UI at `/docs`. Below are **core** routes from `RoutesRegistrar` and `CoreEndpointBootstrap` (package version 1.0.42). Extras may add their own via `registerEndpoint`.

## Success envelope

```json
{
  "data": {},
  "meta": {
    "total": 100,
    "count": 20,
    "limit": 20,
    "offset": 0,
    "has_more": true
  },
  "links": {
    "self": "/api/v1/resources?limit=20&offset=0",
    "next": "/api/v1/resources?limit=20&offset=20"
  }
}
```

On error the response follows [RFC 9457](errors) with no `data`/`meta` wrapper.

## Meta and auth

| Method | Path | Public | Scope | Purpose |
| --- | --- | --- | --- | --- |
| GET | `/` | yes | - | Discovery: version, capabilities |
| GET | `/health` | yes | - | Health (DB). Available with kill switch |
| GET | `/schema` | yes | - | Schema of registered objects |
| GET | `/docs` | yes | - | Swagger UI (`mxheadless_swagger_enabled`) |
| GET | `/meta/endpoints` | yes | - | Live endpoint catalog |
| GET | `/meta/openapi` | yes | - | OpenAPI in envelope |
| GET | `/meta/openapi.json` | yes | - | Raw OpenAPI 3.0 JSON |
| POST | `/auth/token` | yes\* | - | OAuth token. Works only when `mxheadless_oauth_enabled` |

\*The route is public, but the endpoint is disabled by setting until OAuth is turned on.

## Resources and pages

| Method | Path | Public | Scope |
| --- | --- | --- | --- |
| GET | `/resources` | yes | `resources.read` |
| GET | `/resources/{id}` | yes | `resources.read` |
| POST | `/resources` | no | `resources.create` |
| PUT, PATCH | `/resources/{id}` | no | `resources.update` |
| DELETE | `/resources/{id}` | no | `resources.delete` |
| GET | `/pages/{uri}` | yes | `resources.read` |

Public GET works for anonymous callers. API key or OAuth on a public GET still needs the listed scope.

## Contexts

| Method | Path | Public | Scope |
| --- | --- | --- | --- |
| GET | `/contexts` | no | `contexts.read` |
| GET | `/contexts/{key}` | no | `contexts.read` |
| GET | `/contexts/{key}/settings` | no | `contexts.read` |

`{key}` is the context key (`web`, `mgr`, …). Settings follow an allowlist.

## Elements (read-only)

| Method | Path | Public | Scope |
| --- | --- | --- | --- |
| GET | `/chunks` | no | `chunks.read` |
| GET | `/chunks/{id}` | no | `chunks.read` |
| GET | `/templates` | no | `templates.read` |
| GET | `/templates/{id}` | no | `templates.read` |
| GET | `/snippets` | no | `snippets.read` |
| GET | `/snippets/{id}` | no | `snippets.read` |
| GET | `/tvs` | no | `tvs.read` |
| GET | `/tvs/{id}` | no | `tvs.read` |
| GET | `/categories` | no | `categories.read` |
| GET | `/categories/{id}` | no | `categories.read` |
| GET | `/content_types` | no | `content_types.read` |
| GET | `/content_types/{id}` | no | `content_types.read` |

## Generic objects

Only for names in `ObjectRegistry` (core + extras). Unregistered `{name}` → `404`.

| Method | Path | Public | Scope |
| --- | --- | --- | --- |
| GET | `/objects/{name}` | no | `{name}.read` |
| GET | `/objects/{name}/{id}` | no | `{name}.read` |
| POST | `/objects/{name}` | no | `{name}.create` |
| PUT, PATCH | `/objects/{name}/{id}` | no | `{name}.update` |
| DELETE | `/objects/{name}/{id}` | no | `{name}.delete` |

Example: object `products` → scopes `products.read`, `products.create`, …

Full scope list: [Authorization](/components/mxheadless/authorization).

## Kill switch

When `mxheadless_enabled=false`, only `GET /` and `GET /health` work. Everything else → `503` `service_disabled`.

## Headers

| Header | Role |
| --- | --- |
| `Authorization` / `X-API-Key` | Credentials |
| `X-Context` | MODX context |
| `X-CSRF-Token` | Session mutations |
| `Idempotency-Key` | Idempotent POST |
| `X-Request-ID` | Correlation (if client sets it) |

Rate limit response headers: `X-RateLimit-Limit`, `Remaining`, `Reset`.

## Further by group

- [Resources and Pages](resources)
- [Elements and Contexts](elements)
- [Objects](objects)
- [Querying](querying)
- [Mutations](mutations)
- [Scopes](/components/mxheadless/authorization)
