---
title: Состав файла
description: Что попадает в YML Яндекс Маркета и в RSS Google из прайса ms3YandexMarket
---

# Состав файла

Один прайс пишет один файл. Площадка и назначение выбираются в карточке. Маркет и Merchant Center забирают файл по URL из поля **URL файла**. Компонент в кабинеты сам не ходит.

Корень YML: объявление XML, UTF-8, элемент `yml_catalog` с датой старта генерации. Корень RSS: канал `rss` и элементы `item`.

## Яндекс Маркет, каталог

Назначение `catalog` или `items` сажает один и тот же набор тегов. Файл пишется из дерева полей, не из JSON-карты полей.

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

Назначение `placement`. Вкладки **Категории** нет, контейнера `categories` в наборе нет.

На **Магазине** предупреждение: файл размещения заменяет условия в кабинете Маркета. Список **Управляемые поля** сохраняется в `managed_fields` (`price`, `oldprice`, `stock`, `available`, `delivery`, `pickup`, `store`, `url`, `categoryId`). Запись файла этот список не читает: в XML уходят теги дерева, у которых есть текст.

Теги `offer` при создании: `url`, `price` (`data:price`), `oldprice` (`data:old_price`), `categoryId` (`field:parent`), `store`, `delivery`, `pickup`. У трёх последних источник пустой, поэтому их нет в файле, пока не заполните **Откуда брать текст**.

Порог `min_stock` предложение здесь не отсекает. Подробнее: [параметры прайса](/components/ms3yandexmarket/pricelist).

## Google RSS 2.0

Площадка `google.rss20`. Назначение для Google не различается: в файл всегда пишется лента товаров.

Дерево тегов при создании выглядит как канал (`title`, `link`, `description`, контейнер `items` и поля `g:id`, `g:title`, `g:link`, `g:price`, `g:availability`, `g:image_link`, `g:description`). Запись файла это дерево не читает. Файл собирает отдельный писатель RSS из карточки предложения.

Шапка канала берётся из `shop_settings`, не из дерева:

| Элемент RSS | Откуда |
| --- | --- |
| `title` | `shop_settings.name`, иначе `title` |
| `link` | `shop_settings.url`, иначе `link` |
| `description` | `shop_settings.description`, иначе `company` |
| `lastBuildDate` | момент генерации |

У нового прайса `name`, `company` и `url` в `shop_settings` пустые. Заполненные теги дерева шапку RSS не наполняют.

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

Строки нет, если пустые название, адрес или цена. При `out_of_stock_behavior` = `skip` (так у нового прайса) нулевой остаток и остаток не выше `min_stock` тоже убирают строку.

Наличие у строки, которая уже прошла этот отбор, считается отдельно. Писатель RSS по умолчанию берёт поведение `include`. Неизвестный остаток даёт `in stock`, кроме значения `exclude`. Ноль и меньше дают `out of stock`.

Тип оффера `vendor.model` на пути RSS требует непустые производителя и артикул. Иначе строка пропускается. Для YML из дерева полей то же поле атрибут `type` в файл не подставляет.
