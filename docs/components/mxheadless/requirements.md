---
title: Требования
description: PHP, MODX, xPDO и опциональные зависимости mxHeadless
---

# Требования

## Среда

| Компонент | Версия |
| --- | --- |
| MODX Revolution | **3.0.0+** (`modx >= 3.0.0` в `_build/build.php`) |
| PHP | **8.1+** (`>=8.1.0` в `_build/build.php` и `composer.json`) |
| xPDO | **3.x** из поставки MODX, отдельного ограничения пакет не задаёт |
| СУБД | MySQL / MariaDB с InnoDB (все таблицы пакета на InnoDB) |

Требование транспорта: `modx >= 3.0.0`. README пакета указывает более строгое значение: **MODX Revolution 3.2.3+**. В коде пакета ограничений на xPDO нет, поэтому версии xPDO сверяйте со своей сборкой MODX.

Friendly URLs желательны для префикса `/api/v1`. Без них используйте [fallback `api.php`](installation#zapasnoy-put-apiphp).

## Опционально

- Cron или systemd для [webhook worker](operations/webhooks)
- HTTPS в production
- Composer в `core/components/mxheadless/` при ручной установке из исходников
