---
title: Параметры прайса
description: Идентификатор предложения, порог остатка и параметры offer в ms3YandexMarket
---

# Параметры прайса

Карточка хранит площадку, назначение и JSON `offer_settings`. Новый прайс получает стратегию `product_id_variant_id`, `min_stock` = `0` и `out_of_stock_behavior` = `skip`.

Поля формы и то, какой файл из них выходит: [экраны менеджера](/components/ms3yandexmarket/manager) и [состав файла](/components/ms3yandexmarket/feeds).

## Что лежит в карточке

| Поле | Значения |
| --- | --- |
| Площадка | `yandex.market`, `google.rss20`. Пустая строка при создании становится `yandex.market` |
| Назначение | `catalog`, `placement`, `items`. Неизвестная строка становится `catalog` |
| Тип оффера | `simple`, `vendor.model`. Для YML из дерева атрибут `type` не пишется. Для RSS `vendor.model` требует производителя и артикул, иначе строка пропускается |
| Источник предложений | `product`, `variant`, `combination`, `automatic` |
| Источник остатков | `minishop3`, `ms3variants`, `ms3remains`, `automatic` |
| Режим и интервал | См. [генерацию](/components/ms3yandexmarket/generation) |

`shop_settings` нового прайса: пустые `name`, `company`, `url`, `email`, валюта `RUB` в массиве `currencies`, `platform` = `MODX Revolution`. Дерево тегов эти ключи само не заполняет. Шапка RSS читает именно их.

## Идентификатор в XML

<!-- MEDIA: screenshot-admin | must | Поле стратегии идентификатора offer (offer_id_strategy) и связанные параметры offer_settings в карточке прайса | На тестовом стенде открыть карточку прайса с tree_v2, показать выбор стратегии product_id / variant_id / product_id_variant_id -->

Ключ `offer_settings.offer_id_strategy`. Неизвестная строка считается как `product_id_variant_id`.

| Значение | Что пишется в `id` |
| --- | --- |
| `product_id` | Идентификатор товара |
| `variant_id` | Идентификатор варианта. Без варианта стратегия не сходится |
| `variant_sku` | Артикул варианта. Без артикула стратегия не сходится |
| `product_id_variant_id` | `товар-вариант`. Без варианта не сходится |
| `fenom` | Результат Fenom. Сейчас генератор результат шаблона не передаёт, стратегия не сходится |

Если стратегия не сошлась, в файл всё равно пишется запасной идентификатор: для товара это его id, для варианта это `товар-вариант`.

В расчёт уходят только id товара и id варианта. Артикул не передаётся, поэтому `variant_sku` сразу уходит в запасной идентификатор.

## Порог остатка

Запись YML из дерева полей эти ключи не применяет. Предложение из-за порога не удаляется.

Для RSS Google `out_of_stock_behavior` задаёт только строку наличия. По умолчанию `include`. Неизвестный остаток: `in stock`, кроме `exclude` (`out of stock`). Число > 0: `in stock`. Ноль и меньше: `out of stock`.

## Параметры `<param>`

Параметр в файле это отдельный тег дерева полей. Словари `params_map` и `option_param_map` в `offer_settings` при этой записи не читаются.

## Тип `vendor.model`

Порядок поиска производителя: `vendor_name` в `offer_settings`, `msVendor` по `vendor_id`, `ms3yandexmarket_vendor_fallback`. У `pipeline:vendor` между MiniShop3 и системной настройкой ещё ключ `vendor_fallback` в `offer_settings`.

## Управляемые поля размещения

<!-- MEDIA: screenshot-admin | nice | Список управляемых полей managed_fields при назначении файла placement | На тестовом стенде создать или открыть прайс с feed_purpose placement, показать чекбоксы полей в карточке -->

При `placement` карточка показывает список: `price`, `oldprice`, `stock`, `available`, `delivery`, `pickup`, `store`, `url`, `categoryId`. Он сохраняется в `managed_fields`. Генератор теги по списку не отбирает: в файл идёт дерево тегов.
