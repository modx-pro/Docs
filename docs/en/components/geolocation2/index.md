---
title: GeoLocation2
description: MODX geodata — gl_* catalog, SxGeo, city picker modal, REST action.php
author: Ibochkarev
repository: https://github.com/Ibochkarev/GeoLocation2
logo: https://modstore.pro/assets/extras/geolocation2/logo.png
modstore: https://modstore.pro/packages/utilities/geolocation2
categories: utilities
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Integration', link: 'integration' },
  { text: 'Web API (action.php)', link: 'api-action' },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'GeoLocation2Initialize', link: 'snippets/GeoLocation2Initialize' },
      { text: 'GeoLocation2Current', link: 'snippets/GeoLocation2Current' },
      { text: 'GeoLocation2Modal', link: 'snippets/GeoLocation2Modal' },
      { text: 'GeoLocation2', link: 'snippets/GeoLocation2' },
      { text: 'GeoLocation2Location', link: 'snippets/GeoLocation2Location' },
      { text: 'GeoLocation2Data', link: 'snippets/GeoLocation2Data' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

# GeoLocation2

Country, region and city catalog in `gl_*` tables, IP lookup via SxGeo, front-end city picker (Bootstrap 5 modal) and REST endpoint `action.php`.

## Features

- Tables `gl_countries`, `gl_regions`, `gl_cities`, `gl_data` and a manager in the MODX admin
- SxGeo (local `.dat` database, no external API on every request)
- Session `$_SESSION['gl2']`: selected city, confirmed flag, CSRF token
- Snippets for city lists, SxGeo lookup, `gl_data`, modal flow
- CSV import/export from the manager
- Optional Scheduler task for SxGeo auto-update

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |

## Installation

1. [Connect ModStore](https://modstore.pro/info/connection).
2. **Extras → Installer** → **Download Extras** — **GeoLocation2** → **Download** → **Install**.
3. **Manage → Clear cache**.
4. Open **Components → GeoLocation2** and check catalog tabs.
5. Confirm SxGeo file exists: `assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat`.
6. Add snippets to the site — see [Quick start](quick-start).

Package catalog: [modstore.pro](https://modstore.pro/packages/utilities/geolocation2). Source: [GitHub](https://github.com/Ibochkarev/GeoLocation2).

## Quick links

| Section | Description |
|---------|-------------|
| [Quick start](quick-start) | Minimal site setup |
| [System settings](settings) | `geolocation2_*` keys |
| [Integration](integration) | Manager, data model, CSV, PHP service, SxGeo |
| [Web API](api-action) | GET/POST `action.php` |
| [Snippets](snippets/) | Parameters and chunks |
| [FAQ](faq) | Common issues |
