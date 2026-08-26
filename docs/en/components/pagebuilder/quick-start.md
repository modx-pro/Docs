---
title: Quick start
description: Install PageBuilder, permissions, Sections tab, and first frontend output
---
# Quick start

## 1. Install dependencies and the package

Order:

1. **VueTools** 1.1.2+
2. **pdoTools** 3.0+
3. Transport **`pagebuilder`** (Free) or **`pagebuilderpro`** (Pro)

Clear the MODX cache after install. **Packages** should list namespace `pagebuilder`.

::: tip Pro
Install `pagebuilderpro` only: Free core (`pagebuilder`) comes with it. You do not need to install Free separately.
:::

## 2. Grant permissions

Under **Users → User groups**, add to the editor policy:

- `pagebuilder_view`
- `pagebuilder_save`

For section types in the CMP: `pagebuilder_manage_types`.

## 3. Enable the Sections tab

The tab is off by default. In **System settings** → namespace `pagebuilder`:

| Key | Value |
| --- | --- |
| `pagebuilder_resource_tab_enabled` | `1` |
| `pagebuilder_resource_tab_parents` | empty = all resources, or parent IDs comma-separated |

Tab position: `pagebuilder_resource_tab_index` (`0` first, `-1` last).

<!-- ![Sections tab on a resource](/components/pagebuilder/screenshots/mgr-sections-tab.png) -->

Details: [System settings](settings#resource-form-tabs).

## 4. Add output to the template

In the page template or resource content field:

::: code-group

```modx
[[!PageBuilder]]
```

```fenom
{'!PageBuilder' | snippet}
```

:::

The snippet renders **published** sections for the current resource. Drafts are not shown on the site.

## 5. Build the page in the manager

<!-- ![Section catalog](/components/pagebuilder/screenshots/mgr-section-catalog.png) -->

<!-- ![Section inspector](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->

1. Open the resource → **Sections** tab.
2. Add a section (e.g. Hero) and fill fields.
3. Click **Save** (draft).
4. Click **Publish**. The version goes to `published_json`.

With `pagebuilder_fake_enabled = 1`, the inspector shows a **Fake** button that fills fields with demo data for a quick layout check.

<!-- ![Draft preview](/components/pagebuilder/screenshots/mgr-section-preview.png) -->

Draft preview without publishing: **Preview** in the tab (token via `preview.php`).

## 6. Check the frontend

<!-- ![Page with sections on the site](/components/pagebuilder/screenshots/fe-page-sections.png) -->

Open the resource on the site. Section HTML should appear. By default `pagebuilder-sections.css` is registered (`pagebuilder_load_frontend_css`).

If the block is empty:

- sections were not published
- the snippet lacks access to the resource
- the template caches the call without `!`. Use `[[!PageBuilder]]`

## Next steps

- [Preview and Collections settings](settings)
- [Snippet parameters](snippets)
- [CSS and Fenom customization](frontend)
- [Events and Pro](integration)
