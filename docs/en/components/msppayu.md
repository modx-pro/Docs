---
title: mspPayU
description: miniShop2 order payments via PayU
logo: https://modstore.pro/assets/extras/msppayu/logo-lg.jpg
author: alroniks
modstore: https://modstore.pro/packages/payment-system/msppayu

dependencies: miniShop2
categories: payment
---

# mspPayU

## Getting started

[Download mspPayU][1] from the MODX Simple Dream add-on store.

To accept PayU payments you must first [apply for registration][2].

You can get integration help from [technical support][3], the [developer in Minsk][4], or [PayU technical support][5]; they are very responsive. PayU also has [detailed documentation][6] on their system.

## PayU setup

::: warning Important
Use only the test environment to verify payments.
:::

### Basic store–PayU integration flow

[![](https://file.modx.pro/files/d/9/c/d9c179cafdf0260dfc2575457f9b212as.jpg)](https://file.modx.pro/files/d/9/c/d9c179cafdf0260dfc2575457f9b212a.png)

1. Customer visits your site and builds a cart.
2. Customer goes to PayU to pay.
3. PayU notifies your site of successful payment; your site confirms receipt.
4. Your site requests payment confirmation from PayU; PayU responds.
5. _Optional refund: your site requests cancellation from PayU._ (not yet supported in this module)

In short: your site builds an LU request with payment data and sends it to PayU; PayU validates and processes it, then calls your callback URL to report the result.

[![](https://file.modx.pro/files/f/c/b/fcb28633348063f0b3a385040dfea9a3s.jpg)](https://file.modx.pro/files/f/c/b/fcb28633348063f0b3a385040dfea9a3.png)

In PayU it is important to set the URL where IPN notifications from PayU will be sent. Configure this in the PayU dashboard at <https://secure.payu.ru/cpanel/ipn_settings.php>.

[![](https://file.modx.pro/files/3/c/1/3c1e611a4e694cc324d623a3bc3df77ds.jpg)](https://file.modx.pro/files/3/c/1/3c1e611a4e694cc324d623a3bc3df77d.png)

URL format: `http://site.ru/assets/components/minishop2/payment/payu.php?action=notify`, where site.ru is your site.

## Installation and MODX setup

During installation you need to enter your PayU credentials to start using the payment system in MODX.

[![](https://file.modx.pro/files/1/a/0/1a088a923675b6d333890e226ad8857fs.jpg)](https://file.modx.pro/files/1/a/0/1a088a923675b6d333890e226ad8857f.png)

1. Merchant ID — store (merchant) ID from registration.
2. Secret key — issued at registration.

You can skip this step and fill the data later in system settings.
After installation enable the payment method in miniShop2 settings and add it to the delivery methods that should support PayU.

[![](https://file.modx.pro/files/5/4/2/5425dfef651c016d41c40825f7889fa6s.jpg)](https://file.modx.pro/files/5/4/2/5425dfef651c016d41c40825f7889fa6.png)
[![](https://file.modx.pro/files/1/7/d/17dfff0b5dd970258ebb129e919aa9bas.jpg)](https://file.modx.pro/files/1/7/d/17dfff0b5dd970258ebb129e919aa9ba.png)

To switch from test to live, set **ms2_payment_payu_developer_mode** from "Yes" to "No".

[![](https://file.modx.pro/files/4/7/e/47ec11fdda2dfcfa051e2550dc9a455bs.jpg)](https://file.modx.pro/files/4/7/e/47ec11fdda2dfcfa051e2550dc9a455b.png)

## System settings reference

| Key                                    | Name                                       | Default                             | Description                                                                                                                                 |
|----------------------------------------|--------------------------------------------|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **ms2_payment_payu_merchant_id**       | Store (merchant) ID in PayU                 |                                     | Unique merchant (store) identifier. It is created when you register in PayU and sent to you by email.                                         |
| **ms2_payment_payu_secret_key**        | Secret key                                 |                                     | Random character sequence issued at registration. Used to build the signature and to verify payments.                                        |
| **ms2_payment_payu_checkout_url**      | Checkout request URL                        | `https://secure.payu.ru/order/lu.php` | URL where the user is sent to complete payment.                                                                                            |
| **ms2_payment_payu_developer_mode**   | Test payment mode                           | `Yes`                               | When "Yes", all payment requests are sent to the PayU test payment environment.                                                             |
| **ms2_payment_payu_currency**         | Payment currency                            | `RUB`                               | Three-letter currency code per [ISO 4217][7].                                                                                               |
| **ms2_payment_payu_language**          | PayU language                               | `RU`                                | Two-letter language code for the PayU payment page.                                                                                        |
| **ms2_payment_payu_success_id**        | PayU success page                           | `0`                                 | User is sent to this resource after successful payment. Recommended: cart page ID to show the order.                                         |
| **ms2_payment_payu_failure_id**        | PayU failure page                           | `0`                                 | User is sent to this resource on failed or cancelled payment. Recommended: cart page ID to show the order.                                  |
| **ms2_payment_payu_success_payment_id**| Order status on successful payment          | `2`                                 | This status is set on the order after successful payment. Statuses are edited in miniShop2 settings.                                        |
| **ms2_payment_payu_cancel_payment_id** | Order status on cancelled payment           | `4`                                 | This status is set on the order when payment is cancelled. Statuses are edited in miniShop2 settings.                                        |

[1]: https://modstore.pro/packages/payment-system/msppayu
[2]: http://payu.ru/dlya-biznesa/podklyuchitsya/?utm_source=payu-bottom
[3]: https://modstore.pro/office/support
[4]: http://klimchuk.by/about.html
[5]: http://payu.ru/o-nas/kontakty/
[6]: http://payu-api.ru/pages/viewpage.action?pageId=589827
[7]: http://www.iso.org/iso/home/standards/currency_codes.htm
