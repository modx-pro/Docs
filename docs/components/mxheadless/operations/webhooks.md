---
title: Webhooks
description: Подписки, worker и доставка событий mxHeadless
---

# Webhooks

После create/update/delete mxHeadless ставит события в outbox. Доставка идёт через CLI worker.

## События core

`resources.created`, `resources.updated`, `resources.deleted` и аналоги `{name}.*` для generic objects.

## Подписка

```bash
php core/components/mxheadless/bin/webhook-subscribe.php \
  --name=isr \
  --url=https://frontend.example/api/revalidate \
  --events=resources.created,resources.updated,resources.deleted \
  --secret=YOUR_HMAC_SECRET
```

Таблицы: `mxheadless_webhook_subscriptions`, `mxheadless_webhook_deliveries`.

## Worker

```bash
php core/components/mxheadless/bin/webhook-worker.php --limit=50
```

`--limit` по умолчанию из `mxheadless_webhook_worker_limit`. Вешайте на cron каждую минуту.

## Доставка

POST JSON на URL подписчика:

| Заголовок | Значение |
| --- | --- |
| `Content-Type` | `application/json` |
| `User-Agent` | `MxHeadless-Webhook/1.0` |
| `X-MxHeadless-Event` | тип события |
| `X-MxHeadless-Delivery-Id` | id доставки |
| `X-MxHeadless-Signature` | `sha256=...` при secret |

Retries: exponential backoff, max `mxheadless_webhook_max_attempts` (5) → `failed`.

## SSRF

По умолчанию блокируются localhost, private IP, `.local`/`.test`. Dev-override: `mxheadless_webhook_allow_private_urls=true` (ослабляет и TLS verify).

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

Cron и systemd для worker: [Workers](workers). Теги `meta.revalidate` для Next.js и Nuxt: [ISR revalidation](isr-revalidation).
