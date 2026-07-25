---
title: System settings
---
# System settings

Component settings use namespace `sendex` and key prefix `sendex_`.

**Where to change:** **Manage → System settings** — filter by namespace `sendex`.

On package upgrade existing values are **not overwritten** (transport creates keys only on first install).

## Settings from the package

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `sendex_export_fields` | textfield | `email` | CSV export columns, comma-separated: `id`, `user_id`, `email`, `username`, `fullname`, `phone`, `mobilephone` |
| `sendex_hide_export_button` | combo-boolean | `No` | Hide the export button in the manager |
| `sendex_confirm_email` | combo-boolean | `Yes` | Guests must confirm subscription by email |
| `sendex_confirm_rate_limit` | textfield | `0` | Minimum interval (seconds) between confirmation emails per address; `0` = off |
| `sendex_csrf_protect` | combo-boolean | `No` | CSRF token for POST subscribe/unsubscribe forms on the site |

### Email confirmation

With `sendex_confirm_email = Yes` the guest receives an activation email (chunk `tpl.Sendex.activate`). The link expires in **30 minutes** (hardcoded in the snippet).

With `sendex_confirm_email = No` the email is saved immediately without confirmation. Typos and spam signups are harder to catch — enable only as a deliberate tradeoff.

### CSRF

With `sendex_csrf_protect = Yes` forms get a hidden `sendex_csrf` field with a session token. Checked only for POST `subscribe` and `unsubscribe`.

## Settings not in transport

The code reads these via `getOption`, but the package **does not create** them. Add manually if needed.

| Key | Code default | Description |
| --- | --- | --- |
| `sendex_queue_limit` | `100` | Max emails per cron run (`core/components/sendex/cron/send.php`) |
| `sendex_core_path` | `{core_path}components/sendex/` | Path to component core |
| `sendex_assets_url` | `{assets_url}components/sendex/` | Component assets URL |

## Related MODX settings

Sendex falls back to MODX system settings for mail headers:

- `emailsender` — From when the newsletter has no `email_from`
- `site_name` — sender name when `email_from_name` is empty

## Snippet parameters vs system settings

Some snippet parameters override system settings per call:

| Snippet parameter | System setting |
| --- | --- |
| `&confirmEmail` | `sendex_confirm_email` |
| `&confirmRateLimit` | `sendex_confirm_rate_limit` |
| `&csrfProtect` | `sendex_csrf_protect` |

Override CSRF for a single form:

::: code-group

```fenom
{'!Sendex' | snippet : ['id' => 1, 'csrfProtect' => 1]}
```

```modx
[[!Sendex? &id=`1` &csrfProtect=`1`]]
```

:::

See [Sendex snippet](snippets/sendex).
