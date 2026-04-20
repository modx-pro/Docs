---
title: msp3YooKassa integration
description: Webhooks, one- and two-stage payments, Capture processor, receipt event
---

# msp3YooKassa integration

First-time setup walkthrough: [Quick start](quick-start).

How msp3YooKassa maps to the official YooKassa docs and the **msp3YooKassa** codebase. The narrative is similar to the [ModStore page for mspYooKassa (MS2)](https://modstore.pro/packages/payment-system/mspyookassa), but paths, settings, and classes are for **MiniShop3**.

## Mapping to the YooKassa API

| [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start) step | In msp3YooKassa |
|---------------------------------------------------------------------------------------------------|-----------------|
| `POST /v3/payments` with `amount`, `capture`, `confirmation.type = redirect`, `return_url` | `YooKassaPayment::send()` → SDK `createPayment()`, `return_url` from `getReturnUrl()` ([`success_url` / `fail_url`](/en/components/msp3yookassa/settings) or MS3 thanks page) |
| [Idempotence-Key](https://yookassa.ru/developers/using-api/interaction-format#idempotence) | Order UUID or generated key |
| Redirect buyer to `confirmation_url` | Payment handler response with `redirect` / `payment_link` for the MS3 frontend |
| Wait for `succeeded` / handle cancel | Primarily [webhooks](https://yookassa.ru/developers/using-api/webhooks) → `webhook.php` → `WebhookHandler` |

User confirmation for **redirect** is described under [Payment process](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#user-confirmation). [One- vs two-stage](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel) maps to API `capture`: `true` in `YooKassaPayment`, `false` in `YooKassaTwoStagePayment`.

## HTTP notifications (webhook)

In the YooKassa dashboard, configure the notification URL for your site:

```text
https://your-domain.com/assets/components/msp3yookassa/webhook.php
```

See [Webhooks](https://yookassa.ru/developers/using-api/webhooks) for event types and verification. Extend `webhook.php` if you enable stricter notification checks.

## Test shop

Use a [test shop and test keys](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing) (`test_…` secret key) in `msp3yookassa.shop_id` / `msp3yookassa.secret_key`. Pay with [test cards](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing#test-bank-card) only — **never real cards** in test mode.

For production, switch to live Shop ID and secret key from the [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start) guidance.

## 54-FZ receipts

Enable [`msp3yookassa.payment_receipt`](settings) and set [`msp3yookassa.vat_code`](settings). A `receipt` object is added to `createPayment` (order lines, delivery if `delivery_cost > 0`, customer email). See [Receipt basics](https://yookassa.ru/developers/payment-acceptance/receipts/basics).

In the test shop you can use receipt **verification mode** in the dashboard: YooKassa simulates OFD interaction without a real fiscal receipt — useful to validate payload shape (see [Testing](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing)).

The code sets **`tax_system_code` to `1`**. Change via a plugin on `mspYooKassaOnPreparePaymentReceiptItem` or by extending `ReceiptBuilder` if you need another tax system.

## Payment methods shown to the buyer

Cards, SBP, wallets, etc. are chosen **on YooKassa’s side** after redirect to `confirmation_url`. The extra does not embed the widget or a custom card form — it uses **redirect**, as in the [Quick start example](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start).

## One-stage payment flow

1. Customer checks out and selects **YooKassa payment**.
2. `YooKassaPayment::send()` creates a payment (`capture: true`), stores `yookassa_payment_id` in order `properties`, returns a `redirect` URL for the frontend.
3. YooKassa sends an **HTTP notification** to `assets/components/msp3yookassa/webhook.php`.
4. `WebhookHandler` resolves the order via `metadata.order_id` / `order_num`, verifies `order_hash`, and on **`succeeded`** sets `status_id` to `ms3_status_paid`.
5. The buyer returns via `success_url` or the MiniShop3 thanks page.

The **webhook** is the source of truth for payment success, not the browser redirect alone.

## Webhook

- **URL:** `https://<domain>/assets/components/msp3yookassa/webhook.php`
- Body: YooKassa JSON (`event`, `object` with `status`, `id`, `metadata`).
- Handled statuses:
  - **`succeeded`** — order set to `ms3_status_paid`, `yookassa_payment_id` updated in `properties`.
  - **`canceled`** — order set to `ms3_status_canceled`.
- Other statuses may be logged when `msp3yookassa.debug` is on; they do not change the order.
- Processing is idempotent if the order is already paid.

### Security

`order_hash` in metadata is compared with `getOrderHash()` from the active YooKassa payment handler. Follow [YooKassa webhook documentation](https://yookassa.ru/developers/using-api/webhooks) for optional signature verification; extend `webhook.php` if you enable it.

## Two-stage payment

**YooKassa payment (two-stage)** (`YooKassaTwoStagePayment`) uses **`capture: false`**: funds are held until capture or cancellation.

### MODX status behaviour

- After a successful hold, YooKassa may send statuses such as **`waiting_for_capture`**. The current webhook handler **does not** change the MODX order status for those — the order stays as-is until **`succeeded`** or **`canceled`**.
- **Capture** (see below) confirms the debit; the processor then sets `ms3_status_paid`.
- **Cancellation** in YooKassa yields **`canceled`** — order gets `ms3_status_canceled`.

Plan your workflow (e.g. manager confirms before capture).

## Capture processor

Class: `Msp3YooKassa\Processors\CaptureProcessor`.
File: `core/components/msp3yookassa/processors/capture.class.php`.

**Requirements:**

- Payment method class is `Msp3YooKassa\Payment\YooKassaTwoStagePayment`;
- Order `properties` contain `yookassa_payment_id`;
- `shop_id` and `secret_key` are configured.

**Parameter:** `order_id` — numeric MiniShop3 order ID.

Example PHP call:

```php
$corePath = $modx->getOption('msp3yookassa_core_path', null, MODX_CORE_PATH . 'components/msp3yookassa/');
$response = $modx->runProcessor('capture', [
    'order_id' => 123,
], [
    'processors_path' => $corePath . 'processors/',
]);

if ($response->isError()) {
    $modx->log(modX::LOG_LEVEL_ERROR, $response->getMessage());
} else {
    // Capture succeeded; order moved to ms3_status_paid
}
```

Error strings come from the `msp3yookassa` lexicon (invalid order, wrong payment type, missing payment id, etc.).

## Receipt line event

Before each order product line is added to the receipt:

- **`mspYooKassaOnPreparePaymentReceiptItem`**

Payload: `order`, `orderProduct`, `item` (YooKassa line array; mutable by reference). Use it to adjust descriptions, VAT, `payment_subject` / `payment_mode`.

## Notes

- Payment currency in code is **RUB**.
- Minimum order amount for payment creation: **0.01**.
- Idempotence key for `createPayment`: order UUID or generated unique value.
- `vendor/autoload.php` must be present in the component for the YooKassa SDK.

## See also

- [Quick start](quick-start)
- [System settings](settings)
- [MiniShop3 — checkout](/en/components/minishop3/frontend/order)
