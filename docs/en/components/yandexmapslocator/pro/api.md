---
title: REST API v1
description: 'YandexMapsLocator Pro: api.php locations and geocode'
---

# REST API v1

**Pro only** (capability `pro`). Same-site snippet AJAX in Free uses `search.php`: [Frontend](../frontend).

Base URL:

```text
/assets/components/yandexmapslocatorpro/api.php
```

Set routes with query `route=` (more reliable):

| Route | Description |
|-------|-------------|
| `?route=api/v1/locations` | Location list |
| `?route=api/v1/locations/{id}` | Detail |
| `?route=api/v1/geocode` | Geocoding |
| `?route=api/v1/meta` | Capabilities, fields, filters, endpoints |

PATH_INFO like `api.php/api/v1/...` often returns HTML 404 on shared hosting. Use `route=`.

## Authentication

Empty `yandexmapslocator_api_token` means public read (handy on dev). On production set a token:

```http
Authorization: Bearer YOUR_TOKEN
```

## GET locations

| Param | Description |
|-------|-------------|
| `parents` | Comma-separated parent IDs (max 20) |
| `limit` | Default 20, max 100 |
| `offset` | max 10000 |
| `fields` | Comma-separated field whitelist |
| `include` | `resource`, `tv` (`tv` requires `resource`) |
| `sortby` | `pagetitle`, `distance`, `menuindex`, `id`, `createdon` |
| `sortdir` | `ASC` / `DESC` |
| `lat`, `lng` | Coordinates for distance |
| `address` | Address (geocoded) |
| `radius` | km |
| `filters`, `category` | Locator filters |
| `amenity` / `amenities` | Comma-separated amenity tags (works without `filters=amenity`) |
| `brand` | Filter by TV `yandexmaps_brand` |
| `working_now` | `1` / `true` — open only (requires Pro) |
| `context` | MODX context |
| `product_id` | Pro: MiniShop3 filter |

`where` → `400 where_not_allowed`.

Default short set: `id`, `resource_id`, `title`, `address`, `coordinates`. For `distance`, `is_open_now`, `status_hint`, `closes_at`, etc. list them in `fields`.

### Request examples

Nearest to coordinates:

```text
?route=api/v1/locations&parents=5&lat=54.98&lng=73.36&radius=15&sortby=distance&fields=id,title,address,distance_formatted,coordinates
```

```json
{
  "success": true,
  "data": [
    {
      "id": 12,
      "title": "Магазин на Ленина",
      "address": "Омск, ул. Ленина, 25",
      "distance_formatted": "1.2 км",
      "coordinates": { "lat": 54.9893, "lon": 73.3682 }
    }
  ],
  "meta": { "total": 8, "limit": 20, "offset": 0 }
}
```

By address:

```text
?route=api/v1/locations&parents=5&address=Омск,%20Ленина%2025&sortby=distance&limit=10
```

Default response (short field set):

```json
{
  "success": true,
  "data": [
    {
      "id": 12,
      "resource_id": 12,
      "title": "Магазин",
      "address": "Москва",
      "coordinates": { "lat": 55.75, "lon": 37.62 }
    }
  ],
  "meta": { "total": 42, "limit": 10, "offset": 0 }
}
```

With category and Pro status:

