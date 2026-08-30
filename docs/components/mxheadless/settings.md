---
title: Системные настройки
description: Справочник ключей mxheadless в System Settings MODX
---

# Системные настройки

Namespace: `mxheadless`. Ключи через подчёркивание (`mxheadless_cors_enabled`), без точек.

С **1.0.42** при upgrade пакет переносит значения со старых dotted-ключей (`mxheadless.cors.enabled`) на новые.

## API

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_api_prefix` | textfield | `/api` | Публичный префикс до `/v1` |

## Основные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_enabled` | combo-boolean | `true` | Kill switch. При `false` доступны только `GET /` и `GET /health`. Остальное → `503` (`service_disabled`) |
| `mxheadless_debug` | combo-boolean | `false` | Детали исключений в problem+json (только dev) |
| `mxheadless_swagger_enabled` | combo-boolean | `true` | Swagger UI на `GET /docs`. OpenAPI JSON доступен и при `false` |

## Кэш

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_cache_enabled` | combo-boolean | `true` | HTTP-кэш anonymous GET/HEAD с ETag |
| `mxheadless_cache_ttl` | numberfield | `300` | `max-age` публичных ответов (секунды) |

## Rate limit

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_rate_limit_enabled` | combo-boolean | `true` | Лимит по identity/IP |
| `mxheadless_rate_limit_max_requests` | numberfield | `120` | Запросов в окне |
| `mxheadless_rate_limit_window_seconds` | numberfield | `60` | Длина окна (секунды) |

Per-key overrides: колонки `rate_limit_max`, `rate_limit_window` в `mxheadless_api_keys` и `mxheadless_oauth_clients`.

## CORS

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_cors_enabled` | combo-boolean | `false` | CORS для cross-origin SPA |
| `mxheadless_cors_allowed_origins` | textarea | пусто | Origins через запятую или `*` |
| `mxheadless_cors_allowed_methods` | textfield | `GET,POST,PUT,PATCH,DELETE,OPTIONS` | Методы preflight |
| `mxheadless_cors_allowed_headers` | textfield | `Authorization,Content-Type,X-Request-ID,X-CSRF-Token,X-Context,X-API-Key,Idempotency-Key` | Разрешённые заголовки |
| `mxheadless_cors_expose_headers` | textfield | `ETag,X-Request-ID,X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Idempotency-Replayed` | Expose-Headers для JS |
| `mxheadless_cors_allow_credentials` | combo-boolean | `false` | Не сочетайте с origins=`*` |

Подробнее: [CORS](configuration/cors).

## Безопасность и idempotency

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_max_body_bytes` | numberfield | `1048576` | Макс. размер тела (1 MB) |
| `mxheadless_max_uri_bytes` | numberfield | `2048` | Макс. длина URI |
| `mxheadless_trusted_proxies` | textarea | пусто | IP прокси для `X-Forwarded-For` |
| `mxheadless_csrf_enabled` | combo-boolean | `true` | CSRF для мутаций по сессии |
| `mxheadless_idempotency_enabled` | combo-boolean | `true` | `Idempotency-Key` на POST |
| `mxheadless_idempotency_ttl` | numberfield | `86400` | TTL кэша idempotency (секунды) |

## OAuth

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_oauth_enabled` | combo-boolean | `false` | `POST /auth/token` |
| `mxheadless_oauth_token_ttl` | numberfield | `3600` | TTL `mxt_*` (секунды) |
| `mxheadless_oauth_password_grant_enabled` | combo-boolean | `false` | Grant `password` |

## Webhooks

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_webhook_max_attempts` | numberfield | `5` | Попыток доставки до `failed` |
| `mxheadless_webhook_worker_limit` | numberfield | `50` | Default `--limit` для worker |
| `mxheadless_webhook_allow_private_urls` | combo-boolean | `false` | Dev: localhost/private IP (также ослабляет TLS verify) |

## Audit

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mxheadless_audit_enabled` | combo-boolean | `false` | Журнал в `mxheadless_api_log` |
| `mxheadless_audit_retention_days` | numberfield | `90` | Retention для `audit-prune.php` |
| `mxheadless_audit_log_get` | combo-boolean | `false` | Логировать GET |

## Лимиты query (дефолты в коде)

`QueryParser` читает через `getOption`. Можно добавить как system settings:

| Ключ | По умолчанию |
| --- | --- |
| `mxheadless_max_limit` | `100` |
| `mxheadless_max_offset` | `100000` |
| `mxheadless_max_fields` | `50` |
| `mxheadless_max_include_relations` | `10` |
| `mxheadless_max_include_depth` | `2` |
| `mxheadless_allowed_contexts` | `web,mgr` |

См. [Лимиты](configuration/limits).
