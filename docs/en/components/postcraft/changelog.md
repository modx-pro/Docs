# Changelog

## 1.0.0-pl3

- Recipient sources: active MODX users and miniShop2 / MiniShop3 customers (order address email and linked user profile), alongside lists and FormIt
- Campaign UI: checkboxes with counts/previews and a Refresh source counts button

## 1.0.0-pl2

Features ported from tcMailing.

- Fixed mailing (`fixed` + `fixed_days`, default 7): after a successful send, addresses go on a temporary blacklist; any template is blocked until expiry; expired rows are purged automatically. Blacklist column Until (`expires_on`).
- Do not resend now has a day window (`skip_dupes_days`, default 30). Partial skip: skipped emails are listed, the rest are queued; fails only if everyone already got the template.
- Address stats: lookup field and clickable emails open a modal with summary, mailing history and events.
- Selecting a saved list fills Addresses; the server accepts `list_id` when the textarea is empty.

## 1.0.0-pl1

First release.

- MODX Revolution 2.8 and 3.x, PHP 7.2 or newer. One package for both versions.
- Letter templates in chunks, HTML or visual editor, phone/desktop preview on Templates, Campaign and Unsubscribe.
- Recipients from a list, saved lists and FormIt submissions. Duplicates are dropped, addresses that already got the template can be skipped.
- Send window: date and hours in `postcraft_timezone`. No stats for an address → evenly across the window, with opens → at its usual hour.
- Per-mailbox and system rate limits (hour / day / batch), warm-up, multi-day spread for long lists, plan estimate on Campaign, auto-pause on SMTP limit / failure streak / bounce %.
- Pause, resume, cancel and edit of a scheduled campaign.
- Preheader, Reply-To, sender mailbox per campaign. PHP mail or SMTP, the SSL check can be turned off per mailbox.
- Open and click tracking with a bot and prefetch filter.
- Unsubscribe pages per site and language, a reason form, `List-Unsubscribe` headers. Languages from Localizator or MODX contexts, texts in Russian and English, an English draft for other languages.
- Stats export to Excel.
- Blacklist with bulk add, bounce processing over IMAP.
- Several domains: links follow the sender domain, edge on MODX and without it, HMAC-signed requests.
