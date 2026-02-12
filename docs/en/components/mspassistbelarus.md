---
title: mspAssistBelarus
description: miniShop2 payments via Assist Belarus (Belarus)
logo: https://modstore.pro/assets/extras/mspassistbelarus/logo-lg.jpg
author: alroniks
modstore: https://modstore.pro/packages/payment-system/mspassistbelarus

dependencies: miniShop2
categories: payment
---

# mspAssistBelarus

## Getting started

[Download mspAssistBelarus][1] from the MODX Simple Dream add-on store.

To accept payments via [Assist Belarus][2] ([belassist.by][2]) you must first [apply for registration][3].

For integration help contact [technical support][4] or the [developer in Minsk][5].

## Assist Belarus payment module setup

_**Important! Use only the test environment to verify payments.**_

You need the login and password issued after registration. Sign in to the [control panel][6] and do the initial setup.

[![](https://file.modx.pro/files/2/4/c/24cfc3cdef46304f202438acdeb5b0f4s.jpg)](https://file.modx.pro/files/2/4/c/24cfc3cdef46304f202438acdeb5b0f4.png)

In the control panel go to "Merchant settings" to configure your store.

On the "**Payment settings**" tab there is "**Action after authorization**". Depending on the option, the user is either redirected back to your site or sees a payment result page with a button to return. For the first option you must set "**URL_RETURN**" to "site.ru/assets/components/minishop2/payment/assist.php?action=success", where **site.ru** is your site URL.

We recommend the button option so the component can set the return path.

[![](https://file.modx.pro/files/c/8/c/c8c980536b2b8f2a036aa24429455d6es.jpg)](https://file.modx.pro/files/c/8/c/c8c980536b2b8f2a036aa24429455d6e.png)

Then configure payment result notifications on "**Payment result delivery**". This is for when the user paid but did not return to your site—Assist Belarus will notify your site that the payment was processed.

Enable "**Send payment results**" and set "**Result URL**" to "site.ru/assets/components/minishop2/payment/assist.php?action=notify", where **site.ru** is your site. The service can notify on various status changes; this implementation uses it for successful payments only.

Protocol: POST, signature: MD5. You choose the secret word; it is used to verify payments.

[![](https://file.modx.pro/files/a/d/7/ad716f1dbd56463e26fac01968eb84b9s.jpg)](https://file.modx.pro/files/a/d/7/ad716f1dbd56463e26fac01968eb84b9.png)

Other settings do not affect the module; you can adjust the cabinet as needed.

## Installation and MODX setup

During installation enter your Assist Belarus credentials. You can skip and fill them later in system settings.

[![](https://file.modx.pro/files/2/3/2/2329bf0422e1f59b5c387299998ffeacs.jpg)](https://file.modx.pro/files/2/3/2/2329bf0422e1f59b5c387299998ffeac.png)

1. Merchant ID  
2. Assist Belarus login — web services login issued after registration.  
3. Assist Belarus password — control panel password.  
4. Secret key — your secret key stored in Assist Belarus panel.

After installation enable the payment method in miniShop2 and add it to the required delivery method.

[![](https://file.modx.pro/files/1/2/e/12ec4aee8a3154dec4fe5f0fa5183c91s.jpg)](https://file.modx.pro/files/1/2/e/12ec4aee8a3154dec4fe5f0fa5183c91.png)
[![](https://file.modx.pro/files/2/d/f/2df9d57ef3e8595f825a59a2597aadd6s.jpg)](https://file.modx.pro/files/2/d/f/2df9d57ef3e8595f825a59a2597aadd6.png)

To switch from test to live, set **ms2_payment_assistbelarus_developer_mode** from "Yes" to "No".

## System settings reference

| Key                                             | Name                                                    | Default | Description                                                                                                                                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ms2_payment_assistbelarus_merchant_id**        | Merchant ID in Assist Belarus                           |         | Unique store (merchant) ID from registration.                                                                                                                                                                |
| **ms2_payment_assistbelarus_secret_key**         | Secret key                                              |         | Random string set in Assist Belarus panel (Merchant settings -> Payment result delivery). Used for signature and payment verification.                                                                      |
| **ms2_payment_assistbelarus_login**              | Assist Belarus login                                    |         | Web services login; needed for payment verification.                                                                                                                                                         |
| **ms2_payment_assistbelarus_password**           | Assist Belarus password                                 |         | Control panel password; needed for payment verification.                                                                                                                                                      |
| **ms2_payment_assistbelarus_checkout_url**       | Checkout request URL                                    |         | URL where the user is sent to pay. From Assist Belarus support.                                                                                                                                              |
| **ms2_payment_assistbelarus_gate_url**           | Payment verification URL                                 |         | URL for payment verification requests. From Assist Belarus support.                                                                                                                                          |
| **ms2_payment_assistbelarus_developer_mode**     | Test payment mode                                       | `Yes`   | "Yes" — all requests go to Assist Belarus test environment. checkout_url and gate_url are ignored.                                                                                                           |
| **ms2_payment_assistbelarus_currency**           | Payment currency                                        | `USD`   | [ISO 4217][7] code.                                                                                                                                                                                          |
| **ms2_payment_assistbelarus_language**           | Assist Belarus language                                 | `RU`    | Language for the payment page: **RU**, **EN**.                                                                                                                                                               |
| **ms2_payment_assistbelarus_success_id**         | Success page                                            | `0`     | Resource ID after successful payment. Use cart page to show the order.                                                                                                                                      |
| **ms2_payment_assistbelarus_failure_id**         | Failure page                                            | `0`     | Resource ID after failed payment. Use cart page.                                                                                                                                                             |
| **ms2_payment_assistbelarus_success_payment_id** | Order status on success                                 | `2`     | Order status ID on successful payment. Edit statuses in miniShop2.                                                                                                                                          |
| **ms2_payment_assistbelarus_cancel_payment_id**  | Order status on cancel                                  | `4`     | Order status ID on cancelled payment. Edit statuses in miniShop2.                                                                                                                                            |

[1]: https://modstore.pro/packages/payment-system/mspassistbelarus
[2]: http://belassist.by/
[3]: http://belassist.by/toclients/connect/register.php
[4]: https://modstore.pro/office/support
[5]: http://klimchuk.by/about.html
[6]: https://account.paysec.by/
[7]: http://www.iso.org/iso/home/standards/currency_codes.htm
