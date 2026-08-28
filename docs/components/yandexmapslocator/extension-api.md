---
title: Extension API
description: Контракт расширений YandexMapsLocator для Pro и сторонних extras
---

# Extension API

Контракт версии `1` (`LocatorExtensionApi::CONTRACT_VERSION`). Free описывает интерфейсы. Pro и сторонние пакеты цепляются через события.

## Feature providers

Интерфейс `FeatureProviderInterface`, событие `OnYandexMapsLocatorRegisterFeatureProviders`:

| Метод | Назначение |
|-------|------------|
| `capabilities()` | Теги (`pro` → REST v1) |
| `frontendModules()` | ES-модули для `locator.js` (`src`: абсолютный URL от корня сайта) |
| `apiFields()` | Доп. поля REST (`?fields=`) |

**ProFeatureProvider:** capability `pro`, модуль `/assets/components/yandexmapslocatorpro/js/pro.js`, API fields `is_open_now`, `working_hours_schedule`, processors CSV.

## Фильтры

Интерфейс `FilterInterface`, событие `OnYandexMapsLocatorRegisterFilters`.

Free: `category`. Pro: `working_now`, `minishop_product`.

## REST hooks

- `OnYandexMapsLocatorSerializeLocation`: поля одной точки (`data` by ref)
- `OnYandexMapsLocatorBeforeApiResponse`: весь payload ответа

См. [События](events), [REST API](pro/api).
