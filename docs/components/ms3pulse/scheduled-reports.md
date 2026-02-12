---
title: Отчёты по расписанию
---
# Отчёты по расписанию

Настройка автоматической отправки CSV-отчёта на email по расписанию через [Scheduler](/components/scheduler/).

## Системные настройки

В **Управление → Системные настройки** (пространство **ms3pulse**):

| Настройка | Описание |
|-----------|----------|
| `ms3pulse_scheduled_export_enabled` | Включить отправку отчётов. |
| `ms3pulse_scheduled_export_email` | Email получателя. |
| `ms3pulse_scheduled_export_period_days` | За сколько дней формировать отчёт (выручка по дням). |
| `ms3pulse_scheduled_export_token` | Опционально: токен для вызова по URL (внешний cron). |

Подробнее: [Системные настройки](settings).

## Создание задачи в Scheduler

1. Перейдите в **Extras → Scheduler** (или раздел, где управляются задачи).
2. Создайте новую задачу.
3. Укажите:
   - **Namespace:** `ms3pulse`
   - **Processor:** `Dashboard/SendScheduledReport`
   - **Расписание** — например, ежедневно в 08:00.

<!-- SCREENSHOT: Задача Scheduler с процессором SendScheduledReport -->
<!-- ![Задача Scheduler — SendScheduledReport](/components/ms3pulse/screenshots/scheduler-task.png) -->

## Логика отправки

1. Задача запускает процессор `Dashboard/SendScheduledReport`.
2. Процессор проверяет настройку `ms3pulse_scheduled_export_enabled`; при выключенной отправке задача завершается без отправки.
3. Формируется CSV типа **выручка по дням** за последние `ms3pulse_scheduled_export_period_days` дней.
4. Письмо отправляется на `ms3pulse_scheduled_export_email` через почту MODX (modPHPMailer) или fallback `mail()`.
5. Тема и тело письма задаются в лексиконах компонента.

## Вызов по URL (внешний cron)

Если задан `ms3pulse_scheduled_export_token`, процессор можно вызывать по URL (например, с другого сервера по cron), передав токен для проверки. Точный формат вызова уточняйте в коде процессора и документации пакета.

## Устранение проблем

- **Письмо не приходит** — проверьте настройки почты MODX (`mail_*`), логи, что задача Scheduler реально выполняется (cron или встроенный планировщик).
- **Вложение пустое или ошибка** — убедитесь, что за указанный период есть заказы; проверьте логи процессора и права на запись во временные файлы.
