---
title: Quick start
description: The first profile, counters and a link to cookie settings
---

# Quick start

## New profile

Open **Extras → EasyCookies** and click "New profile". The first question is what kind of banner you need:

- **Simple** — a cookie notice. Counters work right away; the form has only text, counters and look.
- **Compliant** — nothing runs until the visitor agrees. Categories, a preferences window, a cookie table, translations, revisions and Google Consent Mode.

The choice is not final: in the editor you switch with "Make it simple" and "Make it compliant". The difference in detail is in [Profiles](/en/components/easycookies/profiles).

![Choosing the kind of banner](/components/easycookies/screenshots/dialog-new-profile.png)

Enter a name and click "Create". The editor opens with ready texts in the site's language.

## Text and policy

Adjust the banner text and set the privacy policy address — a link or a resource id. Without an address, lines linking to the policy are not shown.

For a compliant banner, texts of the preferences window, categories and the cookie table open with the "Edit texts" button in the "Languages and texts" card.

## Counters

In the "Counters and services" card, add the site's counters and enter their IDs. If the counters are already in the template, click "Find on the site": EasyCookies finds them in templates and chunks, moves them into the profile and removes their code from the templates.

::: warning
Code of counters that the banner switches on must not stay in the template — otherwise they run twice and without consent.
:::

More: [Counters and services](/en/components/easycookies/services).

## Show on the site

Tick "Show on the site" in the "Profile" card and click "Save" (or press `Ctrl+S`). The plugin puts the banner on every page of the site; nothing needs to be added to templates.

## "Cookie settings" link

Visitors must be able to change their mind. Put a link that opens the preferences window into the site footer:

```html
<a href="#" data-cc="show-preferencesModal">Cookie settings</a>
```

The same link with a "Copy" button is in the "On the site" card of the editor.

## Check

Open the site in a private window: the banner shows on the first visit. The visitor's choice is kept in the `cc_cookie` cookie, half a year by default.

![Cookie preferences window on the site](/components/easycookies/screenshots/site-preferences.png)

Next: [Output on the site](/en/components/easycookies/output), [Consent log](/en/components/easycookies/consent-log).
