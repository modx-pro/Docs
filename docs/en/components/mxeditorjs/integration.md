---
title: Integration
---
# Integration

How to enable mxEditorJs in MODX, use it in TVs, and output content on the site.

## Enabling in the manager

1. **Settings → System settings** → find **which_editor** → select **mxEditorJs**.
2. Ensure **mxeditorjs.enabled** = **Yes** (namespace `mxeditorjs`).
3. Open a resource — the content field shows the block editor.

The editor is loaded by a plugin on `OnDocFormPrerender` and initializes when the content field (or a richtext TV) appears. Saving is handled on resource form submit via the Connector API (`content/save`).

## Using in Template Variables

1. Create a TV of type **Text (multiline)** (textarea).
2. In the TV settings, enable **Use visual editor** (richtext).
3. With `which_editor` = **mxEditorJs**, this TV will use the same block editor.

TV content is stored in the sidecar table `mxeditorjs_tv_content` in Editor.js format; on the frontend the generated HTML is used (same as for main content).

## Output on the site

After saving with mxEditorJs, resource content (main `content` field) is stored in two forms:

- **JSON** — in the sidecar for the editor (loaded into Editor.js when the form is opened again).
- **HTML** — in `modResource.content` (used for frontend output).

In the template, output content as usual:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

TVs that use Editor.js are output via TV placeholders (e.g. `[[*my_richtext_tv]]` or Fenom). JSON → HTML rendering is done by the component on save; the frontend always receives ready HTML.

## HTML → Editor.js migration

If you already have resources with HTML in the content field, you can convert them to Editor.js format.

1. Via Connector: action **content/migrate** with `resource_id`, optionally `dry_run=1` (preview), then `confirmed=1` to overwrite.
2. With `dry_run` the response includes `preview` (blocks) and `blocks_count`; on success — `migrated`, `blocks_count`, `overwritten`.

After migration, opening the resource in the manager shows the block editor; the site still outputs HTML from `modResource.content`, updated during migration.

## Profiles and tools

The set of blocks (paragraph, header, list, image, etc.) is defined by **mxeditorjs.profile** or **mxeditorjs.enabled_tools**. See [System settings](settings).

## Media and presets

- Image and file uploads go to the Media Source from **mxeditorjs.image_mediasource** and **mxeditorjs.file_mediasource**.
- Upload path is set in **mxeditorjs.image_upload_path** (template with `{resource_id}`).
- CSS classes for images and links are set in presets (**mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets**, etc.) — see [System settings](settings).

## Next steps

- [API](api) — connector endpoints, PHP classes, data formats
- [System settings](settings) — all component parameters
