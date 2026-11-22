---
title: Frontend interface
items:
  - text: Catalog
    link: catalog
  - text: Product page
    link: product
  - text: Cart
    link: cart
  - text: Checkout
    link: order
  - text: Thank you
    link: thanks
  - text: Customer account
    items:
      - text: Login and registration
        link: customer-auth
      - text: Customer profile
        link: customer-profile
      - text: Delivery addresses
        link: customer-addresses
      - text: Order history
        link: customer-orders
---
# Frontend interface

The MiniShop3 user interface on the site.

```mermaid
flowchart TB
  Catalog[Catalog msProducts] --> Product[Product page]
  Product --> Cart[Cart msCart]
  Catalog --> Cart
  Cart --> Order[Checkout msOrder]
  Order --> Thanks[Thanks msGetOrder]
  Thanks --> Cabinet[Account msCustomer]
  Auth[Login AuthUI] --> Cabinet
```

## Sections

- [Product catalog](catalog) — category template and product card
- [Product page](product) — product details with gallery and add-to-cart form
- [Cart](cart) — cart widget and item management
- [Checkout](order) — order form, delivery and payment selection
- [Thank you](thanks) — the page shown after checkout

### Customer account

- [Login and registration](customer-auth) — login, registration and password recovery forms
- [Customer profile](customer-profile) — edit personal data
- [Delivery addresses](customer-addresses) — manage saved addresses
- [Order history](customer-orders) — view and filter orders
