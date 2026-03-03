---
title: msWallpapers
description: Advanced wallpaper order form
logo: https://modstore.pro/assets/extras/mswallpapers/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/other/mswallpapers

items: [
  { text: 'Installation and setup', link: 'setup' },
  {
    text: 'Snippets',
    items: [
      { text: 'mswp.form', link: 'snippets/mswp-form' },
    ],
  },
  {
    text: 'Plugin events',
    link: 'events/',
    items: [
      { text: 'mswpOnGetProductPrice', link: 'events/mswpongetproductprice' },
      { text: 'mswpOnGetProductCost', link: 'events/mswpongetproductcost' },
      { text: 'Examples', link: 'events/examples' },
    ],
  },
  {
    text: 'Cases',
    items: [
      { text: 'Form in modal with texture pre-selection', link: 'cases/modal-form' },
    ],
  },
]
---
# msWallpapers

Creates an extended order form for selecting wallpapers. Works only with miniShop2.

![msWallpapers](https://file.modx.pro/files/0/8/a/08a9f68098e8f4f5891f8d7a35a215cb.png)

## Features

- Saves selected texture region,
- Calculates cost per square meter,
- Shows preview of selected fragment in cart,
- Exports order data as PDF in backend.

## Options

- Specify wall size for wallpaper placement,
- Select a fragment from horizontally tiled texture,
- Flip texture in preview area,
- Make wallpaper grayscale,
- Show vertical guide lines.

## Preview area behavior

In simplified terms: based on user dimensions, the app computes the region size from the max preview size in snippet parameters, determines how many times to repeat the texture, and displays it.

::: warning Important
Works only with miniShop2 >= 2.4.
:::
