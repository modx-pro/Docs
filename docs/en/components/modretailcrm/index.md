---
title: modRetailCRM
description: RetailCRM integration
logo: https://modstore.pro/assets/extras/modretailcrm/logo-lg.png
author: biz87
modstore: https://modstore.pro/packages/import-and-export/modretailcrm

items: [
  {
    text: 'Presetup',
    items: [
      { text: 'Upload products', link: 'presetup/upload-products' },
      { text: 'Upload users', link: 'presetup/upload-users' },
      { text: 'Upload orders', link: 'presetup/upload-orders' },
    ],
  },
  {
    text: 'API examples',
    items: [
      { text: 'Create new contact', link: 'examples-api/create-new-contact' },
      { text: 'Quick order product', link: 'examples-api/quick-order-product' },
      { text: 'Search order in RetailCRM', link: 'examples-api/search-order-retailcrm' },
      { text: 'Search product in RetailCRM', link: 'examples-api/search-product-retailcrm' },
    ],
  },
  {
    text: 'Triggers',
    items: [
      { text: 'Order status change', link: 'triggers/order-status-change' },
    ],
  },
  {
    text: 'Modules and class extension',
    items: [
      { text: 'Example class extension', link: 'modules/example-class-extend' },
    ],
  },
]
---
# modRetailCRM

## Description

Component for integrating [RetailCRM][1] with MODX.

It targets miniShop2 but can run without it in manual mode, using the full [RetailCRM API][2].

## Contents

- Plugin that listens for specific events
- System settings
- **icml** snippet for basic catalog export to RetailCRM

## Out of the box

1. Track new user registration (including hidden registration on miniShop2 order) and create users in RetailCRM
2. Track new miniShop2 orders and send order data to RetailCRM
3. Track order status changes in the store and sync them to RetailCRM
4. Track order status changes in RetailCRM and update store order statuses (requires RetailCRM-side setup)
5. Work with forms and send data (requires snippet preparation)

## User data sent to RetailCRM

1. Email
2. Phone
3. First name
4. MODX user ID

## Order data sent to RetailCRM

1. Order number
2. Order items (price, name, quantity, product ID for catalog link)
3. Product modifications (msOptionsPrice2 and options)
4. Delivery cost and method
5. Payment method
6. Discount (msPromoCode)
7. Delivery address
8. Total order weight

## Plugin events

1. **OnUserSave** — new users; data sent to RetailCRM
2. **msOnCreateOrder** — new orders; data sent to RetailCRM
3. **msOnChangeOrderStatus** — order status change; updated order sent to RetailCRM
4. **OnMODXInit** — add fields to Payment, Delivery, Order status
5. **msOnManagerCustomCssJs** — add fields to Payment, Delivery, Order status
6. **OnHandleRequest** — receive data from RetailCRM (e.g. triggers) and apply to site objects (e.g. order status)

### modRetailCRM system settings

| Key | Description |
|-----|-------------|
| **modretailcrm_apiKey** | API key from RetailCRM (**Administration** / **Integration** / **API keys**) |
| **modretailcrm_siteCode** | Site code from RetailCRM (**Administration** / **Stores** / **Your store**) |
| **modretailcrm_url** | Your CRM URL (from the address bar) |
| **modretailcrm_log** | Log all requests (for debugging) |
| **modretailcrm_sync_statuses** | Comma-separated order status IDs to sync (e.g. 2, 4) |
| **modretailcrm_custom_customers_class** | Custom customer module class |
| **modretailcrm_custom_orders_class** | Custom order module class |
| **modretailcrm_allow_msoptionsprice** | Use msOptionsPrice2 |

### Presetup

1. Have a RetailCRM account.
2. In site system settings (modretailcrm) set: API key, CRM URL, site code.
3. **Delivery:** In miniShop2 delivery methods add the **RetailCRM code** field and fill it from RetailCRM delivery catalog.
4. **Payment:** Same for payment methods (RetailCRM **Administration / Dictionaries**).
5. **Order statuses:** Map store statuses to RetailCRM order statuses (RetailCRM **Administration / Statuses**).
6. Then configure product upload, user upload, and order upload (see docs). Not required for basic operation but improves reports.

[1]: http://www.retailcrm.ru/?partner=RCI-6419N
[2]: https://www.retailcrm.ru/docs/Developers/ApiVersion5
