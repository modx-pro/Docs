---
title: FAQ
description: Common msYandexDelivery issues — Base URL, test API, pickup widget, cancel
---

# FAQ

## Validation error / empty Base URL

The component requires `msyandexdelivery_base_url`. Without a host the client will not call the API. Set the test or prod host from [API access](https://yandex.com/support/delivery-profile/ru/api/other-day/access). The `environment` label does not choose the host.

## Test connection returns 401 / 403

Check the Bearer in `msyandexdelivery_oauth_token` and that `base_url` matches the token environment (test vs prod).

## Test API returns «Not found station»

The test API knows a limited set of points (mostly Moscow). The CDN pickup widget shows the production catalog. A map point may be missing from the tst API.

For manual checks, take `platform_station_id` from `pickup-points/list` or from `docs/testing.md` in the component repository.

## Widget map price differs from the order

The widget shows public map tariffs. The order total comes from your `pricing-calculator` after `calculate` / `select_option`.

## Disabled component breaks checkout

With `msyandexdelivery_enabled = No`, Yandex calls are skipped. MiniShop3 should behave as without the package. If a Yandex delivery method is still selected, disable or hide those methods in MS3.

## No tab / CMP in the manager

You need a working **VueTools** install. Without it the Vue screens will not load.

## How do I cancel a request from the manager?

Cancel via the connector is not available yet: `cancel_request` is not implemented in the `switch`. The client has `request/cancel`. Cancel in the Yandex cabinet or wait for UI support.

## Where is the webhook?

There is none. Other-day API does not send callbacks. Refresh status with **Refresh** on the order tab.
