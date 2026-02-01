---
title: UserEvents
description: Creating events by users on resources
logo: https://modstore.pro/assets/extras/userevents/logo-lg.png
author: vgrish
modstore: https://modstore.pro/packages/booking/userevents

items: [
  {
    text: 'Interface',
    link: 'interface/',
    items: [
      { text: 'Orders', link: 'interface/orders' },
      { text: 'Events', link: 'interface/events' },
      { text: 'Statuses', link: 'interface/statuses' },
      { text: 'Notifications', link: 'interface/notifications' },
      { text: 'Settings', link: 'interface/settings' },
    ],
  },
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'ue.order', link: 'snippets/ue-order' },
      { text: 'ue.get.order', link: 'snippets/ue-get-order' },
    ],
  },
  {
    text: 'Development',
    items: [
      { text: 'Scripts and styles', link: 'development/scripts-and-styles' },
      { text: 'Events', link: 'development/events' },
      { text: 'Extensions', link: 'development/extensions' },
      {
        text: 'Services',
        items: [
          { text: 'Order', link: 'development/services/order' },
          { text: 'Delivery', link: 'development/services/delivery' },
          { text: 'Payment', link: 'development/services/payment' },
        ],
      }
    ],
  },
]
---
# UserEvents

You need MODX **2.3** or higher and PHP **5.4** or higher.

## Description

**UserEvents** — user events. The component implements creation of events by users on resources.

![Quick start - 1](https://file.modx.pro/files/d/8/5/d85c3cc976b7caaa799e4b704dbdd9bc.png)

![Quick start - 2](https://file.modx.pro/files/9/e/1/9e12c0988d5b54001de14c96ece3539f.png)

Features:

- creating events both on the frontend and in the site manager
- integration with [**miniShop2**][0102] (orders, payment)

## Demo site

Demo site available at `http://userevents.vgrish.ru`
Login and password for the [manager](http://userevents.vgrish.ru/manager/): `test`

## Installation

- [Add our repository](https://modstore.com)
- Install **pdoTools** — a library for fast database work and output formatting, required by many components
- Install **Theme.Bootstrap** — a Twitter Bootstrap theme for MODX; standard chunks are built for it
- Install [**miniShop2**][0102] — the shop that provides order and payment functionality
- Install **UserEvents**

For testing you can use [our hosting](https://modhost.pro); these extras can be selected when creating a site.

![Installation](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

## Settings

All UserEvents snippets work with pdoTools and expect [Fenom][010103] in chunks.

This allows you to:

- reduce the total number of chunks
- improve usability
- speed up work
- build more complex chunks using Fenom's advanced condition checks

Enable the following settings:

- `pdotools_fenom_modx`
- `pdotools_fenom_parser`
- `pdotools_fenom_php`

![Settings](https://file.modx.pro/files/6/1/c/61c556239adbb2d257654c68ec07f9a5.png)

## Templates

Theme.Bootstrap provides 2 templates that you can change as needed.
You can rename and use them, or create new ones.

We only need 1 template.

### Booking and order

This template is for the booking and order form:

```fenom
<!DOCTYPE html>
<html lang="en">
  <head>
    {'Head' | chunk}
  </head>
  <body>
    {'Navbar' | chunk}
    <div class="container">
      <div id="content" class="main">
        {$_modx->resource.content}
      </div>
      {'Navbar' | Footer}
    </div>
  </body>
</html>
```

Created templates can be specified in the system setting:

- `working_templates` — set your common template here

## Sections

We already have a home page; assign it the "Common" template and put in the content:

```fenom
{'!pdoMenu' | snippet}
```

This will show all site documents on the home page for navigation.

Then create an order page.
Create a new page with the "Common" template in the site root and add:

```fenom
{'!ue.order' | snippet} <!-- Order form, hidden after order is created -->
{'!ue.get.order' | snippet} <!-- Order info output, shown after order is created -->
```

These snippets will output the order form and display the created order.

They are designed to output only when needed.
For example, `ue.order` is hidden when the page URL has the parameter `msorder=order id`, while `ue.get.order` only reacts to that parameter.

[010103]: /en/components/pdotools/parser
[0102]: /en/components/minishop2/
