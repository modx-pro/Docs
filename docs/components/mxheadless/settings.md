---
title: Системные настройки
description: Справочник ключей mxheadless в System Settings MODX
---

# Системные настройки

Namespace: `mxheadless`. Ключи в БД с точками, как в transport: `mxheadless.api.prefix`.

## API

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.api.prefix` | textfield | `/api` | Публичный префикс до `/v1` |

## Основные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.enabled` | combo-boolean | `true` | Kill switch. При `false` доступны только `GET /` и `GET /health`. Остальное → `503` (`service_disabled`) |
| `mxheadless.debug` | combo-boolean | `false` | Детали исключений в problem+json (только dev) |
| `mxheadless.swagger.enabled` | combo-boolean | `true` | Swagger UI на `GET /docs`. OpenAPI JSON доступен и при `false` |

## Кэш

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.cache.enabled` | combo-boolean | `true` | HTTP-кэш anonymous GET/HEAD с ETag |
| `mxheadless.cache_ttl` | numberfield | `300` | `max-age` публичных ответов (секунды) |

## Rate limit

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.rate_limit.enabled` | combo-boolean | `true` | Лимит по identity/IP |
| `mxheadless.rate_limit.max_requests` | numberfield | `120` | Запросов в окне |
| `mxheadless.rate_limit.window_seconds` | numberfield | `60` | Длина окна (секунды) |

Per-key overrides: колонки `rate_limit_max`, `rate_limit_window` в `mxheadless_api_keys` и `mxheadless_oauth_clients`.

## CORS

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.cors.enabled` | combo-boolean | `false` | CORS для cross-origin SPA |
| `mxheadless.cors.allowed_origins` | textarea | пусто | Origins через запятую или `*` |
| `mxheadless.cors.allowed_methods` | textfield | `GET,POST,PUT,PATCH,DELETE,OPTIONS` | Методы preflight |
| `mxheadless.cors.allowed_headers` | textfield | `Authorization,Content-Type,X-Request-ID,X-CSRF-Token,X-Context,X-API-Key,Idempotency-Key` | Разрешённые заголовки |
| `mxheadless.cors.expose_headers` | textfield | `ETag,X-Request-ID,X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Idempotency-Replayed` | Expose-Headers для JS |
| `mxheadless.cors.allow_credentials` | combo-boolean | `false` | Не сочетайте с origins=`*` |

Подробнее: [CORS](configuration/cors).

## Безопасность и idempotency

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.max_body_bytes` | numberfield | `1048576` | Макс. размер тела (1 MB) |
| `mxheadless.max_uri_bytes` | numberfield | `2048` | Макс. длина URI |
| `mxheadless.trusted_proxies` | textarea | пусто | IP прокси для `X-Forwarded-For` |
| `mxheadless.idempotency.enabled` | combo-boolean | `true` | `Idempotency-Key` на POST |
| `mxheadless.idempotency_ttl` | numberfield | `86400` | TTL кэша idempotency (секунды) |

CSRF для сессий читается как `mxheadless.csrf.enabled` (default `true`). В transport ключ может отсутствовать. Задайте его вручную при необходимости.

## OAuth

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.oauth.enabled` | combo-boolean | `false` | `POST /auth/token` |
| `mxheadless.oauth.token_ttl` | numberfield | `3600` | TTL `mxt_*` (секунды) |
| `mxheadless.oauth.password_grant_enabled` | combo-boolean | `false` | Grant `password` |

## Webhooks

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.webhook.max_attempts` | numberfield | `5` | Попыток доставки до `failed` |
| `mxheadless.webhook.worker_limit` | numberfield | `50` | Default `--limit` для worker |
| `mxheadless.webhook.allow_private_urls` | combo-boolean | `false` | Dev: localhost/private IP (также ослабляет TLS verify) |

## Audit

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless.audit.enabled` | combo-boolean | `false` | Журнал в `mxheadless_api_log` |
| `mxheadless.audit.retention_days` | numberfield | `90` | Retention для `audit-prune.php` |
| `mxheadless.audit.log_get` | combo-boolean | `false` | Логировать GET |

## Лимиты query (дефолты в коде)

`QueryParser` читает через `getOption`. Можно добавить как system settings:

| Ключ | По умолчанию |
| --- | --- |
| `mxheadless.max_limit` | `100` |
| `mxheadless.max_offset` | `100000` |
| `mxheadless.max_fields` | `50` |
| `mxheadless.max_include_relations` | `10` |
| `mxheadless.max_include_depth` | `2` |
| `mxheadless.allowed_contexts` | `web,mgr` |

См. [Лимиты](configuration/limits).
