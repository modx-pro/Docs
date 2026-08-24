---
title: System settings
description: msyandexdelivery namespace keys for API, delivery, and pickup widget
---

# System settings

Namespace: **`msyandexdelivery`**. Database key: `msyandexdelivery_<name>`.

In the manager: **System settings** → namespace `msyandexdelivery` (or the component settings menu item).

## API and delivery

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msyandexdelivery_enabled` | combo-boolean | `0` | Enables quotes and requests. When `0`, MiniShop3 runs without Yandex calls |
| `msyandexdelivery_base_url` | textfield | _(empty)_ | **Required.** Platform API host without path. The component does not pick test/prod URLs for you |
| `msyandexdelivery_environment` | textfield | `test` | UI label `test` / `prod`. Does not select the host |
| `msyandexdelivery_oauth_token` | text-password | test Bearer from Yandex docs | OAuth Bearer. Never sent to the frontend |
| `msyandexdelivery_timeout` | numberfield | `15` | HTTP timeout to the API, seconds |
| `msyandexdelivery_log_enabled` | combo-boolean | `0` | Log file `core/cache/msyandexdelivery_requests.log` without secrets |
| `msyandexdelivery_delivery_id` | textfield | _(empty)_ | MS3 delivery IDs, comma-separated. Empty — find by class `YandexDelivery` |
| `msyandexdelivery_platform_station_id` | textfield | test warehouse A | Sender `platform_station_id` |
| `msyandexdelivery_default_tariff` | textfield | `time_interval` | `time_interval` (door) or `self_pickup` (pickup) |
| `msyandexdelivery_cache_ttl` | numberfield | `3600` | Quote cache TTL (reserved) |
| `msyandexdelivery_default_weight` | numberfield | `1000` | Default weight, grams |
| `msyandexdelivery_default_length` | numberfield | `30` | Place length, cm (`dx`) |
| `msyandexdelivery_default_width` | numberfield | `20` | Place width, cm (`dy`) |
| `msyandexdelivery_default_height` | numberfield | `10` | Place height, cm (`dz`) |
| `msyandexdelivery_weight_coefficient` | textfield | `1` | Weight multiplier for quotes |

## Pickup widget

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msyandexdelivery_widget_city` | textfield | `Москва` | Map city when the widget opens |
| `msyandexdelivery_widget_height` | numberfield | `450` | Widget height, px (minimum 200) |
| `msyandexdelivery_widget_show_select_button` | combo-boolean | `1` | Confirm point only via the widget Continue button |
| `msyandexdelivery_widget_script_url` | textfield | _(empty)_ | Script URL override. Empty — `https://widget-pvz.dostavka.yandex.net/widget.js?v=2` |

## Base URL examples

| Environment | Example |
| --- | --- |
| Test | `https://b2b.taxi.tst.yandex.net` |
| Production | `https://b2b-authproxy.taxi.yandex.net` |

Confirm hosts against [API access](https://yandex.com/support/delivery-profile/ru/api/other-day/access).
