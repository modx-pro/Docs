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

For integration help contact [technical support][3], the [developer in Minsk][4], or [PayU support][5]. PayU also has [detailed documentation][6].

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

In short: your site builds an LU request with payment data and sends it to PayU; PayU processes it and calls your callback URL to report the result.

[![](https://file.modx.pro/files/f/c/b/fcb28633348063f0b3a385040dfea9a3s.jpg)](https://file.modx.pro/files/f/c/b/fcb28633348063f0b3a385040dfea9a3.png)

Set the URL for IPN notifications in PayU: <https://secure.payu.ru/cpanel/ipn_settings.php>.

[![](https://file.modx.pro/files/3/c/1/3c1e611a4e694cc324d623a3bc3df77ds.jpg)](https://file.modx.pro/files/3/c/1/3c1e611a4e694cc324d623a3bc3df77d.png)

URL format: `http://site.ru/assets/components/minishop2/payment/payu.php?action=notify`, where site.ru is your site.

## Installation and MODX setup

During installation enter your PayU credentials.

[![](https://file.modx.pro/files/1/a/0/1a088a923675b6d333890e226ad8857fs.jpg)](https://file.modx.pro/files/1/a/0/1a088a923675b6d333890e226ad8857f.png)

1. Merchant ID — store (merchant) ID from registration.  
2. Secret key — issued at registration.

You can skip and fill these later in system settings.  
Enable the payment method in miniShop2 and add it to the required delivery method.

[![](https://file.modx.pro/files/5/4/2/5425dfef651c016d41c40825f7889fa6s.jpg)](https://file.modx.pro/files/5/4/2/5425dfef651c016d41c40825f7889fa6.png)
[![](https://file.modx.pro/files/1/7/d/17dfff0b5dd970258ebb129e919aa9bas.jpg)](https://file.modx.pro/files/1/7/d/17dfff0b5dd970258ebb129e919aa9ba.png)

To switch from test to live, set **ms2_payment_payu_developer_mode** from "Yes" to "No".

[![](https://file.modx.pro/files/4/7/e/47ec11fdda2dfcfa051e2550dc9a455bs.jpg)](https://file.modx.pro/files/4/7/e/47ec11fdda2dfcfa051e2550dc9a455b.png)

## System settings reference

| Key                                    | Name                                       | Default                             | Description                                                                                                                                 |
|----------------------------------------|--------------------------------------------|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| **ms2_payment_payu_merchant_id**       | Store (merchant) ID in PayU                 |                                     | Unique merchant ID from registration.                                                                                                       |
| **ms2_payment_payu_secret_key**        | Secret key                                 |                                     | Issued at registration. Used for signature and payment verification.                                                                       |
| **ms2_payment_payu_checkout_url**      | Checkout URL                               | `https://secure.payu.ru/order/lu.php` | URL where the user is sent to pay.                                                                                                          |
| **ms2_payment_payu_developer_mode**    | Test payment mode                          | `Yes`                               | "Yes" — all requests go to PayU test environment.                                                                                            |
| **ms2_payment_payu_currency**          | Payment currency                           | `RUB`                               | [ISO 4217][7] code.                                                                                                                         |
| **ms2_payment_payu_language**          | PayU language                              | `RU`                                | Two-letter language code for the payment page.                                                                                              |
| **ms2_payment_payu_success_id**        | Success page                                | `0`                                 | Resource ID after successful payment. Use cart page.                                                                                        |
| **ms2_payment_payu_failure_id**        | Failure page                                | `0`                                 | Resource ID after failed payment. Use cart page.                                                                                            |
| **ms2_payment_payu_success_payment_id**| Order status on success                     | `2`                                 | Order status ID on successful payment. Edit in miniShop2.                                                                                   |
| **ms2_payment_payu_cancel_payment_id** | Order status on cancel                      | `4`                                 | Order status ID on cancelled payment. Edit in miniShop2.                                                                                    |

[1]: https://modstore.pro/packages/payment-system/msppayu
[2]: http://payu.ru/dlya-biznesa/podklyuchitsya/?utm_source=payu-bottom
[3]: https://modstore.pro/office/support
[4]: http://klimchuk.by/about.html
[5]: http://payu.ru/o-nas/kontakty/
[6]: http://payu-api.ru/pages/viewpage.action?pageId=589827
[7]: http://www.iso.org/iso/home/standards/currency_codes.htm
