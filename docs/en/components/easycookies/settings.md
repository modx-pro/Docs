---
title: Component settings
description: EasyCookies system settings
---

# Component settings

MODX namespace: `easycookies`. The "System Settings" button in the component page header opens them.

| Key | Default | Description |
| --- | --- | --- |
| `easycookies.auto_inject` | `Yes` | The plugin outputs the active profile's banner on every HTML page. Switch it off to call the `[[EasyCookies]]` snippet from the template yourself |
| `easycookies.auto_inject_profile` | — | Name or id of the profile the plugin outputs; empty means the active profile of the context |
| `easycookies.exclude_resources` | — | Comma-separated resource ids where the plugin does not output the banner — for example, pages for mobile apps |
| `easycookies.log_days` | `365` | How many days to keep the consent log; `0` means forever |
| `easycookies.log_ip` | `Yes` | Store the shortened IP in the log |
| `easycookies.migrate_paths` | — | Extra directories with `.tpl` and `.html` templates for "Find on the site", comma-separated: from the site root or with `{core_path}`, `{base_path}`, `{assets_path}`. The pdoTools elements directory is scanned anyway |

Profile settings — text, look, counters, the consent cookie — are stored in the profile itself and changed in the [editor](/en/components/easycookies/profiles).
