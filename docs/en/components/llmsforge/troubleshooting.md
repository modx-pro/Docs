---
title: LLMS Forge troubleshooting
description: Resolve 404 errors, empty output, missing miniShop3 prices, and bot logs
---

# Troubleshooting

## `/llms.txt` returns 404

Select the intended context, enable publication, and save. Run **Check** in the manager. Verify that Friendly URLs pass unknown paths into MODX and that no existing file or resource uses URI `llms.txt`. Use the domain assigned to the selected context.

## Selected pages are missing from preview

Check **Build from selected pages**, the context, selected IDs, and exclusions. A resource must be published, searchable, accessible to anonymous visitors, and outside protected resource groups. The same visibility requirements apply to its ancestors. Future and expired publication dates also exclude pages.

## Product price is missing

Price appears in an **automatic product card**, not next to the link in the main file. Create a card from a miniShop3 resource, include `price` among miniShop3 fields, save, and open `/llms-txt/slug`. Confirm the product has a price value.

## A card returns 404

Save the card and check its slug and publication mode. An automatic card becomes unavailable when its resource fails access or publication checks. Confirm the web server passes `/llms-txt/…` into MODX.

## The bot log is empty

Only requests that reach MODX and match a known User-Agent are recorded. Requests served by a CDN or web server are not included. Check PHP write access to `core/components/llmsforge/var/visits` and the `LLMSForgeVisits` plugin.

## The manager page is unavailable

Your MODX user needs the `settings` permission. Refresh the page after a session error. Check the MODX error log for server errors.
