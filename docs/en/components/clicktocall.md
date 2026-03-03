---
title: ClickToCall
description: Call widget for mobile devices
logo: https://modstore.pro/assets/extras/clicktocall/logo-lg.png
author: core01
modstore: https://modstore.pro/packages/alerts-mailing/clicktocall
modx: https://extras.modx.com/package/clicktocall
repository: https://github.com/core01/ClickToCall
---
# ClickToCall

Call widget for mobile devices.

## Features

- Shows the widget only to mobile users (uses mobile-detect.js).
- Flexible schedule: set display time per day.
- You can disable the built-in mobile-detect.js if you already use it on the site.
- Custom JS/CSS files are supported.

## Component settings

![Component settings](https://file.modx.pro/files/e/d/e/ede2cae090be91001e6bd3c28c38ed6b.png)

## ClickToCall snippet parameters

| Name | Default | Description |
|------|---------|-------------|
| **&force** | `0` | Force the widget to show. |
| **&phone** | | Phone number for the widget; if empty, taken from system settings. |
| **&tpl** | `ClickToCall.tpl` | Chunk for the widget. |
| **&useCustomCss** | `0` | Disable component CSS (use your own styles). |
| **&useCustomJs** | `0` | Disable component JS (use your own scripts). |

### System settings

| Name | Default | Description |
|------|---------|-------------|
| **clicktocall_mobiledetect** | `Yes` | Use mobile-detect.js. Disable if you already use it on the site. |
| **clicktocall_phone** | | Default phone for the widget. |

The snippet must be called uncached!

### Usage examples

To force the widget to show, use *&force*:

```modx
[[!ClickToCall? &force=`1`]]
```

The widget will then always show, ignoring the schedule.

To use different phone numbers on different pages:

```modx
[[!ClickToCall? &phone=`+79991234567`]]
```

## Widget appearance

![Widget appearance](https://file.modx.pro/files/6/c/1/6c145fac108b67a90d7e604fbe076ba8.png)
