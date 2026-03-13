---
title: Scheduled reports
---
# Scheduled reports

Configure automatic CSV report delivery by email via [Scheduler](/en/components/scheduler/).

## System settings

In **Manage → System settings** (namespace **ms3pulse**):

| Setting | Description |
|-----------|----------|
| `ms3pulse_scheduled_export_enabled` | Enable report delivery. |
| `ms3pulse_scheduled_export_email` | Recipient email. |
| `ms3pulse_scheduled_export_period_days` | Number of days for the report (revenue by day). |
| `ms3pulse_scheduled_export_token` | Optional: token for URL trigger (external cron). |

See [System settings](settings).

## Creating a Scheduler task

1. Go to **Extras → Scheduler** (or the section where tasks are managed).
2. Create a new task.
3. Set:
   - **Namespace:** `ms3pulse`
   - **Processor:** `Dashboard/SendScheduledReport`
   - **Schedule** — e.g. daily at 08:00.

## Send logic

1. Task runs processor `Dashboard/SendScheduledReport`.
2. Processor checks `ms3pulse_scheduled_export_enabled`; if disabled, task exits without sending.
3. CSV of type **revenue by day** is built for the last `ms3pulse_scheduled_export_period_days` days.
4. Email is sent to `ms3pulse_scheduled_export_email` via MODX mail (modPHPMailer) or fallback `mail()`.
5. Subject and body come from component lexicons.

## URL trigger (external cron)

If `ms3pulse_scheduled_export_token` is set, the processor can be triggered by URL (e.g. from another server via cron), passing the token. See processor code and package docs for the exact URL format.

## Troubleshooting

- **Email not received** — check MODX mail settings (`mail_*`), logs, and that the Scheduler task actually runs (cron or built-in scheduler).
- **Empty attachment or error** — ensure there are orders in the period; check processor logs and write permissions for temp files.
