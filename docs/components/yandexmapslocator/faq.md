---
title: FAQ
description: Типовые вопросы YandexMapsLocator Free и Pro
---

# FAQ

## Чем Free отличается от Pro?

Free: карта, список, поиск, геолокация. Pro на том же интерфейсе добавляет «открыто сейчас» (бейджи и фильтр), самовывоз на товаре MiniShop3, CSV в менеджере и REST. Таблица: [Free и Pro](free-vs-pro).

## Карта пустая / не грузится

- Заполнен ли `yandexmapslocator_api_key`?
- Ключ активирован в кабинете Яндекса (до 15 минут)?
- Referer/IP в кабинете совпадают с доменом и сервером?

## Точки не находятся

- Ресурсы опубликованы?
- Верный `parents`?
- Заполнены `latitude` / `longitude`?
- Контекст: параметр `context` и `allowed_contexts`?

Ресурс без координат молча выпадает из выдачи: точка не строится, а в лог падает предупреждение `[YandexMapsLocator] Resource N has invalid coordinates`. Ищите его в **Журнал системы**, чтобы найти номера таких ресурсов.

## Геокод не обновляется после правки адреса

Кэш геокода живёт 604800 секунд, то есть 7 суток (`ttl` в `src/Geo/YandexGeocoder.php`). Ключ строится из адреса в нижнем регистре, поэтому смена регистра или пробелов кэш не сбрасывает.

Кэш лежит в отдельном разделе кэш-менеджера `yandexmapslocator`: пакет пишет его через опцию `cache_key` (`src/Service/CacheService.php:11,13`), поэтому общая очистка кэша MODX его не трогает.

Сбросить точечно: сохраните ресурс в менеджере. Плагин Free на `OnDocFormSave` удаляет ключ геокода для текущего адреса (`elements/plugins/yandexmapslocator.php:26-32`).

Очистить весь раздел можно тремя способами.

**Способ 1. Обновить сайт в админке.**

Управление `Управление` → `Обновить сайт`. Плагин Free ловит `OnSiteRefresh` и вызывает `clearPartition()` (`elements/plugins/yandexmapslocator.php:35-37`).
**Способ 2. Вызвать `OnSiteRefresh` из своего сниппета.**

В пакете такого сниппета нет, поэтому создайте свой, например `YandexMapsLocatorCacheClear`:

::: code-group

```fenom
{'!YandexMapsLocatorCacheClear' | snippet : ['debug' => true]}
```

```modx
[[!YandexMapsLocatorCacheClear? &debug=`1`]]
```

:::

Содержимое сниппета:

```php
<?php
/** @var modX $modx */
$modx->invokeEvent('OnSiteRefresh');
return 'Кэш локатора очищен';
```

**Способ 3. Обратиться к сервису напрямую из PHP-кода.**

Подходит для плагина или обработчика запроса:

```php
use YandexMapsLocator\Support\LocatorService;

LocatorService::get($modx)->getCacheService()->clearPartition();
```

Сервисы пакета разобраны в разделе [Extension API](extension-api#dostup-iz-koda-paketa).

## search.php vs api.php

| | Free `search.php` | Pro `api.php` |
|---|-------------------|---------------|
| Запрос с той же страницы | да | только если стоят Pro, `api_enabled=Да` и `api_token` пуст |
| CORS / Bearer / `fields` | нет | да (Bearer для серверных клиентов) |
| Клиент вне сайта | нет | да |

## «Открыто сейчас» всегда закрыто

- Установлен Pro?
- В TV JSON-расписание, не произвольный текст? Пример: [Открыто сейчас](pro/working-now).
- Часовой пояс: TV `yandexmaps_timezone` на точке или сеть `yandexmapslocator_timezone`?

## Как вызвать только открытые / самовывоз

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'filters' => 'working_now'
]}

{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'productId' => $_modx->resource.id,
    'filters' => 'minishop_product'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &filters=`working_now`]]

[[!YandexMapsLocator?
    &parents=`42`
    &productId=`[[*id]]`
    &filters=`minishop_product`
]]
```

:::

Больше вариантов: [сниппет](snippets/YandexMapsLocator).

## CSV экспортирует не те точки

Экспорт идёт в контексте `yandexmapslocator_default_context` (по умолчанию `web`), не в контексте менеджера.

## Package provider not found (Pro)

Добавьте провайдер [modstore.pro](https://modstore.pro/extras/) в Установщике.

## productId не фильтрует

Нужны Pro и TV `ms3_product_ids` или `ms3_product_id` на точках. Параметр `productId` сам включает фильтр. Без Pro значение сбрасывается.
