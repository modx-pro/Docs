# Settings, cron and bounces

## System settings

All settings live in the `postcraft` namespace.

| Key | Default | Purpose |
|---|---|---|
| `postcraft_timezone` | empty | time zone of the send day and window, for example `Europe/Berlin`. Empty means the PHP zone |
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

Each run sends the letters that are due, in batches of 100, for up to 40 seconds. With IMAP set up it then processes up to 20 new bounces. A separate `bounce` task processes up to 50 per run:

```bash
*/10 * * * * php /path/to/site/core/components/postcraft/cron.php bounce
```

The script prints a one-line summary such as `queue {"ok":2,"fail":0,"skipped":0,"processed":2}`, handy for a log file.

## Bounces {#bounces}

Mail servers return undelivered letters to the sender. PostCraft reads those letters over IMAP and marks them in the stats:

- **hard bounce** (no such address, mailbox deleted): the address goes to the blacklist and the letter gets the Bounce status;
- **soft bounce** (mailbox full, temporary error): the event goes to the stats and the address stays in campaigns.

PostCraft links a bounce to its campaign through the `bounce+token@domain` address or the `Final-Recipient` field.

Local mailboxes set `Return-Path: bounce+token@sender-domain`. For bounces to arrive, the domain needs a mailbox or alias that accepts `bounce+…` addresses. For SMTP mailboxes the SMTP server sets the return address, usually the sender mailbox itself. Point the IMAP settings at it.

The PHP `imap` extension is required. Processed letters are marked as read.
