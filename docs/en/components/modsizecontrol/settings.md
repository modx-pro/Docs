---
title: Component settings
description: modSizeControl system settings
---

# Component settings

MODX namespace: `modsizecontrol`, area Main. The System Settings button on the component page opens exactly this area.

| Key | Default | Description |
| --- | --- | --- |
| `modsizecontrol_site_limit` | `0` | The site size limit in megabytes, e.g. `1024` is 1 GB. `0` means no limit: the widget compares the site with the server disk |
| `modsizecontrol_file_system` | `1` | File source IDs separated by commas. A source inside another one from the list is counted once |
| `modsizecontrol_control` | `No` | [Upload control](/en/components/modsizecontrol/upload-control): a file that does not fit into the limit is not uploaded |

## File sources

The site root is always scanned, so sources inside it add nothing to the size. The setting matters when a source points outside the site, e.g. at a shared uploads directory: such a directory is scanned separately and goes to the Media category.
