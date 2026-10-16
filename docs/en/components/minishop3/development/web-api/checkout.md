---
title: Web API checkout
description: "Delivery, payment, order draft, cost, and submit"
---

# Checkout

Headless chain: catalog → cart → delivery/payment choice → order fields → cost → submit.

## Public lists

No customer token:

| Method | Path |
| --- | --- |
| `GET` | `/delivery/list` |
| `GET` | `/delivery/get/{id}` |
| `GET` | `/payment/list` |
| `GET` | `/payment/get/{id}` |

Only active methods are listed. The delivery↔payment link is checked at checkout: without a valid pair, `submit` fails.

Provider webhooks are authenticated by the handler's own signature, not by a customer token. API prefix: `/api/v1`.

| Method | Path | Condition |
| --- | --- | --- |
| `POST` | `/delivery/webhook/{delivery_id}` | Requires a delivery handler; returns 404 when `ms3_shipment_enabled=0` |
| `POST` | `/payment/webhook/{payment_method_id}` | Requires a payment class that implements `PaymentWebhookHandlerInterface`; otherwise 400 |

Payment webhook chain: JSON body → `verifyWebhook` → `parseWebhook` → `PaymentLifecycleService::applyWebhook`. On success the response returns `attempt_id`, `status`, and `order_id`. The classic `webhook.php` / `callback.php` entry points in payment extras keep working as long as the payment class does not implement the Web API interface.

## Order draft

All `/order/*` routes use token auto-mint.

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/order/get` | Draft |
| `POST` | `/order/add` | One field |
| `POST` | `/order/set` | Multiple fields |
| `POST` | `/order/remove` | Remove field |
| `POST` | `/order/clean` | Clear draft |
| `POST` | `/order/address/set` | Apply saved address |
| `POST` | `/order/address/clean` | Clear address |
| `GET` | `/order/delivery/validation-rules` | Field rules by delivery |
| `GET` | `/order/delivery/required-fields` | Required fields |
| `GET` | `/order/cost` | Full calculation |
| `GET` | `/order/cost/cart` | Cart only |
| `GET` | `/order/cost/delivery` | Delivery |
| `GET` | `/order/cost/payment` | Payment fee |
| `POST` | `/order/submit` | Submit |

Typical draft fields: `delivery_id`, `payment_id`, `address_*`, and contact fields. The exact set depends on delivery rules.

### Fields the storefront may not change

Since 1.14.2-beta1 the internal draft columns are closed for storefront writes. Before that `/order/add` accepted any key backed by a column of the same name: a visitor holding their own cart token could set someone else's `customer_id` or zero out `cost`.

| Object | Closed columns |
| --- | --- |
| Order | `id`, `user_id`, `customer_id`, `token`, `uuid`, `idempotency_key`, `createdon`, `updatedon`, `num`, `cost`, `cart_cost`, `delivery_cost`, `weight`, `status_id`, `context`, `properties` |
| Address | `id`, `order_id`, `createdon`, `updatedon`, `properties` |

Writable: form fields (`delivery_id`, `payment_id`, `order_comment`), the remaining address columns, and your own columns added through Extra fields. A key that matches no order or address column still lands in `properties['_validated']`.

What happens on a closed key:

| Request | Response |
| --- | --- |
| `POST /order/add` | `400`, `error_code: business_rule`, lexicon `ms3_err_field_protected` |
| `POST /order/set` | `422`, `error_code: validation_failed`, the key appears in `errors` |
| `POST /order/remove` | `404`, lexicon `ms3_err_field_nf` |
| `POST /order/submit` | the key in `data` is dropped silently, checkout continues |

::: tip Writing an internal order field from an add-on
`OrderFieldManager` constants hold the closed list. To change it, override the `ms3_order_field_manager` DI key with your own subclass in [`core/config/ms3.services.d/*.php`](/en/components/minishop3/development/services) — that directory sits outside the component and survives upgrades. From PHP the internal fields are reachable without the override: `OrderDraftManager::updateField()`, `attachCustomer()`, `setDeliveryCost()`.
:::

## Submit

After a successful `submit` the response may include a redirect (thank-you page or payment). Read the `data` and the redirect fields and headers from the controller `Response`.

Online payment is handled by a payment extra. A base method without `class` only records the choice.

## Typical sequence

1. `GET /delivery/list`, `GET /payment/list`
2. `POST /order/set` with `delivery_id` / `payment_id` and address
3. `GET /order/delivery/required-fields` if needed
4. `GET /order/cost`
5. `POST /order/submit`

A Fenom storefront can build the form with `msOrder`; headless clients use the lists above. See [Examples](examples).
