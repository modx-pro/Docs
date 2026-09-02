---
title: Locations and TVs
description: YandexMapsLocator location resources, TVs, mgr geocode, chunks
---

# Locations and TVs

A map location is a **published** MODX resource. The container is set with snippet parameter `parents`.

## Free TVs

On install the **YandexMapsLocator** category and TVs are created:

| TV | Type | Purpose |
|----|------|---------|
| `yandexmaps_address` | text | Address |
| `yandexmaps_latitude` | text | Latitude |
| `yandexmaps_longitude` | text | Longitude |
| `yandexmaps_phone` | text | Phone |
| `yandexmaps_email` | text | Email |
| `yandexmaps_working_hours` | textarea | Working hours (text or JSON for Pro) |
| `yandexmaps_category` | text | Category |
| `yandexmaps_balloon_image` | image | Balloon image |
| `yandexmaps_marker_icon` | image | Map marker icon |

Rename via `yandexmapslocator_tv_*`: [settings](settings).

## Pro TVs

Pro resolver creates (if missing):

| TV | Type | Purpose |
|----|------|---------|
| `yandexmaps_timezone` | text | IANA timezone for the location (`Europe/Moscow`, `Asia/Omsk`). Empty → network `yandexmapslocator_timezone` |
| `ms3_product_id` | number | Single MiniShop3 product ID (legacy) |
| `ms3_product_ids` | text | Multiple IDs: `25,26` or JSON `[25,26]`. When set, wins over `ms3_product_id` |
| `yandexmaps_amenities` | text | Comma-separated amenity tags (`wifi,card,parking`) |
| `yandexmaps_brand` | text | Brand for `brand` filter |

TVs are not bound to templates automatically. Assign them to the location template like other locator TVs.

See [MiniShop3](pro/minishop3), [Open now](pro/working-now).

## Geocode in the manager

Free plugin on `OnDocFormRender` adds "Get coordinates" under the address field: reads the address TV and fills coordinates. Requires `yandexmapslocator_api_key`.

Pro adds "Check schedule" under working hours TV: JSON via formatter, open-now status, next open/close.

## Free chunks

| Chunk | Purpose |
|-------|---------|
| `yandexmapslocator.outer` | Locator wrapper |
| `yandexmapslocator.search` | Search form |
| `yandexmapslocator.store` | Location card |
| `yandexmapslocator.empty` | Empty result |
| `yandexmapslocator.error` | Error |

Pro ships no chunks. UI and `data-yml-*`: [Frontend](frontend).

## Working hours

Plain text in `yandexmaps_working_hours` shows in the card.

For "open now" and Pro badges you need **JSON** and the correct timezone (location TV or `yandexmapslocator_timezone`). Otherwise the location is closed for `working_now`. Details: [Open now](pro/working-now).
