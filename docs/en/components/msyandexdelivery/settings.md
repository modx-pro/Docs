---
title: System settings
description: msyandexdelivery namespace keys for API, delivery, PVZ widget, and status polling
---

# System settings

Namespace: **`msyandexdelivery`**. Database key: `msyandexdelivery_<name>`.

In the manager: **System settings** → namespace `msyandexdelivery` (or **msYandexDelivery → System settings**).

## API and delivery

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msyandexdelivery_enabled` | combo-boolean | `0` | Enables rates and requests. When `0`, MiniShop3 runs without Yandex calls |
| `msyandexdelivery_base_url` | textfield | _(empty)_ | **Required.** Platform API host without path. The package does not pick test/prod URLs for you |
| `msyandexdelivery_environment` | textfield | `prod` | `test` / `prod` label for UI hints only. Does not select the host |
| `msyandexdelivery_oauth_token` | text-password | _(empty)_ | OAuth Bearer from the Yandex cabinet. Never exposed to the frontend |
| `msyandexdelivery_timeout` | numberfield | `15` | HTTP timeout to the API, seconds |
| `msyandexdelivery_log_enabled` | combo-boolean | `0` | Log file at `core/cache/msyandexdelivery_requests.log` without secrets |
| `msyandexdelivery_delivery_id` | textfield | _(empty)_ | MS3 delivery method IDs, comma-separated. Empty: look up by class `YandexDelivery` |
| `msyandexdelivery_platform_station_id` | textfield | _(empty)_ | Sender warehouse `platform_station_id` (point A) |
| `msyandexdelivery_default_tariff` | textfield | `time_interval` | `time_interval` (door) or `self_pickup` (pickup point) |
| `msyandexdelivery_payment_method` | textfield | `already_paid` | Offer payment method: `already_paid`, `card_on_receipt`, or `postpay` |
| `msyandexdelivery_cache_ttl` | numberfield | `3600` | Quote cache TTL (reserved) |
| `msyandexdelivery_default_weight` | numberfield | `1000` | Default weight, grams |
| `msyandexdelivery_default_length` | numberfield | `30` | Place length, cm (`dx`) |
| `msyandexdelivery_default_width` | numberfield | `20` | Place width, cm (`dy`) |
| `msyandexdelivery_default_height` | numberfield | `10` | Place height, cm (`dz`) |
| `msyandexdelivery_weight_coefficient` | textfield | `1` | Weight multiplier for quotes |

## PVZ widget

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msyandexdelivery_widget_geo_id` | numberfield | _(empty)_ | Yandex city `geo_id` for the map center (`213` Moscow, `2` SPb). Not a pickup-point id. Empty: city from the order address |
| `msyandexdelivery_widget_city` | textfield | `Москва` | Fallback Russian city name when `geo_id` and address city are missing |
| `msyandexdelivery_widget_height` | numberfield | `450` | Widget height, px (minimum 200) |
| `msyandexdelivery_widget_show_select_button` | combo-boolean | `1` | Confirm the point only via the widget Continue button |
| `msyandexdelivery_widget_script_url` | textfield | _(empty)_ | Script URL override. Empty → `https://widget-pvz.dostavka.yandex.net/widget.js?v=2` |

## Status polling

Other-day API has no webhook. Statuses update via poll: order tab button, Scheduler, or cron.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msyandexdelivery_sync_poll_enabled` | combo-boolean | `1` | Allow batch polling. When `0`, the task returns `poll_disabled` |
| `msyandexdelivery_sync_poll_limit` | numberfield | `50` | Active requests per run (1–200) |
| `msyandexdelivery_sync_secret` | textfield | _(empty)_ | Secret for `connector.php?action=sync_statuses` without a manager login |

Details: [Requests and manager](integration#status-polling).

## Base URL examples

| Environment | Example |
| --- | --- |
| Test | `https://b2b.taxi.tst.yandex.net` |
| Production | `https://b2b-authproxy.taxi.yandex.net` |

Confirm values against [API access](https://yandex.com/support/delivery-profile/ru/api/other-day/access).
