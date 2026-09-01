---
title: Workers
description: CLI webhook worker and audit-prune for mxHeadless
---

# Workers

The CLI worker drains the webhook outbox. Run it on a schedule in production.

## Webhook worker

```bash
php /path/to/modx/core/components/mxheadless/bin/webhook-worker.php --limit=50
```

| Option | Default | Description |
| --- | --- | --- |
| `--limit=N` | `mxheadless_webhook_worker_limit` or `50` | Max deliveries per run |

Output: `Processed 3 webhook(s)`. Exit code `0` on success, `1` if MODX failed to boot.

### Cron (every minute)

```cron
* * * * * www-data php /var/www/modx/core/components/mxheadless/bin/webhook-worker.php --limit=50 >> /var/log/mxheadless-webhook.log 2>&1
```

Adjust user and paths for your server.

## Audit prune

When `mxheadless_audit_enabled=true`, run daily:

```bash
php /path/to/modx/core/components/mxheadless/bin/audit-prune.php
```

Without `--days`, uses `mxheadless_audit_retention_days`. See [Audit log](audit-log).

## Requirements

- mxHeadless installed, MODX boots from bin scripts
- PSR-18 client in `$modx->services`
- Subscriber URL reachable from the MODX host (HTTPS, not private IP)

## Monitoring

- Growing `pending` count in `mxheadless_webhook_deliveries`
- `failed` rows after `mxheadless_webhook_max_attempts`
- Worker log shows `Processed 0` while mutations keep happening

## See also

- [Webhooks](/components/mxheadless/operations/webhooks)
- [ISR revalidation](isr-revalidation)
