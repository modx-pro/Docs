# Quick start

## Install

1. Install the PostCraft package through the Installer.
2. Open Extras → PostCraft.

On install PostCraft creates its tables, the `PostCraft` plugin, the `PostCraft.Blank` and `PostCraft.Promo` chunks and the first sender mailbox from the `emailsender` and `site_name` system settings.

## Cron

Without cron the queue does not go out. Add a task that runs every minute:

```bash
* * * * * php /path/to/site/core/components/postcraft/cron.php
```

Each run sends the letters that are due, in batches of 100, for up to 40 seconds.

## Sender mailbox

The gear icon to the right of the tabs opens the mailbox list. A Local mailbox sends through the site server `mail()`. If your host blocks that mail or letters land in spam, switch the mailbox to SMTP and fill in the server, port, encryption, login and password.

## Time zone

PostCraft counts the send day and hours in the zone from the `postcraft_timezone` system setting. An empty value means the PHP zone of the server. If the server sits in another zone, set yours, for example `Europe/Berlin`.

## First campaign

1. Templates tab: open `PostCraft.Blank`, click Create copy and replace the text with yours.
2. Campaign tab: choose the template, write the subject and preheader.
3. Paste addresses into the Addresses field, one per line or comma separated.
4. Click Test to me. The letter goes to the email of your MODX profile.
5. Choose the date and hours and click Schedule. The Send to everyone now checkbox sends without a window.

The Stats tab shows the progress. You can pause, edit or cancel the campaign there.

## Links in the letter

A template has two placeholders:

| Placeholder | Leads to |
|---|---|
| `{{ mirror }}` | web version of the letter on the site |
| `{{ unsubscribe }}` | unsubscribe confirmation page |

Web version and unsubscribe URLs are `/mail/{token}` and `/unsubscribe/{token}` with friendly URLs on, otherwise `assets/components/postcraft/t.php`.
