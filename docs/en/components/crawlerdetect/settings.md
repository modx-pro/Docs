---
title: System settings
---
# System settings

Keys: `crawlerdetect_*`. Namespace **crawlerdetect**. The dot in `crawlerdetect.` belongs to the `placeholderPrefix` placeholder. System setting keys do not use a dot.

Path: **System → System settings**, filter by namespace `crawlerdetect`.

## Settings table

| Setting | Description | Default |
|---------|-------------|---------|
| `crawlerdetect_block_message` | Message when form is blocked (bot) | Russian string from transport: «Не удалось отправить форму. Попробуйте позже.» |
| `crawlerdetect_log_blocked` | Log blocked submissions to MODX system log | Yes |

The message is written to `[[+fi.validation_error_message]]` and to the FormIt error key `crawlerdetect` (`$hook->addError`). If `crawlerdetect_log_blocked` is missing from the database, the hook does not log (fallback `false`, issue [#2](https://github.com/Ibochkarev/CrawlerDetect/issues/2)).

## isCrawler snippet properties

| Property | Description | Default |
|----------|-------------|---------|
| **userAgent** | String to check. Empty: JayBizzle headers (`HTTP_USER_AGENT`, `HTTP_FROM`, `HTTP_SEC_CH_UA`, …) | — |
| **placeholderPrefix** | Placeholder prefix for detected bot name | `crawlerdetect.` |

Placeholder `crawlerdetect.matches` (or your prefix) gets the bot name. Use it when debugging.
