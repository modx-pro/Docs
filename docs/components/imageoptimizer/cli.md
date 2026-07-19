---
title: CLI и cron
---

# CLI и cron

ImageOptimizer обрабатывает очередь из shell: bulk scan, разовая конвертация, cron на shared hosting.

Пути ниже относительно корня MODX.

## cli/convert.php

### Базовые примеры

Обработать до 100 pending-задач:

```bash
php core/components/imageoptimizer/cli/convert.php --limit=100
```

Scan каталога media source и enqueue + convert:

```bash
php core/components/imageoptimizer/cli/convert.php --source=1 --scan --path=assets/images --limit=200
```

Один файл:

```bash
php core/components/imageoptimizer/cli/convert.php --source=1 --path=assets/images/hero.jpg --limit=10
```

Только scan (dry-run):

```bash
php core/components/imageoptimizer/cli/convert.php --source=1 --scan --path=assets/test --dry-run
```

JSON для скриптов:

```bash
php core/components/imageoptimizer/cli/convert.php --limit=50 --json
```

### Аргументы

| Аргумент | Описание |
| --- | --- |
| `--source=N` | ID `modMediaSource` (по умолчанию `default_media_source`, обычно `1`) |
| `--scan` | Обойти каталог source и добавить задачи в очередь |
| `--path=PATH` | Подкаталог для `--scan` или один файл/каталог для enqueue |
| `--limit=N` | Сколько pending-задач обработать за запуск |
| `--dry-run` | Только отчёт по scan, без записи в очередь/диск |
| `--format=webp\|avif` | Override формата на время запуска |
| `--breakpoints=480,768` | Override breakpoints на время запуска |
| `--time-budget=300` | Лимит времени в секундах |
| `--json` | Вывод статистики в JSON |

CLI инициализирует MODX в контексте `mgr` (нужен для media sources и настроек).

### Типичные сценарии

**Первичная миграция каталога:**

```bash
php core/components/imageoptimizer/cli/convert.php \
  --source=1 --scan --path=assets/images/products --limit=500 --time-budget=600
```

Повторяйте, пока pending не станет 0, или настройте cron.

**Только AVIF для теста:**

```bash
php core/components/imageoptimizer/cli/convert.php \
  --format=avif --path=assets/images/hero.jpg --limit=20
```

## cron/convert.php

Обёртка над worker с flock и лимитами из настроек:

```bash
*/10 * * * * php /var/www/site/core/components/imageoptimizer/cron/convert.php >> /var/log/imageoptimizer-cron.log 2>&1
```

Поведение:

- Блокировка: `core/cache/imageoptimizer/cron.lock` (второй процесс завершится сразу)
- Лимит задач: `imageoptimizer_cron_limit` (по умолчанию 200)
- Сброс зависших: `processing` старше `imageoptimizer_stuck_minutes` → `pending`

Проверка вручную:

```bash
php core/components/imageoptimizer/cron/convert.php
echo $?
```

## cron/prune.php

Удаляет из `imageoptimizer_queue` записи со статусом `done` старше `imageoptimizer_retention_days`:

```bash
0 3 * * * php /var/www/site/core/components/imageoptimizer/cron/prune.php
```

При `retention_days=0` prune не удаляет строки.

Рекомендуется раз в сутки на production с большой очередью.

## Связь с админкой

| Действие в UI | CLI-эквивалент |
| --- | --- |
| Пересобрать очередь (каталог) | `--scan --path=…` или `--path=…` |
| Пересобрать (один файл) | `--path=assets/…/file.jpg --limit=10` |
| **Обработать очередь** | `--limit=N` (без `--scan`) |
| Retry failed | нет прямого CLI; **Повторить выбранные** в UI |
| Reset stuck | автоматически в cron; в UI — **Сбросить зависшие** |

`queue/process` и cron используют один lock. Параллельный запуск вернёт `worker_busy`.

## Ошибки CLI

| Симптом | Решение |
| --- | --- |
| `MODX init failed` | Путь к `config.core.php`, права PHP CLI |
| 0 processed, много pending | Проверьте энкодеры (вкладка Server), логи MODX |
| Permission denied на lock | `chmod 775 core/cache/imageoptimizer/` |
| Memory exhausted | `imageoptimizer_max_memory_limit`, меньше breakpoints |

## Shared hosting

- Убедитесь, что cron доступен и `proc_open` не запрещён (для `cwebp`/`avifenc`)
- При запрете shell-утилит оставьте только GD/Imagick в `imageoptimizer_method_priority`
- Уменьшите `imageoptimizer_cron_limit` до 20–50

## Связанные разделы

- [Быстрый старт](quick-start) — первый cron после install
- [Системные настройки](settings) — `cron_limit`, `stuck_minutes`, `retention_days`
- [Админка](manager) — очередь в UI
