---
title: msp3YooKassa
description: YooKassa payments for MiniShop3 — one- and two-stage payments, webhooks, 54-FZ receipts
author: ibochkarev
dependencies: miniShop3
categories: minishop3

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Integration', link: 'integration' },
]
---

# msp3YooKassa

**msp3YooKassa** connects **[YooKassa](https://yookassa.ru/)** to [MiniShop3](/en/components/minishop3/) on MODX 3: [REST API](https://yookassa.ru/developers/api), **redirect** checkout, [incoming webhooks](https://yookassa.ru/developers/using-api/webhooks), and optional [54-FZ receipt](https://yookassa.ru/developers/payment-acceptance/receipts/basics) data in the same `createPayment` call.

The extra targets **MiniShop3** (payment classes, `msp3yookassa` settings namespace, HTTP notification URL `…/assets/components/msp3yookassa/webhook.php`).

Start here: [Quick start](quick-start).

## Features

- **One-stage payment** — funds are captured immediately (`capture: true`).
- **Two-stage payment** — funds are held until you capture or cancel in the YooKassa dashboard / via API.
- **Webhook** — syncs order status in MODX from YooKassa notifications (`order_hash` check, idempotent handling).
- **54-FZ receipts** — receipt payload in the create-payment request when enabled and customer email is available.
- **Capture processor** — confirm a two-stage payment from code or the manager (see [Integration](integration)).

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| MiniShop3 | current MODX 3 branch |
| pdoTools | 3.x |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — orders, payment methods, statuses (`ms3_status_paid`, `ms3_status_canceled`, etc.).

## YooKassa signup and API keys

You need a store in the [YooKassa merchant profile](https://yookassa.ru/my). Use:

- **Shop ID** — [`msp3yookassa_shop_id`](settings).
- **Secret key** — [`msp3yookassa_secret_key`](settings). Older merchant-API writeups may say “shop password”. YooKassa’s current API uses **Shop ID + Secret key** (see [interaction format](https://yookassa.ru/developers/using-api/interaction-format)).

Requests are made **from your server**. The extra ships with the official PHP SDK (`yoomoney/yookassa-sdk-php`), see [YooKassa SDKs](https://yookassa.ru/developers/using-api/using-sdks).

YooKassa describes the same sequence in [their quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start). msp3YooKassa matches it. Details: [Integration](integration).

## Installation

1. Install via **Package Management**.
2. Ensure **MiniShop3** is installed.
3. Under **System Settings → namespace `msp3yookassa`**, set [credentials](settings) (`msp3yookassa_shop_id`, `msp3yookassa_secret_key`).
4. **Clear the site cache**.

The install resolver creates two MiniShop3 payment methods (if missing):

| Name | Class | Behaviour |
|------|-------|-----------|
| YooKassa payment | `Msp3YooKassa\Payment\YooKassaPayment` | one-stage |
| YooKassa payment (two-stage) | `Msp3YooKassa\Payment\YooKassaTwoStagePayment` | hold, then capture |

Enable the methods under **MiniShop3 → Settings → Payments** and wire them into your checkout flow.

## Webhook quick setup

In the YooKassa dashboard: **Settings → HTTP notifications**, set the URL to:

```text
https://your-domain.com/assets/components/msp3yookassa/webhook.php
```

If the URL is wrong or the server blocks POST, the order in MODX may stay unpaid even after YooKassa shows a successful payment. See [Integration](integration).

## Documentation sections

- [Quick start](quick-start) — install, keys, webhook, payment method, test, receipts.
- [System settings](settings) — `msp3yookassa_shop_id`, `msp3yookassa_secret_key`, receipts, return URLs, `msp3yookassa_debug`.
- [Integration](integration) — payment flow, two-stage behaviour, Capture processor, receipt hook, notes.

## Building the transport (developers)

From the extra root:

```bash
php _build/build.php
```

Download the package: open `_build/build.php?download=1` in a browser (with the site available in the build environment).

In `_build/config.inc.php`, the **`encrypt`** flag: when `true`, plugin packaging may use encryption via the [modstore.pro](https://modstore.pro/info/api) API (common for paid extras on ModStore). Keep it `false` for local builds without modstore.

License: GPL version 2 or later.
