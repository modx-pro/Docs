---
title: msProductRemains
description: Component for tracking product stock by attributes
logo: https://modstore.pro/assets/extras/msproductremains/logo-lg.jpg
author: feschukov
modstore: https://modstore.pro/packages/ecommerce/msproductremains

items: [
  { text: 'Component settings', link: 'settings' },
  { text: 'Remains tab', link: 'remains-tab' },
  { text: 'Remains page', link: 'remains-page' },
  { text: 'getRemains snippet', link: 'getremains' },
  { text: 'Examples', link: 'examples' },
]

dependencies: miniShop2
---

# msProductRemains

The component tracks product stock by attributes configured in the component settings. You can track by multiple attributes. By default, stock is tracked by product color and size.

When editing a product you need to set the remaining quantity for each combination of attribute values. Edit remains in the table under the "Remains" tab by double-clicking the value you want to change.

When the order status matches the status set in the component settings, the ordered quantities are automatically deducted from the product remains.
