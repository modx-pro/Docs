---
title: MiniShop3
description: 'Product pickup map: YandexMapsLocator Pro and MiniShop3'
---

# MiniShop3

**Pro.** On a general "Stores" page, Free shows the full network. On a MiniShop3 product page you usually need a map with only locations where that product can be picked up.

How to wire it up:

1. In the location TV `ms3_product_id`, set the product resource ID.
2. In the product template, call the snippet with `filters=minishop_product` and `productId` equal to the current resource ID.
3. The list and map keep only matching locations.

## Requirements

- Free and **Pro**
- Published locations under a container (`parents`)
- Product as a MiniShop3 resource (its ID matches the TV on the location)
- The call must include both `filters=minishop_product` and a non-zero `productId` / `product_id`

Without Pro the filter is not registered. In REST and `search.php`, `product_id` is cleared to `0`.

## TV

On Pro install the resolver creates TV `ms3_product_id` (type `number`, category **YandexMapsLocator**) if it does not exist yet.

The TV is not assigned to a template automatically. Attach it to the location resource template, like the other locator TVs.

| Field | Value |
|------|----------|
| Name | `ms3_product_id` |
| Caption | MiniShop3 Product ID |
| Type | number |
| Meaning | MiniShop3 product resource ID |

On each location set the ID of the product available there. Empty or `0` drops the location when `productId` is non-zero.

The filter supports **one product ID per location** today. Several products at one place: separate location resources or a custom filter via [Extension API](../extension-api).

Pro CSV has no column for this TV. Set the value in the resource form or with your own import.

See [Locations and TVs](../integration).

## Filter

Pro class `ProductLocationFilter`, name `minishop_product`, opt-in.

| Condition | Result |
|---------|-----------|
| No `filters=minishop_product` | Filter does not run |
| `productId` ≤ 0 | List is not narrowed |
| `productId` > 0 | Keeps locations where `(int) ms3_product_id === productId` |

Match is by integer product resource ID, not SKU or title.

## Call on the product page

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

Create system setting `yml_stores_parent` yourself or hardcode the container ID.

In the snippet, `productId` and `product_id` are the same. If the product page already rendered a filtered call, AJAX `search.php` receives the same `product_id`.

## Pickup and open now

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

You need a filled `ms3_product_id`, JSON in `yandexmaps_working_hours`, and `yandexmapslocator_timezone`. See [Open now](working-now).

Product plus category:

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'category' => 'pickup',
    'filters' => 'minishop_product,category'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &category=`pickup`
    &filters=`minishop_product,category`
]]
```

:::

## Product template

Place the block below the description:

::: code-group

```fenom
<section class="product-pickup">
    <h2>Pickup</h2>
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
    <h2>Pickup</h2>
    [[!YandexMapsLocator?
        &parents=`[[++yml_stores_parent]]`
        &productId=`[[*id]]`
        &filters=`minishop_product`
        &limit=`30`
    ]]
</section>
```

:::

Call it **uncached**. Requires [pdoTools](/components/pdotools/). Chunks come from Free. Pro does not add its own.

If nothing matches, `tplEmpty` (`yandexmapslocator.empty`) is used.

## REST

In the query: `product_id` (not `productId`) and `filters=minishop_product`.

```text
?route=api/v1/locations&parents=5&product_id=120&filters=minishop_product&fields=id,title,address,coordinates
```

```json
{
  "success": true,
  "data": [
    {
      "id": 18,
      "title": "Mira pickup point",
      "address": "Omsk, Mira ave., 10",
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

Without Pro, `ApiSearchGuard` zeroes `productId` and the list will not narrow by product.

Reference: [REST API](api).

## search.php

Same-origin locator AJAX:

```text
/assets/components/yandexmapslocator/search.php?parents=5&product_id=120&filters=minishop_product
```

Accepts `product_id` and `productId`. Without Pro the value is cleared, same as in REST.

## Empty map

Check in order:

1. Pro is installed and capability `pro` is present.
2. The call includes `filters=minishop_product` and a non-zero `productId`.
3. TV `ms3_product_id` is on the location template and equals the product `[[*id]]`.
4. Locations are published and `parents` is correct.
5. `latitude` / `longitude` are filled.

See [productId does not filter](../faq#productid-does-not-filter).
