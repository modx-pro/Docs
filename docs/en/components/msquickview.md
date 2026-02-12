---
title: msQuickView
dependencies: miniShop2
---

# msQuickView

The component provides quick product view and purchase, plus a cart widget with full cart features (change quantity, live price update, etc.).

## Module settings

Edit settings under "System settings" with filter "msQuickView".

### General settings

![General settings](https://file.modx.pro/files/7/a/8/7a8d8b2bcbdb837f5e563e5eb797e834.png)

- Enable / disable widget display
- Path to frontend JavaScript file

### Product widget settings

![Product widget settings](https://file.modx.pro/files/9/3/6/9364dc7dd0994599487b4e0f1f6d3d57.png)

- Request selector — element that triggers product content load on click
- Load target selector — container where product content is loaded
- Snippet parameters

### Cart widget settings

![Cart widget settings](https://file.modx.pro/files/2/2/a/22adafa625d806bb484c2477ec41f7d2.png)

- Request selector — element that triggers cart load on click
- Load target selector — container where cart content is loaded
- Snippet parameters

## Minimum setup example

- Trigger cart load on click:

    ```html
    <p class="msquickview_cart">show cart</p>
    ```

- In product template:

    ```modx
    <div class="msquickview" data-href="[[+id]]">Quick view</div>
    ```

- Containers:

    ```html
    <div class="modal-body loadview loadview_cart">
      response loads here
      .loadview - product
      .loadview_cart - cart
    </div>
    ```
