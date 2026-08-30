---
title: Лимиты
description: Rate limit, размер тела, pagination и include limits mxHeadless
---

# Лимиты

## Rate limit

| Ключ | Default |
| --- | --- |
| `mxheadless.rate_limit.enabled` | `true` |
| `mxheadless.rate_limit.max_requests` | `120` |
| `mxheadless.rate_limit.window_seconds` | `60` |

Ключ учёта: IP (после trusted proxies) + identity. Заголовки ответа: `X-RateLimit-Limit`, `Remaining`, `Reset`. Исчерпание → `429` `rate_limited`.

Per-key: `rate_limit_max` / `rate_limit_window` на API key или OAuth client.

## Вход

| Ключ | Default |
| --- | --- |
| `mxheadless.max_body_bytes` | `1048576` (1 MB) |
| `mxheadless.max_uri_bytes` | `2048` |

## Query

| Ключ | Default |
| --- | --- |
| `mxheadless.max_limit` | `100` |
| `mxheadless.max_offset` | `100000` |
| `mxheadless.max_fields` | `50` |
| `mxheadless.max_include_relations` | `10` |
| `mxheadless.max_include_depth` | `2` |

List default `limit=20`. Одновременное использование `page` и `offset` даёт `422`.
