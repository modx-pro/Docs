---
title: YandexMapsLocator
description: 'Yandex Maps store locator for MODX 3. Free: map and search. Pro: open now, MiniShop3, CSV, and REST'
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

Store locator on [Yandex Maps](https://developer.tech.yandex.ru/) for MODX Revolution 3. One location is a published resource with TVs: address, coordinates, phone, working hours. On the site you get a list, map, address search, geolocation, and sort by distance.

Two packages, one documentation set. **Free** is the locator core. **Pro** installs on top of Free, extends the same UI, and adds CSV in the manager and REST. Pro does not ship its own snippet or chunks.

## Free and Pro

| | Free | Pro |
|---|------|-----|
| Map, list, search, geolocation | yes | yes |
| Categories, `return=chunks/data/json` | yes | yes |
| `search.php` (AJAX on the same site) | yes | fallback when REST is disabled |
| "Open now" filter, UI badges | - | yes |
| MiniShop3: "where to pick up this product" map | - | yes |
| CSV import/export in CMP | - | yes |
| REST API v1, CORS, Bearer | - | yes |

Details: [Free and Pro](free-vs-pro).

## Free features

- Locations as MODX resources. TVs are created on install
- `YandexMapsLocator` snippet: list + map + search form
- Geolocation ("My location" / "All locations"), route building
- Marker clustering, custom icons and balloon image
- Category filter, sort by `distance`
- `return` modes: HTML, data in placeholders, JSON
- "Get coordinates" button in the resource form
- Extension API for third-party extras and Pro
- Multi-context: `context` parameter, allowlist in settings

## What Pro adds

On the same locator:

- `working_now` filter, "Open" / "Closed" badges, "Open only" button
- fields `is_open_now`, `working_hours_schedule` in chunks and API
- on a MiniShop3 product page, only locations that stock that product (`productId` + TV `ms3_product_id`)

In the manager: CSV import and export by container.

For Nuxt, Next, and other clients: REST v1 (`locations`, `geocode`) with CORS and Bearer.

Sections: [What Pro adds](pro/).

## System requirements

| Requirement | Version |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.2-8.4 |
| MySQL / MariaDB | InnoDB |
| [pdoTools](/components/pdotools/) | Fenom chunks |
| [Yandex Maps](https://developer.tech.yandex.ru/) API key | JS API and HTTP Geocoder |

Pro requires installed Free (`yandexmapslocator >=1.0.0 <2.0.0`). Compatibility: Free 1.0.x ↔ Pro 1.0.x.

## Installation

### Free

1. [Connect the ModStore repository](https://modstore.pro/info/connection).
2. **Extras → Installer** → **YandexMapsLocator** → **Download** → **Install**.
3. Set `yandexmapslocator_api_key`.
4. Create a container and child location resources. Fill in TVs.
5. Insert the snippet: [Quick start](quick-start).

Package: [modstore.pro](https://modstore.pro/packages/utilities/yandexmapslocator).

### Pro

1. Install Free.
2. Install **YandexMapsLocatorPro**.
3. Set `yandexmapslocator_timezone` for your network (for "open now").
4. If needed: `api_token`, CORS, CSV in **Components → YandexMapsLocator Pro**.

Pro package: [modstore.pro](https://modstore.pro/packages/utilities/yandexmapslocatorpro).

## Quick links

| Section | Description |
|--------|----------|
| [Quick start](quick-start) | API key, locations, snippet |
| [Free and Pro](free-vs-pro) | Feature matrix |
| [Snippet](snippets/YandexMapsLocator) | Parameters and examples |
| [Pro](pro/) | REST, CSV, MiniShop3, open now |
| [FAQ](faq) | Common issues |
