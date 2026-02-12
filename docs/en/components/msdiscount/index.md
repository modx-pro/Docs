---
title: msDiscount
description: Discount system and one-time coupons for miniShop2
logo: https://modstore.pro/assets/extras/msdiscount/logo-lg.png
author: ilyautkin
modstore: https://modstore.pro/packages/discounts/msdiscount

items: [
  { text: 'Promotions', link: 'stock' },
  { text: 'Discounts', link: 'discounts' },
  { text: 'Coupons', link: 'coupons' },
  {
    text: 'Snippets',
    items: [
      { text: 'msdBuyNow', link: 'snippets/msdbuynow' },
      { text: 'msdGetDiscount', link: 'snippets/msdgetdiscount' },
    ],
  },
]

dependencies: miniShop2
---

# msDiscount

## Discount system for [miniShop2][1]

- Discounts on product groups
- Discounts for user groups
- One-time discount coupons
- Time-limited promotions with user and product groups
- User groups can have a purchase threshold; when reached, users join the group automatically
- Cart recalculated on user login
- Discounted price in `price`, old price in `old_price`
- After login users see new prices everywhere: catalog, product page, cart
- Discount can be relative (percent) or absolute (store currency)
- Output products in promotions (“Buy now” style)

[1]: /en/components/minishop2/
