---
title: Payment methods
---
# Payment methods

<!-- ![Settings → Payments](/components/minishop3/screenshots/mgr-payments.png) -->

Open **Extras → MiniShop3 → Settings → Payments**.

## For the store owner

1. Create a payment method: name, description, logo, and the active flag.
2. Link it to the [deliveries](/en/components/minishop3/interface/settings/deliveries) you need. Without that link the customer cannot pick the pair on the storefront.
3. For payment on delivery, leave `class` empty. The order stores the selected `payment_id`.
4. For online payment, install a payment extra from the catalog (for example [msp3YooKassa](/en/components/msp3yookassa/), [mspTBank](/en/components/msptbank/), [msp3Sberbank](/components/msp3sberbank/)) and set the handler class in `class`, as that package's docs describe.
5. Check the redirect after payment: `ms3_order_success_page_id` and the Thank-you page with `msGetOrder`.

Surcharge in the `price` field:

- `100` is a fixed amount added to the order
- `3%` is a percent of the total

## Payment fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Payment method name |
| `description` | text | Description for the customer |
| `price` | string | Surcharge (a number or a percent) |
| `logo` | string | Path to the image |
| `position` | int | Sort order |
| `active` | bool | Active flag |
| `class` | string | PHP class of the payment handler |
| `properties` | JSON | Handler settings |

## Link with delivery

You edit the pairs on the delivery card. Typical sets:

- Pickup: cash, card on delivery
- Courier: cash, card, online
- Post: cash on delivery, online

## Payment handlers

There are no built-in handlers. Online payment comes from a payment extra in the catalog, or from your own class. The class extends the abstract `Payment` and is set on the payment method card. Ready-made payment services are described in the extra's documentation. Only `send()` and `receive()` are required:

```php
<?php
namespace MyComponent\Payment;

use MiniShop3\Controllers\Payment\Payment;
use MiniShop3\Model\msOrder;

class MyPayment extends Payment
{
    public function send(msOrder $order): array
    {
        // Create a payment at the provider. return_url: ms3_order_success_page_id
        // Payment row of the method: $this->config['payment']
        return [
            'success' => true,
            'data' => ['payment_link' => '...'],
        ];
    }

    public function receive(msOrder $order): array
    {
        // Provider webhook or callback
        return ['success' => true, 'message' => 'Payment received'];
    }
}
```

You do not need to override the constructor. The base `Payment::__construct(MiniShop3 $ms3, array $config = [])` sets `$this->modx` and `$this->ms3`. The service builds the handler as `new $class($ms3, ['payment' => $payment])`. If you need keys from `properties`, call `parent::__construct($ms3, $config)` in your own constructor. `getCost()` (the surcharge from the `price` field), `getPaymentLink()`, and `getOrderHash()` (HMAC-SHA256 over `ms3_payment_secret`) are already implemented in the base class. Override only your own logic.

Registration in the `class` field:

```text
MyComponent\Payment\MyPayment
```

Payment service secrets go in `properties` (JSON) on the payment card:

```json
{
  "shop_id": "123456",
  "secret_key": "live_xxx...",
  "test_mode": false
}
```

In code: `$this->config['payment']->get('properties')`.

## Payment notifications (webhook / callback)

MiniShop3 core has **no** ready-made `payment/handler.php`. The payment extra sets the notification URL (for example `webhook.php` or `callback.php` under `assets/components/{ns}/`). See the docs of that payment service ([msp3YooKassa](/en/components/msp3yookassa/), [mspTBank](/en/components/msptbank/), and others).

The payment class implements `send()` and accepts the notification. From that notification it changes the order status. The payment link in emails and in `msGetOrder` is built by `PaymentLinkResolver`.

```mermaid
flowchart TB
  OrderDraft[Order_draft] --> SetPayment[payment_id_storefront_or_API]
  SetPayment --> SendMethod[PaymentProvider_send]
  SendMethod --> PaymentLink[payment_link_at_the_provider]
  PaymentLink --> Redirect[Payment_page_or_ms3_order_success_page_id]
  WebhookUrl[webhook_or_callback_in_the_extra] --> ReceiveMethod[PaymentProvider_receive]
  ReceiveMethod --> OrderStatus[Order_status]
  PaymentLinkResolver[PaymentLinkResolver] --> MsGetOrder[msGetOrder_and_notifications]
  EmptyClass[class_empty] --> OnlyPaymentId[payment_id_only_no_online]
```

## API

### Deliveries and payments in the order draft

Public lists (no token): `GET /api/v1/delivery/list`, `GET /api/v1/payment/list`. There is no separate `GET /api/v1/order/payments`.

The draft:

```http
GET /api/v1/order/get
```

`data.order` holds the order fields, including `delivery_id` / `payment_id` and `address_*`. To change the method, call `POST /api/v1/order/add` or `POST /api/v1/order/set` with a wrapper body `{"fields": {"payment_id": 2}}`. The Fenom storefront can render the choice through `msOrder`.

### Payment cost

```http
GET /api/v1/order/cost/payment?payment_id=2
```

**Response:**

```json
{
    "success": true,
    "data": {
        "cost": 150.00
    }
}
```

Full totals (cart, delivery, and payment): `GET /api/v1/order/cost`. Web API map: [Checkout](/en/components/minishop3/development/web-api/checkout).

## Payment link (`payment_link`)

On the thank-you page and in emails, `PaymentLinkResolver` (`ms3_payment_link_resolver`) builds the payment URL:

- in **msGetOrder**, the `payStatus` parameter (a CSV of statuses)
- in **notifications**, the setting `ms3_payment_link_statuses` (a CSV of status ids, hidden, not declared in System settings, set directly in the database or in code). If it is empty, `ms3_status_new` is used
- the link is **not** shown for final statuses or the paid status

The payment method handler must return a URL from the payment method (see the `send()` example above). Details: [msGetOrder](/en/components/minishop3/snippets/msgetorder#payment-link).
