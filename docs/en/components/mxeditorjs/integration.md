---
title: Integration
---
# Integration

## Enabling in the manager

1. **Settings → System settings** → **which_editor** → **mxEditorJs**.
2. **mxeditorjs.enabled** = **Yes** (namespace `mxeditorjs`).
3. Open a resource: the content field shows the block editor.

The plugin on `OnDocFormPrerender` starts the editor when the content field or a richtext TV appears.

**Save via resource form** (primary path):

1. Editor.js sends JSON and HTML (client `renderPreviewHtml`) to the textarea and hidden fields
2. MODX saves HTML to `modResource.content` / TV
3. Plugin on `OnBeforeDocFormSave` writes JSON to sidecar

The form does **not** call connector `content/save`. Use that for AJAX and custom integrations. Details: [Flows](/en/components/mxeditorjs/flows).

## Using in Template Variables

1. Create a TV of type **Text (multiline)** (textarea).
2. In the TV settings, enable **Use visual editor** (richtext).
3. With `which_editor` = **mxEditorJs**, this TV uses the same block editor.

TV JSON is stored in `mxeditorjs_tv_content`. HTML lands in the TV textarea on save.

## Output on the site

After save, main resource content exists in two forms:

- **JSON**: sidecar for the editor (loaded on next form open)
- **HTML**: `modResource.content` for the site

In the template:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

Editor.js TVs use TV placeholders (`[[*my_richtext_tv]]` or Fenom). The site always receives ready HTML.

## HTML → Editor.js migration

Convert existing HTML in the content field to Editor.js:

1. Connector action **content/migrate** with `resource_id`, optionally `dry_run=1` (preview), then `confirmed=1` to overwrite
2. With `dry_run` the response includes `preview` (blocks) and `blocks_count`. On success: `migrated`, `blocks_count`, `overwritten`, `html`

After `confirmed`, migration writes the sidecar **and** an HTML snapshot to `modResource.content` (`HtmlRenderer`, same as `content/save`). `[[*content]]` on the site updates without saving the form again.

## MIGX

Form Tabs column: `"inputTVtype": "richtext"`. MIGX maps the type to `migx` + `which_editor` → `migxmxeditorjs`. The value is HTML inside the row JSON. No sidecar. Call `MxEditorJsFlush` before the window submits.

## Profiles and tools

The block set is defined by **mxeditorjs.profile** or **mxeditorjs.enabled_tools**. See [System settings](/en/components/mxeditorjs/settings).

## Media and presets

- **Images** and **Gallery**: **mxeditorjs.image_mediasource**, path **mxeditorjs.image_upload_path** (template with `{resource_id}`)
- **Attaches**: **mxeditorjs.file_mediasource**, path **mxeditorjs.file_upload_path**
- Gallery image limit: **mxeditorjs.gallery_max_count** (`0` = no limit)
- CSS presets (**mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets**, and others). Image presets in the editor **do not** add a class to `<img>` in the HTML snapshot. See [System settings](/en/components/mxeditorjs/settings)

## Gallery on the site

Gallery HTML is built on save: client `renderPreviewHtml` or server `HtmlRenderer` on `content/save` and `content/migrate`. Markup:

- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--fit">`: grid (**Fit**)
- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--slider">`: horizontal scroll (**Slider**)

`gallery-front.css` loads only in the manager (form preview). The site does **not** load it automatically.

Add styles in the template or theme:

```html
<link rel="stylesheet" href="/assets/components/mxeditorjs/css/gallery-front.css">
```

Or copy rules from `assets/components/mxeditorjs/css/gallery-front.css` into theme CSS.

## Embed on the site

Embed blocks output `<div class="mxeditorjs-embed"><iframe ...></iframe></div>`. `@editorjs/embed` services are set in `mxeditorjs.ts` (`services` section), not via system settings. Add a service in source. See [Architecture](/en/components/mxeditorjs/architecture).

## Next steps

- [Editor guide](/en/components/mxeditorjs/user-guide): blocks, embed, TVs
- [Flows](/en/components/mxeditorjs/flows): save, sidecar, connector
- [API](/en/components/mxeditorjs/api): connector actions, PHP classes
- [System settings](/en/components/mxeditorjs/settings): profiles, media, presets
- [FAQ](/en/components/mxeditorjs/faq): common questions
