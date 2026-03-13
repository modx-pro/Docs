---
title: WebMoney
description: Component for accepting payments via WebMoney in miniShop2
dependencies: miniShop2
categories: payment
---

# WebMoney

Component for miniShop2 that lets you accept order payments via WebMoney.

To start accepting payments:

- Register at **WebMoney** and get attestation not lower than formal; see [here](http://passport.webmoney.ru/asp/WMAtstBasic.asp)
- Create a wallet for the currency you want to accept and configure it for payments via **Web Merchant Interface** at [merchant.webmoney.ru](https://merchant.webmoney.ru/conf/purses.asp)
- Install and configure the component
- Apply the needed changes on the site

## Wallet setup for Web Merchant Interface

Only a few points are called out; the rest are self-explanatory:

- **Secret Key** is required for security; you can set your own or let the service generate it
- **Secret Key X20** is not used
- **Result URL**: `http://YOUR_SITE/assets/components/minishop2/payment/webmoney.php`
- Enable **Pass parameters in preliminary request**
- **Success URL** and **Fail URL** can be left empty, but set **Success URL method** and **Fail URL method** to **POST**
- Enable **Allow URLs passed in form**
- **Signature method** — **MD5**
- Choose **Test** or **Production** mode

Remember to save.

## Component setup

After the wallet is configured, configure the component to work with it. In the site manager go to system settings, namespace **minishop2**, filter by section **WebMoney**. Set **ms_payment_wm_secret** (secret key from the wallet settings) and **ms_payment_wmid** (wallet id). Set the resource ids for success and error pages (you can use the cart resource id). If you changed order statuses on the site, set the **Paid** (or equivalent) status id — it will be set on the order after successful payment.

## Site setup

When all settings are done, make small changes on the site. To make the new payment method available, enable it and allow it for the delivery methods that should support WebMoney (in miniShop2 settings). To show the payment button after checkout, add a **mspWebMoney** snippet call to the chunk shown after order creation by **msOrder** (default **tpl.msOrder.success**). If you want separate success and error pages, create them; you can also use the cart — **mspWebMoney** supports different chunks at different payment stages (see the snippet description).

## mspWebMoney snippet

The snippet builds the button to start payment and shows success or error messages. It accepts 3 parameters:

- **successTpl** — chunk shown on successful payment. Placeholder **trans_no** — WebMoney transaction id
- **errorTpl** — chunk shown on error
- **tpl** — chunk for the button. It is actually a form with many hidden fields; if you are not sure what each field does, only change the button itself.
