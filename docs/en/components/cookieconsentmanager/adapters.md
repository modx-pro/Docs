---
title: Adapters and builds
description: Editable bundled adapters, SHA256-aware updates and server-side PHP compilation.
---

# Adapters and builds

A built-in **adapter** is JavaScript source that loads an integration with the visitor's current permissions. Developers can edit adapters when providers change their official SDKs.

## File locations

The service card shows the exact **Adapter source code** path. Editable files normally live under:

```text
assets/js/cookie-consent/services/
```

Package originals are stored privately in `core/components/cookieconsentmanager/adapters/services/` (MODX 2) or `core/components/cookieconsentmanager3/adapters/services/` (MODX 3).

## Editing an adapter

1. Back up the adapter and check the provider's latest integration guidance.
2. Edit the relevant `services/*.js` file using compatible JavaScript (ES2020).
3. Clear MODX cache **in Manager**, or use **Settings → Additional settings → Adapter build → Rebuild adapters**.
4. Check build status and the timestamp of the last successful build; test both modes and browser Network activity.

The server builds a single minified script using PHP, without requiring Node/npm/Composer on the installed website. Only manifest-listed inputs are bundled. Extra files are not included automatically. The `custom_js` service is loaded separately.

## Safe package upgrades

Original adapter SHA256 checksums are tracked across versions **within the same package family**:

- Unchanged installed source may be replaced by the next original.
- Locally modified source is kept, even when the vendor also changed the original; there is no automatic merge.
- Intentionally removed source is not unconditionally restored.
- If a build fails after an upgrade, the last working bundle and version remain available, and Manager displays the error.

The bundle is published atomically during install/upgrade, Manager cache clearing or an explicit rebuild. **Visitor requests never rebuild JavaScript.** A fresh install fails if no working bundle can be built.

During native [uninstall](uninstall), recognized unmodified adapters are deleted; modified or unknown files are retained with warnings.

::: warning
Do not edit the same source via FTP/IDE while the package is updating it. Back up `services/`, settings and the last working bundle before an upgrade.
:::
