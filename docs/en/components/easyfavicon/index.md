---
title: EasyFavicon
description: Favicons from the RealFaviconGenerator editor right in the MODX 2 and 3 manager
author: GulomovCreative
categories: utilities

items:
  - text: Quick start
    link: quick-start
  - text: Profiles
    link: profiles
  - text: Output on the site
    link: output
  - text: Component settings
    link: settings
---

# EasyFavicon

MODX Revolution 2 and 3 component: builds a favicon set in the [RealFaviconGenerator](https://realfavicongenerator.net/) editor and puts it on the site by itself.

## Why

A favicon is usually installed by hand: generate a set on the service, download the archive, unpack and upload the files, paste the tags into the template, fix `site.webmanifest`. EasyFavicon does it from the manager:

1. You pick a picture in the MODX media sources.
2. You set the favicon up in the RealFaviconGenerator editor.
3. You come back to MODX: the files are already in the site directory, the manifest carries the site's data, and the markup is in `<head>`.

## Features

- Profiles: several sets on one site, one of them active. Switching brings back both the markup and the files of the chosen set.
- A plugin puts the markup before `</head>`; a snippet is there for manual output.
- `site.webmanifest` is filled with the site's data instead of the service's placeholders.
- Result view: preview, markup, list of files.
- The interface follows the MODX 3 and MODX 2 manager.

## Installation

EasyFavicon is a paid component on [modstore.pro](https://modstore.pro/). Install it via Package Manager with the modstore.pro provider ([how to connect the repository](https://modstore.pro/faq)).

::: warning
The package is encrypted and installs only through the modstore.pro provider on the site it was bought for. An archive uploaded to Package Manager by hand will not install.
:::

Next: [Quick start](/en/components/easyfavicon/quick-start).

## Requirements

- MODX Revolution 2.4+ or 3.x.
- PHP 7.4 or later with the `zip`, `json` and `curl` extensions (or `allow_url_fopen` on).
- A free RealFaviconGenerator API key.

::: info
EasyFavicon is an independent integration. It is not affiliated with or supported by RealFaviconGenerator.net, and using the service is subject to its terms.
:::
