---
title: Запуск по расписанию
---

# Запуск по расписанию

Импорт по cron удобнее запускать через [CronManager](https://extras.modx.com/package/cronmanager) или [Scheduler](https://modstore.pro/packages/utilities/scheduler).

## CronManager

На сервере добавьте cron на `{assets_url}components/cronmanager/cron.php`. Подробности: [документация CronManager](https://jako.github.io/CronManager/usage/).

В CronManager создайте задачу со сниппетом **ImpexCRON** (идёт в комплекте с Impex). Параметры:

```text
parent: 25
config: resource
file: import.xlsx
gallery: new
```

![Настройка задачи CronManager](https://demo.rpa-design.ru/media/impex/005.png)

- **parent** — ID родительского ресурса (`25`)
- **config** — имя PHP-конфига без расширения (`resource` → `resource.php`)
- **file** — файл в `{assets_url}components/impex3/files/` (загрузите заранее)
- **gallery** — режим галереи miniShop3: `new` (только новые), `refresh` (перезапись); без параметра галерея не обрабатывается

## Scheduler

1. Настройте cron на `{assets_url}components/scheduler/run.php`.
2. Создайте задания в интерфейсе Scheduler:

![Scheduler — список заданий](https://demo.rpa-design.ru/media/impex/sched1.png)

![Scheduler — создание задания](https://demo.rpa-design.ru/media/impex/sched2.png)

![Scheduler — параметры Impex](https://demo.rpa-design.ru/media/impex/sched3.png)

Параметры те же, что у сниппета ImpexCRON в CronManager.
