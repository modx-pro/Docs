---
title: System settings
---
# System settings

Component settings use namespace `mobiledetect` and area `md_main`.

**Where to change:** **Manage → System settings** — filter by namespace `mobiledetect`.

On package upgrade existing values are **not overwritten** (transport creates keys only on first install).

## Plugin

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `md_disable_plugin` | combo-boolean | `No` | Disable MobileDetect plugin |

When `Yes`, HTML tags, Fenom blocks, `mobiledetect.device` placeholder and cookie stop working.

## Cookie and tablet mode

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `md_use_cookie` | combo-boolean | `Yes` | Remember selected mode in a cookie |
| `md_tablet_is_standard` | combo-boolean | `No` | Treat tablets as desktop: for HTML tags show `<standard>` content |

The cookie uses the name from `md_force_browser_variable` (default `browser`). Writes are skipped in CLI and after response headers are sent.

## Forced mode GET parameters

| Key | Default | Description |
| --- | --- | --- |
| `md_force_browser_variable` | `browser` | GET parameter name |
| `md_force_browser_standard` | `standard` | Value for desktop |
| `md_force_browser_tablet` | `tablet` | Value for tablet |
| `md_force_browser_mobile` | `mobile` | Value for mobile |
| `md_force_browser_detect` | `detect` | Clear cookie and auto-detect |

Example URLs with default settings:

```
https://example.com/page?browser=mobile
https://example.com/page?browser=detect
```

## HTML tags

| Key | Default | Description |
| --- | --- | --- |
| `md_standard_node` | `standard` | Desktop content tag |
| `md_tablet_node` | `tablet` | Tablet content tag |
| `md_mobile_node` | `mobile` | Phone content tag |

The plugin looks for `<tag>...</tag>` pairs in page HTML output on `OnWebPagePrerender`.

## Related

- [Integration](integration) — how settings affect Fenom and HTML tags
- [Quick start](quick-start) — first run
- [Troubleshooting](troubleshooting) — cookie and cache
