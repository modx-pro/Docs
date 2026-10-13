---
title: Параметры прайса
description: Идентификатор предложения, порог остатка и параметры offer в ms3YandexMarket
---

# Параметры прайса

Карточка хранит площадку, назначение и JSON `offer_settings`. Новый прайс получает стратегию `product_id_variant_id`, порог `min_stock` = `0` и поведение `out_of_stock_behavior` = `skip`.

Поля формы: [экраны менеджера](/components/ms3yandexmarket/manager). Какой файл из них выходит: [состав файла](/components/ms3yandexmarket/feeds).

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

Дерево тегов эти ключи не заполняет. Профили Яндекса отдельный тег под `enable_auto_discounts` не создают. Шапка RSS копирует сырой текст тегов `title`, `link` и `description`. Префиксы `value:` и `setting:` в шапке не разбираются.

## Идентификатор в XML

<!-- MEDIA: screenshot-admin | must | Поле стратегии идентификатора offer (offer_id_strategy) и связанные параметры offer_settings в карточке прайса | На тестовом стенде открыть карточку прайса с tree_v2, показать выбор стратегии product_id / variant_id / product_id_variant_id -->

Стратегия `offer_settings.offer_id_strategy` задаёт атрибут `id` у предложения. Неизвестная строка считается как `product_id_variant_id`.

| Значение | Что пишется в `id` |
| --- | --- |
| `product_id` | Идентификатор товара |
| `variant_id` | Идентификатор варианта. Без варианта пишется id товара |
| `variant_sku` | Артикул: `variant_sku`, иначе `data.article`, иначе `data.vendor_model` |
| `product_id_variant_id` | `товар-вариант` |
| `fenom` | Результат шаблона `offer_id_fenom` |

Артикул и результат шаблона передаются и при записи YML из дерева, и в RSS. Шаблон считается через Fenom. Нет артикула при `variant_sku` или пустой результат при `fenom`: предложение в файл не попадает. В журнал пишется ошибка.

У `variant_id` и `product_id_variant_id` без варианта пишется id товара. Если id варианта известен, а стратегия не сошлась, пишется `товар-вариант`.

У строки с `offer_row_source` = `combination` и непустыми опциями к любому `id` дописывается `-` и 12 символов SHA-1 от отсортированных опций. Так и в YML из дерева, и в RSS. Без опций или не у комбинации суффикса нет.

## Порог остатка

Запись YML из дерева (`catalog`, `items`, `placement`) и RSS применяют порог. Нет ключа поведения: тоже `skip`.

`skip` и `exclude` убирают предложение, если остатка нет или он не выше `min_stock`. `include` и `out` предложение оставляют.

Строка `g:availability` пишется только у оставшегося предложения RSS. Нет числа остатка: `in stock`. Число выше `min_stock`: `in stock`. Иначе `out of stock`.

## Параметры `<param>`

Параметр в файле может прийти из тега дерева полей или из опций варианта и комбинации.

Отдельный тег дерева `param` пишется только вместе с непустым атрибутом `name`. Без него тега нет.

Словарь `option_param_map` в `offer_settings` читается при записи YML из дерева. Условие: у строки есть опции варианта или комбинации и имя `param` разрешено `managed_fields`. Пустой список управляемых полей разрешает всё: у `catalog` и `items` теги пишутся. У `placement` с девятью ключами без `param` этих тегов нет. На каждую такую опцию пишется `<param name="…">`, если тег дерева с тем же `name` уже не выведен.

Пустая или отсутствующая карта даёт подписи:

| Ключ | Подпись |
| --- | --- |
| `color` | Цвет |
| `size` | Размер |
| `material` | Материал |
| `volume` | Объем |

Остальные ключи пишутся как есть. Непустая карта заменяет эти четыре подписи целиком.

Словарь `params_map` на дереве YML не читается. Его читает сборка Google RSS и запись YML прайса без дерева полей.

## Тип `vendor.model`

Порядок поиска производителя: `vendor_name` в `offer_settings`, `msVendor` по `vendor_id`, `ms3yandexmarket_vendor_fallback`. У `pipeline:vendor` между MiniShop3 и системной настройкой ещё ключ `vendor_fallback` в `offer_settings`.

## Управляемые поля размещения

<!-- MEDIA: screenshot-admin | nice | Список управляемых полей managed_fields при назначении файла placement | На тестовом стенде создать или открыть прайс с feed_purpose placement, показать чекбоксы полей в карточке -->

При `placement` карточка показывает список: `price`, `oldprice`, `stock`, `available`, `delivery`, `pickup`, `store`, `url`, `categoryId`. Пустой список сохранить нельзя. Форма подставляет все девять ключей. Запрос с пустым списком отвечает 422, код `invalid_managed_fields`. Непустой список оставляет в `offer` только имена из списка. Имя `available` из списка пишется атрибутом. Атрибут `id` пишется всегда.
