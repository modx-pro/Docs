---
title: События
description: События MODX YandexMapsLocator для плагинов и Pro
---

# События

| Событие | Когда |
|---------|-------|
| `OnYandexMapsLocatorRegisterFilters` | Сборка реестра фильтров |
| `OnYandexMapsLocatorRegisterFeatureProviders` | Регистрация Pro и сторонних провайдеров |
| `OnYandexMapsLocatorBeforeStorePrepare` | До финализации DTO Store |
| `OnYandexMapsLocatorAfterStorePrepare` | После сборки DTO Store |
| `OnYandexMapsLocatorBeforeSearch` | До запроса (сниппет и REST) |
| `OnYandexMapsLocatorAfterSearch` | После загрузки списка |
| `OnYandexMapsLocatorSerializeLocation` | Перед полями location в REST v1 |
| `OnYandexMapsLocatorBeforeApiResponse` | Перед JSON REST (`version`, `action`, `payload`) |

## Мутация Store

В плагине верните изменённый `Store` через `$modx->event->output($store)` или присвойте объект в `store` (by-ref в Before/After StorePrepare).

## REST и BeforeSearch

`OnYandexMapsLocatorBeforeSearch` срабатывает и для сниппета, и для REST. После события API снова прогоняет `ApiSearchGuard`: parent scope, лимиты, запрет `where`, сброс `product_id` без Pro.

## Плагины пакетов

| Пакет | События |
|-------|---------|
| Free | `OnDocFormSave`, `OnSiteRefresh`, `OnDocFormRender` (геокод в mgr) |
| Pro | RegisterFeatureProviders, RegisterFilters, AfterStorePrepare, SerializeLocation |

Контракт расширений: [Extension API](extension-api).
