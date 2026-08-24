---
title: Checkout and snippets
description: msYandexDelivery and msydLexiconScript snippets, pickup widget on MiniShop3 checkout
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

`msYandexDelivery` registers checkout CSS/JS, the pickup widget script, and `window.msYandexDeliveryFrontend`. The `data-msyd-widget` container renders tariff choice, door address, and the pickup map.

Chunk **`tplYandexDeliveryMethods`** wraps `<div class="msyd-methods" data-msyd-methods>` for the methods list used by the frontend.

## Snippet `msYandexDelivery`

Registers assets and frontend config. Returns an empty string.

| Parameter | Default | Description |
| --- | --- | --- |
| `connectorUrl` | `{assets_url}components/msyandexdelivery/connector.php` | AJAX connector URL |
| `widgetScriptUrl` | from `msyandexdelivery_widget_script_url` or CDN v2 | Widget script URL |
| `city` | from `msyandexdelivery_widget_city` | Map city |
| `height` | from `msyandexdelivery_widget_height` | Widget height, px (minimum 200) |

`widgetScriptUrl`, `city`, and `height` are read from snippet properties even when missing from the build property list.

City override example:

::: code-group

```modx
[[!msYandexDelivery?
  &city=`Санкт-Петербург`
  &height=`500`
]]
```

```fenom
{'!msYandexDelivery' | snippet : [
  'city' => 'Санкт-Петербург',
  'height' => 500,
]}
```

:::

## Snippet `msydLexiconScript`

No parameters. Outputs `window.msydLexicon` with frontend strings. Call it **before** `msYandexDelivery`.

## Checkout flow

1. The shopper selects a Yandex delivery method in MiniShop3.
2. `data-msyd-widget` shows **door** (`time_interval`) and **pickup** (`self_pickup`) tariffs.
3. **Door:** address → `connector.php?action=calculate` → `select_option`.
4. **Pickup:** official widget → `YaNddWidgetPointSelected` → `calculate` + `select_option` with `platform_station_id`.
5. Selection goes to the session and `msOrder.properties.msyandexdelivery` (tariff, platform_station_id, address, price, delivery_days).
6. The `msOnGetDeliveryCost` plugin and `YandexDelivery::getCost()` set the order cost.

Public connector actions (no mgr auth): `calculate`, `select_option`, `list_pickup_points`.

## Pickup widget

Default script: `https://widget-pvz.dostavka.yandex.net/widget.js?v=2`.

The CDN widget shows the **production** point catalog. The test API (`b2b.taxi.tst.yandex.net`) knows only a subset of Moscow stations. If the map returns a point missing from the test API, the service tries to match the address via `pickup-points/list`. Otherwise the shopper sees a catalog mismatch message.

Widget point IDs often include dashes. Some Platform API points expect IDs without dashes. Normalization: `MsYandexDelivery\Support\StationId::normalize()`.
