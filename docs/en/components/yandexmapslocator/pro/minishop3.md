---
title: MiniShop3
description: 'Product pickup map: YandexMapsLocator Pro and MiniShop3'
---

# MiniShop3

**Pro.** On a general "Stores" page Free shows the whole network. On a MiniShop3 product page you usually need a map with only pickup points for that product.

How to wire it:

1. On the location TV set product IDs: `ms3_product_ids` (multiple) or legacy `ms3_product_id` (single).
2. On the product template call the snippet with `productId` = current resource ID.
3. List and map keep only matching locations.

Parameter `productId` / `product_id` activates the MiniShop3 filter automatically. Explicit `filters=minishop_product` is optional but can be combined with other filters.

## Requirements

- Free and **Pro**
- Published locations under the container (`parents`)
- Product as a MiniShop3 resource (its ID matches the location TV)
- Non-zero `productId` / `product_id` in the call

Without Pro the filter is not registered. In REST and `search.php` parameter `product_id` is reset to `0`.

## TVs

On Pro install the resolver creates TVs (if missing), category **YandexMapsLocator**:

| TV | Type | Meaning |
|----|------|---------|
| `ms3_product_id` | number | Single product resource ID (legacy) |
| `ms3_product_ids` | text | Multiple IDs: `25,26` or JSON `[25,26]`. When set, wins over `ms3_product_id` |

TVs are not bound to templates automatically. Assign them to the location template.

Empty value with non-zero `productId` excludes the location.

Pro CSV has both columns. See [CSV in the manager](manager), [Locations and TVs](../integration).

## Filter

Pro class `ProductLocationFilter`, name `minishop_product`.

| Condition | Result |
|-----------|--------|
| `productId` ≤ 0 | List is not filtered |
| `productId` > 0 | Locations where product ID is in TV list remain |

Compares the product resource ID. Not SKU or title.

## Call on the product page

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

Create setting `yml_stores_parent` yourself or use a numeric container ID.

In the snippet `productId` and `product_id` are the same. If the product page already calls with `productId`, AJAX `search.php` gets `product_id` too.

## Pickup and open now

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

Requires filled product IDs, JSON in `yandexmaps_working_hours`, and location/network timezone. See [Open now](working-now).

Product plus category:

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

## On the product template

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

Call must be **uncached**. Requires [pdoTools](/en/components/pdotools/). Chunks come from Free. Pro adds none.

If there are no matches, `tplEmpty` (`yandexmapslocator.empty`) is used.

## REST

In query use `product_id` (not `productId`). Explicit `filters=minishop_product` is optional.

```text
?route=api/v1/locations&parents=5&product_id=120&fields=id,title,address,coordinates
```

Without Pro `ApiSearchGuard` zeroes `productId` and the list is not narrowed by product.

Reference: [REST API](api).

## search.php

```text
/assets/components/yandexmapslocator/search.php?parents=5&product_id=120
```

Accepts `product_id` and `productId`. Without Pro the value is reset, same as REST.

## Empty map

1. Pro installed, capability `pro` present.
2. Non-zero `productId` in the call.
3. TV `ms3_product_ids` or `ms3_product_id` on the template and contains the product ID.
4. Locations published, correct `parents`.
5. `latitude` / `longitude` filled.

See [productId does not filter](../faq#productid-does-not-filter).
