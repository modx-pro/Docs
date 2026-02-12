---
title: mspPaySelectionWidget
description: MiniShop2 order payment via PaySelection payment widget
logo: https://modstore.pro/assets/extras/msppayselectionwidget/logo.png
author: gvozdb
modstore: https://modstore.pro/packages/payment-system/msppayselectionwidget

dependencies: miniShop2
categories: payment
---

# mspPaySelectionWidget

MiniShop2 order payment via PaySelection payment widget.

## Setup

1. Install the component.

2. Set values in system settings `ms2_msppsw_widget_public_key` and `ms2_msppsw_widget_site_id`.

3. Call snippet `mspPaySelectionWidget` on the page where `msGetOrder` is called (usually the cart page). After checkout, miniShop2 must redirect to this page with GET parameter `msorder={order_id}`.

4. In the merchant dashboard, add a webhook with URL like: `https://your_domain/assets/components/minishop2/payment/msppayselectionwidget.php`

5. Enable PaySelection payment method in miniShop2 settings.

6. Test payments with test cards.

7. On production, disable test mode in system setting `ms2_msppsw_test_mode` and in the merchant dashboard (via their support).
