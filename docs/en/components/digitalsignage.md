---
title: DigitalSignage
description: Application for creating broadcasts on MODX
logo: https://modstore.pro/assets/extras/digitalsignage/logo-lg.png
author: Sterc
modstore: https://modstore.pro/packages/other/digitalsignage
modx: https://extras.modx.com/package/digitalsignage
repository: https://github.com/Sterc/digitalsignage
---
# DigitalSignage

## Permissions

These permissions are created on install. Assign them to your access policies.

| Permission | Description |
|------------|-------------|
| **digitalsignage** | Access to manage slides, broadcasts, and media players. |
| **digitalsignage_settings** | Access to manage slides, broadcasts, media players, and slide types. |

## System settings

Created on install:

| Setting | Description |
|---------|-------------|
| **digitalsignage.context** | Digital Signage context key. |
| **digitalsignage.export_resource** | ID of the `Home` resource in the Digital Signage context. |
| **digitalsignage.request_resource** | ID of the `Export` resource in the Digital Signage context. |
| **digitalsignage.templates** | Comma-separated list of templates for broadcasts. |
| **digitalsignage.auto_create_sync** | Enable auto-sync when data is missing. |
| **digitalsignage.media_source** | Media source for file selection. |
| **digitalsignage.request_param_broadcast** | GET parameter for broadcast ID. |
| **digitalsignage.request_param_player** | GET parameter for player ID. |

## Resources

In the Digital Signage context you will find:

| Resource | Default output |
|----------|----------------|
| **Home** | `{"status":400,"message":"No player found with the key ''."}` |
| **Export** | `{"slides":[]}` |

## Scripts and styles

CSS and JavaScript are installed in the `digitalsignage` directory in the site root.

## Quick start

1. Create a player:
   - **Name**: Living room
   - **Description**: TV in the living room
   - **Resolution**: 1920x1080
   - **Type**: TV (optional)

2. Create slides in the second tab.
3. Create a broadcast in the first tab:
   - **Name**: General
   - **Description**: Daily broadcast.
   - **Template**: DigitalSignage
   - **Ticker URL**: e.g. [https://modx.today/feed.xml](https://modx.today/feed.xml) (RSS feed)

4. Right-click the broadcast and attach slides.
5. In the third tab, set the player schedule (right-click).
6. Right-click the player and click "Attach player".
