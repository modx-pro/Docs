---
title: Integration
---
# Integration

How to enable mxEditorJs in MODX, use it in TVs, and output content on the site.

## Enabling in the manager

1. **Settings → System settings** → find **which_editor** → select **mxEditorJs**.
2. Ensure **mxeditorjs.enabled** = **Yes** (namespace `mxeditorjs`).
3. Open a resource — the content field shows the block editor.

The plugin hooks `OnDocFormPrerender` and initializes when the content field (or richtext TV) appears.

**Save via resource form** (primary path):

1. Editor.js sends JSON and HTML (client `renderPreviewHtml`) to textarea and hidden fields
2. MODX saves HTML to `modResource.content` / TV
3. Plugin on `OnBeforeDocFormSave` writes JSON to sidecar

The form does **not** call connector `content/save`. Use that for AJAX and custom integrations. Details: [Flows](flows).

## Using in Template Variables

1. Create a TV of type **Text (multiline)** (textarea).
2. In the TV settings, enable **Use visual editor** (richtext).
3. With `which_editor` = **mxEditorJs**, this TV uses the same block editor.

TV content is stored in `mxeditorjs_tv_content` as Editor.js JSON. Frontend output uses generated HTML (same as main content).

## Output on the site

After saving, main resource content exists in two forms:

- **JSON** — sidecar for the editor (loaded on next form open)
- **HTML** — `modResource.content` for the frontend

In the template:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

Editor.js TVs use TV placeholders (e.g. `[[*my_richtext_tv]]` or Fenom). HTML lands in the TV textarea on save. Frontend always receives ready HTML.

## HTML → Editor.js migration

Convert existing HTML in the content field to Editor.js:

1. Connector action **content/migrate** with `resource_id`, optionally `dry_run=1` (preview), then `confirmed=1` to overwrite
2. With `dry_run` the response includes `preview` (blocks) and `blocks_count`. On success — `migrated`, `blocks_count`, `overwritten`

After migration the manager shows the block editor. The site still outputs HTML from `modResource.content`, updated during migration.

## Profiles and tools

Block set (paragraph, header, list, image, etc.) is defined by **mxeditorjs.profile** or **mxeditorjs.enabled_tools**. See [System settings](settings).

## Media and presets

- **Images** and **Gallery** — **mxeditorjs.image_mediasource**, path **mxeditorjs.image_upload_path** (template with `{resource_id}`)
- **Attaches** — **mxeditorjs.file_mediasource**, path **mxeditorjs.file_upload_path**
- Gallery image limit — **mxeditorjs.gallery_max_count** (`0` = no limit)
- CSS presets (**mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets**, etc.). Image presets in the editor UI **do not** add a class to `<img>` in the HTML snapshot — see [System settings](settings)

## Gallery on the frontend

Gallery HTML is generated on save (client `renderPreviewHtml` or server `HtmlRenderer` on `content/save`). Markup:

- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--fit">` — grid (**Fit**)
- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--slider">` — horizontal scroll (**Slider**)

`gallery-front.css` loads **only in the manager** (form preview). The frontend does **not** load it automatically.

Add styles in template or theme:

```html
<link rel="stylesheet" href="/assets/components/mxeditorjs/css/gallery-front.css">
```

Or copy rules from `assets/components/mxeditorjs/css/gallery-front.css` into theme CSS.

## Embed on the frontend

Embed blocks output `<div class="mxeditorjs-embed"><iframe ...></iframe></div>`. RuTube and other `@editorjs/embed` services are configured in `mxeditorjs.ts` (`services` section), not via system settings. Custom services are added in source — see [Architecture](architecture).

## Next steps

- [Editor guide](user-guide) — blocks, embed, TVs
- [Flows](flows) — save flow, sidecar, connector
- [API](api) — connector endpoints, PHP classes
- [System settings](settings) — profiles, media, presets
- [FAQ](faq) — common questions
