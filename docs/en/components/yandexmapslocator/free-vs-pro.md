---
title: Free and Pro
description: Feature matrix for YandexMapsLocator Free and YandexMapsLocatorPro
---

# Free and Pro

Two packages. **Free** covers the map, list, search, and geolocation. **Pro** on the same UI adds open-now status, a MiniShop3 product pickup map, CSV in the manager, and REST for external clients. Pro cannot be installed without Free.

## Matrix

| Feature | Free | Pro |
|---------|------|-----|
| Map + list + address search | yes | yes (same UI) |
| Geolocation, "All locations", route | yes | yes |
| `category` filter, sort by `distance` | yes | yes |
| `return=chunks` / `data` / `json` | yes | yes |
| `search.php` (same-origin AJAX) | yes | fallback when REST is disabled |
| Geocode button in mgr | yes | yes |
| Extension API (contract for extras) | yes | uses Free |
| `working_now` filter | - | yes |
| "Open" / "Closed" badge + "Open only" | - | yes |
| Fields `is_open_now`, `working_hours_schedule` | - | yes |
| MiniShop3: "where to pick up this product" map | - | yes (`ms3_product_id` + `productId`) |
| CSV import/export (CMP) | - | yes |
| REST API v1 (`api.php`, CORS, Bearer, `fields`/`include`) | - | yes |

## What Pro adds on the site

Same Free snippet and markup. Pro loads `pro.js` and its filters:

- "Open" / "Closed" badges on location cards
- "Open only" button and `working_now` filter
- `{$is_open_now}` placeholder in the location chunk
- on a MiniShop3 product page, a map with only locations that stock that product (`productId` + TV `ms3_product_id`)

In the manager: CSV (**Components → YandexMapsLocator Pro**).

REST v1 (`api.php`) with CORS and Bearer for Nuxt, Next, and similar clients is separate. Free `return=json` and `search.php` do not replace it: no CORS, `fields`/`include`, or Bearer.

## When Free is enough

You need a map, search, and categories. You do not need open-now status, a product pickup map on the product page, or bulk CSV.

## Install order

1. YandexMapsLocator (Free)
2. YandexMapsLocatorPro

Free installs `yandexmapslocator_api_*` keys. The REST endpoint and kill switch `api_enabled` activate after Pro is installed.

## Compatibility

| Free | Pro |
|------|-----|
| 1.0.x | 1.0.x |

Pro: `yandexmapslocator >=1.0.0 <2.0.0`.

Next: [What Pro adds](pro/), [REST API](pro/api), [Open now](pro/working-now).
