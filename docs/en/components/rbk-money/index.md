---
title: RBK Money
description: RBK Money payment module for miniShop2

items: [
  { text: 'Choosing payment method on site', link: 'choosing-payment-method' },
]

dependencies: miniShop2
categories: payment
---

# RBK Money

To accept payments via RBK Money you need to first [register](https://rbkmoney.ru/Common/Registereshop.aspx) your store in this system.

In the RBK Money store settings you need to specify the following parameters:

1. **Secret key** — any combination of letters and numbers used to verify payment notification authenticity.
2. **Payment notification** — URL for payment notifications. Should be `http://site.ru/assets/components/minishop2/payment/rbk.php` (where site.ru is your site address)
3. You can also enable automatic redirect of the user to the store site on successful payment
4. **Hash value method** — MD5
5. **Encoding** — UTF-8

![Settings RBK Money](https://file.modx.pro/files/e/8/c/e8cd3091c5cd35e04e0c1813dd9d4e37.jpg)

## MODX Settings

In MODX you need to configure the following parameters (located in the "Payments" section of the minishop2 namespace):

1. **Store identifier in RBK Money** — assigned to each registered store in the RBK Money system. You can find it in the RBK Money personal cabinet.

    ![Settings MODX](https://file.modx.pro/files/e/4/0/e40158b524118483788b6dfd8050488f.jpg)

2. **RBK Money secret key** — the secret key you entered in the store settings in RBK Money in point 1
3. **RBK Money success page** and **RBK Money payment cancellation page**. MODX page identifiers for successful payment or payment cancellation respectively. It is recommended to specify cart pages so the customer sees their order after returning from the service. With empty values the user will be redirected to the main page.
4. **RBK Money top-up method**. Optional parameter. If specified, the user will immediately be offered this payment method bypassing the selection screen. For example, if you specify bankcard, the user will go directly to the card number entry page.

    Possible values:

    - `inner` or `rbkmoney` — payment from RBK Money wallet
    - `bankcard` — Visa/MasterCard bank card
    - `exchangers` — electronic payment systems
    - `terminals` — payment terminals
    - `prepaidcard` — RBK Money prepaid card
    - `postrus` — Russian Post
    - `mobilestores` — mobile stores
    - `transfers` — money transfer systems
    - `ibank` — internet banking
    - `sberbank` — bank payment
    - `svyaznoy` — Svyaznoy
    - `euroset` — Euroset
    - `contact` — Contact
    - `mts` — MTS
    - `uralsib` — Uralsib cash desks
    - `handybank` — HandyBank
    - `ocean` — Ocean Bank
    - `ibankuralsib` — Uralsib Internet Banking

In the future, other top-up methods may be added. You can clarify values in the RBK Money documentation or contact RBK Money technical support.

![Settings - 1](https://file.modx.pro/files/4/f/9/4f9a7dd0f3c8dd5abdeab0052a1fdd16.jpg)

::: warning
Also don't forget to enable the new payment method and assign it in delivery options.
:::

![Settings - 2](https://file.modx.pro/files/e/1/7/e17abbacd95e883167c9ca98dd25de35.jpg)
