---
title: msp3YooKassa system settings
description: YooKassa credentials, 54-FZ receipts, return URLs, debug
---

# msp3YooKassa system settings

Install order: [Quick start](quick-start).

All settings use the **`msp3yookassa`** namespace. In `modSystemSetting` and in `getOption()`, the **key** is **underscore-separated**: `msp3yookassa_shop_id`, `msp3yookassa_secret_key`, etc. Older dotted names (`msp3yookassa.shop_id`) are migrated on package upgrade. Below are the current keys.

## Required

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa_shop_id` | text | **Shop ID** from the [merchant profile](https://yookassa.ru/my). For a [test shop](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing), use the test shop ID from the dashboard. |
| `msp3yookassa_secret_key` | password | **Secret key** (older merchant-API material may use “shop password” wording). YooKassa’s API uses **Shop ID + Secret key**. For testing, use a `test_` key. |

Without both values, payment creation fails with “Payment is not configured”. How keys are sent to the API: [interaction format](https://yookassa.ru/developers/using-api/interaction-format).

## Buyer return URLs

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa_success_url` | URL | After **successful** payment. Empty — MiniShop3 thanks page (`ms3_order_redirect_thanks_id`) with `msorder=<uuid>`. |
| `msp3yookassa_fail_url` | URL | After **failed** payment. Empty — thanks page with `payment_fail=1`. |

## Fiscalization (54-FZ)

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa_payment_receipt` | yes/no | Send a `receipt` object in `createPayment`. |
| `msp3yookassa_vat_code` | list | VAT code for receipt lines per YooKassa (codes **1–10**, see [receipt basics](https://yookassa.ru/developers/payment-acceptance/receipts/basics)). |

VAT codes (`vat_code`):

| Code | Meaning |
|------|---------|
| 1 | No VAT |
| 2 | VAT 0% |
| 3 | VAT 10% |
| 4 | VAT 20% |
| 5 | Calculated VAT 10/110 |
| 6 | Calculated VAT 20/120 |
| 7 | VAT 5% |
| 8 | VAT 7% |
| 9 | Calculated VAT 5/105 |
| 10 | Calculated VAT 7/107 |

The customer must have an **email** in the order (`properties.email` or the user profile). With no address, the receipt block is not sent.

## Service

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa_debug` | yes/no | Write debug messages to the MODX log (`LOG_LEVEL_DEBUG`). |

## Related MiniShop3 settings

- `ms3_status_paid` — “paid” status (webhook on `succeeded`, Capture processor after capture).
- `ms3_status_canceled` — cancelled status (webhook on `canceled`).
- `ms3_order_redirect_thanks_id` — thanks page resource when custom success/fail URLs are empty.

Check these under **System Settings → minishop3** (or the MiniShop3 settings UI).
