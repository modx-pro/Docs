---
title: FAQ
description: Common Sendex questions — subscribe, confirm, queue, cron, MODX 3
---
# FAQ

## Site subscription

### Form is empty or missing

1. Snippet must be **uncached**: `[[!Sendex]]`, not `[[Sendex]]`
2. Newsletter ID in `&id=` exists and is **active** (or pass `&showInactive=1`)
3. Clear MODX cache after package install

### Guest does not receive confirmation email

1. `sendex_confirm_email` = **Yes** (default)
2. Check SMTP / MODX `emailsender`
3. Confirm link expires in **30 minutes** — subscribe again after expiry
4. Rate limit: `sendex_confirm_rate_limit` > 0 throttles emails per address
5. Recipient spam folder

### Confirm link opens but subscription is not created

1. Target page calls `[[!Sendex]]`
2. Landing snippet **without** `&widgetKey` (confirm/unsubscribe links omit `sendex_widget_key`)
3. Hash already used or expired (registry `/sendex/subscribe/`)

### Logged-in user still sees subscribe form

1. Profile email may match a guest row — merge may be pending; refresh the page
2. Sendex plugin subscribed to `OnUserActivate` / `OnUserSave` (reinstall package on upgrade)

## Guest and MODX user

### Guest subscribed then registered — two rows?

No. **Merge** policy: on activation or user save guest rows with the same email get `user_id`. Unique `(newsletter_id, email)` prevents duplicates.

### Merge did not run

1. Profile email **exactly matches** guest subscription
2. Sendex plugin active on `OnUserActivate` and `OnUserSave`
3. `OnBeforeUserActivate` is **not used** — cancelled activation must not merge

## Queue and sending

### Emails are not sent

Check in order:

1. Queue has rows (**Components → Sendex → Email queue**)
2. Cron runs `php core/components/sendex/cron/send.php` from MODX root
3. `email_from` / `emailsender` set, newsletter template exists
4. MODX log — PHPMailer errors after `sxOnQueueSendFailed`
5. Hosting outbound mail limits

### Cron runs but queue does not shrink

1. Row in **claim** (`claimed_at`, `expires_at` +900 sec)
2. SMTP error — claim released, row kept for retry
3. `sendex_queue_limit` (default 100) — each run processes at most that many rows

### Send to subscribers vs Add to queue

| Action | What it does |
| --- | --- |
| **Send to subscribers** | `addQueues()` + immediate `flush()` |
| **Add to queue** | `addQueues()` only; send separately or via cron |

For large lists build the queue and flush via cron in batches.

## Manager and settings

### No access to Sendex in manager

Page requires `view_sendex` **or** `view_document`. Transport does not create `view_sendex` — `view_document` is usually enough.

### No CSV export button

1. `sendex_hide_export_button` = **No**
2. User has `edit_document` permission

### `sendex_queue_limit` missing in settings

Transport does not create this key. Add manually under **System settings** namespace `sendex`, default value `100`.

## MODX 3

### Compatibility

Sendex 2.0.0-pl verified on MODX 3.2.0-pl. Models are global `sx*`, not `MODX\Revolution\sx*`. Manager menu: `namespace` + `action`. DB schema via Phinx on install/upgrade.

### `sxOn*` events not listed

Reinstall Sendex via **Extras → Installer** — transport registers events. `invokeEvent` by name works even without UI registration.

## Related

- [Quick start](quick-start) — first setup
- [Email queue](interface/queue) — cron and claim
- [Events](integration/events) — hooks and plugin examples
- [System settings](settings) — all `sendex_*` keys
