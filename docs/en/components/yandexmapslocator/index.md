---
title: YandexMapsLocator
description: 'Store locator on Yandex Maps for MODX 3. Free: map and search. Pro: open now, MiniShop3, CSV, and REST'
author: Ibochkarev
logo: https://modstore.pro/assets/extras/yandexmapslocator/logo.png
modstore: https://modstore.pro/packages/utilities/yandexmapslocator
categories: utilities
items: [
  {
    text: 'Getting started',
    link: 'quick-start',
    items: [
      { text: 'Quick start', link: 'quick-start' },
      { text: 'Free and Pro', link: 'free-vs-pro' },
      { text: 'System settings', link: 'settings' },
    ],
  },
  {
    text: 'Site integration',
    link: 'integration',
    items: [
      { text: 'Locations and TVs', link: 'integration' },
      { text: 'Frontend', link: 'frontend' },
      { text: 'MODX contexts', link: 'contexts' },
      { text: 'YandexMapsLocator snippet', link: 'snippets/YandexMapsLocator' },
    ],
  },
  {
    text: 'Pro',
    link: 'pro/',
    items: [
      { text: 'What Pro adds', link: 'pro/' },
      { text: 'Open now', link: 'pro/working-now' },
      { text: 'MiniShop3', link: 'pro/minishop3' },
      { text: 'CSV in the manager', link: 'pro/manager' },
      { text: 'REST API v1', link: 'pro/api' },
      { text: 'API security', link: 'pro/api-security' },
    ],
  },
  {
    text: 'For developers',
    link: 'events',
    items: [
      { text: 'Events', link: 'events' },
      { text: 'Extension API', link: 'extension-api' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

# YandexMapsLocator

Store network locator on [Yandex Maps](https://developer.tech.yandex.ru/) for MODX Revolution 3. A location is a published resource with TVs: address, coordinates, phone, working hours. On the site you get a list, map, address search, geolocation, and distance sorting.

Two packages, one docs set. **Free** is the locator core. **Pro** installs on top of Free and extends the same UI, plus CSV in the manager and REST. Pro does not duplicate the snippet or chunks.

## Free and Pro

| | Free | Pro |
|---|------|-----|
| Map, list, search, geolocation | yes | yes |
| Categories, `return=chunks/data/json` | yes | yes |
| `search.php` (same-site AJAX) | yes | fallback when REST is off |
| "Open now" filter, badges, TZ per location | - | yes |
| amenity / brand filters | - | yes |
| MiniShop3: "pick up product here" map | - | yes |
| CSV, bulk geocode in CMP | - | yes |
| REST API v1 (`locations`, `geocode`, `meta`) | - | yes |

Details: [Free and Pro](free-vs-pro).

## Free features

- Locations as MODX resources, TVs created on install
- `YandexMapsLocator` snippet: list, map, search form
- Geolocation ("My location" / "All locations"), route link
- Marker clustering, custom icons and balloon image
- Category filter, sort by `distance`
- `return` modes: HTML, placeholders, JSON
- "Get coordinates" button on the resource form
- Extension API for third-party extras and Pro
- Multi-context: `context` parameter, allowlist in settings

## What Pro adds

On the same locator:

- `working_now` filter, "Open" / "Closed" badges, "Open only" button
- fields `is_open_now`, `status_hint`, `closes_at`, `next_open_at`, `working_hours_schedule`
- timezone per location (`yandexmaps_timezone`) or network `yandexmapslocator_timezone`
- `amenity` / `brand` filters
- on a MiniShop3 product page only locations with that product (`productId` + `ms3_product_ids` / `ms3_product_id`)

In the manager: CSV, bulk geocode, schedule preview.

For Nuxt, Next, and other clients: REST v1 (`locations`, `geocode`, `meta`) with CORS and Bearer.

Sections: [What Pro adds](pro/).

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.2-8.4 |
| MySQL / MariaDB | InnoDB |
| [pdoTools](/en/components/pdotools/) | Fenom chunks |
| [Yandex Maps](https://developer.tech.yandex.ru/) API key | JS API and HTTP Geocoder |

Pro 1.1.0-pl2 requires Free ≥ 1.0.0-pl7 (`yandexmapslocator >=1.0.0-pl7 <2.0.0`). Matrix: [Free and Pro](free-vs-pro).

## Installation

### Free

1. [Connect the ModStore repository](https://modstore.pro/info/connection).
2. **Extras → Installer** → **YandexMapsLocator** → **Download** → **Install**.
3. Set `yandexmapslocator_api_key`.
4. Create a container and child location resources, fill TVs.
5. Insert the snippet: [Quick start](quick-start).

Package: [modstore.pro](https://modstore.pro/packages/utilities/yandexmapslocator).

### Pro

1. Install Free.
2. Install **YandexMapsLocatorPro**.
3. Set `yandexmapslocator_timezone` for the network (for "open now").
4. If needed: `api_token`, CORS, CSV in **Components → YandexMapsLocator Pro**.

Pro package: [modstore.pro](https://modstore.pro/packages/utilities/yandexmapslocatorpro).

## Quick links

| Section | Description |
|---------|-------------|
| [Quick start](quick-start) | Key, locations, snippet |
| [Free and Pro](free-vs-pro) | Feature matrix |
| [Snippet](snippets/YandexMapsLocator) | Parameters and examples |
| [Pro](pro/) | REST, CSV, MiniShop3, open now |
| [FAQ](faq) | Common errors |
