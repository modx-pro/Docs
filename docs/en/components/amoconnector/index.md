---
title: amoConnector
description: MODX integration with next-generation amoCRM
logo: https://modstore.pro/assets/extras/amoconnector/logo.png
author: biz87
modstore: https://modstore.pro/packages/import-and-export/amoconnector

items: [
  { text: 'Installation and setup', link: 'setup' },
  { text: 'Submitting form data', link: 'submitting-forms' },
  { text: 'Field mapping', link: 'field-mapping' },
  { text: 'Status mapping', link: 'status-mapping' },
  { text: 'Webhook', link: 'webhook' },
  { text: 'Scheduler', link: 'scheduler' },
  { text: 'Events', link: 'events' },
  { text: 'Common mistakes', link: 'common-mistakes' },
]
---
# amoConnector

Integration component for MODX Revolution sites with amoCRM. Built on the official amoCRM SDK and uses OAuth 2.0.

## Key features

- Auto-create leads from miniShop2 orders
- Create leads from any form via FormIt hook
- Contact deduplication by email and phone
- Two-way order status sync via webhook
- Flexible mapping of order/form fields to amoCRM via CMP
- Map ms2 statuses to amoCRM pipeline stages
- Optional deferred send via [Scheduler](/en/components/scheduler/)
- Event system for plugins to modify data
- Detailed operation log in the manager
- Lead notes with order products or form data

## Quick start

For minimal setup, fill in system settings:

- **amoconnector.client_id** — Integration ID from amoCRM app settings
- **amoconnector.client_secret** — Integration secret
- **amoconnector.redirect_uri** — Redirect URI (must match amoCRM)
- **amoconnector.subdomain** — amoCRM account subdomain (e.g. `mycompany` for `mycompany.amocrm.ru`)

Then complete OAuth in the component CMP.

## miniShop2 orders

After authorization set:

- **amoconnector.default_pipeline_id** — Pipeline ID for orders
- **amoconnector.default_status_id** — Initial lead status in the pipeline
- **amoconnector.enabled** — Enable integration

New ms2 orders will be sent as leads with linked contacts.

## Form data

To send form data, add the `amoConnectorHook` hook to your FormIt call:

```modx
[[!FormIt?
  &hooks=`email,amoConnectorHook`
  &amoFormName=`callback`
]]
```

See "Submitting form data" for hook parameters.
