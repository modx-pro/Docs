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
| PageBuilder (Free) | 1.0.17-beta |
| PageBuilder Pro | 1.0.17-beta, requires `pagebuilder` ≥ 1.0.17 |

Install **PageBuilder** (Free) and **PageBuilder Pro** from [modstore.pro](https://modstore.pro/extras/). `Package provider not found` happens only for the encrypted **Pro** package when the provider is not connected. The current Free package is not encrypted. Free install does not show that message.

1. [Connect ModStore](https://modstore.pro/info/connection).
2. Install **VueTools** and **pdoTools** if they are not on the site yet.
3. **Extras → Installer → Download Extras**: find **PageBuilder** (Free) or **PageBuilder Pro** → **Download** → **Install**.
4. **Settings → Clear cache**. The `pagebuilder` namespace should appear in the package list.

::: tip Pro
Installing **PageBuilder Pro** is enough: Package Manager usually pulls the Free core (`pagebuilder`) as `requires.pagebuilder`. If the dependency did not download, install Free from the same provider.
:::

## 2. Grant permissions

In **Users → User groups**, add to the editor policy:

- `pagebuilder_view`
- `pagebuilder_save`

For section type management in the control panel: `pagebuilder_manage_types`.

## 3. Enable the Sections tab

The tab is off by default. In **System settings** → namespace `pagebuilder`:

| Key | Value |
| --- | --- |
| `pagebuilder_resource_tab_enabled` | `1` |
| `pagebuilder_resource_tab_parents` | empty = all resources. Otherwise the resource id itself, its direct parent, or any ancestor |

Tab position: `pagebuilder_resource_tab_index` (`0` first and selected on open, `-1` last).

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

The snippet renders **published** sections for the current resource. The draft is not shown on the site.

## 5. Build the page in the manager

<!-- ![Section catalog](/components/pagebuilder/screenshots/mgr-section-catalog.jpg) -->

<!-- ![Section inspector](/components/pagebuilder/screenshots/mgr-section-inspector.jpg) -->

1. Open the resource → **Sections** tab.
2. Add a section (for example Hero) and fill in the fields.
3. Press **Save** in the resource toolbar. The editor validates required fields, writes the draft, and publishes sections.
4. Autosave writes the draft only. The site does not show it until you save the resource.

With `pagebuilder_fake_enabled = 1`, the inspector shows a **Fake** button that fills fields with demo data for quick layout checks.

<!-- ![Draft preview](/components/pagebuilder/screenshots/mgr-section-preview.jpg) -->

Draft preview without publish: **Preview** on the tab (token via `preview.php`).

## 6. Check the frontend

<!-- ![Page with sections on the site](/components/pagebuilder/screenshots/fe-page-sections.jpg) -->

Open the resource on the site. Section HTML should appear. By default `pagebuilder-sections.css` loads (`pagebuilder_load_frontend_css`).

If the block is empty:

- the resource was not saved after edits (autosave does not publish)
- the snippet lacks permission on the resource
- the template caches the call without `!`. Use `[[!PageBuilder]]`

`quiz` and `contact_form` sections (Pro) need **FetchIt** on the site. Without it the form shows an unavailability message.

## Next steps

- [Preview and Collections settings](settings)
- [PageBuilder snippet parameters](snippets/PageBuilder)
- [CSS and Fenom customization](frontend)
- [Events and Pro](integration)
