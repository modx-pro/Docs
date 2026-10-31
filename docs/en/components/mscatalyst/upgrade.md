# Upgrading from msFacets

Before version 1.2 the component was called msFacets. For MODX this is a different package, so msCatalyst installs on top. You do not need to remove msFacets first.

## What the installer does

- Moves system, context and user settings `msfacets_*` to `mscatalyst_*`, together with synonyms and filter sets. Your own settings with the `msfacets_` prefix are copied, and the old key stays, because templates may read it.
- Replaces the snippets `msFacets`, `msFacetsSearch`, `msFacetsSitemap`, `msFacetsReindex`, `msFacetsSeoFilter` with wrappers around the new ones. `[[!msFacets? ...]]` calls in templates work without changes.
- Keeps the `msFacets.*` chunks and moves them to the msCatalyst category: your calls may reference them.
- Removes the old plugin, menu item, namespace, the `components/msfacets` folders and the msFacets entry in the "Installer". Otherwise uninstalling msFacets would remove the wrappers.
- Turns on the `mscatalyst_legacy_markup` setting. The script adds `msf-*` classes to elements, and styles written for msFacets keep working.

## What stays compatible

- The placeholders `[[+msfacets.total]]`, `[[+msfacets.title]]` and the rest are filled together with `mscatalyst.*`, and `msf.seo.*` together with `msc.seo.*`.
- CSS variables `--msf-*` set on the site are picked up by the theme.
- Chunks with the old `msf-*` and `data-msf` markup work without changes.
- The events `msfacets:ready`, `msfacets:load`, `msfacets:updated`, `msfacets:seo` fire together with `mscatalyst:*`, and `window.msFacets` points to `window.msCatalyst`.

::: tip
The old names are supported until version 2.0. In new templates use `msCatalyst`, the `msc-*` classes and the `mscatalyst.*` placeholders.
:::
