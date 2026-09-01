---
title: Free and Pro
description: Feature matrix for YandexMapsLocator Free and YandexMapsLocatorPro
---

# Free and Pro

Two packages. **Free** covers the map, list, address search, and geolocation. **Pro** adds "open now", MiniShop3 pickup map, CSV in the manager, and REST for external clients on the same UI. Pro requires Free.

## Matrix

| Feature | Free | Pro |
|---------|------|-----|
| Map + list + address search | yes | yes (same UI) |
| Geolocation, "All locations", route | yes | yes |
| `category` filter, sort by `distance` | yes | yes |
| `return=chunks` / `data` / `json` | yes | yes |
| `search.php` (same-origin AJAX) | yes | fallback when REST is off |
| Geocode button in mgr | yes | yes |
| Extension API (contract for extras) | yes | uses Free |
| REST API v1 (`api.php`, CORS, Bearer, `fields`/`include`) | - | yes |
| `GET …/meta` (filters, apiFields) | - | yes |
| `working_now` filter | - | yes |
| "Open" / "Closed" badge + "Open only" | - | yes |
| Fields `is_open_now`, `status_hint`, `closes_at`, `next_open_at`, `working_hours_schedule` | - | yes |
| Per-store TZ (`yandexmaps_timezone`) | - | yes |
| `amenity`, `brand` filters | - | yes |
| CSV import/export + bulk geocode (CMP) | - | yes |
| MiniShop3: "pick up this product here" map | - | yes (`ms3_product_ids` / `ms3_product_id` + `productId`) |

## Positioning

**Free** is an on-site locator: locations as MODX resources, map, search, categories. Enough for a store network without headless or bulk import.

**Pro** adds REST (including meta), "open now" with per-location TZ, CSV and bulk geocode in CMP, MiniShop3 on the product page, and UI add-ons on top of Free.

`return=json` and `search.php` in Free do not replace REST: no CORS for foreign origins, no `fields`/`include`, no Bearer. Headless (Nuxt/Next) requires Pro.

## Timezone (`working_now`)

Schedule in TV `yandexmaps_working_hours` is local store time, not server UTC.

1. On the location: TV `yandexmaps_timezone` (IANA), e.g. `Europe/Moscow` or `Asia/Omsk`.
2. Network fallback: Free setting `yandexmapslocator_timezone` (default `Europe/Moscow`).

This drives the `working_now` filter, badges, and fields `is_open_now`, `status_hint`, `closes_at`, `next_open_at`.

For `working_now` / `is_open_now` you need JSON in the TV. Plain text (including "day off") shows in the card, but "open now" is not computed: the location counts as closed.

Details: [Open now](pro/working-now).

## amenity and brand filters

REST and `search.php`: `amenity=wifi,card` (or `amenities`) and `brand=…`. You can pass these without explicit `filters=amenity` / `filters=brand`.

On the location: TV `yandexmaps_amenities` (comma-separated) and `yandexmaps_brand`. In the snippet: `amenities` / `amenity`, `brand`.

## MiniShop3 (Pro)

Free shows the whole network. On a MiniShop3 product page you usually need a map with only locations where the product is available.

On the location: TV `ms3_product_ids` (comma-separated IDs or JSON array) or legacy `ms3_product_id`. If `ms3_product_ids` is set, it wins over the single ID. Details: [MiniShop3](pro/minishop3).

## Pro CMP

**Components → YandexMapsLocator Pro**: CSV import and export by container ID, bulk geocode, schedule preview on the location form.

CSV columns (14): `id`, `pagetitle`, `address`, `latitude`, `longitude`, `phone`, `email`, `category`, `working_hours`, `timezone`, `ms3_product_id`, `ms3_product_ids`, `amenities`, `brand`.

Export: UTF-8 with BOM. Import from mgr is sent to the server as base64 (Cyrillic survives POST). See [CSV in the manager](pro/manager).

## REST and API settings

Keys `yandexmapslocator_api_*` come from Free (shared rate limit for `search.php`). Endpoint and kill switch `api_enabled` work after Pro is installed.

Empty `api_token` means public REST (handy on a local stack). On production set a Bearer token.

```text
/assets/components/yandexmapslocatorpro/api.php?route=api/v1/locations
/assets/components/yandexmapslocatorpro/api.php?route=api/v1/meta
```

PATH_INFO like `api.php/v1/...` often returns HTML 404 on shared hosting. Use query `route=`.

## Compatibility

| Free | Pro |
|------|-----|
| 1.0.0-pl7+ | 1.1.0-pl2 |
| 1.0.x | 1.0.x / 1.1.x |

Pro 1.1.0-pl2 targets Free ≥ 1.0.0-pl7. Transport constraint: `yandexmapslocator >=1.0.0-pl7 <2.0.0`.

Next: [What Pro adds](pro/), [REST API](pro/api), [Open now](pro/working-now).