```text
?route=api/v1/locations&parents=5&category=аптека&filters=category&fields=id,title,category,is_open_now
```

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "title": "Аптека №3",
      "category": "аптека",
      "is_open_now": true
    }
  ],
  "meta": { "total": 4, "limit": 20, "offset": 0 }
}
```

Open only:

```text
?route=api/v1/locations&parents=5&filters=working_now&fields=id,title,is_open_now,status_hint,closes_at,working_hours_schedule
```

```json
{
  "success": true,
  "data": [
    {
      "id": 15,
      "title": "Аптека №3",
      "is_open_now": true,
      "status_hint": "Закроется в 21:00",
      "closes_at": "2026-09-01T21:00:00+06:00",
      "working_hours_schedule": {
        "mon": ["09:00-21:00"],
        "tue": ["09:00-21:00"],
        "wed": ["09:00-21:00"],
        "thu": ["09:00-21:00"],
        "fri": ["09:00-22:00"],
        "sat": ["10:00-22:00"],
        "sun": ["10:00-20:00"]
      }
    }
  ],
  "meta": { "total": 2, "limit": 20, "offset": 0 }
}
```

By amenity:

```text
?route=api/v1/locations&parents=5&amenity=wifi,card&fields=id,title,amenities
```

With resource and TVs (TV names from `yandexmapslocator_api_resource_tvs`):

```text
?route=api/v1/locations&parents=5&include=resource,tv&fields=id,title,resource
```

```json
{
  "success": true,
  "data": [
    {
      "id": 12,
      "title": "Магазин",
      "resource": {
        "id": 12,
        "pagetitle": "Магазин",
        "longtitle": "",
        "description": "",
        "uri": "stores/shop-1/",
        "alias": "shop-1",
        "parent": 5,
        "tv": {
          "metro_station": "Площадь Ленина"
        }
      }
    }
  ],
  "meta": { "total": 1, "limit": 20, "offset": 0 }
}
```

Single location:

```text
?route=api/v1/locations/12&fields=id,title,address,phone,email,coordinates,is_open_now
```

```json
{
  "success": true,
  "data": {
    "id": 12,
    "title": "Магазин на Ленина",
    "address": "Омск, ул. Ленина, 25",
    "phone": "+7 3812 00-00-00",
    "email": "shop@example.com",
    "coordinates": { "lat": 54.9893, "lon": 73.3682 },
    "is_open_now": false
  }
}
```

Detail has no `meta`. Unpublished or foreign resource → **404**:

```json
{
  "success": false,
  "error": "Location not found",
  "code": "not_found"
}
```

### Common list errors

`where` in query:

```json
{
  "success": false,
  "error": "where_not_allowed",
  "code": "where_not_allowed"
}
```

Invalid Bearer (token set in settings):

```json
{
  "success": false,
  "error": "Unauthorized",
  "code": "unauthorized"
}
```

## GET geocode

| Param | Description |
|-------|-------------|
| `address` | String, max 500 chars |

Rate limit: `yandexmapslocator_api_geocode_rate_limit` (default 30/min/IP).

```text
?route=api/v1/geocode&address=Омск,%20ул.%20Ленина,%2025
```

```json
{
  "success": true,
  "data": [
    {
      "latitude": 54.9893,
      "longitude": 73.3682
    }
  ]
}
```

Address not recognized: `"data": []`. Empty `address` → `400 empty_address`.

```javascript
const url = new URL('/assets/components/yandexmapslocatorpro/api.php', location.origin);
url.searchParams.set('route', 'api/v1/geocode');
url.searchParams.set('address', 'Омск, ул. Ленина, 25');

const res = await fetch(url, {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
});
const { data } = await res.json();
```

## GET meta

Discovery for headless clients: capabilities, field whitelist, registered filters, endpoints, network settings.

```text
?route=api/v1/meta
```

## Headless

Location list:

```javascript
const base = 'https://example.com/assets/components/yandexmapslocatorpro/api.php';

const res = await fetch(`${base}?route=api/v1/locations&parents=5&limit=20`, {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
});
const json = await res.json();
```

Nuxt 3 server route (token server-side only):

```ts
// server/api/locations.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const base = useRuntimeConfig().locatorApiBase;
  const token = useRuntimeConfig().locatorApiToken;

  const url = new URL(base);
  url.searchParams.set('route', 'api/v1/locations');
  if (query.parents) url.searchParams.set('parents', String(query.parents));
  if (query.limit) url.searchParams.set('limit', String(query.limit));

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  return await $fetch(url.toString(), { headers });
});
```

CORS: `yandexmapslocator_api_cors_origins` (`https://app.example.com`, not `*` on production).

## Location fields

Base: `id`, `resource_id`, `title`, `address`, `latitude`, `longitude`, `coordinates`, `phone`, `email`, `category`, `working_hours`, `working_hours_formatted`, `working_hours_compact`, `distance`, `distance_meters`, `distance_km`, `distance_formatted`, `url`, `context_key`, `balloon_image`, `marker_icon`, `resource`.

Pro: `is_open_now`, `status_hint`, `closes_at`, `next_open_at`, `working_hours_schedule`, `amenities`, `brand`, `timezone`.

## Kill switch

`yandexmapslocator_api_enabled = No` → `503` on REST:

```json
{
  "success": false,
  "error": "API is disabled",
  "code": "api_disabled"
}
```

On-page locator falls back to `search.php`.

See [API security](api-security).
