---
title: Extension API
description: YandexMapsLocator extension contract for Pro and third-party extras
---

# Extension API

Contract version `1` (`LocatorExtensionApi::CONTRACT_VERSION`). Free defines the interfaces. Pro and third-party packages hook in via events.

## Feature providers

Interface `FeatureProviderInterface`, event `OnYandexMapsLocatorRegisterFeatureProviders`:

| Method | Purpose |
|-------|------------|
| `capabilities()` | Tags (`pro` → REST v1) |
| `frontendModules()` | ES modules for `locator.js` (`src` is an absolute URL from the site root) |
| `apiFields()` | Extra REST fields (`?fields=`) |

**ProFeatureProvider:** capability `pro`, module `/assets/components/yandexmapslocatorpro/js/pro.js`, API fields `is_open_now`, `working_hours_schedule`, CSV processors.

## Filters

Interface `FilterInterface`, event `OnYandexMapsLocatorRegisterFilters`.

Free: `category`. Pro: `working_now`, `minishop_product`.

## REST hooks

- `OnYandexMapsLocatorSerializeLocation`: fields for one location (`data` by ref)
- `OnYandexMapsLocatorBeforeApiResponse`: full response payload

See [Events](events), [REST API](pro/api).
