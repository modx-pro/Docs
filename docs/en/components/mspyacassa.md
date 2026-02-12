---
title: mspYaCassa
dependencies: miniShop2
categories: payment
---

# mspYaCassa

[Yandex Kassa][2] payment module for [miniShop2][1].

## Setup

Register and fill out the form. Set connection options:

![Setup](https://file.modx.pro/files/2/8/c/28c27abcde1633707db8ce1329b4735e.png)

- HTTP protocol
- checkURL — sitename.ru/assets/components/minishop2/payment/mspyacassa.php
- avisoURL — sitename.ru/assets/components/minishop2/payment/mspyacassa.php

Check:

- use dynamic success and error page URLs
- I want to run test payments

After your data is verified, a specialist will contact you for technical integration.

```
Hello.

My name is Eugene, I will help you with technical integration with Yandex.Money. Testing is done in a special demo environment
using test money. We recommend testing before accepting real payments.

data....

Once we confirm everything works, you will receive credentials for accepting payments
in production mode.
```

## Package setup

[mspYaCassa] settings are in [Minishop2] settings.

![Package setup](https://file.modx.pro/files/0/3/8/038c79034bb3484f6a33d7e6f51d45c7.png)

Enter your store data:

- shopid
- scid
- password
- enable test mode (enabled by default on install)

Test credentials may differ from those in the Yandex Kassa dashboard.

***Double-check the data!!!***

## Activating payment methods

Enable payment methods in [Minishop2][1] settings and link them to delivery options.

[![](https://file.modx.pro/files/9/a/e/9ae90bb46107c40e6b894f582f5ca4des.jpg)](https://file.modx.pro/files/9/a/e/9ae90bb46107c40e6b894f582f5ca4de.png)

## Payment testing

Payment testing is done in the demo environment; Yandex Kassa will send instructions.
Support responds quickly.
After confirming test payments work, ***contact support to switch to production mode***.

A specialist will verify the tests and you will receive production credentials.
Update the store data in settings.
Also disable test mode.

That's it. Test production by creating a product priced at 1 currency unit and purchasing it with different methods.

::: warning
Your site must use HTTPS to connect to Yandex Kassa
:::

## Info

For convenience, the Yandex Kassa payment method and transfer amount are added to the order comment.
This can be disabled in component settings.

![Info](https://file.modx.pro/files/f/b/9/fb9324987d24f7efd37c02a5b8878c62.png)

## Note

Mobile phone and WM payment methods returned errors. Support replied:

```
For mobile phone payments, contact your account manager.
This option is disabled for your store.

WM will be available within a week as your store ID is added to the WM system manually.
Verification is then performed on their side.
```

[1]: /en/components/minishop2/
[2]: http://kassa.yandex.ru/
