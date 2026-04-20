---
title: msp3YooKassa system settings
description: YooKassa credentials, 54-FZ receipts, return URLs, debug
---

# msp3YooKassa system settings

Short setup path: [Quick start](quick-start).

All settings live in the **`msp3yookassa`** namespace (`msp3yookassa.<key>`).

## Required

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa.shop_id` | text | **Shop ID** from the [merchant profile](https://yookassa.ru/my). For a [test shop](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing), use the test shop ID from the dashboard. |
| `msp3yookassa.secret_key` | password | **Secret key** (do not confuse with legacy “shop password” wording in older [mspYooKassa MS2](https://modstore.pro/packages/payment-system/mspyookassa) docs). For testing, use a `test_` key. |

Without both values, payment creation fails with “Payment is not configured”. How keys are sent to the API: [interaction format](https://yookassa.ru/developers/using-api/interaction-format).

## Buyer return URLs

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa.success_url` | URL | After **successful** payment. Empty — MiniShop3 thanks page (`ms3_order_redirect_thanks_id`) with `msorder=<uuid>`. |
| `msp3yookassa.fail_url` | URL | After **failed** payment. Empty — thanks page with `payment_fail=1`. |

## Fiscalization (54-FZ)

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa.payment_receipt` | yes/no | Send a `receipt` object in `createPayment`. |
| `msp3yookassa.vat_code` | list | VAT code for receipt lines: **1** — no VAT; **2** — 0%; **3** — 10%; **4** — 20%; **5** — 10/110; **6** — 20/120; **7** — 5%; **8** — 7%; **9** — 5/105; **10** — 7/107 (YooKassa reference). |

A valid customer **email** is required: from `properties.email` on the order or from `modUserProfile.email`. If no email is found, no receipt is attached.

## Service

| Key | Type | Description |
|-----|------|-------------|
| `msp3yookassa.debug` | yes/no | Write debug messages to the MODX log (`LOG_LEVEL_DEBUG`). |

## Related MiniShop3 settings

- `ms3_status_paid` — “paid” status (webhook on `succeeded`, Capture processor after capture).
- `ms3_status_canceled` — cancelled status (webhook on `canceled`).
- `ms3_order_redirect_thanks_id` — thanks page resource when custom success/fail URLs are empty.

Check these under **System Settings → minishop3** (or the MiniShop3 settings UI).
