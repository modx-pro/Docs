# msProfile plugin

The msProfile plugin handles account top-up and balance checks when creating new orders.

It responds to 3 events:

- **OnManagerPageBeforeRender** — adds the [profiles tab][1] to the orders management panel.
- **msOnBeforeCreateOrder** — checks if the user has enough balance for the order. If not — the order is not placed and the customer gets an error.
- **msOnChangeOrderStatus** — deducts from the user's account when the order is placed, if the CustomerAccount payment method was selected.

[![](https://file.modx.pro/files/c/0/0/c004f06da5a54dc4be2fa592148a6af0s.jpg)](https://file.modx.pro/files/c/0/0/c004f06da5a54dc4be2fa592148a6af0.png)

[1]: /en/components/msprofile/interface
