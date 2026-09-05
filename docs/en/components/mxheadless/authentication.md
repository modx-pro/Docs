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
| API key | CI, builds, server-to-server | `Authorization: Bearer mxh_...` or `X-API-Key` |
| OAuth token | Short-lived machine access | `Authorization: Bearer mxt_...` |

Authenticator order: OAuth token → API key → session → anonymous.

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

With a session cookie, the current MODX user is attached. For `POST`/`PUT`/`PATCH`/`DELETE`, send:

```text
X-CSRF-Token: {token from MODX session}
```

Setting: `mxheadless_csrf_enabled` (default `true`). Bearer keys do not need CSRF.

## Scopes

Pattern `{object}.{action}`: `resources.read`, `chunks.read`, `products.read`, `preview`, `*`.

Missing scope → `403` `scope_denied`. Missing credentials on a protected route → `401` `token_required`.

## Preview

`?preview=true` returns unpublished content with `view_unpublished` (session) or scope `preview` (key/token). Anonymous preview is blocked.

## Pipeline

```text
Request → Authentication → Identity
        → Authorization → scope + MODX ACL + context + fields
        → Service
```
