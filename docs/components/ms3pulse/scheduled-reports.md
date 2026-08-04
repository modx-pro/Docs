---
title: Отчёты по расписанию
---
# Отчёты по расписанию

Автоматическая отправка CSV на email через [Scheduler](/components/scheduler/).

## Системные настройки

**Управление → Системные настройки** → пространство **ms3pulse**:

| Настройка | Описание |
|-----------|----------|
| `ms3pulse_scheduled_export_enabled` | Включить отправку. |
| `ms3pulse_scheduled_export_email` | Email получателя. |
| `ms3pulse_scheduled_export_period_days` | За сколько дней собрать выручку по дням (по умолчанию 7). |
| `ms3pulse_scheduled_export_token` | Токен для вызова по URL без сессии manager. |

Подробнее: [Системные настройки](settings).

## Задача Scheduler

При установке или обновлении ms3Pulse регистрирует задачу с reference **`ms3pulse_scheduled_report`**, если Scheduler установлен. Расписание задаёте вручную.

1. **Extras → Scheduler** (или раздел задач в вашей сборке).
2. Найдите или создайте задачу с процессором **`Dashboard/SendScheduledReport`**, namespace **`ms3pulse`**.
3. Задайте расписание, например ежедневно в 08:00.

## Что отправляется

1. Процессор проверяет `ms3pulse_scheduled_export_enabled`.
2. Формирует CSV **выручка по дням** за последние N дней (`scheduled_export_period_days`). Фильтр статусов не применяется.
3. Отправляет письмо на `scheduled_export_email` через почту MODX.

## Вызов по URL (cron)

Если задан `ms3pulse_scheduled_export_token`:

```text
https://ваш-сайт/assets/components/ms3pulse/connector.php?action=Dashboard/SendScheduledReport&token=ВАШ_ТОКЕН
```

Пример cron (ежедневно в 08:00):

```bash
0 8 * * * curl -fsS 'https://ваш-сайт/assets/components/ms3pulse/connector.php?action=Dashboard/SendScheduledReport&token=ВАШ_ТОКЕН' >/dev/null
```

## Устранение проблем

- **Письмо не приходит** — настройки `mail_*` в MODX, папка «Спам», логи Scheduler.
- **Пустое вложение** — нет заказов за указанный период.
- **Задача не создалась** — установите Scheduler и переустановите ms3Pulse или создайте задачу вручную.
