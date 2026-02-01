---
title: ms_CDEK2
description: CDEK delivery calculation component.
outline: [ 2,3 ]
lastUpdated: true
logo: https://mscdek2.art-sites.ru/assets/components/ms_cdek2/img/cdek.png
modstore: https://modstore.pro/packages/delivery/ms-cdek2
author: ShevArtV
items: [
  { text: 'Getting started', link: 'index' },
  { text: 'Snippets', link: 'snippets' },
  { text: 'Events', link: 'events' },
  { text: 'Development', link: 'development' },
]
dependencies: [ 'miniShop2', 'SendIt' ]
---

# ms_CDEK2

::: warning
This documentation is for component version 2.4.1 and above.
:::

::: warning
The `msDeliveryProps` component is no longer required.
:::

## Requirements

1. MODX 2.8.x
2. PHP >=7.4
3. MySQL 5.7

## Features

1. Delivery cost calculation according to configured tariffs.
2. Pickup point selection from list or map (requires [Yandex JavaScript API and HTTP Geocoder token](https://developer.tech.yandex.ru/)).
3. Address suggestions from DaData.

## How it works

The component needs a postal code in field `[name="index"]` to calculate delivery. The user can type it or you can enable address suggestions so the code is filled when a suggestion is chosen.

After the code is received, standard miniShop2 logic runs and delivery cost is calculated. On `Order.getcost.response.success`, if pickup delivery is selected, the pickup list is loaded; in any case delivery status (all data from CDEK API) is loaded to show the user if the page has the right block.

If the pickup list was loaded and the page has a map block, the map is drawn. Selecting a pickup in the list moves the map to its coordinates and highlights the marker. Selecting on the map updates the list.

:::info
The component can use country: add field `[name="country"]`. Country is used for suggestions, pickup list, and cost calculation.
:::

## Quick start

:::  warning
With SendIt 2.4.0+, the checkout page must have at least one html element with attribute `data-si-form`
:::

::: info
None of the html blocks below are required for delivery cost calculation except the postal code field.
:::

After installing, complete the first 6 steps:

1. Go to system settings and select namespace ms_cdek2;
2. Set ms_cdek2_login and ms_cdek2_password;
3. Set sender postal code in ms_cdek2_sender_index;
4. Set delivery method IDs in ms_cdek2_deliveries (door — door delivery, pvz — pickup);
   :::details
   E.g. door ID 9, pickup 10: `{"door":"9","pvz":"10"}`.
   :::
5. Set delivery IDs and CDEK tariff IDs in ms_cdek2_tariffs (door tariff 137, pickup 136);
   :::details
   E.g. door ID 9, pickup 10: `{"9":"137","10":"136"}`.
   :::
6. Set checkout form template ID in ms_cdek2_template (so frontend scripts load only on that template);
7. If using pickup delivery, add to the checkout form chunk:

```html:line-numbers
 <div data-mscdek-list></div>
```

:::info
If shipping is not from Russia, set sender country in ms_cdek2_sender_country.
:::

::: warning
The pickup list must be in a select as in chunk `mscdekListWrap`, or not shown at all.
:::

::: info
If you do not show the pickup list, use a hidden field instead of the list block:

```html:line-numbers
<div class="hide" data-mscdek-list></div>
```

Hidden field

```html:line-numbers
<input type="hidden" name="point">
```

:::

## Map with pickup list

1. [Get a key](https://developer.tech.yandex.ru/) for JavaScript API and HTTP Geocoder;
2. Set it in ms_cdek2_yandex_api_key;
3. Add to the checkout template:

```html:line-numbers
<div class="hide" data-mscdek-map></div>
```

## Address suggestions

1. [Get a token](https://dadata.ru/api/suggest/address/) from DaData;
2. Set it in ms_cdek2_dadata_token;
3. Add attribute `data-mscdek-suggest-field` to the address input;
4. Add to the checkout template:

```html:line-numbers
<ul class="hide" data-mscdek-suggest-list></ul>
```

## Delivery timeframe

1. Add to the checkout template:

```html:line-numbers
<div class="hide" data-mscdek-status></div>
```

## Package count calculation

From 2.6.0 the component can calculate package count in several ways. Method is set in ms_cdek2_packages_calc_type.
Possible values:

* `0` — one package (default);
* `1` — one package per unique product in cart;
* `2` — one package per product in cart;
* `3` — from volume of one package (volume from ms_cdek2_default_size). E.g. product 20×30×10 cm, 1 kg, qty 3; ms_cdek2_default_size 20×30×20 → two packages:

```php:line-numbers
$packages = [
    [
        'weight' => 2,
        'length' => 20,
        'width' => 30,
        'height' => 20
    ],
    [
        'weight' => 1,
        'length' => 20,
        'width' => 30,
        'height' => 10
    ],
];
```

* `4` — one package, size and weight from system settings.
* `5` — one package, size from settings, weight = sum of cart product weights.

Settings ms_cdek2_use_product_count, ms_cdek2_use_individual_sizes, ms_cdek2_use_individual_weight control whether real quantity, product dimensions, and product weight are used. Default is false (use default size/weight and count = 1).

::: warning
For methods 0,1,2,3 use ms_cdek2_default_size for single product package size; for 4,5 use full package size. Same for ms_cdek2_package_default_weight.
:::

::: info
For 0,1,3: package weight = sum of (product weight × qty); length/width = max of products; height = sum of heights (stacked). For 2: package = product. For 4,5: from settings.
:::

## International delivery

CDEK supports *Kazakhstan* and *Belarus*. Pass recipient country in order field `country`.

::: warning
miniShop2 does not handle select fields; for a country select you need JS:

```js:line-numbers
const countryField = document.querySelector('select[name="country"]');
countryField && countryField.addEventListener('change', () => {
    miniShop2.Order.add('country', countryField.value);
 });
```

:::

If DaData token is not set, use country code *ISO 3166-1 alpha 2*. Otherwise use country name in Russian.
