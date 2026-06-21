---
title: SVResolution
description: A helper indicator for the current Bootstrap breakpoint and browser viewport width
logo: /components/svresolution/screenshots/logo.webp
author: rumata-estor
---

# SVResolution

**SVResolution** is a helper Extra for MODX Revolution that helps during responsive layout development with Bootstrap.

The Extra displays a compact frontend indicator showing the current Bootstrap breakpoint and the browser viewport width in pixels. This is useful when developing templates, testing responsive behavior, and debugging interface behavior at different screen widths.

## Features

SVResolution shows:

* the current Bootstrap breakpoint;
* the current browser viewport width in pixels.

Bootstrap 3, 4, and 5 breakpoint rules are supported.

The Extra works as a MODX plugin and does not require adding snippet calls to site templates.

## Visibility conditions

The indicator is visible only to an authenticated MODX manager user who belongs to the allowed user group.

The default group is:

```text
Administrator
```

The group name can be changed in the plugin properties.

## How it works

Starting with version 1.0.3, the visible indicator HTML block is no longer injected directly into the page HTML.

The page receives only a small JavaScript loader. The indicator itself is loaded through a separate service request after checking:

* the active MODX manager session;
* the user's membership in the allowed user group.

This approach reduces the risk of the helper indicator being stored in the page cache and becoming visible to regular site visitors.

## 404 page behavior

The indicator can be displayed on 404 pages for an authenticated MODX manager user from the allowed user group.

The service request used to load the indicator is made through the site base URL, not through the missing page URL. This avoids sending the service request to the 404 page URL.

## System event

The current version uses the following MODX system event:

```text
OnLoadWebDocument
```

## Plugin properties

| Property        | Description                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| `position`      | Indicator position on the screen. For example: `left,bottom`, `right,top`.          |
| `version`       | Bootstrap version whose breakpoint rules are used. Supported values: `3`, `4`, `5`. |
| `color`         | Indicator text and border color.                                                    |
| `bgcolor`       | Indicator background color.                                                         |
| `allowed_group` | Name of the MODX manager user group allowed to see the indicator.                   |
| `zindex`        | Indicator CSS `z-index`.                                                            |

## Installation

1. Install the transport package through the MODX Package Manager.
2. Make sure the `SVResolution` plugin is enabled.
3. Clear the MODX cache.
4. Open the site while authenticated in the MODX manager.
5. Check that the indicator is visible only to the allowed user.

## Testing

After installation, it is recommended to check four scenarios:

| Scenario                                                                                 | Expected result              |
| ---------------------------------------------------------------------------------------- | ---------------------------- |
| Homepage, the user is authenticated in the MODX manager and belongs to the allowed group | The indicator is visible     |
| Homepage, the user is not authenticated in the MODX manager                              | The indicator is not visible |
| 404 page, the user is authenticated in the MODX manager and belongs to the allowed group | The indicator is visible     |
| 404 page, the user is not authenticated in the MODX manager                              | The indicator is not visible |

## Building from source

The source code is available on GitHub:

```text
https://github.com/rumata-estor/svresolution
```

The transport package builder is located in the `_build` directory.

If the project is located near `config.core.php`, the builder will try to detect the MODX core path automatically.

The path to `core` can also be passed explicitly through an environment variable:

```bash
MODX_CORE_PATH=/path/to/modx/core/ php _build/build.transport.php
```

After a successful build, the transport package will be created in the MODX packages directory.

## Compatibility

The current version is intended for MODX Revolution 2.x.

For version 1.0.4, the following requirements are specified:

* minimum MODX version: 2.6;
* maximum MODX version: 2.8;
* minimum PHP version: 7.3.

## Author

Alexander Larin (Palochkin)

## License

MIT
