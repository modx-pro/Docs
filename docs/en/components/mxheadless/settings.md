---
title: System settings
description: Reference for mxheadless keys in MODX System Settings
---

# System settings

Namespace: `mxheadless`. Keys use underscores (`mxheadless_cors_enabled`), not dots.

From **1.0.42**, upgrade migrates values from old dotted keys (`mxheadless.cors.enabled`) to the new names.

## API

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_api_prefix` | textfield | `/api` | Public prefix before `/v1` |

## Core

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_enabled` | combo-boolean | `true` | Kill switch. When `false`, only `GET /` and `GET /health` work. Everything else → `503` (`service_disabled`) |
| `mxheadless_debug` | combo-boolean | `false` | Exception details in problem+json (dev only) |
| `mxheadless_swagger_enabled` | combo-boolean | `true` | Swagger UI on `GET /docs`. OpenAPI JSON stays available when `false` |

## Cache

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_cache_enabled` | combo-boolean | `true` | HTTP cache for anonymous GET/HEAD with ETag |
| `mxheadless_cache_ttl` | numberfield | `300` | `max-age` for public responses (seconds) |

## Rate limit

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_rate_limit_enabled` | combo-boolean | `true` | Limit by identity/IP |
| `mxheadless_rate_limit_max_requests` | numberfield | `120` | Requests per window |
| `mxheadless_rate_limit_window_seconds` | numberfield | `60` | Window length (seconds) |

Per-key overrides: columns `rate_limit_max`, `rate_limit_window` on `mxheadless_api_keys` and `mxheadless_oauth_clients`.

## CORS

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_cors_enabled` | combo-boolean | `false` | CORS for cross-origin SPAs |
| `mxheadless_cors_allowed_origins` | textarea | empty | Comma-separated origins or `*` |
| `mxheadless_cors_allowed_methods` | textfield | `GET,POST,PUT,PATCH,DELETE,OPTIONS` | Preflight methods |
| `mxheadless_cors_allowed_headers` | textfield | `Authorization,Content-Type,X-Request-ID,X-CSRF-Token,X-Context,X-API-Key,Idempotency-Key` | Allowed headers |
| `mxheadless_cors_expose_headers` | textfield | `ETag,X-Request-ID,X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Idempotency-Replayed` | Expose-Headers for JS |
| `mxheadless_cors_allow_credentials` | combo-boolean | `false` | Do not combine with origins=`*` |

Details: [CORS](configuration/cors).

## Security and idempotency

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_max_body_bytes` | numberfield | `1048576` | Max body size (1 MB) |
| `mxheadless_max_uri_bytes` | numberfield | `2048` | Max URI length |
| `mxheadless_trusted_proxies` | textarea | empty | Proxy IPs for `X-Forwarded-For` |
| `mxheadless_csrf_enabled` | combo-boolean | `true` | CSRF for session mutations |
| `mxheadless_idempotency_enabled` | combo-boolean | `true` | `Idempotency-Key` on POST |
| `mxheadless_idempotency_ttl` | numberfield | `86400` | Idempotency cache TTL (seconds) |

## OAuth

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_oauth_enabled` | combo-boolean | `false` | `POST /auth/token` |
| `mxheadless_oauth_token_ttl` | numberfield | `3600` | `mxt_*` TTL (seconds) |
| `mxheadless_oauth_password_grant_enabled` | combo-boolean | `false` | `password` grant |

## Webhooks

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_webhook_max_attempts` | numberfield | `5` | Delivery attempts before `failed` |
| `mxheadless_webhook_worker_limit` | numberfield | `50` | Default `--limit` for worker |
| `mxheadless_webhook_allow_private_urls` | combo-boolean | `false` | Dev: localhost/private IP (also relaxes TLS verify) |

## Audit

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `mxheadless_audit_enabled` | combo-boolean | `false` | Log to `mxheadless_api_log` |
| `mxheadless_audit_retention_days` | numberfield | `90` | Retention for `audit-prune.php` |
| `mxheadless_audit_log_get` | combo-boolean | `false` | Log GET requests |

## Query limits (code defaults)

`QueryParser` reads these via `getOption`. You can add them as system settings:

| Key | Default |
| --- | --- |
| `mxheadless_max_limit` | `100` |
| `mxheadless_max_offset` | `100000` |
| `mxheadless_max_fields` | `50` |
| `mxheadless_max_include_relations` | `10` |
| `mxheadless_max_include_depth` | `2` |
| `mxheadless_allowed_contexts` | `web,mgr` |

See [Limits](configuration/limits).
