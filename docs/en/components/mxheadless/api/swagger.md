---
title: Swagger and OpenAPI
description: Swagger UI, live OpenAPI, and endpoint catalog for mxHeadless
---

# Swagger and OpenAPI

mxHeadless builds the spec from `RouteCollection` and `ObjectRegistry` on the **current** install. Extras registered via `OnMxHeadlessRegister` appear in meta routes alongside core.

Meta routes are public and need no authentication.

## Swagger UI

Interactive docs at:

```text
GET /api/v1/docs
```

The page loads Swagger UI from a CDN (version pinned in the package) and points at `/api/v1/meta/openapi.json`. `tryItOutEnabled` and `persistAuthorization` are on: Bearer or API keys entered in the UI survive page reloads.

Toggle: `mxheadless_swagger_enabled` (default `true`). When `false`, `/docs` returns `404`. Raw OpenAPI JSON stays available.

On production, teams often disable the UI on the public internet when external docs are not needed. See [production checklist](/components/mxheadless/operations/production-checklist).

## Live OpenAPI

Inside the standard envelope:

```bash
curl -s https://example.com/api/v1/meta/openapi | jq '.data.openapi'
```

The `data` field is an OpenAPI 3.0.3 document: paths, parameters, security schemes, tags.

Raw JSON without the envelope for Swagger UI and client generators:

```bash
curl -s https://example.com/api/v1/meta/openapi.json | jq '.openapi'
```

Content-Type: `application/openapi+json`.

## Endpoint catalog

Route list with metadata (core + extras via `registerEndpoint`):

```bash
curl -s https://example.com/api/v1/meta/endpoints | jq
```

Discovery (`GET /api/v1`) links to meta URLs. Full core route list: [API overview](overview).

## Schema vs OpenAPI

| Source | Path | Describes |
| --- | --- | --- |
| Schema | `GET /schema` | Registry objects: fields, filterable, sortable, relations, CRUD flags |
| OpenAPI | `GET /meta/openapi`, `/meta/openapi.json` | HTTP: methods, path/query params, status codes, security |

Schema fits query clients. OpenAPI fits the HTTP contract and codegen. Registering a new object via the Extension API updates runtime schema and OpenAPI on the site.

## TypeScript client generation

Point the generator at `/api/v1/meta/openapi.json`, not enveloped `/meta/openapi`, if the tool expects a root `openapi` field.

Example with [openapi-typescript](https://github.com/drwpow/openapi-typescript):

```bash
npx openapi-typescript https://your-site.example/api/v1/meta/openapi.json -o mxheadless.d.ts
```

On CI, compare the static `openapi.yaml` from the [mxHeadless repo](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/openapi.yaml) with the live spec on staging.

## See also

- [API overview](overview)
- [Querying](querying)
- [System settings](/components/mxheadless/settings)
- [Object registration](/components/mxheadless/extensions/objects)
