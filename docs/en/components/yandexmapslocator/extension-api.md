---
title: Extension API
description: YandexMapsLocator extension contract for Pro and third-party extras
---

# Extension API

Contract version `1` (`LocatorExtensionApi::CONTRACT_VERSION`). Free defines the interfaces. Pro and third-party packages hook via events.

## Feature providers

Interface `FeatureProviderInterface`, event `OnYandexMapsLocatorRegisterFeatureProviders`:

| Method | Purpose |
|--------|---------|
| `capabilities()` | Tags (`pro` → REST v1) |
| `frontendModules()` | ES modules for `locator.js` (`src`: absolute URL from site root) |
| `apiFields()` | Extra REST fields (`?fields=`) |

**ProFeatureProvider:** capability `pro`, module `/assets/components/yandexmapslocatorpro/js/pro.js`, API fields `is_open_now`, `working_hours_schedule`, `closes_at`, `next_open_at`, `status_hint`, `timezone`, `brand`, `amenities`, CSV / bulk geocode / preview processors.

## Filters

Interface `FilterInterface`, event `OnYandexMapsLocatorRegisterFilters`.

Free: `category`. Pro: `working_now`, `minishop_product`, `amenity`, `brand`.

## REST hooks

- `OnYandexMapsLocatorSerializeLocation`: fields of one location (`data` by ref)
- `OnYandexMapsLocatorBeforeApiResponse`: full response payload

See [Events](events), [REST API](pro/api).
