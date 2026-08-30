---
title: Audit log
description: mxheadless_api_log access log and prune
---

# Audit log

| Key | Default |
| --- | --- |
| `mxheadless.audit.enabled` | `false` |
| `mxheadless.audit.retention_days` | `90` |
| `mxheadless.audit.log_get` | `false` |

Table `{prefix}mxheadless_api_log`: `request_id`, `identity_key`, `api_key_id`, `method`, `path`, `context_key`, `status_code`, `duration_ms`, `created_on`.

Not logged: bodies, `Authorization`, cookies, query string.

GET requests are logged only when `mxheadless.audit.log_get=true`.

## Prune

```bash
php core/components/mxheadless/bin/audit-prune.php --days=90
```

Without `--days`, uses `mxheadless.audit.retention_days`. Schedule in cron.
