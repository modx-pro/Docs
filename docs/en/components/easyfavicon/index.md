---
title: EasyFavicon
description: Favicons from the RealFaviconGenerator editor right in the MODX 2 and 3 manager
logo: https://modstore.pro/assets/extras/easyfavicon/logo.png
author: GulomovCreative
categories: utilities
modstore: https://modstore.pro/packages/utilities/easyfavicon

items:
  - text: Quick start
    link: quick-start
  - text: Profiles
    link: profiles
  - text: Output on the site
    link: output
  - text: Contexts
    link: contexts
  - text: Component settings
    link: settings
---

# EasyFavicon

MODX Revolution 2 and 3 component: builds a favicon set in the [RealFaviconGenerator](https://realfavicongenerator.net/) editor and puts it on the site by itself.

![EasyFavicon profile list](/components/easyfavicon/screenshots/list.png)

## Why

A favicon is usually installed by hand: generate a set on the service, download the archive, unpack and upload the files, paste the tags into the template, fix `site.webmanifest`. EasyFavicon does it from the manager:

1. You pick a picture in the MODX media sources.
2. You set the favicon up in the RealFaviconGenerator editor.
3. You come back to MODX: the files are already in the site directory, the manifest carries the site's data, and the markup is in `<head>`.

## Features

- Profiles: several sets on one site, one active per context. Switching brings back both the markup and the files of the chosen set.
- Contexts: language versions and subdomains can have a favicon of their own.
- A plugin puts the markup before `</head>`; a snippet is there for manual output.
- `site.webmanifest` is filled with the site's data instead of the service's placeholders.
- Result view: preview, markup, list of files.
- A profile list with search, column sorting and a right-click menu of row actions.
- The interface follows the MODX 3 and MODX 2 manager, translated into English and Russian.

![EasyFavicon in MODX 2](/components/easyfavicon/screenshots/modx2.png)

## Installation

EasyFavicon is a paid component on [modstore.pro](https://modstore.pro/). Install it via Package Manager with the modstore.pro provider ([how to connect the repository](https://modstore.pro/faq)).

Next: [Quick start](/en/components/easyfavicon/quick-start).

## Requirements

- MODX Revolution 2.8+ or 3.x.
- PHP 7.4 or later with the `zip`, `json` and `curl` extensions (or `allow_url_fopen` on).
- A free RealFaviconGenerator API key.
- The `settings` permission: without it the user gets neither the menu item nor the component page. The component changes the site's files and the markup of every page, which is the level of system settings.

::: info
EasyFavicon is an independent integration. It is not affiliated with or supported by RealFaviconGenerator.net, and using the service is subject to its terms.
:::
