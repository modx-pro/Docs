---
title: msMarketingStatuses
description: Automatic order status management
author: gvozdb
modstore: https://modstore.pro/packages/integration/msmarketingstatuses

dependencies: miniShop2
---

# msMarketingStatuses

The component lets you automate order status changes, simplifying work for managers, marketers, or store owners.

**You can easily:**

- Remind the client to pay 5 minutes after order placement
- Ask for a review 1 week after order shipment
- Send a promo code for the next order 2 weeks after shipment

All of this runs automatically, without your involvement.

## Use cases

### 1. Higher order-to-payment conversion

Improve conversion by automatically sending a payment reminder within a set time after the order.

If a confirmation email reaches the client within 5 minutes, a "hot" client is more likely to pay immediately and not go to competitors.

Add a new order status "Payment reminder" in miniShop2 with an email to the client, then create an msMarketingStatuses task to change status from "New" to "Payment reminder" with trigger "5 minutes".

### 2. Getting product reviews

Get product and service reviews by sending an email automatically after a set time.

Add a new order status "Review requested" in miniShop2 with an email, then create a task to change status from "Shipped" to "Review requested" with trigger "10080 minutes" (1 week).

### 3. More repeat orders

Increase repeat orders by sending a promo code for the next order at the right time.

Add a new order status "Promo issued" in miniShop2 with an email (chunk can generate a promo code [as in msPromoCode2][30]), then create a task to change status from "Shipped" to "Promo issued" with trigger "20160 minutes" (2 weeks).

## Installation

To have the component change order statuses automatically, add the helper script to cron. It runs the tasks you create in the MODX manager.

Run the cron job every minute.

Example:

```bash
* * * * * php /{path_to_site}/core/components/msmarketingstatuses/cron/runjobs.php --silent=1
```

where `{path_to_site}` is the full path to the site root.

::: warning
Run the script as the user that runs the site.
If you run as root or another user, cache directories will get wrong permissions and MODX will report errors when deleting cache files.

If you are in a terminal as root or via sudo, run:

```bash
sudo -u{user} php /path_to_script.php
```

where `{user}` is the system user that runs the site; otherwise omit `sudo -u{user}`.
:::

[30]: /en/components/mspromocode2/cases/generate-promocode
