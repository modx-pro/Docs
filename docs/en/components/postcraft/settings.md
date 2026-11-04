# Settings, cron and bounces

## System settings

All settings live in the `postcraft` namespace.

| Key | Default | Purpose |
|---|---|---|
| `postcraft_timezone` | empty | time zone of the send day and window, for example `Europe/Berlin`. Empty means the PHP zone |
| `postcraft_rate_hour` | `60` | default letters per hour when a mailbox has Per hour = 0 |
| `postcraft_rate_day` | `400` | default letters per day when a mailbox has Per day = 0 |
| `postcraft_cron_batch` | `20` | max letters from one mailbox per cron pass when Per cron run = 0 |
| `postcraft_autopause_bounce_pct` | `8` | auto-pause when hard bounces exceed this % of accepts (after 20 accepts). `0` disables |
| `postcraft_autopause_fail_streak` | `5` | auto-pause after this many consecutive send failures in one cron pass |
| `postcraft_sites` | created on install | JSON site list, see [Several sites](multisite) |
| `postcraft_unsub_pages` | `{}` | unsubscribe page texts. Edit them on the Unsubscribe page tab |
| `postcraft_role` | `hub` | `hub` or `edge` |
| `postcraft_hub_url` | empty | for an edge: the hub URL |
| `postcraft_edge_secret` | created on install | shared key of hub and edge |
| `postcraft_bounce_imap_host` | empty | IMAP server of the bounce mailbox. Empty turns bounce processing off |
| `postcraft_bounce_imap_port` | `993` | IMAP port, SSL connection |
| `postcraft_bounce_imap_user` | empty | IMAP login |
| `postcraft_bounce_imap_pass` | empty | IMAP password |
| `postcraft_bounce_imap_mailbox` | `INBOX` | folder |

Package upgrades keep the values you have set.

## Cron

```bash
* * * * * php /path/to/site/core/components/postcraft/cron.php
```

Each run drains the queue for about 40 seconds under mailbox limits (hour / day / batch). Letters past the quota are deferred to the next hour or day. With IMAP set up it then processes up to 20 new bounces. A separate `bounce` task processes up to 50 per run:

```bash
*/10 * * * * php /path/to/site/core/components/postcraft/cron.php bounce
```

The script prints a one-line summary such as `queue {"ok":2,"fail":0,"skipped":0,"deferred":0,"processed":2}`, handy for a log file.

## Rate limits and warm-up

On shared hosting, blasting a list without caps often gets the server IP banned. PostCraft throttles by the From mailbox:

- each mailbox has Per hour, Per day and Per cron run (0 = the system defaults above);
- **warm-up**: gentle (20% → 50% → 100% over a week), normal, or off;
- a long list is scheduled across several days inside the From–To window;
- the Campaign tab shows an estimate of how many days the send will take;
- SMTP rate-limit replies, failure streaks and a high bounce rate auto-pause the mailing — the reason appears in stats.

## Bounces {#bounces}

Mail servers return undelivered letters to the sender. PostCraft reads those letters over IMAP and marks them in the stats:

- **hard bounce** (no such address, mailbox deleted): the address goes to the blacklist and the letter gets the Bounce status;
- **soft bounce** (mailbox full, temporary error): the event goes to the stats and the address stays in campaigns.

PostCraft links a bounce to its campaign through the `bounce+token@domain` address or the `Final-Recipient` field.

Local mailboxes set `Return-Path: bounce+token@sender-domain`. For bounces to arrive, the domain needs a mailbox or alias that accepts `bounce+…` addresses. For SMTP mailboxes the SMTP server sets the return address, usually the sender mailbox itself. Point the IMAP settings at it.

The PHP `imap` extension is required. Processed letters are marked as read.
