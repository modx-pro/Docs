---
title: MiniShop3
description: 'Карта самовывоза товара: YandexMapsLocator Pro и MiniShop3'
---

# MiniShop3

**Pro.** На общей странице «Магазины» Free показывает всю сеть. На карточке товара MiniShop3 обычно нужна карта только с пунктами, где этот товар можно забрать.

Как связать:

1. В TV точки `ms3_product_id` пишете ID ресурса товара.
2. В шаблоне товара вызываете сниппет с `filters=minishop_product` и `productId` = ID текущего ресурса.
3. В списке и на карте остаются совпавшие точки.

## Что нужно

- Free и **Pro**
- Опубликованные точки под контейнером (`parents`)
- Товар как ресурс MiniShop3 (его ID совпадает с TV на точке)
- В вызове и `filters=minishop_product`, и ненулевой `productId` / `product_id`

Без Pro фильтр не регистрируется. В REST и `search.php` параметр `product_id` сбрасывается в `0`.

## TV

При установке Pro resolver создаёт TV `ms3_product_id` (тип `number`, категория **YandexMapsLocator**), если её ещё нет.

К шаблону TV сама не привяжется. Назначьте её шаблону точек, как остальные TV локатора.

| Поле | Значение |
|------|----------|
| Имя | `ms3_product_id` |
| Caption | MiniShop3 Product ID |
| Тип | number |
| Смысл | ID ресурса товара MiniShop3 |

На каждой точке укажите ID товара, который там выдают. Пустое или `0` при ненулевом `productId` отсекает точку.

Сейчас фильтр умеет **один ID товара на точку**. Несколько товаров в одном пункте: отдельные ресурсы-точки или свой фильтр через [Extension API](../extension-api).

В CSV Pro этой колонки нет. Пишите значение в форме ресурса или своим импортом.

См. [Точки и TV](../integration).

## Фильтр

Класс Pro `ProductLocationFilter`, имя `minishop_product`, opt-in.

| Условие | Результат |
|---------|-----------|
| Нет `filters=minishop_product` | Фильтр молчит |
| `productId` ≤ 0 | Список не режется |
| `productId` > 0 | Остаются точки с `(int) ms3_product_id === productId` |

Сравнивается целый ID ресурса товара. Не артикул и не название.

## Вызов на странице товара

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'minishop_product'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`minishop_product`
]]
```

:::

Настройку `yml_stores_parent` заведите сами или подставьте числовой ID контейнера.

В сниппете `productId` и `product_id` одно и то же. Если на странице товара уже есть вызов с фильтром, AJAX `search.php` тоже получит `product_id`.

## Самовывоз и «открыто сейчас»

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'minishop_product,working_now',
    'sortby' => 'distance',
    'radius' => 50
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`minishop_product,working_now`
    &sortby=`distance`
    &radius=`50`
]]
```

:::

Нужны заполненный `ms3_product_id`, JSON в `yandexmaps_working_hours` и `yandexmapslocator_timezone`. См. [Открыто сейчас](working-now).

Товар плюс категория:

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'category' => 'самовывоз',
    'filters' => 'minishop_product,category'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &category=`самовывоз`
    &filters=`minishop_product,category`
]]
```

:::

## В шаблоне товара

Поставьте блок ниже описания:

::: code-group

```fenom
<section class="product-pickup">
    <h2>Самовывоз</h2>
    {'!YandexMapsLocator' | snippet : [
        'parents' => $_modx->config.yml_stores_parent ?: 42,
        'productId' => $_modx->resource.id,
        'filters' => 'minishop_product',
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
        &filters=`minishop_product`
        &limit=`30`
    ]]
</section>
```

:::

Вызов **некэшированный**. Нужен [pdoTools](/components/pdotools/). Чанки берутся из Free. Pro своих не добавляет.

Если совпадений нет, сработает `tplEmpty` (`yandexmapslocator.empty`).

## REST

В query: `product_id` (не `productId`) и `filters=minishop_product`.

```text
?route=api/v1/locations&parents=5&product_id=120&filters=minishop_product&fields=id,title,address,coordinates
```

```json
{
  "success": true,
  "data": [
    {
      "id": 18,
      "title": "Пункт выдачи Мира",
      "address": "Омск, пр. Мира, 10",
      "coordinates": { "lat": 54.9921, "lon": 73.371 }
    }
  ],
  "meta": { "total": 1, "limit": 20, "offset": 0 }
}
```

```javascript
const base = '/assets/components/yandexmapslocatorpro/api.php';
const productId = 120;

const url = `${base}?route=api/v1/locations&parents=5&product_id=${productId}&filters=minishop_product&fields=id,title,address,phone`;

const res = await fetch(url, {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer YOUR_TOKEN',
  },
});
const { data } = await res.json();
```

Без Pro `ApiSearchGuard` обнуляет `productId`, и список по товару не сузится.

Справочник: [REST API](api).

## search.php

Same-origin AJAX локатора:

```text
/assets/components/yandexmapslocator/search.php?parents=5&product_id=120&filters=minishop_product
```

Принимаются `product_id` и `productId`. Без Pro значение сбрасывается, как в REST.

## Карта пустая

Проверьте по порядку:

1. Pro стоит, capability `pro` на месте.
2. В вызове есть `filters=minishop_product` и ненулевой `productId`.
3. TV `ms3_product_id` висит на шаблоне точки и равна `[[*id]]` товара.
4. Точки опубликованы, `parents` верный.
5. Заполнены `latitude` / `longitude`.

См. [productId не фильтрует](../faq#productid-не-фильтрует).
