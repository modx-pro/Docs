---
title: FAQ
---
# FAQ

## Editor does not appear in resource content

1. `which_editor` = **mxEditorJs**
2. `mxeditorjs.enabled` = **Yes**
3. `use_editor` = **Yes**
4. **Settings → Clear cache**

## Editor does not appear in a TV

1. TV type **Textarea**, **Rich Text** = **Yes**
2. Open **Template Variables** tab on the resource
3. Editor initializes when the field is visible on the page

## Video does not embed

Paste a link (YouTube, RuTube, etc.) into an **empty** block with Ctrl+V. There is no Embed menu button.

## Image or gallery upload fails

Ask admin to check:

- `mxeditorjs.image_mediasource` and folder permissions
- `mxeditorjs.image_upload_path` (template with `{resource_id}`)
- file size ≤ `mxeditorjs.max_upload_size` (default 5 MB)
- extension in `mxeditorjs.allowed_image_types`

## Layout breaks on the site after save

Frontend uses HTML snapshot from `modResource.content`. **Raw HTML** block and some embeds pass through as-is. Check theme CSS for `mxeditorjs-gallery`, tables, and iframes.

## Migration overwrote content

Repeat migration with `force` and `confirmed` overwrites sidecar. Back up the database before bulk migration. Preview: connector `content/migrate` with `dry_run=1`.

## TypeError when opening a static resource

v1.0.1+ plugin normalizes `MODx.loadRTE(elements)` argument. Upgrade to the latest package.

## Where JSON is stored

| Context | Table |
| --- | --- |
| Main content | `mxeditorjs_content` |
| TV | `mxeditorjs_tv_content` |

HTML for the site — in `modResource.content` or TV textarea value.
