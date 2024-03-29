---
name: msProductRemains
description: Stock-on-hand (product remains) account
logo: https://modstore.pro/assets/extras/msproductremains/logo-lg.jpg
author: feschukov
modstore: https://en.modstore.pro/packages/ecommerce/msproductremains

items: [
  { text: 'Settings', link: 'settings' },
  { text: 'Remains Tab', link: 'remains-tab' },
  { text: 'Remains page', link: 'remains-page' },
  { text: 'Snippet getRemains', link: 'getremains' },
  { text: 'Examples', link: 'examples' },
]

dependencies: miniShop2
---
# msProductRemains

The component is intended for the accounting of warehouse product remains based on the properties specified in component settings. In general, several properties are used in the process. A product’s color and size are the default properties.

While editing products, specify the number of product remains for each combination of product property values. Remains are edited in the “Remains” tab table by double-clicking the left mouse button on the number needed.

After the order status becomes equal to the status specified in component settings, the amount of the product remains ordered by the customer will be reduced automatically by the amount in the customer's shopping cart.
