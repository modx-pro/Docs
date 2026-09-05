---
title: Checkout and snippets
description: msYandexDelivery and msydLexiconScript snippets, PVZ widget, and MiniShop3 form binding
---

# Checkout and snippets

## Markup

In the order form chunk:

::: code-group

```modx
[[!msydLexiconScript]]
[[!msYandexDelivery]]
<div data-msyd-widget></div>
```

```fenom
{'!msydLexiconScript' | snippet}
{'!msYandexDelivery' | snippet}
<div data-msyd-widget></div>
```

:::

Snippet `msYandexDelivery` registers checkout CSS/JS and `window.msYandexDeliveryFrontend`. The PVZ CDN script loads on demand when tariff `self_pickup` is active. The `data-msyd-widget` block stays hidden until a Yandex delivery method is selected.

Chunk **`tplYandexDeliveryMethods`** wraps `<div class="msyd-methods" data-msyd-methods>` for the methods list.

## Snippet `msYandexDelivery`

Purpose: register assets and frontend config. Returns an empty string.

| Parameter | Default | Description |
| --- | --- | --- |
| `connectorUrl` | `{assets_url}components/msyandexdelivery/connector.php` | AJAX connector URL |
| `widgetScriptUrl` | from `msyandexdelivery_widget_script_url` or CDN v2 | Widget script URL |
| `city` | from city resolve | Fixed city name for the map. Prefer `&geoId=` for a storefront |
| `geoId` | from `msyandexdelivery_widget_geo_id` | Map center `geo_id`. Alias: `geo_id` |
| `height` | from `msyandexdelivery_widget_height` | Widget height, px (minimum 200) |

City priority for the map:

1. `&city=`
2. `&geoId=` / `widget_geo_id`
3. City from the draft order address
4. `widget_city`
5. Moscow (`213`)

Example for a SPb storefront:

::: code-group

```modx
[[!msYandexDelivery?
  &geoId=`2`
  &height=`500`
]]
```

```fenom
{'!msYandexDelivery' | snippet : [
  'geoId' => 2,
  'height' => 500,
]}
```

:::

## Snippet `msydLexiconScript`

No parameters. Outputs `window.msydLexicon` with frontend labels. Call it **before** `msYandexDelivery`.

## Checkout flow

1. The shopper picks a Yandex delivery method in MiniShop3.
2. `data-msyd-widget` shows the door panel (`time_interval`) or the PVZ map (`self_pickup`) for the selected `msDelivery` tariff.
3. **Door:** address from `form.ms3_order_form` → `connector.php?action=calculate` → `select_option`.
4. **PVZ:** official widget → `YaNddWidgetPointSelected` → `calculate` + `select_option` with `platform_station_id`.
5. The choice goes to the session and `msOrder.properties.msyandexdelivery` (tariff, platform_station_id, address, price, delivery_days).
6. The `msOnGetDeliveryCost` plugin and `YandexDelivery::getCost()` inject the cost. Saving the option syncs `delivery_cost` from `option.price` and aligns tariff with `delivery_id`.

Public connector actions (no mgr auth): `calculate`, `select_option`, `list_pickup_points`.

### MS3 form binding

`yandexdelivery.js` listens to:

- `ms3Hooks.addHook('afterAddOrder', …)` when delivery or address fields change (retry until `ms3Hooks` loads)
- `ms3:ready` when checkout opens
- `change` and `input` on address fields

Before Calculate, the widget reads the address from the form. If the form has an address but the widget still asks for one, check class `ms3_order_form`, that `ms3.js` is loaded, and that the snippet JS `?v=` is fresh.

## PVZ widget

![Checkout: PVZ map](/components/msyandexdelivery/screenshots/fe-checkout-pvz.png)

Default script: `https://widget-pvz.dostavka.yandex.net/widget.js?v=2`.

The CDN widget shows the **prod** pickup catalog. The test API (`b2b.taxi.tst.yandex.net`) knows only a subset of Moscow stations. If the map returns a point missing from the test API, the service tries to match the address via `pickup-points/list`. Otherwise the shopper sees a catalog mismatch message.

Widget pickup IDs often include dashes. Platform API expects dashless IDs for some stations. Normalization: `MsYandexDelivery\Support\StationId::normalize()`.

### Where to get `geoId`

It is a region/city `geo_id` from [location/detect](https://yandex.ru/support/delivery-profile/ru/api/other-day/ref/2.-Tochki-samoprivoza-i-PVZ/apib2bplatformlocationdetect-post), not a pickup-point or warehouse id.

Common values: Moscow `213`, Saint Petersburg `2`, Kazan `43`, Yekaterinburg `54`, Novosibirsk `65`.
