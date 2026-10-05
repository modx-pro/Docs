---
title: System settings
---
# System settings

Keys: `crawlerdetect_*`. Namespace **crawlerdetect**. The dot in `crawlerdetect.` is only on the `placeholderPrefix` placeholder. System setting keys have no dot.

Path: **System → System settings**, filter by namespace `crawlerdetect`.

## Settings table

| Setting | Description | Default |
|---------|-------------|---------|
| `crawlerdetect_block_message` | Message when a bot is blocked | Russian string from transport: «Не удалось отправить форму. Попробуйте позже.» |
| `crawlerdetect_log_blocked` | Log blocked submissions to MODX system log | Yes |

The message goes to `[[+fi.validation_error_message]]` and the FormIt error key `crawlerdetect` (`$hook->addError`).

If `crawlerdetect_log_blocked` is missing from the database, the hook logs (fallback `true`, same as transport). Log line: `HTTP_USER_AGENT` only, max 200 characters. Not a concat of detection headers.

## isCrawler snippet properties

| Property | Description | Default |
|----------|-------------|---------|
| **userAgent** | String to check. Empty: JayBizzle headers (`HTTP_USER_AGENT`, `HTTP_FROM`, `HTTP_SEC_CH_UA`, …) | — |
| **placeholderPrefix** | Placeholder prefix for detected bot name | `crawlerdetect.` |

Bot name: `crawlerdetect.matches` (or your prefix). For debugging.
