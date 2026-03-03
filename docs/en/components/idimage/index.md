---
title: idimage
description: Automatic similar product suggestions by image
logo: https://modstore.pro/assets/extras/idimage/logo-md.png
author: webnitros
modstore: https://modstore.pro/packages/ecommerce/idimage
repository: https://github.com/astra-modx/idimage

items: [
  { text: 'Quick start', link: 'quick-start' },
  {
    text: 'Product indexing',
    link: 'indexed/index',
    items: [
      { text: 'Indexing types', link: 'indexed/type' },
      { text: 'Category settings', link: 'indexed/category' },
    ],
  },
  { text: 'System requirements', link: 'requirements-and-dependencies' },
  { text: 'Snippets', link: 'snippets' },
  { text: 'Background jobs', link: 'crontab' },
]
---

# idimage

## Description

This package builds a block of similar products in **miniShop2** catalogs. It analyzes product images and suggests other products that look similar, improving user experience and conversion through recommendations.

[Similar images demo](https://idimage.ru/search/offer/7413)

**Similar products block**

The package lets you show a set of visually similar products on each product page via the [idImageSimilar](/en/components/idimage/snippets) snippet.

This helps buyers find alternatives or add-ons that may suit them. The block is generated automatically using AI that analyzes product images and attributes for accurate recommendations.

#### "Similar products" tab

After installation, a tab is added to the MiniShop product card to show similar products.

It looks like a gallery but lists products that were automatically matched.

![Similar products](https://file.modx.pro/files/a/5/a/a5a9c6fe5c7b3c52994a27c5b4837935.png)

#### Example similar products block

*Products are matched automatically without extra attributes.*

![similar products example](https://file.modx.pro/files/9/1/3/913a2f5aa8f4b5d0808f0b9b2c992372.png)
