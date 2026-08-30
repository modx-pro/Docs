---
title: CORS
description: Cross-origin request configuration for mxHeadless
---

# CORS

Disabled by default (`mxheadless.cors.enabled=false`). Enable when your SPA runs on another origin.

## Settings

| Key | Default |
| --- | --- |
| `mxheadless.cors.enabled` | `false` |
| `mxheadless.cors.allowed_origins` | empty |
| `mxheadless.cors.allowed_methods` | `GET,POST,PUT,PATCH,DELETE,OPTIONS` |
| `mxheadless.cors.allowed_headers` | Authorization, Content-Type, X-Request-ID, X-CSRF-Token, X-Context, X-API-Key, Idempotency-Key |
| `mxheadless.cors.expose_headers` | ETag, X-Request-ID, X-RateLimit-*, Idempotency-Replayed |
| `mxheadless.cors.allow_credentials` | `false` |

Origins are comma-separated. Do not combine `*` with `allow_credentials=true`.

## Preflight

Matched Origin on `OPTIONS` → `204` with CORS headers. Discovery reflects `data.cors.enabled` and an origins snapshot.

## MiniShop3

If the cart goes through the MS3 Web API, mirror origins in `ms3_cors_allowed_origins`. See [MiniShop3](/components/mxheadless/extensions/minishop3).
