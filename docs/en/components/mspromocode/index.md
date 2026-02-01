---
title: msPromoCode
description: Discount promo codes for miniShop2
logo: https://modstore.pro/assets/extras/mspromocode/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/discounts/mspromocode

items: [
  {
    text: 'Functionality',
    items: [
      { text: 'Promotions', link: 'functionality/stocks' },
      { text: 'Application conditions', link: 'functionality/conditions' },
      { text: 'Referral promo codes', link: 'functionality/referral-promo-codes' },
      { text: 'Fixed cart discount', link: 'functionality/fixed-cart-discount' },
    ],
  },
  { text: 'Installation and setup', link: 'setup' },
  {
    text: 'Snippets',
    items: [
      { text: 'mspcForm', link: 'snippets/mspcform' },
      { text: 'mspcRefCoupon', link: 'snippets/mspcrefcoupon' },
    ],
  },
  { text: 'jQuery events', link: 'jquery-events' },
  {
    text: 'Plugin events',
    link: 'events/',
    items: [
      { text: 'mspcOnBeforeSetCoupon', link: 'events/mspconbeforesetcoupon' },
      { text: 'mspcOnSetCoupon', link: 'events/mspconsetcoupon' },
      { text: 'mspcOnBeforeSetProductDiscount', link: 'events/mspconbeforesetproductdiscount' },
      { text: 'mspcOnSetProductDiscount', link: 'events/mspconsetproductdiscount' },
      { text: 'mspcOnBindCouponToOrder', link: 'events/mspconbindcoupontoorder' },
    ],
  },
  {
    text: 'Cases',
    link: 'cases/',
    items: [
      { text: 'Output promo code info in email', link: 'cases/email-inform' },
      { text: 'Personalized promo codes for user', link: 'cases/personalized-promo-codes' },
      { text: 'Cancel promo code when cart contains prohibited products', link: 'cases/cancel-promo-code' },
    ],
  },
]

dependencies: miniShop2
---

# msPromoCode

Discount promo codes for [miniShop2][1]

![Discount promo codes](https://file.modx.pro/files/4/d/1/4d1b1efb5043b39395279a1931e38064.png)

## Features

- Full AJAX handling of coupon apply/remove.

- The promo code can be added not only from the main backend page. On the product page there is also a "Promo codes" tab; when adding from there, the current product is immediately linked to that promo code. This is handy when you need a coupon **for a specific product only**.

    ![Features](https://file.modx.pro/files/9/9/f/99f933c6bede012de67addc87f8fcf39.png)

- The discount can be set for the coupon as a whole, or for a product or category linked to the coupon. More specific discounts take priority. E.g. we have a 20% coupon, **Category 1** linked to it with 80%, and a product in **Category 1** linked with 40%. That product gets 40%.

- If no products or categories are linked to the coupon — **the coupon applies to the whole store**.

- When the order is submitted, or when the page with the `mspcForm` snippet is opened, the component checks if the coupon is valid. If not, it notifies the user, removes the coupon from the form and updates cart prices. This blocks use of coupons that:
  - were disabled,
  - have expired,
  - have run out.

- If the order was placed with a promo code, in the backend the order modal will show the promo code and discount amount on the first tab.

[![](https://file.modx.pro/files/8/4/8/848c52f4c835c232e6874d3e591ca5b7.png)](https://file.modx.pro/files/8/4/8/848c52f4c835c232e6874d3e591ca5b7.png)

## Important

The package chunk uses Bootstrap 3, so if your site doesn't use it you will need to add styles manually, same as for miniShop2 which also uses Bootstrap.

[1]: /en/components/minishop2/
