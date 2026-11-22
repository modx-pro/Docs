# Manager page

Extras → PostCraft opens a page with tabs:

| Tab | What is there |
|---|---|
| [Campaign](campaign) | a new letter: template, recipients, send window |
| Lists | saved address lists |
| [Templates](templates) | letter HTML and preview |
| [Unsubscribe page](unsubscribe) | unsubscribe page texts per site and language |
| [Stats](stats) | campaigns, their status, opens, clicks, unsubscribes, queue control |
| Blacklist | addresses that get no letters |

The gear icon to the right of the tabs opens the sender mailboxes.

## Lists

A list stores addresses under a name. Write addresses one per line or comma separated. On save PostCraft removes duplicates and reports how many addresses already sit in other lists and how many are blacklisted.

On the Campaign tab, picking a list in Saved list fills Addresses at once. There is no separate Insert button.

## Blacklist

Blacklisted addresses are skipped in every campaign. An address lands here when:

- the recipient unsubscribed through `{{ unsubscribe }}`;
- a hard bounce came back, if [bounce processing](../settings#bounces) is set up;
- you added it by hand;
- a temporary row after a [fixed mailing](campaign): any template is blocked until the date in Until, then the row drops off.

Permanent rows show permanent in Until. The add field takes several addresses at once: one per line, separated by commas, semicolons or spaces. Existing entries keep their reason. PostCraft lists the lines that do not look like an email.

Remove returns the address to campaigns. A recipient can do the same through the public `/unsubscribe` form.

## Sender mailboxes

Each mailbox sets the address and name in the From field.

| Field | Meaning |
|---|---|
| Transport | Local: site server `mail()`. SMTP: an external server |
| SMTP host, port, encryption | for SMTP. Default port 587, 465 for SSL |
| SMTP login and password | the login defaults to the email. The form never shows the password, an empty field keeps the current one |
| Verify server SSL certificate | turn off when the server certificate is issued for another host name. This happens on shared hosting |
| Show in From list | hides the mailbox from the list without deleting it |

You cannot delete the last mailbox.
