---
title: Quick start
description: Install msYandexDelivery, set Base URL, token, station, and verify checkout
---

# Quick start

## Step 1. Install

1. Install [MiniShop3](/components/minishop3/) and **VueTools**.
2. Install **msYandexDelivery**.
3. Clear the MODX cache.

The resolver creates table `msyandex_requests`, namespace settings `msyandexdelivery`, and two delivery methods (door / pickup).

## Step 2. Base URL and API access

The API host is **not** hard-coded. Set `msyandexdelivery_base_url` yourself (no trailing `/`, no path). Current hosts: [API access](https://yandex.com/support/delivery-profile/ru/api/other-day/access).

Examples:

| Environment | Example `msyandexdelivery_base_url` |
| --- | --- |
| Test | `https://b2b.taxi.tst.yandex.net` |
| Production | `https://b2b-authproxy.taxi.yandex.net` |

`msyandexdelivery_environment` (`test` / `prod`) only drives UI hints. It does **not** select the host.

Fill in:

| Key | Purpose |
| --- | --- |
| `msyandexdelivery_base_url` | Platform API host (required) |
| `msyandexdelivery_oauth_token` | Bearer token |
| `msyandexdelivery_platform_station_id` | Sender station (point A) |
| `msyandexdelivery_enabled` | `Yes` |

Test installs may ship with public token and warehouse A from Yandex docs. Replace them before production.

## Step 3. CMP checks

Open the **msYandexDelivery** menu item (VueTools required).

1. **Test connection** — ping the API with current settings.
2. **Test calculate** — door quote (Moscow address on test) or pickup with a known `platform_station_id`.

With `msyandexdelivery_log_enabled`, the log is `core/cache/msyandexdelivery_requests.log` (secrets redacted).

## Step 4. Checkout

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

Verify:

1. Door tariff → address → calculate → select.
2. Pickup tariff → map → choose point → price on the order.
3. Manager order tab: **Create** → **Confirm** → **Refresh status**.

UI details: [Checkout](checkout). Request lifecycle: [Requests and manager](integration).
