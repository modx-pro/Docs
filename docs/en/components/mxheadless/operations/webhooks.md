---
title: Webhooks
description: Subscriptions, worker, and event delivery in mxHeadless
---

# Webhooks

After create/update/delete, mxHeadless enqueues events in the outbox. Delivery runs via CLI worker.

## Core events

`resources.created`, `resources.updated`, `resources.deleted`, and `{name}.*` analogs for generic objects.

## Subscribe

```bash
php core/components/mxheadless/bin/webhook-subscribe.php \
  --name=isr \
  --url=https://frontend.example/api/revalidate \
  --events=resources.created,resources.updated,resources.deleted \
  --secret=YOUR_HMAC_SECRET
```

Tables: `mxheadless_webhook_subscriptions`, `mxheadless_webhook_deliveries`.

## Worker

```bash
php core/components/mxheadless/bin/webhook-worker.php --limit=50
```

Default `--limit` from `mxheadless.webhook.worker_limit`. Schedule on cron every minute.

## Delivery

POST JSON to subscriber URL:

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `User-Agent` | `MxHeadless-Webhook/1.0` |
| `X-MxHeadless-Event` | event type |
| `X-MxHeadless-Delivery-Id` | delivery id |
| `X-MxHeadless-Signature` | `sha256=...` when secret is set |

Retries: exponential backoff, max `mxheadless.webhook.max_attempts` (5) → `failed`.

## SSRF

By default blocks localhost, private IP, `.local`/`.test`. Dev override: `mxheadless.webhook.allow_private_urls=true` (also relaxes TLS verify).

## Payload (v1)

```json
{
  "id": "...",
  "type": "resources.updated",
  "created_at": "...",
  "data": {
    "object": "resources",
    "action": "updated",
    "id": 12,
    "context": "web",
    "uri": "about",
    "parent": 0
  },
  "meta": {
    "revalidate": []
  }
}
```
