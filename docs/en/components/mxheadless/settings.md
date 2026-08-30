---
title: System settings
description: Reference for mxheadless keys in MODX System Settings
---

# System settings

Namespace: `mxheadless`. Database keys use dots, as in transport: `mxheadless.api.prefix`.

## API

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.api.prefix` | textfield | `/api` | Public prefix before `/v1` |

## Core

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.enabled` | combo-boolean | `true` | Kill switch. When `false`, only `GET /` and `GET /health` work. Everything else → `503` (`service_disabled`) |
| `mxheadless.debug` | combo-boolean | `false` | Exception details in problem+json (dev only) |
| `mxheadless.swagger.enabled` | combo-boolean | `true` | Swagger UI on `GET /docs`. OpenAPI JSON stays available when `false` |

## Cache

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.cache.enabled` | combo-boolean | `true` | HTTP cache for anonymous GET/HEAD with ETag |
| `mxheadless.cache_ttl` | numberfield | `300` | `max-age` for public responses (seconds) |

## Rate limit

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.rate_limit.enabled` | combo-boolean | `true` | Limit by identity/IP |
| `mxheadless.rate_limit.max_requests` | numberfield | `120` | Requests per window |
| `mxheadless.rate_limit.window_seconds` | numberfield | `60` | Window length (seconds) |

Per-key overrides: columns `rate_limit_max`, `rate_limit_window` on `mxheadless_api_keys` and `mxheadless_oauth_clients`.

## CORS

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.cors.enabled` | combo-boolean | `false` | CORS for cross-origin SPAs |
| `mxheadless.cors.allowed_origins` | textarea | empty | Comma-separated origins or `*` |
| `mxheadless.cors.allowed_methods` | textfield | `GET,POST,PUT,PATCH,DELETE,OPTIONS` | Preflight methods |
| `mxheadless.cors.allowed_headers` | textfield | `Authorization,Content-Type,X-Request-ID,X-CSRF-Token,X-Context,X-API-Key,Idempotency-Key` | Allowed headers |
| `mxheadless.cors.expose_headers` | textfield | `ETag,X-Request-ID,X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Idempotency-Replayed` | Expose-Headers for JS |
| `mxheadless.cors.allow_credentials` | combo-boolean | `false` | Do not combine with origins=`*` |

Details: [CORS](configuration/cors).

## Security and idempotency

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.max_body_bytes` | numberfield | `1048576` | Max body size (1 MB) |
| `mxheadless.max_uri_bytes` | numberfield | `2048` | Max URI length |
| `mxheadless.trusted_proxies` | textarea | empty | Proxy IPs for `X-Forwarded-For` |
| `mxheadless.idempotency.enabled` | combo-boolean | `true` | `Idempotency-Key` on POST |
| `mxheadless.idempotency_ttl` | numberfield | `86400` | Idempotency cache TTL (seconds) |

CSRF for sessions reads `mxheadless.csrf.enabled` (default `true`). The key may be missing from transport. Set it manually if needed.

## OAuth

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.oauth.enabled` | combo-boolean | `false` | `POST /auth/token` |
| `mxheadless.oauth.token_ttl` | numberfield | `3600` | `mxt_*` TTL (seconds) |
| `mxheadless.oauth.password_grant_enabled` | combo-boolean | `false` | `password` grant |

## Webhooks

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.webhook.max_attempts` | numberfield | `5` | Delivery attempts before `failed` |
| `mxheadless.webhook.worker_limit` | numberfield | `50` | Default `--limit` for worker |
| `mxheadless.webhook.allow_private_urls` | combo-boolean | `false` | Dev: localhost/private IP (also relaxes TLS verify) |

## Audit

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless.audit.enabled` | combo-boolean | `false` | Log to `mxheadless_api_log` |
| `mxheadless.audit.retention_days` | numberfield | `90` | Retention for `audit-prune.php` |
| `mxheadless.audit.log_get` | combo-boolean | `false` | Log GET requests |

## Query limits (code defaults)

`QueryParser` reads these via `getOption`. You can add them as system settings:

| Key | Default |
| --- | --- |
| `mxheadless.max_limit` | `100` |
| `mxheadless.max_offset` | `100000` |
| `mxheadless.max_fields` | `50` |
| `mxheadless.max_include_relations` | `10` |
| `mxheadless.max_include_depth` | `2` |
| `mxheadless.allowed_contexts` | `web,mgr` |

See [Limits](configuration/limits).
