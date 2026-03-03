---
title: mspPayAnyWay
description: Integration with PayAnyWay payment service
logo: https://modstore.pro/assets/extras/msppayanyway/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/payment-system/msppayanyway

dependencies: miniShop2
categories: payment
---

# mspPayAnyWay

To accept payments via [PayAnyWay][1] you must first [register][2] your store in the system.

## PayAnyWay registration

- Enter organization name
- Enter website
- Enter tax ID (INN)
- Fill in personal data

[![](https://file.modx.pro/files/c/8/1/c81185ad9ef991d8289befd1ef20d5bds.jpg)](https://file.modx.pro/files/c/8/1/c81185ad9ef991d8289befd1ef20d5bd.png)

## PayAnyWay document verification

Before accepting payments via PayAnyWay you must wait for document verification.

[![](https://file.modx.pro/files/3/e/4/3e4069ad047ae816f5a94f5ec684673as.jpg)](https://file.modx.pro/files/3/e/4/3e4069ad047ae816f5a94f5ec684673a.png)

## PayAnyWay setup

After your data is verified, in the store settings set:

- Store alias
- Pay URL — handler address, e.g. `http://sitename.ru/assets/components/minishop2/payment/msppayanyway.php`
- HTTP method — POST
- Data integrity code — must match the component setting
- Payment form signature required — YES
- Allow URL override — YES

[![](https://file.modx.pro/files/9/1/b/91b5172962968e93527b54835ae38a08s.jpg)](https://file.modx.pro/files/9/1/b/91b5172962968e93527b54835ae38a08.png)

## MODX setup

In MODX configure (miniShop2 namespace, "PayAnyWay" section):

- MNT_ID — Store ID in MONETA.RU
- MNT_FAIL_URL — payment error page
- MNT_SUCCESS_URL — success page
- MNT_RETURN_URL — cancel page
- MNT_DATAINTEGRITY_CODE — data integrity code (same as in store settings)

[![](https://file.modx.pro/files/f/e/e/fee4bc7b66cee4f447d61918fc5ef59as.jpg)](https://file.modx.pro/files/f/e/e/fee4bc7b66cee4f447d61918fc5ef59a.png)

Enable the payment method and assign it in delivery options.

[![](https://file.modx.pro/files/4/a/d/4ad42314fde2d20a682fec4cc1037357s.jpg)](https://file.modx.pro/files/4/a/d/4ad42314fde2d20a682fec4cc1037357.png)

[1]: https://payanyway.ru/info/w/ru/public/welcome.htm "Pay with PayAnyWay"
[2]: https://payanyway.ru/partnerRegistration.htm "Register store in PayAnyWay"
