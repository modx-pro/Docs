---
title: CORS
description: Настройка cross-origin запросов для mxHeadless
---

# CORS

По умолчанию выключен (`mxheadless.cors.enabled=false`). Включайте, если SPA живёт на другом origin.

## Настройки

| Ключ | По умолчанию |
| --- | --- |
| `mxheadless.cors.enabled` | `false` |
| `mxheadless.cors.allowed_origins` | пусто |
| `mxheadless.cors.allowed_methods` | `GET,POST,PUT,PATCH,DELETE,OPTIONS` |
| `mxheadless.cors.allowed_headers` | Authorization, Content-Type, X-Request-ID, X-CSRF-Token, X-Context, X-API-Key, Idempotency-Key |
| `mxheadless.cors.expose_headers` | ETag, X-Request-ID, X-RateLimit-*, Idempotency-Replayed |
| `mxheadless.cors.allow_credentials` | `false` |

Origins задаются через запятую. Не сочетайте `*` с `allow_credentials=true`.

## Preflight

Matched Origin на `OPTIONS` → `204` с CORS-заголовками. Discovery отражает `data.cors.enabled` и snapshot origins.

## MiniShop3

Если корзина идёт через Web API MS3, дублируйте origins в `ms3_cors_allowed_origins`. См. [MiniShop3](/components/mxheadless/extensions/minishop3).
