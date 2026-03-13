---
title: ms3FirstTimeBuyerDiscount
description: First-order discount for MiniShop3 — auto-applied when 0 paid orders (percent or fixed)
logo: https://modstore.pro/assets/extras/ms3firsttimebuyerdiscount/logo.png
author: ibochkarev
modstore: https://modstore.pro/packages/discounts/ms3firsttimebuyerdiscount
dependencies: miniShop3
categories: minishop3

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'API and events', link: 'api' },
  { text: 'MiniShop3 integration', link: 'integration' },
  { text: 'Extension', link: 'extension' },
]
---
# ms3FirstTimeBuyerDiscount

Component for [MiniShop3](/en/components/minishop3/): automatic first-order discount. When the customer has zero paid orders, a discount (percent or fixed amount) is applied to the cart. For logged-in users `user_id` is used; for guests — `email`/`phone` from the order draft Address. Paid order statuses come from `ms3_status_for_stat` (with `ms3_status_new` taken into account).

## Features

- **First-order discount** — applied during cart calculation (event `msOnGetCartCost`), no template changes
- **Discount type** — percent of total or fixed amount in shop currency
- **Identifying “first” buyer** — by `user_id` for users, by `email`/`phone` for guests, using statuses from `ms3_status_for_stat`
- **Discount combination** — setting `ftb_allow_combination` can block FTB when the cart already has another discount
- **Events** — `ftbOnBeforeApply` (cancel or override amount), `ftbOnApply` (logging, analytics)
- **Checkout banner** — snippet `ms3ftbDiscountBanner` + frontend eligibility check by email/phone
- **Extensibility** — override service in container `ms3ftb_discount`, extend `FtbDiscountService`

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.x |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — cart, orders, event `msOnGetCartCost`, setting `ms3_status_for_stat`

## Installation

### Via ModStore

1. [Connect the ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3** is installed
4. Find **ms3FirstTimeBuyerDiscount** and click **Download**, then **Install**
5. **Manage → Clear cache**

### After installation

Configure the discount in **Settings → ms3firsttimebuyerdiscount**.

See: [Quick start](quick-start).

## Terms

| Term | Description |
|------|-------------|
| **First-Time Buyer** | Logged-in user or guest with zero orders in statuses from `ms3_status_for_stat` (with `ms3_status_new`) |
| **Paid order** | Order in one of the statuses listed in `ms3_status_for_stat` (e.g. "Paid", "Delivered") |
| **Discount** | Amount or percent subtracted from cart total in `msOnGetCartCost` |
