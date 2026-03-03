---
title: msPromoCode2
description: Enhanced promo codes for miniShop2
logo: https://modstore.pro/assets/extras/mspromocode2/logo-lg.jpg
author: gvozdb
modstore: https://modstore.pro/packages/discounts/mspromocode2

items: [
  { text: 'Quick start', link: 'quick-start' },
  {
    text: 'Snippets',
    items: [
      { text: 'msPromoCode2', link: 'snippets/mspromocode2' },
      { text: 'mspc2Generate', link: 'snippets/mspc2generate' },
      { text: 'mspc2CartKey', link: 'snippets/mspc2cartkey' },
    ],
  },
  { text: 'jQuery events', link: 'jquery-events' },
  {
    text: 'Plugin events',
    link: 'events/',
    items: [
      { text: 'mspc2OnBeforeGetCoupon', link: 'events/mspc2onbeforegetcoupon' },
      { text: 'mspc2OnGetCoupon', link: 'events/mspc2ongetcoupon' },
      { text: 'mspc2OnBeforeSetCoupon', link: 'events/mspc2onbeforesetcoupon' },
      { text: 'mspc2OnSetCoupon', link: 'events/mspc2onsetcoupon' },
      { text: 'mspc2OnUnsetCoupon', link: 'events/mspc2onunsetcoupon' },
      { text: 'mspc2OnSetProductDiscountPrice', link: 'events/mspc2onsetproductdiscountprice' },
      { text: 'Examples', link: 'events/examples' },
    ],
  },
  { text: 'Programmatic API', link: 'api' },
  {
    text: 'Cases',
    link: 'cases/',
    items: [
      { text: 'Output promo code info in email', link: 'cases/email-inform' },
      { text: 'Set promo code programmatically on site visit', link: 'cases/set-promocode' },
      { text: 'Generate promo code in email for next order', link: 'cases/generate-promocode' },
      { text: 'Apply either msPromoCode2 promo code or msBonus2 bonuses', link: 'cases/mspromocode2-or-msbonus2' },
    ],
  },
]

dependencies: miniShop2
---

# msPromoCode2

- Works with msOptionsPrice2 and msBonus2,
- Programmatic API — apply/cancel discount for user in snippet or plugin,
- Apply promo code in backend for existing orders,
- Apply promo code on any page and update product prices on the fly,
- Show discount not only in cart but anywhere product price is displayed,
- Plus many small features for a better experience.

::: warning
The component works only with **miniShop2 2.4.14 and above!** On older versions there will be issues due to missing msOnBeforeSaveOrder and msOnSaveOrder events.
:::

::: warning
Version 2 is completely different from version 1. Even functionality differs, as they are implemented differently.
:::
