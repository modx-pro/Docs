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

## search.php vs api.php

| | Free `search.php` | Pro `api.php` |
|---|-------------------|---------------|
| Запрос с той же страницы | да | только если `api_token` пуст |
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
