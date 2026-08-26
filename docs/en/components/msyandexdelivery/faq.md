---
title: FAQ
description: Common msYandexDelivery errors — Base URL, test API, PVZ widget, statuses, and cancel
---

# FAQ

## Validation error / empty Base URL

The package requires `msyandexdelivery_base_url`. Without a host the client does not call the API. Set the test or prod host from [API access](https://yandex.com/support/delivery-profile/ru/api/other-day/access). The `environment` label does not choose the host.

## 401 / 403 from the API

Check the Bearer in `msyandexdelivery_oauth_token` and that `base_url` matches the token environment (test vs prod).

## Test API returns «Not found station»

The test API knows a limited set of points (mostly Moscow). The CDN PVZ widget shows the prod catalog. A map point may be missing from the tst API.

For manual checks, take `platform_station_id` from `pickup-points/list` or from `docs/testing.md` in the package repository.

## Map price and order price differ

The widget shows public map rates. The order total comes from your `pricing-calculator` after `calculate` / `select_option`.

## Order has `delivery_cost = 0` but properties already have a price

Saving the option syncs `delivery_cost` from `option.price` and aligns tariff with `delivery_id`. Check a new order after a checkout quote.

Old orders with zero `delivery_cost` are not recalculated automatically. If you need analytics on them, align manually (the package repo has helper `msyd_sync_order_delivery_cost_from_offer()`).

## Form has an address but the widget asks for one

You need a form with class `ms3_order_form` and loaded `ms3.js`. The widget listens to `change`/`input`, the `afterAddOrder` hook, and `ms3:ready`. After a package update, clear the MODX cache and hard-refresh checkout.

## Checkout «breaks» when the component is disabled

With `msyandexdelivery_enabled = No`, Yandex calls are skipped. MiniShop3 should behave as without the package. If a Yandex delivery method is still selected, disable or hide those methods in MS3.

## No order tab in the manager

You need a working **VueTools** install. There is no separate CMP: the menu only opens system settings.

## How do I cancel a request?

On the order tab click **Cancel**. The connector runs `cancel_request` → `POST …/request/cancel`. The button is unavailable after courier handoff and on terminal statuses. Alternative: the Yandex Delivery cabinet.

## Where is the webhook?

There is none. Other-day API does not send callbacks. Refresh with the **Refresh** button or batch polling ([Scheduler / cron](integration#status-polling)).
