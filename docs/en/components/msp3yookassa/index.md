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

This extra integrates **[YooKassa](https://yookassa.ru/)** with [MiniShop3](/en/components/minishop3/) on MODX Revolution 3.x: payments via the [REST API](https://yookassa.ru/developers/api), **redirect** confirmation, [HTTP notifications (webhooks)](https://yookassa.ru/developers/using-api/webhooks), and optional [54-FZ receipt](https://yookassa.ru/developers/payment-acceptance/receipts/basics) data in the create-payment call.

It is conceptually similar to **[mspYooKassa for miniShop2](https://modstore.pro/packages/payment-system/mspyookassa)** on ModStore, but **msp3YooKassa** targets **MiniShop3 / MODX 3**: different payment classes, the `msp3yookassa` settings namespace, and a **different notification URL** (`…/msp3yookassa/webhook.php`, not `…/mspyookassa/notification.php`).

**Step-by-step guide:** [Quick start](quick-start).

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

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — orders, payment methods, statuses (`ms3_status_paid`, `ms3_status_canceled`, etc.).

## YooKassa signup and API keys

You need a store in the [YooKassa merchant profile](https://yookassa.ru/my). Use:

- **Shop ID** — [`msp3yookassa.shop_id`](settings).
- **Secret key** — [`msp3yookassa.secret_key`](settings) (older MS2 docs may say “shop password”; the current API uses **Shop ID + Secret key**, see [interaction format](https://yookassa.ru/developers/using-api/interaction-format)).

Requests are made **from your server**; the extra ships with the official PHP SDK (`yoomoney/yookassa-sdk-php`), see [YooKassa SDKs](https://yookassa.ru/developers/using-api/using-sdks).

End-to-end flow: [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start) — create payment, `confirmation.type = redirect`, wait for `succeeded`. msp3YooKassa follows the same model (see [Integration](integration)).

## Installation

1. Install via **Package Management** or upload the transport to `core/packages/` and install.
2. Ensure **MiniShop3** is installed.
3. Under **System Settings → namespace `msp3yookassa`**, set [credentials](settings) (`shop_id`, `secret_key`).
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

Without a working webhook, MODX order statuses will not track paid/cancelled state from YooKassa.

More detail: [Integration](integration).

## Documentation sections

- [Quick start](quick-start) — install, keys, webhook, payment method, test, receipts.
- [System settings](settings) — keys, receipts, return URLs, debug.
- [Integration](integration) — payment flow, two-stage behaviour, Capture processor, receipt hook, notes.

## Building the transport (developers)

From the extra root:

```bash
php _build/build.php
```

Download the package: open `_build/build.php?download=1` in a browser (with the site available in the build environment).

Package license: GPL v2 or later.
