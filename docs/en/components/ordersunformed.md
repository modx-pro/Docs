---
title: ordersUnformed
description: View unplaced carts
logo: https://modstore.pro/assets/extras/ordersunformed/logo-lg.jpeg
modstore: https://modstore.pro/packages/integration/ordersunformed

dependencies: miniShop2
---

# ordersUnformed

Users don't always complete checkout. Reasons vary, from complex site checkout to user indecision. This component tracks abandoned carts (incomplete orders) so the manager can follow up with the customer and encourage the purchase.

When a user adds a product to the cart, removes it or changes quantity — OrdersUnformed records these events in the database and lets the manager view a list of carts whose orders have not been placed.

![ordersUnformed - 1](https://file.modx.pro/files/7/f/7/7f7e7f8995cdfbf735a2eb751d19b9ac.png)

It saves as much user data as possible. If the potential buyer is logged in, their cart gets a link to the credentials page.

![ordersUnformed - 2](https://file.modx.pro/files/d/c/b/dcb1edd15b2173e40a46494b4c41497d.png)

If the user is not logged in but goes to checkout and fills the form, any correctly entered data is also saved and shown in the detailed cart info window in the "Additional data" block.

![ordersUnformed - 3](https://file.modx.pro/files/2/d/6/2d6fb7dda7ac04a7c3586fe3575bc517.png)

If the user completes the order, all cart data is deleted, so the manager only sees unplaced orders and can view full info on potential customers.

## Lexicons

Lexicons are used for clear labels; they cover all fields of the standard miniShop2 checkout form.

If your form has fields not in the lexicon and you want clear labels for them, add them via MODX lexicon management.
