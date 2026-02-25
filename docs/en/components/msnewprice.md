---
title: msNewPrice
description: Component for managing new and promotional prices in miniShop2
dependencies: miniShop2
---

# msNewPrice

The component adds new and promotional prices for MiniShop2 products.

## Module settings

Edit settings under **System settings**, filter **msnewprice**.

![Module settings](https://file.modx.pro/files/8/e/0/8e0ea25a467f2f81f0fedde59354b6d6.png)

- New product price — enable / disable
- Promotional price — enable / disable (default on product page)
- Overwrite price — enable / disable (default on product page)
- Allow sending emails to subscribed users — enable / disable
- New price start offset — hours from current time
- New price end offset — hours from current time
- Promotional email chunk
- Promotional email chunk
- New price email chunk
- Unsubscribe resource ID

## New price tab

After enabling the module, the MiniShop product resource gets a **New price** tab.

![New price tab](https://file.modx.pro/files/d/8/4/d841cdfcc5face3d65dddba0cbd50f3d.png)

Set the new price, validity period, and promotion description.

## Promotional price

Set the new price and start/end dates. During that period the promotional price applies. Option **Overwrite price** — after the promotion the product's `[[+price]]` is updated to the promotional price.

## New price

For scheduled price changes. Set the new price and start date. On that date the product's `[[+price]]` is overwritten.

## Watch product

Authorized users can subscribe to a product.

[![](https://file.modx.pro/files/8/e/4/8e4f296e3c715e9850b4ed133b0b2aa7s.jpg)](https://file.modx.pro/files/8/e/4/8e4f296e3c715e9850b4ed133b0b2aa7.png)

Users can subscribe and unsubscribe. The package includes a script to queue emails when new or promotional price starts—subscribed users get a price-change email. A mailing script is also included (run via cron). You can also subscribe to resources and adapt mailing for other events.

## msNewPrice snippet

Outputs promotion info, price and dates, and subscription block.

**Parameters:**

- product — Product ID. If empty, current document id.
- returnNewPrice — Set "yes" to return only the new price (no chunk).
- dateFormat — Date format.
- showSubscribe — Show subscription block or not.
- tplOuter — Wrapper chunk.
- tplStockInfo — Chunk for promotional price info.
- tplNoStockInfo — Chunk for new price info.
- tplSubscribe — Chunk for subscription links.

## msNewPriceDelSubscribe snippet

Unsubscribes the user from the mailing.

**Parameters:**

- resSnippet — Snippet for product info output.
- delSubscribe — Remove product subscription.
- tplUserInfo — Chunk for user info.
- tplNoUserInfo — Chunk when user is not logged in (unsubscribe not possible).
- tplNotYourResource — Chunk when trying to unsubscribe another user's resource.

[![](https://file.modx.pro/files/8/f/d/8fd18ba37c2eb2b55b1611b3a1d8900cs.jpg)](https://file.modx.pro/files/8/f/d/8fd18ba37c2eb2b55b1611b3a1d8900c.png)

## Important

- Replacing product price with the new one
- Building emails for users
- Sending emails

All of the above require cron. Scripts are in `core/components/msnewprice/cron/`
