---
title: msPointsIssue
description: Pick-up points for miniShop2
logo: https://modstore.pro/assets/extras/mspointsissue/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/delivery/mspointsissue

items: [
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'msPointsIssue.Order', link: 'snippets/mspointsissue-order' },
    ],
  },
  {
    text: 'Interface',
    link: 'interface/',
    items: [
      { text: 'Orders', link: 'interface/orders' },
      { text: 'Settings', link: 'interface/settings' },
    ],
  },
]

dependencies: miniShop2
---

# msPointsIssue

Requires MODX **2.3** or higher and PHP **5.4** or higher.

## Description

**msPointsIssue** implements pick-up points (PUP) for MiniShop2.

![msPointsIssue](https://file.modx.pro/files/4/f/d/4fd49fd13aea3c258b83d37597d5b0bc.png)

## Features

- Works with miniShop2 (version =>2.4.0-beta2)
- Snippet for order cost calculation
- Integration with [geonames](http://www.geonames.org) for easy initial PUP data

## Demo site

Demo at `http://s13938.h10.modhost.pro/`
Manager login/password: `test` — [manager](http://s13938.h10.modhost.pro/manager/)

## Installation

- [Add our repository](https://modstore.com)
- Install **pdoTools** — library for DB and output; required by many components
- Install **Theme.Bootstrap** — Twitter Bootstrap theme for MODX; standard chunks are built for it
- Install **miniShop2** — the store that provides orders and payment
- Install **msPointsIssue**

You can test on [our hosting](https://modhost.pro); these extras can be selected when creating a site.

After installing the component:

- Enable the desired delivery options
- Assign payment methods
- Populate pick-up points

Available delivery modes:

- Custom delivery. Not handled by the component; only `properties` are set for the order form.
- Courier. Handled by the component. Mode: `point`
- Terminal. Handled by the component. Mode: `terminal`

You can create your own delivery types.

## Settings

All msPointsIssue snippets use pdoTools and expect [Fenom][010103] in chunks.

This allows:

- Fewer chunks
- Easier maintenance
- Better performance
- More complex chunks with Fenom conditionals

Enable:

- `pdotools_fenom_modx`
- `pdotools_fenom_parser`
- `pdotools_fenom_php`

![Settings](https://file.modx.pro/files/6/1/c/61c556239adbb2d257654c68ec07f9a5.png)

See [MiniShop2 Quick start][010200] for the rest.

Difference when creating the order page: use snippet `msPointsIssue.Order`:

```modx
[[!msCart]] <!-- Cart output -->
[[!msPointsIssue.Order]] <!-- Checkout form, hidden after order is created -->
[[!msGetOrder]] <!-- Order info, shown after order is created -->
```

[010103]: /en/components/pdotools/parser
[010200]: /en/components/minishop2/quick-start
