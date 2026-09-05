---
title: Requirements
description: PHP, MODX, xPDO, and optional dependencies for mxHeadless
---

# Requirements

## Environment

| Component | Version |
| --- | --- |
| MODX Revolution | **3.2.3+** |
| PHP | **8.1+** |
| xPDO | **~3.1** on stable branches, **^3.2** on current `3.x` |
| Database | MySQL / MariaDB with InnoDB |

Transport metadata declares `modx >= 3.0.0`. The package README and production sites target **3.2.3+**.

Friendly URLs are recommended for the `/api/v1` prefix. Without them, use the [fallback `api.php`](installation#fallback-entry-apiphp).

## Compatibility matrix

| MODX | xPDO | PHP |
| --- | --- | --- |
| 3.2.3-pl | ~3.1 | 8.1-8.3 |
| 3.x (dev) | ^3.2 | 8.2+ |

## Optional

- Cron or systemd for the [webhook worker](operations/webhooks)
- HTTPS in production
- Composer in `core/components/mxheadless/` when installing manually from source
