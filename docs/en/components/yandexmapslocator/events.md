---
title: Events
description: YandexMapsLocator MODX events for plugins and Pro
---

# Events

| Event | When |
|---------|-------|
| `OnYandexMapsLocatorRegisterFilters` | Building the filter registry |
| `OnYandexMapsLocatorRegisterFeatureProviders` | Registering Pro and third-party providers |
| `OnYandexMapsLocatorBeforeStorePrepare` | Before finalizing the Store DTO |
| `OnYandexMapsLocatorAfterStorePrepare` | After building the Store DTO |
| `OnYandexMapsLocatorBeforeSearch` | Before the query (snippet and REST) |
| `OnYandexMapsLocatorAfterSearch` | After loading the list |
| `OnYandexMapsLocatorSerializeLocation` | Before location fields in REST v1 |
| `OnYandexMapsLocatorBeforeApiResponse` | Before REST JSON (`version`, `action`, `payload`) |

## Mutating Store

In a plugin, return the modified `Store` via `$modx->event->output($store)` or assign the object to `store` (by-ref in Before/After StorePrepare).

## REST and BeforeSearch

`OnYandexMapsLocatorBeforeSearch` runs for both the snippet and REST. After the event, the API runs `ApiSearchGuard` again: parent scope, limits, `where` forbidden, `product_id` cleared without Pro.

## Package plugins

| Package | Events |
|-------|---------|
| Free | `OnDocFormSave`, `OnSiteRefresh`, `OnDocFormRender` (mgr geocoding) |
| Pro | RegisterFeatureProviders, RegisterFilters, AfterStorePrepare, SerializeLocation |

Extension contract: [Extension API](extension-api).
