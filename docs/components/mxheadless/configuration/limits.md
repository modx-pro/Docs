---
title: Лимиты
description: Rate limit, размер тела, pagination и include limits mxHeadless
---

# Лимиты

## Rate limit

| Ключ | Default |
| --- | --- |
| `mxheadless_rate_limit_enabled` | `true` |
| `mxheadless_rate_limit_max_requests` | `120` |
| `mxheadless_rate_limit_window_seconds` | `60` |

Ключ учёта: IP (после trusted proxies) + identity. Заголовки ответа: `X-RateLimit-Limit`, `Remaining`, `Reset`. Исчерпание → `429` `rate_limited`.

Per-key: `rate_limit_max` / `rate_limit_window` на API key или OAuth client.

## Вход

| Ключ | Default |
| --- | --- |
| `mxheadless_max_body_bytes` | `1048576` (1 MB) |
| `mxheadless_max_uri_bytes` | `2048` |

## Query

| Ключ | Default |
| --- | --- |
| `mxheadless_max_limit` | `100` |
| `mxheadless_max_offset` | `100000` |
| `mxheadless_max_fields` | `50` |
| `mxheadless_max_include_relations` | `10` |
| `mxheadless_max_include_depth` | `2` |

List default `limit=20`. Одновременное использование `page` и `offset` даёт `422`.
