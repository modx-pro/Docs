---
title: msMerchant
description: Payment acceptance via "Unified Cash Desk" (WalletOne)
logo: https://modstore.pro/assets/extras/msmerchant/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/payment-system/msmerchant

dependencies: miniShop2
---

# msMerchant

To accept payments via "Unified Cash Desk" (WalletOne) you must first [register](http://www.walletone.com/ru/merchant/) your store in the system.

## Unified Cash Desk setup

In the store settings set:

- Store URL
- Payment handler URL — `http://yoursite.ru/assets/components/minishop2/payment/merchant.php`
- Signature method — MD5

![Setup](https://file.modx.pro/files/b/9/e/b9e48fff678a34edf5bdc979f8f5e96f.png)

![Setup - 2](https://file.modx.pro/files/6/5/3/6534da24de0b37e9afe5490684bac371.png)

## MODX setup

In MODX configure (under miniShop2 namespace, "Unified Cash Desk" payments):

- **Store ID** — from your account
- **Secret key** — from store settings
- **Success page** and **Failure page** — MODX resource IDs for after payment. Use cart pages so the buyer sees their order after return. If empty, the user is redirected to the home page.

![Setup - 3](https://file.modx.pro/files/4/3/4/434ef8ca3d3615a9200afa767cf33771.png)

Enable the new payment method and assign it in delivery options.

![Setup - 4](https://file.modx.pro/files/b/d/7/bd7a363c1a93e8a7b36c0b3fc09b7c2c.png)
