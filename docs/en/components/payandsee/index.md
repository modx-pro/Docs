---
title: PayAndSee
description: Paid/closed resources on MODX
logo: https://modstore.pro/assets/extras/payandsee/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/ecommerce/payandsee

items: [
  {
    text: 'Interface',
    link: 'interface/',
    items: [
      { text: 'Resource', link: 'interface/resource' },
      { text: 'Orders', link: 'interface/orders' },
      { text: 'Content', link: 'interface/content' },
      { text: 'Rates', link: 'interface/rates' },
      { text: 'Clients', link: 'interface/clients' },
      { text: 'Subscriptions', link: 'interface/subscriptions' },
      { text: 'Statuses', link: 'interface/statuses' },
      { text: 'Notifications', link: 'interface/notifications' },
      { text: 'Settings', link: 'interface/settings' },
    ],
  },
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'pas.content', link: 'snippets/pas-content' },
      { text: 'pas.order', link: 'snippets/pas-order' },
      { text: 'pas.get.order', link: 'snippets/pas-get-order' },
      { text: 'pas.subscription', link: 'snippets/pas-subscription' },
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
          { text: 'Cart', link: 'development/services/cart' },
          { text: 'Order', link: 'development/services/order' },
          { text: 'Delivery', link: 'development/services/delivery' },
          { text: 'Payment', link: 'development/services/payment' },
        ],
      },
    ],
  },
  {
    text: 'Other extras',
    items: [
      { text: 'msDiscount', link: 'integrations/msdiscount' },
      { text: 'msPromoCode', link: 'integrations/mspromocode' },
    ],
  },
]
---
# PayAndSee

You need MODX **2.3** or higher and PHP **5.4** or higher.

## Installation

- [Add our repository][002]
- Install **pdoTools** — a library for fast database work and output formatting, required by many components
- Install **Theme.Bootstrap** — a Twitter Bootstrap theme for MODX; standard chunks are built for it
- Install [**miniShop2**][0102] — the shop that provides order and payment functionality
- Install **PayAndSee**

For testing you can use [our hosting][002]; these extras can be selected when creating a site.

![Installation](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

## Settings

All PayAndSee snippets work with pdoTools and expect [Fenom][010103] in chunks.

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

### Common

This template is for outputting regular resource content:

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

It is used for content and order output.

Created templates can be specified in the system setting:

- `working_templates` — set your common template here

## Sections

We already have a home page; assign it the "Common" template and put in the content:

```fenom
{'!pdoMenu' | snippet}
```

This will show all site documents on the home page for navigation.

Then [create content][4] and ensure its template is in `working_templates`.

After creating [rates][5], create an order page.
Create a new page with the "Common" template in the site root and add:

```fenom
{'!pas.order' | snippet} <!-- Order form, hidden after order is created -->
{'!pas.get.order' | snippet} <!-- Order info output, shown after order is created -->
```

These snippets will output the order form and display the created order.

They are designed to output only when needed.
For example, `pas.order` is hidden when the page URL has the parameter `msorder=order id`, while `pas.get.order` only reacts to that parameter.

## Access

Access is determined by allowed statuses on [content][4], [client][6], [subscriptions][7].
A subscription also has start/end dates, which are used when checking access.

Two modifiers are available for access checks:

- `pas_content_access` — check content access. Alias `pascaccess`
- `pas_resource_access` — check resource access. Alias `pasraccess`

1st parameter — default value
2nd parameter — content/resource ID. Default: current resource.
3rd parameter — client ID. Default: current client.

You can [extend][01220303] the component to implement your own logic.

## Examples

Restrict free access for the `content` field:

```fenom
{$content | pasraccess}
```

Restrict free access and show the paid content purchase form:

```fenom
{$content | pasraccess : ('pas.content' | snippet: ['resource' => $id])}
```

Check if the current client has access to resource 15 and store in a variable:

```fenom
{set $access = 1 | pasraccess : 0 : 15}

{* then use $access to check access *}

{if $access}
  Access granted
{else}
  No access
{/if}
```

## Demo site

Demo site available at <http://pas.vgrish.ru>

Login and password for [the manager][005]: `test`

[010103]: /en/components/pdotools/parser
[0102]: /en/components/minishop2/

[4]: /en/components/payandsee/interface/content
[5]: /en/components/payandsee/interface/rates
[6]: /en/components/payandsee/interface/clients
[7]: /en/components/payandsee/interface/subscriptions
[01220303]: /en/components/payandsee/development/extensions

[002]: https://modhost.pro
[005]: http://pas.vgrish.ru/manager/
