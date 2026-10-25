---
title: События
description: События MODX YandexMapsLocator для плагинов и Pro
---

# События

| Событие | Когда |
|---------|-------|
| `OnYandexMapsLocatorRegisterFilters` | Сборка реестра фильтров |
| `OnYandexMapsLocatorRegisterFeatureProviders` | Регистрация Pro и сторонних провайдеров |
| `OnYandexMapsLocatorBeforeStorePrepare` | До финализации объекта Store |
| `OnYandexMapsLocatorAfterStorePrepare` | После сборки объекта Store |
| `OnYandexMapsLocatorBeforeSearch` | До запроса (сниппет и REST) |
| `OnYandexMapsLocatorAfterSearch` | После загрузки списка |
| `OnYandexMapsLocatorSerializeLocation` | Перед полями location в REST v1 |
| `OnYandexMapsLocatorBeforeApiResponse` | Перед JSON REST (`version`, `action`, `payload`) |

## Мутация Store

В плагине верните изменённый `Store` через `$modx->event->output($store)` или присвойте объект в `store` (по ссылке в Before/After StorePrepare).

## REST и BeforeSearch

`OnYandexMapsLocatorBeforeSearch` срабатывает и для сниппета, и для REST. `ApiSearchGuard` в REST проходит один раз до `search()`. Событие идёт после guard и видит criteria по ссылке. Плагин может снова выставить `where` и `product_id`. Повторного прогона guard нет.

## Плагины пакетов

| Пакет | События |
|-------|---------|
| Free | `OnDocFormSave`, `OnSiteRefresh`, `OnDocFormRender` (геокод в менеджере) |
| Pro | RegisterFeatureProviders, RegisterFilters, BeforeStorePrepare (пояс, товары, amenity, brand), AfterStorePrepare, SerializeLocation, OnDocFormRender (превью расписания) |

## Кэш и его сброс

Кэш лежит в отдельном разделе кэш-менеджера `yandexmapslocator`, поэтому общая очистка кэша MODX его не трогает. Чистят его два события плагина Free:

| Событие | Что чистит |
|---------|------------|
| `OnDocFormSave` | Только ключ геокода адреса сохранённого ресурса. Остальные ключи не трогает |
| `OnSiteRefresh` | Весь раздел `yandexmapslocator`: геокод и счётчики лимитов |

Контракт расширений: [Extension API](extension-api).
