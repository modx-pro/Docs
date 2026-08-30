---
title: Limits
description: Rate limit, body size, pagination, and include limits in mxHeadless
---

# Limits

## Rate limit

| Key | Default |
| --- | --- |
| `mxheadless_rate_limit_enabled` | `true` |
| `mxheadless_rate_limit_max_requests` | `120` |
| `mxheadless_rate_limit_window_seconds` | `60` |

Account key: IP (after trusted proxies) + identity. Response headers: `X-RateLimit-Limit`, `Remaining`, `Reset`. Exhaustion → `429` `rate_limited`.

Per-key: `rate_limit_max` / `rate_limit_window` on API key or OAuth client.

## Input

| Key | Default |
| --- | --- |
| `mxheadless_max_body_bytes` | `1048576` (1 MB) |
| `mxheadless_max_uri_bytes` | `2048` |

## Query

| Key | Default |
| --- | --- |
| `mxheadless_max_limit` | `100` |
| `mxheadless_max_offset` | `100000` |
| `mxheadless_max_fields` | `50` |
| `mxheadless_max_include_relations` | `10` |
| `mxheadless_max_include_depth` | `2` |

List default `limit=20`. `page` and `offset` together → `422`.
