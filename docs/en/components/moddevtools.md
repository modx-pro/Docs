---
title: modDevTools
description: Component for viewing chunks and snippets used on a template or chunk edit page
logo: https://modstore.pro/assets/extras/moddevtools/logo-lg.jpg
author: argnist
modstore: https://modstore.pro/packages/utilities/moddevtools
modx: https://extras.modx.com/package/moddevtools
repository: https://github.com/argnist/modDevTools
---
# modDevTools

Component that helps developers work faster and easier in the MODX Revolution manager.

## Features

### On chunk edit page — tabs for related objects

- **Templates** — code of templates that output this chunk. With Ace, the chunk is highlighted in template code.
- **Chunks** — code of chunks called from this chunk. Snippet parameters that are chunks are shown here too.
- **Snippets** — code of snippets called from this chunk. Default parameter descriptions can be expanded below.
- **Resources** — list of resources whose template or content uses this chunk. You can edit the resource, open in browser, change template, publication status, or move to trash.

### On template edit page

- **Chunks** — chunks used in this template.
- **Snippets** — snippets used in this template.
- **Resources** — resources using this template.

### On snippet edit page

A tab with resources whose template or content calls this snippet.

### On resource edit page — BreadCrumbs

BreadCrumbs are based on the ExtJS breadcrumb component from the package installer and fit the manager look across versions.

BreadCrumbs also appear in the resource overview (right-click resource in tree, or when you have view but not edit permission). In that case, clicking goes to the parent’s overview, not edit.

Contexts are supported: parents are shown in the same context as the resource.

### Find and replace in chunks and templates

Under **Applications → modDevTools**. Enter a string and click **Find**. Filters let you choose which element types to search.

Results show code of all matches with the search string highlighted. Replace is done per element. Each result has: **Replace**, **Replace all**, **Skip**.

**Replace** changes the focused match (darker highlight) to the replacement. **Skip** moves to the next match. You can change the search string after the initial search; replace then uses the new string for that element only.

## User permissions

The component uses standard MODX permissions; it does not add new ones.

| Permission | Description |
|------------|-------------|
| *view_chunk* **and** *view_template* | Access to find/replace (modDevTools menu) |
| *save_chunk* | Replace in chunks in that section |
| *save_template* | Replace in templates in that section |
| *view_chunk* | Show "Chunks" tab |
| *view_template* | Show "Templates" tab |
| *view_snippet* | Show "Snippets" tab |
| *resource_tree* | Show "Resources" tab |
| *edit_document* | Show "Edit" button in Resources tab |
| *save_document* | Change template in Resources tab |
| *publish_document* | Change publication status in Resources tab |
| *delete_document* | Move resource to trash in Resources tab |
| *save_chunk/save_template/save_snippet* | Standard MODX processors; editing elements requires the matching permission |

::: warning
Resource groups are not supported (yet): if a resource group is hidden from a manager, they can still see those resources in the element resource lists.
:::

## Additional notes

- If a related element is focused and changed, [[Ctrl]]+[[s]] saves that element; if not focused, the parent is saved (child changes are lost).
- The parent "Save" button is disabled when a child element was focused to avoid accidental overwrite. Switch to another tab to re-enable.
- AjaxManager is supported.
- MODX Revolution 2.3.x (primary) and 2.2.x (minimal support).
- Some features require the Ace editor.
