---
title: What Pro adds
description: 'YandexMapsLocatorPro: REST, open now, CSV, MiniShop3'
---

# What Pro adds

**YandexMapsLocatorPro** is a paid package on top of Free. It does not ship its own snippet or chunks: on the site you keep calling `YandexMapsLocator`, and Pro adds filters, `pro.js`, CMP, and REST via the Free Extension API.

Matrix: [Free and Pro](../free-vs-pro).

## Features

| Feature | Where | Section |
|---------|-------|---------|
| `working_now` filter, badges, TZ per location | site | [Open now](working-now) |
| `amenity`, `brand` filters | site / REST | [Free and Pro](../free-vs-pro) |
| Map on MiniShop3 product page | site | [MiniShop3](minishop3) |
| CSV, bulk geocode, schedule preview | manager | [CSV in the manager](manager) |
| REST API v1 (`locations`, `geocode`, `meta`) | HTTP | [REST API](api) |
| CORS, Bearer, rate limit, kill switch | HTTP | [API security](api-security) |

## Architecture

```text
Free: yandexmapslocator service, snippet, search.php, chunks, Extension API
  └── Pro: yandexmapslocatorpro service, api.php, CMP, filters, pro.js
```

Pro plugin listens to:

- `OnYandexMapsLocatorRegisterFeatureProviders`
- `OnYandexMapsLocatorRegisterFilters`
- `OnYandexMapsLocatorAfterStorePrepare`
- `OnYandexMapsLocatorSerializeLocation`

Capability `pro` enables REST v1. Module `/assets/components/yandexmapslocatorpro/js/pro.js` renders badges and the "Open only" button.

## Installation

1. Free is installed and works on the site (recommended ≥ 1.0.0-pl7).
2. Install Pro via ModStore (1.1.0-pl2).
3. Set `yandexmapslocator_timezone` for the network and TV `yandexmaps_timezone` on locations if needed.
4. On production: `api_token` and `api_cors_origins`.

Dependency: `yandexmapslocator >=1.0.0-pl7 <2.0.0`.
