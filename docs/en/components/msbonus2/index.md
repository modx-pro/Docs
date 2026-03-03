---
title: msBonus2
description: Bonus system for miniShop2
logo: https://modstore.pro/assets/extras/msbonus2/logo-lg.jpg
author: gvozdb
modstore: https://modstore.pro/packages/discounts/msbonus2

items: [
  { text: 'Quick start', link: 'quick-start' },
  {
    text: 'Snippets',
    items: [
      { text: 'msBonus2Form', link: 'snippets/msbonus2form' },
      { text: 'msBonus2Logs', link: 'snippets/msbonus2logs' },
      { text: 'msBonus2ProductBonus', link: 'snippets/msbonus2productbonus' },
    ],
  },
  { text: 'jQuery events', link: 'jquery-events' },
  {
    text: 'Plugin events',
    items: [
      { text: 'msb2OnBeforeSetBonus', link: 'events/msb2onbeforesetbonus' },
      { text: 'msb2OnSetBonus', link: 'events/msb2onsetbonus' },
      { text: 'msb2OnUnsetBonus', link: 'events/msb2onunsetbonus' },
      { text: 'Examples', link: 'events/examples' },
    ],
  },
  { text: 'Programmatic API', link: 'api' },
  {
    text: 'Cases',
    items: [
      { text: 'Email notice about bonuses spent on order', link: 'cases/email-inform' },
      { text: 'Extra bonuses for first order', link: 'cases/additional-bonuses' },
      { text: 'Use either msPromoCode2 or msBonus2', link: 'cases/mspromocode2-or-msbonus2' },
    ],
  },
]

dependencies: miniShop2
---

# msBonus2

- Compatible with msPromoCode and msPromoCode2,
- Programmatic API — credit or debit bonuses in a snippet or plugin for any action,
- User levels with accrual percent and purchase threshold to reach the level,
- Apply or remove bonuses on an existing order,
- Manual credit/debit on user account,
- Delay before user can use credited points,
- Point expiry (auto-removal from balance),
- Max share of cart payable with bonuses,
- Separate sections for accrual and redemption,
- Bonuses for registration and birthday.

::: warning Note
The component works only with **miniShop2 2.4.14 or higher**. Older versions lack msOnBeforeSaveOrder and msOnSaveOrder and will cause issues.

This version is not compatible with the first version of the component; behavior and implementation differ.
:::
