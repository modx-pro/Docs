---
title: Locations and TVs
description: YandexMapsLocator location resources, TVs, manager geocoding, chunks
---

# Locations and TVs

A location on the map is a **published** MODX resource. Set the container with the snippet `parents` parameter.

## Free TVs

On install, the **YandexMapsLocator** category and TVs are created:

| TV | Type | Purpose |
|----|-----|------------|
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

## Pro TV

| TV | Type | Purpose |
|----|-----|------------|
| `ms3_product_id` | number | MiniShop3 product resource ID for `minishop_product` filter |

See [MiniShop3](pro/minishop3).

## Geocoding in the manager

The Free plugin on `OnDocFormRender` adds a button: reads the address TV and fills in coordinates. Requires `yandexmapslocator_api_key`.

## Free chunks

| Chunk | Purpose |
|------|------------|
| `yandexmapslocator.outer` | Locator wrapper |
| `yandexmapslocator.search` | Search form |
| `yandexmapslocator.store` | Location card |
| `yandexmapslocator.empty` | Empty result |
| `yandexmapslocator.error` | Error |

Pro does not ship chunks. UI and `data-yml-*`: [Frontend](frontend).

## Working hours

Plain text in `yandexmaps_working_hours` shows on the card.

For open-now status and Pro badges you need **JSON** and the correct `yandexmapslocator_timezone`. Otherwise the location is closed for `working_now`. Details: [Open now](pro/working-now).
