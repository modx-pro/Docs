---
title: Требования
description: PHP, MODX, xPDO и опциональные зависимости mxHeadless
---

# Требования

## Среда

| Компонент | Версия |
| --- | --- |
| MODX Revolution | **3.2.3+** |
| PHP | **8.1+** |
| xPDO | **~3.1** на стабильной ветке, **^3.2** на актуальной `3.x` |
| СУБД | MySQL / MariaDB с InnoDB |

В transport-метаданных указано `modx >= 3.0.0`. На сайте и в README пакета ориентир: **3.2.3+**.

Friendly URLs желательны для префикса `/api/v1`. Без них используйте [fallback `api.php`](installation#запасной-путь-apiphp).

## Матрица совместимости

| MODX | xPDO | PHP |
| --- | --- | --- |
| 3.2.3-pl | ~3.1 | 8.1-8.3 |
| 3.x (dev) | ^3.2 | 8.2+ |

## Опционально

- Cron или systemd для [webhook worker](operations/webhooks)
- HTTPS в production
- Composer в `core/components/mxheadless/` при ручной установке из исходников
