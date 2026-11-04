# Changelog

## 1.0.0-pl1

First release.

- MODX Revolution 2.8 and 3.x, PHP 7.2 or newer. One package for both versions.
- Letter templates in chunks, HTML or visual editor, phone/desktop preview on Templates, Campaign and Unsubscribe.
- Recipients from a list, saved lists and FormIt submissions. Duplicates are dropped, addresses that already got the template can be skipped.
- Send window: date and hours in `postcraft_timezone`. No stats for an address → evenly across the window, with opens → at its usual hour.
- Pause, resume, cancel and edit of a scheduled campaign.
- Preheader, Reply-To, sender mailbox per campaign. PHP mail or SMTP, the SSL check can be turned off per mailbox.
- Open and click tracking with a bot and prefetch filter.
- Unsubscribe pages per site and language, a reason form, `List-Unsubscribe` headers. Languages from Localizator or MODX contexts, texts in Russian and English, an English draft for other languages.
- Stats export to Excel.
- Blacklist with bulk add, bounce processing over IMAP.
- Several domains: links follow the sender domain, edge on MODX and without it, HMAC-signed requests.
