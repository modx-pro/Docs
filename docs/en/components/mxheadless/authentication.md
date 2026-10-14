---
title: Authentication
description: MODX sessions, mxh_ API keys, mxt_ OAuth tokens, and CSRF in mxHeadless
---

# Authentication

mxHeadless determines who calls the API. What they can do is decided by [authorization](authorization) (scopes and MODX ACL).

## Identity types

| Type | When | Mechanism |
| --- | --- | --- |
| Anonymous | Public reads | No headers |
| Session | Manager UI or front end with MODX cookie | Session cookie |
| API key | CI, builds, server-to-server calls | `Authorization: Bearer mxh_...` or `X-API-Key` |
| OAuth token | Short-lived service access | `Authorization: Bearer mxt_...` |

Check order: OAuth token → API key → session → anonymous.

```mermaid
flowchart TD
  R[Request] --> T{mxt_* in Authorization?}
  T -->|yes| IO[OAuth identity]
  T -->|no| K{mxh_* or X-API-Key?}
  K -->|yes| IK[Key identity]
  K -->|no| S{MODX session cookie?}
  S -->|yes| IS[Session identity]
  S -->|no| AN[Anonymous]
```

## API keys (`mxh_*`)

Format: `mxh_{lookupId}_{secret}`. The secret is shown once. The database stores `password_hash()`.

```bash
curl -s https://example.com/api/v1/resources \
  -H 'Authorization: Bearer mxh_a1b2c3d4_xK9mN2pQ8rT5vW1yZ6'
```

Creation: [API keys](api-keys).

## OAuth tokens (`mxt_*`)

Disabled by default (`mxheadless_oauth_enabled`). Issue via `POST /api/v1/auth/token`.

Format: `mxt_{tokenId}_{secret}`. TTL: `mxheadless_oauth_token_ttl` (3600 s).

Details: [OAuth](oauth).

## Session and CSRF

With a session cookie, the current MODX user is attached.

Any session request creates `$_SESSION['mxheadless.csrf_token']` if missing and returns it in `X-CSRF-Token`. Send the same header on `POST`/`PUT`/`PATCH`/`DELETE`. This is not the MODX core CSRF token.

Setting: `mxheadless_csrf_enabled` (default `true`). Bearer keys do not need CSRF. With CORS, add `X-CSRF-Token` to `mxheadless_cors_expose_headers` so JavaScript can read it.

## Scopes

Pattern `{object}.{action}`: `resources.read`, `chunks.read`, `products.read`, `preview`, `*`.

Missing scope → `403` `scope_denied`. Missing credentials on a protected route → `401` `token_required`.

## Preview

`?preview=true` returns unpublished content with `view_unpublished` (session) or scope `preview` (key/token). Anonymous preview is blocked.

## Pipeline

```mermaid
flowchart LR
  Q[Request] --> AUTH[Authentication]
  AUTH --> ID[Identity]
  ID --> AUTHZ[Authorization]
  AUTHZ --> SVC[Service]
  AUTHZ -.-> SC[scope]
  AUTHZ -.-> ACL[MODX ACL]
  AUTHZ -.-> CTX[context]
  AUTHZ -.-> FL[fields]
```
