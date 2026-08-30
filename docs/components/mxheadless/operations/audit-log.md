---
title: Audit log
description: Журнал обращений mxheadless_api_log и prune
---

# Audit log

| Ключ | Default |
| --- | --- |
| `mxheadless_audit_enabled` | `false` |
| `mxheadless_audit_retention_days` | `90` |
| `mxheadless_audit_log_get` | `false` |

Таблица `{prefix}mxheadless_api_log`: `request_id`, `identity_key`, `api_key_id`, `method`, `path`, `context_key`, `status_code`, `duration_ms`, `created_on`.

В таблицу не попадают bodies, `Authorization`, cookies и query string.

GET логируются только при `mxheadless_audit_log_get=true`.

## Prune

```bash
php core/components/mxheadless/bin/audit-prune.php --days=90
```

Без `--days` берётся `mxheadless_audit_retention_days`. Ставьте в cron.
