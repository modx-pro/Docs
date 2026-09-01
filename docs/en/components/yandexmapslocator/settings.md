---
title: System settings
description: 'yandexmapslocator namespace keys: map, TVs, REST'
---

# System settings

Namespace: **yandexmapslocator**. In the database keys use prefix `yandexmapslocator_`.

**System → System Settings** → filter `yandexmapslocator`.

All keys are installed by **Free**. REST keys (`api_*`) activate after **Pro**. Rate limit from the same group applies to Free `search.php` too.

## Map and search (`yandexmapslocator_main`)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `yandexmapslocator_api_key` | text | *(empty)* | JS API and Geocoder key |
| `yandexmapslocator_default_zoom` | number | `10` | Map zoom |
| `yandexmapslocator_default_latitude` | text | `55.751244` | Center latitude |
| `yandexmapslocator_default_longitude` | text | `37.618423` | Center longitude |
| `yandexmapslocator_cluster` | boolean | Yes | Marker clustering |
| `yandexmapslocator_default_radius` | number | `50` | Search radius, km (when snippet `radius=0`) |
| `yandexmapslocator_distance_unit` | list | `km` | Distance unit: `km` or `m` |
| `yandexmapslocator_default_balloon_image` | text | *(empty)* | Fallback balloon image |
| `yandexmapslocator_marker_icon_size` | text | `32,32` | Custom marker icon size, px |
| `yandexmapslocator_default_context` | text | `web` | Fallback context. Also Pro CSV export context |
| `yandexmapslocator_timezone` | text | `Europe/Moscow` | IANA network timezone (fallback) when the location has no TV `yandexmaps_timezone`. Required for Pro `working_now` / `is_open_now` |
| `yandexmapslocator_allowed_contexts` | text | *(empty)* | Comma-separated context key allowlist. Empty: any existing context |

## TV names (`yandexmapslocator_tvs`)

| Key | Default |
|-----|---------|
| `yandexmapslocator_tv_address` | `yandexmaps_address` |
| `yandexmapslocator_tv_latitude` | `yandexmaps_latitude` |
| `yandexmapslocator_tv_longitude` | `yandexmaps_longitude` |
| `yandexmapslocator_tv_phone` | `yandexmaps_phone` |
| `yandexmapslocator_tv_email` | `yandexmaps_email` |
| `yandexmapslocator_tv_working_hours` | `yandexmaps_working_hours` |
| `yandexmapslocator_tv_category` | `yandexmaps_category` |
| `yandexmapslocator_tv_balloon_image` | `yandexmaps_balloon_image` |
| `yandexmapslocator_tv_marker_icon` | `yandexmaps_marker_icon` |

Change the setting if TVs on the site already use different names. TV list: [Locations and TVs](integration).

## REST and limits (`yandexmapslocator_api`)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `yandexmapslocator_api_enabled` | boolean | Yes | Pro REST kill switch. Off → 503. On-page locator falls back to `search.php` |
| `yandexmapslocator_api_max_limit` | number | `100` | Max `limit` in REST |
| `yandexmapslocator_api_max_offset` | number | `10000` | Max `offset` |
| `yandexmapslocator_api_max_parents` | number | `20` | Max parents per request |
| `yandexmapslocator_api_geocode_rate_limit` | number | `30` | Geocode requests per minute per IP |
| `yandexmapslocator_api_list_rate_limit` | number | `120` | List requests per minute per IP (and limit for `search.php`) |
| `yandexmapslocator_api_cors_origins` | text | *(empty)* | Comma-separated origins. Not `*` on production |
| `yandexmapslocator_api_token` | text | *(empty)* | Bearer token. Empty: public REST (dev only) |
| `yandexmapslocator_api_resource_tvs` | text | *(empty)* | Allowed TVs in `include=tv` |
| `yandexmapslocator_api_allowed_parents` | text | *(empty)* | Parent ID allowlist. Empty: any |
| `yandexmapslocator_api_trust_proxy` | boolean | No | Trust `X-Forwarded-For` for rate limit |

Details: [API security](pro/api-security).

## Pro

Pro has **no** own runtime settings in System Settings. Use Free keys above. TVs created by the Pro resolver: `yandexmaps_timezone`, `ms3_product_id`, `ms3_product_ids`, `yandexmaps_amenities`, `yandexmaps_brand`. List: [Locations and TVs](integration).
