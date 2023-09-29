---
name: Office
description: Ajax login and profile editing. List miniShop2 orders
logo: https://modstore.pro/assets/extras/office/logo-lg.png
author: ilyautkin
modstore: https://en.modstore.pro/packages/users/office

items: [
  { text: 'Quick Start', link: 'quick-start' },
  { text: 'Work Logic', link: 'logic' },
  {
    text: 'Controllers',
    items: [
      { text: 'Authorization', link: 'controllers/auth' },
      { text: 'Profile', link: 'controllers/profile' },
      { text: 'MS2 Orders History', link: 'controllers/orders-history-minishop2' },
      { text: 'Remote Authorization', link: 'controllers/auth-remote' },
    ],
  },
  { text: 'Extra Functions', link: 'additional-functionality' },
]
---
# Office

MODX user account.

The client can register and authorize on site through email and social media, update properties of their profile and view their [miniShop2] orders history.

Thanks to [the modular architecture][logic] of the extra you can add your own controllers to create unique functions.

[minishop2]: /en/components/minishop2/
[logic]: /en/components/office/logic
