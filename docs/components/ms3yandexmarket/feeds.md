---
title: Состав файла
description: Что попадает в YML Яндекс Маркета и в RSS Google из прайса ms3YandexMarket
---

# Состав файла

Один прайс пишет один файл. Площадка и назначение выбираются в карточке. Маркет и Merchant Center забирают файл по URL из поля **URL файла**. Компонент в кабинеты сам не ходит.

Корень YML: объявление XML, UTF-8, элемент `yml_catalog` с датой старта генерации. Корень RSS: канал `rss` и элементы `item`.

## Яндекс Маркет, каталог

Назначение `catalog` или `items` создаёт один и тот же набор тегов. Файл пишется из дерева полей, не из JSON-карты полей.

Блок `<categories>` наполняется только у `catalog`. У `items` вкладка **Категории** есть, но выбранные разделы в YML не пишутся. Пустой список тег `categories` пропускает.

Теги магазина при создании:

| Тег | Тип | Источник при создании |
| --- | --- | --- |
| `name`, `company`, `url` | текст | пусто, тег не попадёт в файл, пока не зададите `value:` или `setting:` |
| `categories` | контейнер | выбранные разделы |
| `offers` | контейнер | по товару или варианту |

Теги каждого `offer`:

| Тег | Источник при создании |
| --- | --- |
| `name` | `field:pagetitle` |
| `url` | `pipeline:url` |
| `price` | `data:price` |
| `categoryId` | `field:parent` |
| `picture` | `pipeline:image` |
| `vendor` | `pipeline:vendor` |
| `vendorCode` | `data:article` |
| `description` | `field:introtext`, тип «текст без разметки» |
| `barcode`, `param` | пусто |
| `country_of_origin` | `data:made_in` |

Атрибут `id` у `offer` берётся из [стратегии идентификатора](/components/ms3yandexmarket/pricelist). Отдельного тега `shop-sku` нет. Блоков `currencies`, `currencyId`, `promos` и атрибута `type` профиль не создаёт.

Пустой текст тега в файл не пишется. Предложение без `id` пропускается.

## Яндекс Маркет, размещение

У назначения `placement` вкладки **Категории** нет, контейнера `categories` в наборе нет.

На **Магазине** предупреждение: файл размещения заменяет условия в кабинете Маркета. Список **Управляемые поля** сохраняется в `managed_fields` (`price`, `oldprice`, `stock`, `available`, `delivery`, `pickup`, `store`, `url`, `categoryId`). Непустой список оставляет в `offer` только имена из списка. Имя `available` из списка пишется атрибутом. Атрибут `id` пишется всегда. Пустой список фильтр не включает.

Теги `offer` при создании:

| Тег | Источник при создании |
| --- | --- |
| `url` | `pipeline:url` |
| `price` | `data:price` |
| `oldprice` | `data:old_price` |
| `categoryId` | `field:parent` |
| `store`, `delivery`, `pickup` | пусто |

У `store`, `delivery` и `pickup` источника нет, поэтому их нет в файле, пока не заполните **Откуда брать текст**.

При `skip` предложение без остатка или с остатком не выше `min_stock` в файл не попадает. Подробнее: [параметры прайса](/components/ms3yandexmarket/pricelist).

## Google RSS 2.0

<!-- MEDIA: diagram | must | Запись Google RSS: дерево тегов в редакторе не читается при генерации, файл собирается из карточки предложения и сохранённых title, link, description | Схема по абзацам раздела: канал rss ← title/link/description из тегов; item ← поля g:* из карты предложения -->

У площадки `google.rss20` назначение не различается: в файл всегда пишется лента товаров.

Дерево тегов при создании выглядит как канал: `title`, `link`, `description`, контейнер `items` и поля `g:id`, `g:title`, `g:link`, `g:price`, `g:availability`, `g:image_link`, `g:description`. Запись файла дерево не читает и пишет RSS из карточки предложения.

Шапка канала копирует сохранённый текст тегов `title`, `link` и `description`. Префиксы `value:` и `setting:` здесь не разбираются: строка `value:Магазин` попадёт в канал как `value:Магазин`. Пустой тег шапку не заполняет. `lastBuildDate` берёт момент генерации.

Каждый `item`:

| Тег | Откуда |
| --- | --- |
| `g:id` | стратегия идентификатора |
| `g:title` | `field:pagetitle` из карты полей по умолчанию |
| `g:link` | `pipeline:url` |
| `g:price` | цена и код валюты, вид `199.00 RUB` |
| `g:availability` | `in stock` или `out of stock` |
| `g:image_link` | `pipeline:image` |
| `g:description` | `field:introtext` |

Карта полей по умолчанию ещё содержит `oldprice`, `currencyId`, `categoryId`, `vendorCode`, `country_of_origin`, `vendor`. В RSS-элемент они не выводятся.

## Когда Google пропускает товар

Строки нет, если пустые название, адрес или цена. `skip` (так у нового прайса и когда ключа поведения нет) убирает строку: нет числа остатка или остаток не выше `min_stock`. `exclude` убирает строку так же. `include` и `out` строку оставляют. Тот же порог действует при записи YML из дерева.

`g:availability` пишется только у оставшейся строки. Нет числа остатка: `in stock`. Число выше `min_stock`: `in stock`. Иначе `out of stock`.

Тип оффера `vendor.model` на пути RSS требует непустые производителя и артикул. Иначе строка пропускается. На пути YML из дерева полей это поле атрибут `type` не ставит.
