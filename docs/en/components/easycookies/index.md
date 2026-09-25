---
title: EasyCookies
description: A cookie banner for MODX 2 and 3 — a simple notice or law-compliant consent, with counters and a consent log
logo: https://modstore.pro/assets/extras/easycookies/logo.png
author: GulomovCreative
categories: utilities

items:
  - text: Quick start
    link: quick-start
  - text: Profiles
    link: profiles
  - text: Counters and services
    link: services
  - text: Output on the site
    link: output
  - text: Consent log
    link: consent-log
  - text: Contexts and languages
    link: contexts
  - text: Component settings
    link: settings
---

# EasyCookies

MODX Revolution 2 and 3 component: shows a cookie banner on every page of the site and runs the counters itself — Yandex Metrica, Google Analytics, VK Ads and others — according to the visitor's answer. It is built on the [CookieConsent](https://cookieconsent.orestbida.com/) library by Orest Bida.

![Profile editor with the banner preview](/components/easycookies/screenshots/editor.png)

## Why

A cookie banner usually goes on a site like this: a script from somewhere is pasted into the template, and the counters stay where they were. They keep running before the visitor answers, and the "Reject" button switches nothing off.

In EasyCookies counters live in the banner profile, not in the template. The banner starts them once the visitor has allowed their category and deletes their cookies on refusal. Text, look and counters are set up in the manager, and the preview shows the banner right on the manager page — where it will appear on the site.

## Features

- **Two kinds of banner.** Simple — a notice with an "OK" button. Compliant — consent before any counter runs, as GDPR, CCPA and similar laws require. You switch between them with one button without losing settings.
- **Counters without editing templates.** Yandex Metrica, Google Analytics, Google Tag Manager, VK Ads, Meta Pixel and custom code. "Find on the site" moves counters already pasted into templates and chunks into the profile.
- **Live preview.** The banner and the preferences window update as you edit.
- **Consent log.** Every visitor's answer is stored. Summary for a period, filters, CSV export and a dashboard widget.
- **Look as in the CookieConsent playground:** window, cloud or bar, nine positions, themes and own colours.
- **Languages.** Ready texts in 14 languages; the banner speaks the page's language.
- **Profiles and contexts.** Several banners on one site, a separate one per context. Profile copies and moving a profile to another site through a file.
- **Server-side consent check.** The `EasyCookiesAllowed` snippet outputs a video, a map or a form only with the visitor's consent.
- Google Consent Mode v2, Global Privacy Control, asking everyone again, hiding the banner from search robots.
- Interface in the style of the MODX 3 and MODX 2 manager.

## Installation

EasyCookies is a paid component on [modstore.pro](https://modstore.pro/). Install it through the Package Manager with the modstore.pro provider ([how to add the provider](https://modstore.pro/faq)).

Next: [Quick start](/en/components/easycookies/quick-start).

## Requirements

- MODX Revolution 2.8+ or 3.x.
- PHP 7.4 or newer with the `json` extension.
- The `settings` permission. The component page, its menu item and all processors require it, just like System Settings: a profile adds scripts to every page of the site.

::: warning
Which banner your site needs depends on the laws that apply to it. EasyCookies is a tool, not legal advice.
:::
