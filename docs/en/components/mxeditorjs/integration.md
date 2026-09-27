---
title: Integration
---
# Integration

## Enabling in the manager

1. **Settings → System settings** → **which_editor** → **mxEditorJs**.
2. **mxeditorjs.enabled** = **Yes** (namespace `mxeditorjs`).
3. Open a resource: the content field shows the block editor.

The plugin hooks `OnDocFormPrerender` and starts the editor when the content field or a richtext TV appears.

**Save via resource form** (primary path):

1. Editor.js sends JSON and HTML (client `renderPreviewHtml`) to textarea and hidden fields
2. MODX saves HTML to `modResource.content` / TV
3. Plugin on `OnBeforeDocFormSave` writes JSON to sidecar

The form does **not** call connector `content/save`. Use that for AJAX and custom integrations. Details: [Flows](/en/components/mxeditorjs/flows).

## Using in Template Variables

1. Create a TV of type **Text (multiline)** (textarea).
2. In the TV settings, enable **Use visual editor** (richtext).
3. With `which_editor` = **mxEditorJs**, this TV uses the same block editor.

TV content is stored in `mxeditorjs_tv_content` as Editor.js JSON. Frontend output uses the generated HTML (same as main content).

## Output on the site

After save, main resource content exists in two forms:

- **JSON**: sidecar for the editor (loaded on next form open)
- **HTML**: `modResource.content` for the frontend

In the template:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

Editor.js TVs use TV placeholders (`[[*my_richtext_tv]]` or Fenom). HTML lands in the TV textarea on save. The frontend always receives ready HTML.

## HTML → Editor.js migration

Convert existing HTML in the content field to Editor.js:

1. Connector action **content/migrate** with `resource_id`, optionally `dry_run=1` (preview), then `confirmed=1` to overwrite
2. With `dry_run` the response includes `preview` (blocks) and `blocks_count`. On success: `migrated`, `blocks_count`, `overwritten`

After migration the manager opens blocks from the sidecar. `[[*content]]` on the site stays the old HTML until the form is saved or `content/save` is called ([#5](https://github.com/Ibochkarev/mxEditorJs/issues/5)).

## Profiles and tools

The block set is defined by **mxeditorjs.profile** or **mxeditorjs.enabled_tools**. See [System settings](/en/components/mxeditorjs/settings).

## Media and presets

- **Images** and **Gallery**: **mxeditorjs.image_mediasource**, path **mxeditorjs.image_upload_path** (template with `{resource_id}`)
- **Attaches**: **mxeditorjs.file_mediasource**, path **mxeditorjs.file_upload_path**
- Gallery image limit: **mxeditorjs.gallery_max_count** (`0` = no limit)
- CSS presets (**mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets**, etc.). Image presets in the editor UI **do not** add a class to `<img>` in the HTML snapshot. See [System settings](/en/components/mxeditorjs/settings)

## Gallery on the frontend

Gallery HTML is generated on save (client `renderPreviewHtml` or server `HtmlRenderer` on `content/save`). Markup:

- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--fit">`: grid (**Fit**)
- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--slider">`: horizontal scroll (**Slider**)

`gallery-front.css` loads **only in the manager** (form preview). The frontend does **not** load it automatically.

Add styles in the template or theme:

```html
<link rel="stylesheet" href="/assets/components/mxeditorjs/css/gallery-front.css">
```

Or copy rules from `assets/components/mxeditorjs/css/gallery-front.css` into theme CSS.

## Embed on the frontend

Embed blocks output `<div class="mxeditorjs-embed"><iframe ...></iframe></div>`. RuTube and other `@editorjs/embed` services are configured in `mxeditorjs.ts` (`services` section), not via system settings. Custom services are added in source. See [Architecture](/en/components/mxeditorjs/architecture).

## Next steps

- [Editor guide](/en/components/mxeditorjs/user-guide): blocks, embed, TVs
- [Flows](/en/components/mxeditorjs/flows): save flow, sidecar, connector
- [API](/en/components/mxeditorjs/api): connector endpoints, PHP classes
- [System settings](/en/components/mxeditorjs/settings): profiles, media, presets
- [FAQ](/en/components/mxeditorjs/faq): common questions
