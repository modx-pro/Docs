# Webhook setup

Webhook lets you receive notifications from amoCRM about lead changes and sync order statuses.

## Webhook URL

The URL to configure in amoCRM is shown on the **Settings** tab in the component CMP. Format:

```
https://site.com/assets/components/amoconnector/webhook.php?secret=YOUR_SECRET
```

The secret is generated on install and stored in **amoconnector.webhook_secret**.

## Setup in amoCRM

1. Go to **Settings** → **Integrations** → your integration
2. In the **Webhook** block enter the URL from CMP
3. Enable events:
   - Lead status change

## Reverse status sync

When a webhook is received for a lead stage change:

1. Secret is verified
2. Linked ms2 order is found via `amo_order_link`
3. Reverse mapping amoCRM stage → ms2 status is looked up
4. Order status is updated

Reverse sync requires:

- **amoconnector.sync_statuses_from_amo** enabled
- Status mapping configured in CMP
- Site reachable over HTTPS

::: warning
Webhook is processed synchronously (server-to-server) and does not go through Scheduler even if it is enabled. This is intentional — webhook does not affect site user experience.
:::
