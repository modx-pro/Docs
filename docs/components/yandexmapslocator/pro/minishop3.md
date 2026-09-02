---
title: MiniShop3
description: 'Карта самовывоза товара: YandexMapsLocator Pro и MiniShop3'
---

# MiniShop3

**Pro.** На общей странице «Магазины» Free показывает всю сеть. На карточке товара MiniShop3 обычно нужна карта только с пунктами, где этот товар можно забрать.

Как связать:

1. В TV точки укажите ID товара: `ms3_product_ids` (несколько) или legacy `ms3_product_id` (один).
2. В шаблоне товара вызовите сниппет с `productId` = ID текущего ресурса.
3. В списке и на карте остаются совпавшие точки.

Параметр `productId` / `product_id` сам активирует фильтр MiniShop3. Явный `filters=minishop_product` не обязателен, но можно указать вместе с другими фильтрами.

## Что нужно

- Free и **Pro**
- Опубликованные точки под контейнером (`parents`)
- Товар как ресурс MiniShop3 (его ID совпадает с TV на точке)
- Ненулевой `productId` / `product_id` в вызове

Без Pro фильтр не регистрируется. В REST и `search.php` параметр `product_id` сбрасывается в `0`.

## TV

При установке Pro resolver создаёт TV (если ещё нет), категория **YandexMapsLocator**:

| TV | Тип | Смысл |
|----|-----|--------|
| `ms3_product_id` | number | Один ID ресурса товара (legacy) |
| `ms3_product_ids` | text | Несколько ID: `25,26` или JSON `[25,26]`. Если заполнено, важнее `ms3_product_id` |

К шаблону TV сами не привяжутся. Назначьте их шаблону точек.

Пустое значение при ненулевом `productId` отсекает точку.

В CSV Pro есть обе колонки. См. [CSV в менеджере](manager), [Точки и TV](../integration).

## Фильтр

Класс Pro `ProductLocationFilter`, имя `minishop_product`.

| Условие | Результат |
|---------|-----------|
| `productId` ≤ 0 | Список не режется |
| `productId` > 0 | Остаются точки, где ID товара есть в списке TV |

Сравнивается целый ID ресурса товара. Не артикул и не название.

## Вызов на странице товара

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
]]
```

:::

Настройку `yml_stores_parent` заведите сами или подставьте числовой ID контейнера.

В сниппете `productId` и `product_id` одно и то же. Если на странице товара уже есть вызов с `productId`, AJAX `search.php` тоже получит `product_id`.

## Самовывоз и «открыто сейчас»

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'working_now',
    'sortby' => 'distance',
    'radius' => 50
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`working_now`
    &sortby=`distance`
    &radius=`50`
]]
```

:::

Нужны заполненные ID товаров, JSON в `yandexmaps_working_hours` и часовой пояс точки/сети. См. [Открыто сейчас](working-now).

Товар плюс категория:

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'category' => 'самовывоз',
    'filters' => 'category'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &category=`самовывоз`
    &filters=`category`
]]
```

:::

## В шаблоне товара

::: code-group

```fenom
<section class="product-pickup">
    <h2>Самовывоз</h2>
    {'!YandexMapsLocator' | snippet : [
        'parents' => $_modx->config.yml_stores_parent ?: 42,
        'productId' => $_modx->resource.id,
        'tplOuter' => 'yandexmapslocator.outer',
        'limit' => 30
    ]}
</section>
```

```modx
<section class="product-pickup">
    <h2>Самовывоз</h2>
    [[!YandexMapsLocator?
        &parents=`[[++yml_stores_parent]]`
        &productId=`[[*id]]`
        &limit=`30`
    ]]
</section>
```

:::

Вызов **некэшированный**. Нужен [pdoTools](/components/pdotools/). Чанки берутся из Free. Pro своих не добавляет.

Если совпадений нет, сработает `tplEmpty` (`yandexmapslocator.empty`).

## REST

В query: `product_id` (не `productId`). Явный `filters=minishop_product` не обязателен.

```text
?route=api/v1/locations&parents=5&product_id=120&fields=id,title,address,coordinates
```

Без Pro `ApiSearchGuard` обнуляет `productId`, и список по товару не сузится.

Справочник: [REST API](api).

## search.php

```text
/assets/components/yandexmapslocator/search.php?parents=5&product_id=120
```

Принимаются `product_id` и `productId`. Без Pro значение сбрасывается, как в REST.

## Карта пустая

1. Pro стоит, capability `pro` на месте.
2. В вызове ненулевой `productId`.
3. TV `ms3_product_ids` или `ms3_product_id` висит на шаблоне и содержит ID товара.
4. Точки опубликованы, `parents` верный.
5. Заполнены `latitude` / `longitude`.

См. [productId не фильтрует](../faq#productid-не-фильтрует).
