---
title: msYandexDelivery
description: Yandex Delivery Platform API (other-day) for MiniShop3 — rates, pickup points, manager requests
author: modx-pro
dependencies: [miniShop3, VueTools]
categories: minishop3
logo: https://modstore.pro/assets/extras/msyandexdelivery/logo-md.png
modstore: https://modstore.pro/packages/delivery/msyandexdelivery
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Checkout and snippets', link: 'checkout' },
  { text: 'Requests and manager', link: 'integration' },
  { text: 'FAQ', link: 'faq' },
]
---

# msYandexDelivery

![Yandex Delivery tab on the order card](/components/msyandexdelivery/screenshots/mgr-order-tab.png)

**msYandexDelivery** connects the [Yandex Delivery Platform API](https://yandex.com/support/delivery-profile/ru/api/other-day/) (Russia other-day delivery) to [MiniShop3](/components/minishop3/) on MODX 3. Shoppers get a rate and choose door delivery or a pickup point at checkout. Managers create and confirm Yandex requests, refresh status by polling the API, and cancel when needed.

Namespace: **`msyandexdelivery`**. Delivery class: `msyandexdelivery\Delivery\YandexDelivery`. There is **no** status webhook. Refresh uses `request/info` (order tab button, Scheduler, or cron).

Start here: [Quick start](quick-start).

## Features

- Rate quotes via `pricing-calculator` (`time_interval` and `self_pickup`)
- Official pickup-point widget v2 (`widget-pvz.dostavka.yandex.net`)
- Selection stored in `msOrder.properties.msyandexdelivery` and table `msyandex_requests`
- Cost injected through `msOnGetDeliveryCost` and `YandexDelivery::getCost()` (`delivery_cost` syncs from option price)
- MiniShop3 order tab on VueTools: create → confirm → refresh → cancel
- Batch status polling via Scheduler or `connector.php?action=sync_statuses`

There is no separate CMP. The menu only opens system settings for namespace `msyandexdelivery`.

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | >= 3.0.3 |
| PHP | >= 8.2 |
| MiniShop3 | >= 1.0.0 |
| VueTools | for the order tab |

## Delivery methods on install

The resolver creates two methods with class `msyandexdelivery\Delivery\YandexDelivery`:

| Tariff | MS3 name |
| --- | --- |
| `time_interval` | Яндекс Доставка — до двери |
| `self_pickup` | Яндекс Доставка — ПВЗ |

IDs go into `msyandexdelivery_delivery_id` (comma-separated). Active payment methods are linked automatically. The package does **not** create payment methods.

## Installation

1. Install MiniShop3 and VueTools.
2. Install **msYandexDelivery**.
3. Clear the MODX cache.
4. Under **System settings → `msyandexdelivery`**, set required [`base_url`](settings), token, and sender station.
5. Enable `msyandexdelivery_enabled` and the Yandex delivery methods in MiniShop3.
6. Add checkout snippets and the widget container — see [Checkout](checkout).

If the transport uses EncryptedVehicle, add the [modstore.pro](https://modstore.pro/extras/) provider in Package Management. Otherwise install fails with `Package provider not found`.

## Sections

| Page | Content |
| --- | --- |
| [Quick start](quick-start) | API keys, checkout, order check |
| [System settings](settings) | All `msyandexdelivery_*` keys |
| [Checkout and snippets](checkout) | `msYandexDelivery`, `msydLexiconScript`, widget |
| [Requests and manager](integration) | Create / Confirm / Refresh / Cancel, status polling |
| [FAQ](faq) | Common errors and limits |
