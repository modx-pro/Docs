---
title: System settings
---
# System settings

All ms3Pulse settings use the `ms3pulse_` prefix and are in namespace **ms3pulse**.

**Where to change:** **Manage → System settings** → in the filter select namespace **ms3pulse**.

## Dashboard area

| Setting | Type | Default | Description |
|-----------|-----|--------------|----------|
| `ms3pulse_dashboard_period_days` | number | 30 | Period when the dashboard is first opened (days). "To" = today, "From" = today − N days. |

## Scheduled reports area

| Setting | Type | Default | Description |
|-----------|-----|--------------|----------|
| `ms3pulse_scheduled_export_enabled` | Yes/No | No | Enable sending CSV report by email on schedule. |
| `ms3pulse_scheduled_export_email` | text | — | Recipient email. |
| `ms3pulse_scheduled_export_period_days` | number | 7 | Number of days for the report (revenue by day). |
| `ms3pulse_scheduled_export_token` | text | — | Token for calling the export processor by URL (external cron). Optional. |

::: tip Scheduled reports
To send reports on a schedule, create a task in [Scheduler](/en/components/scheduler/) with processor `Dashboard/SendScheduledReport`. See [Scheduled reports](scheduled-reports).
:::

## Quick access from menu

**Components → ms3Pulse → Settings** — opens system settings filtered by namespace **ms3pulse**.
