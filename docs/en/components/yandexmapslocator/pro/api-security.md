---
title: API security
description: REST security settings for YandexMapsLocator Pro
---

# API security

Free installs `yandexmapslocator_api_*` keys. The endpoint and kill switch activate after Pro. List rate limits also apply to Free `search.php`.

## Pipeline

Request → `ApiSecurityMiddleware` (enabled, Bearer, rate limit, CORS) → parser → parent validation → controller → serializers → JSON + security headers.

## Key settings

| Key | Production recommendation |
|------|----------------------------|
| `yandexmapslocator_api_enabled` | Yes. Disable during an incident |
| `yandexmapslocator_api_token` | Set a long secret; do not leave empty |
| `yandexmapslocator_api_cors_origins` | Exact frontend origins, not `*` |
| `yandexmapslocator_api_allowed_parents` | Restrict location containers |
| `yandexmapslocator_api_resource_tvs` | TV whitelist for `include=tv` |
| `yandexmapslocator_api_trust_proxy` | Yes only behind a trusted reverse proxy |
| `yandexmapslocator_api_list_rate_limit` | Tune for network load |
| `yandexmapslocator_api_geocode_rate_limit` | Geocoding costs Yandex quota |

Full list: [System settings](../settings#rest-and-limits-yandexmapslocator_api).

## Response headers

- `Content-Type: application/json; charset=utf-8`
- `X-Content-Type-Options: nosniff`
- List: `Cache-Control: public, max-age=60`
- Geocode: `Cache-Control: no-store`
- CORS only from allowlist
- `429` + `Retry-After: 60` when limit exceeded

Sample error bodies:

```json
{
  "success": false,
  "error": "Unauthorized",
  "code": "unauthorized"
}
```

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "code": "rate_limit_exceeded"
}
```

```json
{
  "success": false,
  "error": "API is disabled",
  "code": "api_disabled"
}
```

## What the API does not expose

REST does not include the Yandex Maps `apiKey` in JSON. On the snippet page the key only appears in the browser map script URL.

`where` is forbidden in REST and `search.php`.

Without Pro, `product_id` is cleared even if passed in the request.
