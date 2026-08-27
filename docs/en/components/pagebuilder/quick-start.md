---
title: Quick start
description: Install PageBuilder, permissions, Sections tab, and first frontend output
---
# Quick start

## 1. Install dependencies and the package

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ |
| pdoTools | 3.0+ |
| PageBuilder (Free) | 1.0.1-beta |
| PageBuilder Pro | 1.0.1-beta, requires `pagebuilder` ≥ 1.0.1 |

**PageBuilder** (Free) and **PageBuilder Pro** install from [modstore.pro](https://modstore.pro/extras/). Without the provider, install fails with `Package provider not found`.

1. [Connect ModStore](https://modstore.pro/info/connection).
2. Install **VueTools** and **pdoTools** if they are not on the site yet.
3. **Extras → Installer → Download Extras** — find **PageBuilder** (Free) or **PageBuilder Pro** → **Download** → **Install**.
4. **Settings → Clear cache**. **Packages** should list namespace `pagebuilder`.

::: tip Pro
Install **PageBuilder Pro** only: MODX pulls Free core (`pagebuilder`) automatically. You do not need a separate Free install.
:::

Catalog: [modstore.pro](https://modstore.pro/).

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

![Sections tab on a resource](/components/pagebuilder/screenshots/mgr-sections-tab.png)

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
4. Click **Publish**. The same layout appears on the site.

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
- [PageBuilder snippet parameters](snippets/PageBuilder)
- [CSS and Fenom customization](frontend)
- [Events and Pro](integration)
