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
| `frontendModules()` | Модули JS для `locator.js` |
| `processorActions()` | Процессоры менеджера |
| `apiFields()` | Доп. поля REST (`?fields=`) |

### `frontendModules()`

Запись может быть строкой или объектом `{src}`. Относительный путь склеивается с `assetsUrl` из конфига, абсолютный `http(s)` и путь от корня сайта берутся как есть. У модуля должна быть экспортированная функция `install(locator)` — `locator.js` вызывает её после `import()`:

```json
[
  "/assets/components/myextra/js/locator-module.js",
  { "src": "js/locator-module.js" }
]
```

```javascript
export function install(locator) {
  locator.on('store:click', ({ id }) => {
    // логика модуля
  });
}
```

Ошибка загрузки модуля не роняет локатор: `locator.js` эмитит `error` с `source: 'module'`.

**ProFeatureProvider:** capability `pro`, модуль `/assets/components/yandexmapslocatorpro/js/pro.js`, API fields `is_open_now`, `working_hours_schedule`, `closes_at`, `next_open_at`, `status_hint`, `timezone`, `brand`, `amenities`. `processorActions()`: `mgr/locations/import`, `export`, `bulk_geocode`, `mgr/working_hours/preview`.

Capability `pro` Free читает, но сам эндпоинт её не проверяет. По ней локатор на странице переключается с `search.php` на REST (`src/YandexMapsLocator.php:142`) и в `search.php` не сбрасывается `product_id`. Достаточно, чтобы Pro был установлен: REST включается самим фактом установки.

## Фильтры

Интерфейс `FilterInterface`, событие `OnYandexMapsLocatorRegisterFilters`.

Free: `category`. Pro: `working_now`, `minishop_product`, `amenity`, `brand`.

## События REST

- `OnYandexMapsLocatorSerializeLocation`: поля одной точки (`data` по ссылке)
- `OnYandexMapsLocatorBeforeApiResponse`: весь payload ответа

## Доступ из кода пакета

Bootstrap регистрирует два сервиса: `yandexmapslocator` (экземпляр `YandexMapsLocator\YandexMapsLocator`) и `LocatorExtensionApi::class` (тот же контракт версии 1, что отдаёт `extensionApi()`). Забирать их из `$modx->services` можно напрямую, но удобнее хелпером:

::: code-group

```fenom
{set $locator = $_modx->services->get('yandexmapslocator')}
{$api = $_modx->services->get('YandexMapsLocator\Extension\LocatorExtensionApi::class')}
{if $api->hasCapability('pro')}…{/if}
```

```php
use YandexMapsLocator\Support\LocatorService;

/** @var \MODX\Revolution\modX $modx */
$locator = LocatorService::get($modx);

$api = $modx->services->get(\YandexMapsLocator\Extension\LocatorExtensionApi::class);

$hasPro = $api->hasCapability('pro');
$capabilities = $api->capabilities();
$modules = $api->frontendModules();
$actions = $api->processorActions();
$fields = $api->apiFields();
```

:::

`LocatorService::get()` бросает `RuntimeException`, если сервис не зарегистрирован. Тот же контракт, что у метода `extensionApi()` у объекта локатора, отдаёт любой код, которому доступен сервис `yandexmapslocator`.

Процессор пакета для ручного геокода: [`YandexMapsLocator\Processors\Geocode\Geocode`](integration#геокод-из-кода).

См. [События](events), [REST API](pro/api).
