---
title: Authorization
description: Full scope list, MODX ACL, and field policy in mxHeadless
---

# Authorization

After authentication, mxHeadless checks whether the action is allowed in four steps:

1. Route permission: public or requires identity
2. Key or token scope: string like `{object}.{action}`
3. MODX ACL: context, resource view, `view_unpublished`
4. Field policy: hidden and protected fields

Missing scope on API key or OAuth → `403` `scope_denied`.

## How scopes are checked

| Identity | Check |
| --- | --- |
| API key (`mxh_*`) | Key scope list. `*` grants all actions |
| OAuth (`mxt_*`) | Token scopes (intersection with client scopes) |
| Session | `modX->hasPermission()` with the same string (`resources.read`, etc.) |
| Anonymous | Public GET only. Scopes do not apply |

For integrations an API key is usually enough. Session fits mgr or same-origin UI with CSRF.

## Core scopes (fixed routes)

| Scope | Routes |
| --- | --- |
| `resources.read` | `GET /resources`, `GET /resources/{id}`, `GET /pages/{uri}` |
| `resources.create` | `POST /resources` |
| `resources.update` | `PUT` / `PATCH /resources/{id}` |
| `resources.delete` | `DELETE /resources/{id}` |
| `contexts.read` | `GET /contexts`, `GET /contexts/{key}`, `GET /contexts/{key}/settings` |
| `chunks.read` | `GET /chunks`, `GET /chunks/{id}` |
| `templates.read` | `GET /templates`, `GET /templates/{id}` |
| `snippets.read` | `GET /snippets`, `GET /snippets/{id}` |
| `tvs.read` | `GET /tvs`, `GET /tvs/{id}` |
| `categories.read` | `GET /categories`, `GET /categories/{id}` |
| `content_types.read` | `GET /content_types`, `GET /content_types/{id}` |
| `preview` | `?preview=true` without session `view_unpublished`. Also used for `include_deleted` checks |
| `*` | All scopes (keys and tokens only) |

Meta routes (`/`, `/health`, `/schema`, `/docs`, `/meta/*`) and `POST /auth/token` do not require a scope.

## Scopes for `/objects/{name}`

Pattern from code: `{name}.{action}`, where `{name}` is the registry name, not a PHP class and not an `objects.` prefix.

| Scope | Method | Path |
| --- | --- | --- |
| `{name}.read` | GET | `/objects/{name}`, `/objects/{name}/{id}` |
| `{name}.create` | POST | `/objects/{name}` |
| `{name}.update` | PUT, PATCH | `/objects/{name}/{id}` |
| `{name}.delete` | DELETE | `/objects/{name}/{id}` |

Examples after MiniShop3 objects are registered:

| Scope | Meaning |
| --- | --- |
| `products.read` | Product catalog |
| `categories.read` | Categories |
| `orders.read` | Orders (usually not public, plus ACL) |
| `orders.update` | Order update when the object is writable |

Registered names: `GET /schema` or `GET /meta/endpoints` on a live site.

## Example scope sets for a key

Public frontends (read-only content) often work without a key.

CI / preview:

```text
resources.read,preview,chunks.read,templates.read
```

MS3 catalog + CMS:

```text
resources.read,products.read,categories.read
```

Admin API (narrow, no `*`):

```text
resources.read,resources.create,resources.update,orders.read
```

Create a key: [API keys](api-keys). OAuth: [OAuth](oauth).

## Public vs protected

Anonymous callers can read discovery, health, schema, docs, meta, `GET /resources`, and `GET /pages/{uri}` within ACL for published resources.

Elements, contexts, write operations, and `/objects/*` require credentials.

## Context

Header `X-Context` or query `?context=`. Value must be in `mxheadless_allowed_contexts` (default `web,mgr`).

## Fields

Hidden fields never appear in JSON. Protected fields require a separate permission in the definition. Requesting `fields=` for an unknown or forbidden field → `422`.

## Preview and deleted

| Query | Who |
| --- | --- |
| `preview=true` | Session with `view_unpublished` or scope `preview` |
| `include_deleted=1` | Not for anonymous. Needs `preview`, `resources.update`, `resources.delete`, or matching MODX permissions |

## See also

- [Endpoint catalog](api/overview)
- [Authentication](authentication)
