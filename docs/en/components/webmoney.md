---
title: WebMoney
description: Component for accepting payments via WebMoney in miniShop2
dependencies: miniShop2
categories: payment
---

# WebMoney

miniShop2 component for order payment via WebMoney.

To accept payments:

- Register at **WebMoney** and get at least formal attestation. Details [here](http://passport.webmoney.ru/asp/WMAtstBasic.asp)
- Create a wallet for the currency you accept and configure it for **Web Merchant Interface** [here](https://merchant.webmoney.ru/conf/purses.asp)
- Install and configure the component
- Make needed site changes

## Wallet setup for Web Merchant Interface

- **Secret Key** is required for security. You can set it or let the service generate it.
- **Secret Key X20** is not used
- **Result URL**: `http://YOUR_SITE/assets/components/minishop2/payment/webmoney.php`
- Enable **Pass parameters in preliminary request**
- **Success URL** and **Fail URL** can be empty, but set **Success URL method** and **Fail URL method** to **POST**
- Enable **Allow URLs passed in form**
- **Signature method** — **MD5**
- Choose **Test/Production** mode

Remember to save.

## Component setup

After wallet setup, configure the component in system settings, namespace **minishop2**, section **WebMoney**. Set **ms_payment_wm_secret** and **ms_payment_wmid**. Set resource ids for success and error pages (or cart id). If order statuses were changed, set the **Paid** status id.

## Site setup

After configuration, make small site changes.
Enable the payment method and assign it to delivery options in miniShop2 settings.
To show the payment button after checkout, add **mspWebMoney** snippet call to the chunk shown by **msOrder** (default **tpl.msOrder.success**).
For separate success/error pages, create them. Or use the cart; **mspWebMoney** outputs different chunks per payment stage.

## mspWebMoney snippet

Snippet outputs the payment button and success/error messages.
Parameters:

- **successTpl** — chunk for successful payment. Placeholder trans_no — WebMoney transaction id
- **errorTpl** — chunk for errors
- **tpl** — button chunk. It is a form with hidden fields; if unsure what each does, only change the button itself.
