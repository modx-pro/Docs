---
title: System settings
description: Keys in the reactions namespace — default set, identity, security, webhooks
---

# System settings

All keys use the `reactions_` prefix in the **reactions** namespace.

Open: **System → System Settings**, filter `reactions`.

## Main

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `reactions_default_set` | text | `updown` | Set when the snippet omits `&set` (`updown`, `github`, `full`, or custom) |
| `reactions_full_types` | text | *(empty)* | Type subset for `set=full` (comma-separated names). Empty — all 24 |
| `reactions_identity_strategy` | text | `ip_cookie` | Identity strategy: `auth_only`, `ip`, `ip_cookie`, `session` |
| `reactions_allow_multiple` | combo-boolean | No | Allow several reaction types on one object (only if the set is not `exclusive`) |
| `reactions_cache_handler` | text | `modx` | Cache handler: `modx` or `redis` |

### Identity strategies

| Value | Behavior |
| --- | --- |
| `auth_only` | Logged-in users only; guests get an error |
| `ip` | Fingerprint from IP hash |
| `ip_cookie` | Cookie `reactions_fid` (32 hex), 1 year |
| `session` | Fingerprint from PHP session ID |

A logged-in user is always identified by `user_id`, regardless of strategy.

Example `reactions_full_types`:

```text
like,love,fire,star,clap,rocket,heart_eyes
```

## Security

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `reactions_rate_limit` | number | `10` | Max reactions per time window |
| `reactions_rate_limit_window` | number | `60` | Rate limit window length in seconds |
| `reactions_block_bots` | combo-boolean | Yes | Reject reactions from known crawlers and bots |

## Integrations

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `reactions_webhooks_enabled` | combo-boolean | No | HTTP callbacks after reaction changes |
| `reactions_webhook_url` | text | *(empty)* | Webhook URL (JSON compatible with Telegram / Discord / Slack) |
| `reactions_notify_authors` | combo-boolean | No | Message the resource author via `modUserMessage` |

More: [Webhooks](webhooks), [Events](events).
