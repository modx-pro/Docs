---
title: NotFoundParamAlert
description: Alerts on 404 pages with specified URL parameters
logo: https://modstore.pro/assets/extras/notfoundparamalert/logo-lg.png
author: kudashevs
modstore: https://modstore.pro/packages/alerts-mailing/notfoundparamalert
modx: https://extras.modx.com/package/notfoundparamalert
repository: https://github.com/kudashevs/NotFoundParamAlert
---
# NotFoundParamAlert

MODX Revolution plugin that generates an alert when a page is not found and has specified URL parameters.
Useful for catching 404s from large-scale contextual campaigns with UTM or other URL parameters.

## Key features

- report 404 pages with specified URL parameters to email and/or log file
- specify URL parameters using simple wildcards: `?` — one character, `*` — any character group
- send email via PHP or MODX built-in mail

After installation go to System Settings, select namespace `notfoundparamalert` and configure.

## System settings (namespace notfoundparamalert)

- parameters – comma-separated URL parameters to track. Wildcards: `?` — one character, `*` — any character group.
- parameters_all – whether to consider all URL parameters or only matching ones.
- alert_method – alert method. Values: `mail` – send to email, `log` – log message.
- alert_log_level – log level. Values: `error`, `warn`, `info`, `debug`.
- mail_method – mail method. Values: "php" – PHP `mail()`, `modx` – MODX mailer.
- mail_from – valid email for outgoing alerts.
- mail_to – valid email for incoming alerts.

In the `notfoundparamalert` namespace you can set a custom template for log/email text.

## Placeholders for message/email

- `alertName` - component name.
- `alertMethod` - alert method.
- `siteName` - site name ('site_name').
- `siteUrl` - site URL ('site_url').
- `urlPath` - relative page URL.
- `urlFull` - absolute page URL.
- `requestParams` - matching URL parameters.
- `ipAddress` - IP address of the request.
