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

Only active methods are listed. The delivery↔payment link is checked at checkout: submit fails without a valid pair.

`POST /delivery/webhook/{delivery_id}` is a provider callback (signature), not a customer token.

## Order draft

All `/order/*` use token auto-mint.

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

## Submit

After successful `submit` the response may include a redirect (thank-you page / payment). Read `data` and redirect fields/headers in the controller `Response`.

Online payment comes from a payment extra. A base method without `class` only records the choice.

## Typical order

1. `GET /delivery/list`, `GET /payment/list`
2. `POST /order/set` with `delivery_id` / `payment_id` and address
3. `GET /order/delivery/required-fields` if needed
4. `GET /order/cost`
5. `POST /order/submit`

The Fenom storefront can build the form via `msOrder`. Headless uses the lists above. See [Examples](examples).
