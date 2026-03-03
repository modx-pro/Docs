---
title: amoCRM
description: Integration with amoCRM
logo: https://modstore.pro/assets/extras/amocrm/logo-lg.png
author: biz87
modstore: https://modstore.pro/packages/import-and-export/amocrm

items: [
  { text: 'Installation and setup', link: 'setup' },
  { text: 'Sending form data', link: 'submitting-forms' },
  { text: 'Webhook', link: 'webhook' },
  { text: 'Events', link: 'events' },
  { text: 'Common mistakes', link: 'common-mistakes' },
]
---
# amoCRM

Integration module for MODX Revolution sites and amoCRM.

## Key features

- Create deals and contacts from any site form
- Link deals to existing contacts in amoCRM
- Auto-search existing contacts for update; create if missing
- Pass payment method, delivery, and product list when creating a deal from an order
- Two-way order status sync
- Two-way contact/user sync
- Create contact and deal from any contact form
- Automatic creation of:
  - Order fields
  - Contact fields
  - Sales pipeline for orders
  - Status mapping between amoCRM and the site
- Process data from amoCRM via webhook. Out of the box:
  - Update/create users from contact data
  - Change order status
- Process sent and received data via plugins
- Set responsible user, pipeline, status from product categories in the order
- Default responsible user, pipeline, status
- Lock specific amoCRM contact fields from site updates
- Example scripts in _/core/components/amocrm/examples/_
- [simpleQueue](https://modstore.pro/packages/utilities/simplequeue) support for background send

## Quick start

Minimum setup: fill these system settings:

- **amocrm_account** — Account subdomain (amocrm.ru subdomain)
- **amocrm_client_id** — Integration ID (from the integrations section in your amoCRM account)
- **amocrm_client_code** — Auth code (from the integrations section; valid 20 minutes)
- **amocrm_client_secret** — Integration secret (from the integrations section)

## Form data

Fill two system settings:

- **amocrm_form_pipeline_id** — Pipeline ID for form submissions. You can copy it from the browser URL
- **amocrm_form_status_new** — Status ID in that pipeline. Check in dev tools by selecting the status column

To send form data to **amoCRM**, use the _amoCRMAddContact_ snippet as a hook in FormIt or AjaxForm. To map form fields, add _amoCRMmodxAmoFieldsEq_ in this format:
`formField1==amoField1||formField2==amoField2`
For phone and email the parameter is:
`phone||email`
See "Sending form data" for format and other hook parameters.

By default only contacts are created from forms. Ensure **amocrm_user_fields** lists all fields to send to contacts.

To create deals from forms, enable **amocrm_form_as_lead** and set **amocrm_order_fields** for deal fields.

## miniShop2 orders

Fill two system settings:

- **amocrm_pipeline_id** — Pipeline ID for order submissions. Copy from the browser URL
- **amocrm_new_order_status_id** — Status ID in that pipeline. Check in dev tools

Usually no extra steps are needed. After filling the connection and ID settings, new orders are sent as deals with linked contacts.
