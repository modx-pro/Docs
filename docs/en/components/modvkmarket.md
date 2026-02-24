---
title: modVkMarket
description: Component for syncing miniShop2 products with VKontakte market
---
# modVkMarket

Package for syncing products with VKontakte Market. Currently only miniShop2 is supported. Main image, price, name, and introtext are synced.

## Features

- Initial sync of all products to the market
- Resume sync after interruption
- List all market products with likes and views
- Full market clear
- Create product in VK when creating a new miniShop2 product
- Update product when saving the resource
- Remove products from market when clearing the cart

## How to set up modVkMarket

1. Install modVkMarket.
2. Register and log in to VKontakte.
3. Open the [app manager](https://vk.com/apps?act=manage).
4. Create an app in VK.
5. Set the name and choose app type **Standalone**.
6. Enable the app (change *Status* and save).
7. Open app settings and copy the app ID. Replace `{app_id}` in
   `https://oauth.vk.com/authorize?client_id={app_id}&scope=market,photos,offline&redirect_uri=https://oauth.vk.com/blank.html&display=page&v=5.59&response_type=token`
   with your ID and open the URL in the browser.
8. Click **Allow** in the dialog.
9. You get a URL like
   `https://oauth.vk.com/blank.html#access_token=***&expires_in=0&user_id=***`
   Copy the `access_token` value.
10. On your site go to **System Settings / modVkMarket** and enter the parameters (including the token).
