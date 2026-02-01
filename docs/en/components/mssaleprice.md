---
title: msSalePrice
description: Additional prices based on selected product quantity
logo: https://modstore.pro/assets/extras/mssaleprice/logo-lg.png
author: nizart91
modstore: https://modstore.pro/packages/discounts/mssaleprice

dependencies: miniShop2
---

# msSalePrice

Component for additional product prices used in calculation based on selected quantity.

## Wholesale prices

The product page has a "Wholesale prices" tab. You can create/edit quantity/price settings for the product.

![Wholesale prices](https://file.modx.pro/files/7/a/0/7a02cd74733318595bf06511e9ffb96f.png)

![Editing](https://file.modx.pro/files/a/3/4/a342a53328fcbee4cc9336901e232787.png)

## msSalePrice snippet

Outputs available wholesale prices for the product. Call the snippet:

```modx
[[!msSalePrice]]
```

The default script tracks form changes and loads prices for the selected quantity.
Add these classes for the script to work:

- product form — `mssaleprice_form`
- product price — `mssaleprice-cost-[[*id]]`
- product old price — `mssaleprice-old-cost-[[*id]]`

![Quantity field](https://file.modx.pro/files/9/b/7/9b7cb346817b3e8e8a15075c7cfe31ee.png)
