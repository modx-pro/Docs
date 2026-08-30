---
title: Limits
description: Rate limit, body size, pagination, and include limits in mxHeadless
---

# Limits

## Rate limit

| Key | Default |
| --- | --- |
| `mxheadless.rate_limit.enabled` | `true` |
| `mxheadless.rate_limit.max_requests` | `120` |
| `mxheadless.rate_limit.window_seconds` | `60` |

Account key: IP (after trusted proxies) + identity. Response headers: `X-RateLimit-Limit`, `Remaining`, `Reset`. Exhaustion → `429` `rate_limited`.

Per-key: `rate_limit_max` / `rate_limit_window` on API key or OAuth client.

## Input

| Key | Default |
| --- | --- |
| `mxheadless.max_body_bytes` | `1048576` (1 MB) |
| `mxheadless.max_uri_bytes` | `2048` |

## Query

| Key | Default |
| --- | --- |
| `mxheadless.max_limit` | `100` |
| `mxheadless.max_offset` | `100000` |
| `mxheadless.max_fields` | `50` |
| `mxheadless.max_include_relations` | `10` |
| `mxheadless.max_include_depth` | `2` |

List default `limit=20`. `page` and `offset` together → `422`.
