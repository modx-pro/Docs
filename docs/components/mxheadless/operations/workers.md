---
title: Workers
description: CLI webhook worker и audit-prune для mxHeadless
---

# Workers

CLI worker сливает webhook outbox. В production запускайте по расписанию.

## Webhook worker

```bash
php /path/to/modx/core/components/mxheadless/bin/webhook-worker.php --limit=50
```

| Опция | По умолчанию | Описание |
| --- | --- | --- |
| `--limit=N` | `mxheadless_webhook_worker_limit` или `50` | Макс. доставок за запуск |

Вывод: `Processed 3 webhook(s)`. Код `0` при успехе, `1` если MODX не поднялся.

### Cron (каждую минуту)

```cron
* * * * * www-data php /var/www/modx/core/components/mxheadless/bin/webhook-worker.php --limit=50 >> /var/log/mxheadless-webhook.log 2>&1
```

Подставьте пользователя и пути своего сервера.

## Audit prune

При `mxheadless_audit_enabled=true` запускайте ежедневно:

```bash
php /path/to/modx/core/components/mxheadless/bin/audit-prune.php
```

Без `--days` берётся `mxheadless_audit_retention_days`. См. [Audit log](audit-log).

## Требования

- Пакет mxHeadless установлен, MODX инициализируется из bin
- PSR-18 client в `$modx->services`
- URL подписчика доступен с хоста MODX (HTTPS, не private IP)

## Мониторинг

- Рост `pending` в `mxheadless_webhook_deliveries`
- Строки `failed` после исчерпания `mxheadless_webhook_max_attempts`
- Лог worker: `Processed 0` при активных мутациях

## См. также

- [Webhooks](/components/mxheadless/operations/webhooks)
- [ISR revalidation](isr-revalidation)
