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

Новый прайс кладёт в `shop_settings`:

| Ключ | Значение |
| --- | --- |
| `name`, `company`, `url`, `email` | пустые |
| `currencies` | валюта `RUB` в массиве |
| `platform` | `MODX Revolution` |
| `enable_auto_discounts` | `true` |

Дерево тегов эти ключи не заполняет. Профили Яндекса отдельный тег под `enable_auto_discounts` не создают. Шапка RSS читает `name`, `company` и `url`.

## Идентификатор в XML

<!-- MEDIA: screenshot-admin | must | Поле стратегии идентификатора offer (offer_id_strategy) и связанные параметры offer_settings в карточке прайса | На тестовом стенде открыть карточку прайса с tree_v2, показать выбор стратегии product_id / variant_id / product_id_variant_id -->

Ключ `offer_settings.offer_id_strategy`. Неизвестная строка считается как `product_id_variant_id`.

| Значение | Что пишется в `id` |
| --- | --- |
| `product_id` | Идентификатор товара |
| `variant_id` | Идентификатор варианта. Без варианта пишется id товара |
| `variant_sku` | Артикул: `variant_sku`, иначе `data.article`, иначе `data.vendor_model` |
| `product_id_variant_id` | `товар-вариант` |
| `fenom` | Результат шаблона `offer_id_fenom` |

Артикул и результат шаблона передаются и при записи YML из дерева, и в RSS. Шаблон считается через Fenom. Нет артикула при `variant_sku` или пустой результат при `fenom`: предложение в файл не попадает, в журнал пишется ошибка.

У `variant_id` и `product_id_variant_id` без варианта пишется id товара. Если id варианта известен, а стратегия не сошлась, пишется `товар-вариант`.

## Порог остатка

Запись YML из дерева (`catalog`, `items`, `placement`) и RSS применяют порог. У нового прайса `out_of_stock_behavior` = `skip` и `min_stock` = `0`. Нет ключа поведения: тоже `skip`.

`skip` и `exclude` убирают предложение, если остатка нет или он не выше `min_stock`. `include` и `out` предложение оставляют.

Строка `g:availability` пишется только у оставшегося предложения RSS. Нет числа остатка: `in stock`. Число выше `min_stock`: `in stock`. Иначе `out of stock`.

## Параметры `<param>`

Параметр в файле: отдельный тег дерева полей. Словари `params_map` и `option_param_map` в `offer_settings` при этой записи не читаются.

## Тип `vendor.model`

Порядок поиска производителя: `vendor_name` в `offer_settings`, `msVendor` по `vendor_id`, `ms3yandexmarket_vendor_fallback`. У `pipeline:vendor` между MiniShop3 и системной настройкой ещё ключ `vendor_fallback` в `offer_settings`.

## Управляемые поля размещения

<!-- MEDIA: screenshot-admin | nice | Список управляемых полей managed_fields при назначении файла placement | На тестовом стенде создать или открыть прайс с feed_purpose placement, показать чекбоксы полей в карточке -->

При `placement` карточка показывает список: `price`, `oldprice`, `stock`, `available`, `delivery`, `pickup`, `store`, `url`, `categoryId`. Он сохраняется в `managed_fields`. Непустой список оставляет в `offer` только имена из списка. Имя `available` из списка пишется атрибутом. Атрибут `id` пишется всегда. Пустой список фильтр не включает.
