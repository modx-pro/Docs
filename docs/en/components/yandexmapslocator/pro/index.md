---
title: What Pro adds
description: 'YandexMapsLocatorPro: REST, open now, CSV, MiniShop3'
---

# What Pro adds

**YandexMapsLocatorPro** is a paid package on top of Free. It does not ship its own snippet or chunks. On the site you keep calling `YandexMapsLocator`. Pro adds filters, `pro.js`, CMP, and REST via the Free Extension API.

Matrix: [Free and Pro](../free-vs-pro).

## Features

| Feature | Where | Section |
|---------|-------|---------|
| `working_now` filter, badges, `is_open_now` | site | [Open now](working-now) |
| Map on MiniShop3 product page | site | [MiniShop3](minishop3) |
| CSV import/export | manager | [CSV in the manager](manager) |
| REST API v1 (`locations`, `geocode`) | HTTP | [REST API](api) |
| CORS, Bearer, rate limit, kill switch | HTTP | [API security](api-security) |

## How it works

```text
Free: yandexmapslocator service, snippet, search.php, chunks, Extension API
  └── Pro: yandexmapslocatorpro service, api.php, CMP, filters, pro.js
```

The Pro plugin listens to:

- `OnYandexMapsLocatorRegisterFeatureProviders`
- `OnYandexMapsLocatorRegisterFilters`
- `OnYandexMapsLocatorAfterStorePrepare`
- `OnYandexMapsLocatorSerializeLocation`

Capability `pro` enables REST v1. Module `/assets/components/yandexmapslocatorpro/js/pro.js` renders badges and the "Open only" button.

## Installation

1. Free is already installed and working on the site.
2. Install Pro via ModStore.
3. Set `yandexmapslocator_timezone` for your network.
4. On production: set `api_token` and `api_cors_origins`.

Dependency: `yandexmapslocator >=1.0.0 <2.0.0`.
