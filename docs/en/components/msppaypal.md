---
title: mspPayPal
description: PayPal payment component for minishop2
logo: https://modstore.pro/assets/extras/msppaypal/logo-lg.png
author: modx-pro
modstore: https://modstore.pro/packages/payment-system/msppaypal
repository: https://github.com/modx-pro/PayPal

dependencies: miniShop2
categories: payment
---

# mspPayPal

## Getting started

mspPayPal is a payment module for the minishop2 store.

To accept PayPal payments you must first [register][1] in the system.

## Requirements

- PHP 7.0+
- MODX Revolution 2.4+
- MiniShop2 3.0+

## mspPayPal setup

::: warning Important
Use the test (sandbox) environment only for testing payments.
:::

You need the login and password issued after registration.

- Sign in to the [developer dashboard][2].
- Choose Manage API credentials (opens the settings page).
- Choose Request an API signature.
- You will get 3 hidden values; click SHOW and copy all data for the store setup.

## Installation and MODX setup

The component is available on modstore.pro. If the modstore.pro repository is not added yet—[add it to MODX][3].

Next, fill in system settings. We recommend starting with sandbox (test) data.

### Sandbox parameters

- ms2_payment_paypal_api_url `https://api-3t.sandbox.paypal.com/nvp`
- ms2_payment_paypal_checkout_url `https://www.sandbox.paypal.com/webscr?cmd=_express-checkout&useraction=commit&token=`

### Live parameters

- ms2_payment_paypal_api_url `https://api-3t.paypal.com/nvp`
- ms2_payment_paypal_checkout_url `https://www.paypal.com/webscr?cmd=_express-checkout&token=`

Enable the payment method in miniShop2 and assign it to the required delivery method.

If you already have a MODX/MiniShop2 store, setup is complete.

[1]: https://www.paypal.com/
[2]: https://www.paypal.com/businessmanage/credentials/apiAccess
[3]: https://modstore.pro/info/connection
