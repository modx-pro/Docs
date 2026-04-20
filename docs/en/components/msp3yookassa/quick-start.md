---
title: Quick start
---

# Quick start

Step-by-step setup to accept YooKassa payments with MiniShop3.

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| MiniShop3 | installed |
| YooKassa account | store in the [merchant profile](https://yookassa.ru/my) (for testing — [test shop](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing)) |

## Step 1: Install the package

1. Ensure **MiniShop3** is installed.
2. Open **Package Management** (**Extras → Installer**).
3. Install **msp3YooKassa** (ModStore download or local transport in `core/packages/`).
4. **Manage → Clear cache**.

After install you should see plugin **msp3yookassa_bootstrap** (event `OnMODXInit`) — it loads autoloading for payment classes. Confirm the plugin is **enabled**.

## Step 2: Store credentials in MODX

1. **System Settings**, filter namespace **`msp3yookassa`**.
2. Set:
   - **`msp3yookassa.shop_id`** — shop ID from the YooKassa dashboard;
   - **`msp3yookassa.secret_key`** — secret key (for testing use a `test_` key).

Details: [System settings](settings).

## Step 3: HTTP notifications in YooKassa

Without this, the MODX order **will not** move to “paid” automatically after a successful payment.

1. Open the [YooKassa merchant profile](https://yookassa.ru/my).
2. Configure **HTTP notifications** (see [webhooks](https://yookassa.ru/developers/using-api/webhooks)).
3. Set the URL to **your domain with HTTPS**:

```text
https://your-domain.com/assets/components/msp3yookassa/webhook.php
```

4. Save. Enable **`msp3yookassa.debug`** if you need MODX log output while testing.

## Step 4: Payment method in MiniShop3

The package resolver creates two methods (if missing):

| Method | When to use |
|--------|-------------|
| **YooKassa payment** | normal sale — immediate capture |
| **YooKassa payment (two-stage)** | hold → confirm via [Capture processor](integration) |

1. In the MiniShop3 manager open **Settings → Payments** (or your MS3 equivalent).
2. **Activate** the method you need; deactivate the other if you only want one.
3. Ensure checkout exposes that method to customers (delivery / template rules as in your shop).

## Step 5: Test a payment

1. Place a test order for at least **0.01** RUB.
2. Choose YooKassa — you should redirect to YooKassa’s payment page.
3. Pay with a [test card](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing#test-bank-card) when using test keys.
4. After success, the order in MODX should get **`ms3_status_paid`** (often ID `3` — verify in MiniShop3 settings).

If status does not update, check webhook URL, HTTPS, firewall, and keys.

## Step 6: 54-FZ receipts (optional)

To send receipt data in the create-payment request:

1. Set **`msp3yookassa.payment_receipt`** to Yes.
2. Set **`msp3yookassa.vat_code`** (VAT code per YooKassa).
3. Ensure the order has a customer **email** (order `properties.email` or user profile email).

Otherwise no receipt block is sent. See [System settings](settings) and [Integration](integration).

## Next steps

- [System settings](settings) — `success_url`, `fail_url`, debug, VAT
- [Integration](integration) — webhooks, two-stage flow, Capture processor, `mspYooKassaOnPreparePaymentReceiptItem`
- [MiniShop3 — checkout](/en/components/minishop3/frontend/order) — order snippet and on-site flow
