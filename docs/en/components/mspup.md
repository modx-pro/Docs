---
title: mspUP
description: UnitPay payment module (unitpay.ru)
logo: https://modstore.pro/assets/extras/mspup/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/payment-system/mspup

dependencies: miniShop2
categories: payment
---

# mspUP

To accept payments via UnitPay you need to [register][1] your store in the system first.

## UnitPay registration

- Enter project name
- Enter project description
- Enter project URL

[![](https://file.modx.pro/files/5/d/a/5da7c948fae95e76c29bbc336258bc27s.jpg)](https://file.modx.pro/files/5/d/a/5da7c948fae95e76c29bbc336258bc27.png)

- Place the verification file on your server

[![](https://file.modx.pro/files/6/0/4/604aa8e2c3523673d7a1ea87040155e5s.jpg)](https://file.modx.pro/files/6/0/4/604aa8e2c3523673d7a1ea87040155e5.png)

## UnitPay setup

In store settings specify:

- Payment script URL — <http://yourSite.ru/assets/components/minishop2/payment/mspup.php>
- Fail URL — payment error page
- Success URL — payment success page

[![](https://file.modx.pro/files/4/a/8/4a80c539ccc64e18212c77ea89dba9f9s.jpg)](https://file.modx.pro/files/4/a/8/4a80c539ccc64e18212c77ea89dba9f9.png)

## MODX setup

In MODX configure these parameters (in minishop2 namespace, UnitPay section):

- **Project ID** — store identifier, available in the dashboard
- **Secret key** — from store settings
- **Public key** — from store settings

[![](https://file.modx.pro/files/8/7/e/87ee43d5b40c092e173edaf8f1bf9623s.jpg)](https://file.modx.pro/files/8/7/e/87ee43d5b40c092e173edaf8f1bf9623.png)

Also enable the new payment method and assign it to delivery options.

[![](https://file.modx.pro/files/5/d/c/5dc4b8e7a7385edfffc8cb1a622e538fs.jpg)](https://file.modx.pro/files/5/d/c/5dc4b8e7a7385edfffc8cb1a622e538f.png)

[1]: https://unitpay.ru/ "UnitPay store registration"
