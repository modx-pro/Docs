---
title: Quick start
description: Install msYandexDelivery, set Base URL, token, warehouse, and verify checkout
---

# Quick start

## Step 1. Install

1. Install [MiniShop3](/components/minishop3/) and **VueTools**.
2. Install **msYandexDelivery**.
3. Clear the MODX cache.

The resolver creates table `msyandex_requests`, settings in namespace `msyandexdelivery`, and two delivery methods (door / PVZ). The component menu opens system settings only. There is no separate CMP.

## Step 2. Base URL and API access

Examples:

| Environment | Example `msyandexdelivery_base_url` |
| --- | --- |
| Test | `https://b2b.taxi.tst.yandex.net` |
| Production | `https://b2b-authproxy.taxi.yandex.net` |

`msyandexdelivery_environment` (`test` / `prod`) only affects UI hints. It does **not** choose the host.

Fill in:

| Key | Purpose |
| --- | --- |
| `msyandexdelivery_base_url` | Platform API host (required) |
| `msyandexdelivery_oauth_token` | Bearer token |
| `msyandexdelivery_platform_station_id` | Sender warehouse ID (point A) |
| `msyandexdelivery_enabled` | `Yes` |

For the PVZ map, set `msyandexdelivery_widget_geo_id` (for example `213` for Moscow) or leave it empty so the city comes from the order address.

## Step 3. Checkout

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

Enable **Яндекс Доставка — до двери** and **Яндекс Доставка — ПВЗ** in MiniShop3.

Check:

1. Door tariff → address in the MS3 form → Calculate → price in the widget.
2. PVZ tariff → map → pick a point → price in the widget.
3. New order: `delivery_cost` is close to `properties.msyandexdelivery.price`.
4. Manager order tab: **Create** → **Confirm** → **Refresh status**. Cancel when needed.

![Yandex Delivery tab on the order card](/components/msyandexdelivery/screenshots/mgr-order-tab.png)

With `msyandexdelivery_log_enabled`, logs go to `core/cache/msyandexdelivery_requests.log` without secrets.

UI details: [Checkout](checkout). Request lifecycle: [Requests and manager](integration).
