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

`OnYandexMapsLocatorBeforeSearch` runs for both the snippet and REST. In REST, `ApiSearchGuard` runs once before `search()`. The event runs after the guard and sees criteria by-ref: a plugin can set `where` and `product_id` again. There is no second guard pass.

## Package plugins

| Package | Events |
|-------|---------|
| Free | `OnDocFormSave`, `OnSiteRefresh`, `OnDocFormRender` (mgr geocoding) |
| Pro | RegisterFeatureProviders, RegisterFilters, BeforeStorePrepare (TZ, products, amenity, brand), AfterStorePrepare, SerializeLocation, OnDocFormRender (schedule preview) |

Extension contract: [Extension API](extension-api).
