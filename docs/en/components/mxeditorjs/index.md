---
title: mxEditorJs
description: Block editor Editor.js for MODX 3 — content in blocks instead of TinyMCE/CKEditor
author: Ibochkarev
logo: https://modstore.pro/assets/extras/mxeditorjs/logo.png
modstore: https://modstore.pro/packages/content/mxeditorjs
repository: https://github.com/Ibochkarev/mxEditorJs
dependencies: []
categories: content

compatibility:
  - modx3
  - php82
items: [
  { text: 'Getting started', link: 'quick-start', items: [
    { text: 'Quick start', link: 'quick-start' },
    { text: 'System settings', link: 'settings' },
    { text: 'Editor guide', link: 'user-guide' },
  ]},
  { text: 'Integration', link: 'integration', items: [
    { text: 'TVs, migration, frontend', link: 'integration' },
    { text: 'FAQ', link: 'faq' },
  ]},
  { text: 'For developers', link: 'api', items: [
    { text: 'API and interfaces', link: 'api' },
    { text: 'Flows', link: 'flows' },
    { text: 'Architecture', link: 'architecture' },
    { text: 'Troubleshooting', link: 'troubleshooting' },
  ]},
]
---
# mxEditorJs

Block editor for MODX 3 on [Editor.js](https://editorjs.io/). Content is built in blocks instead of TinyMCE/CKEditor. The site outputs HTML.

## Quick links

| Need | Document |
| --- | --- |
| Enable editor in 3 steps | [Quick start](/en/components/mxeditorjs/quick-start) |
| Blocks, media, embed | [Editor guide](/en/components/mxeditorjs/user-guide) |
| Configure tool profiles and media | [System settings](/en/components/mxeditorjs/settings) |
| Connector API, PHP classes, data formats | [API](/en/components/mxeditorjs/api) |
| TVs, HTML → Editor.js migration | [Integration](/en/components/mxeditorjs/integration) |
| Common editor questions | [FAQ](/en/components/mxeditorjs/faq) |
| Save flow, sidecar, connector | [Flows](/en/components/mxeditorjs/flows) |

## Who reads what

- **Content editor:** [Editor guide](/en/components/mxeditorjs/user-guide)
- **Administrator:** [System settings](/en/components/mxeditorjs/settings), [FAQ](/en/components/mxeditorjs/faq)
- **Developer:** [API](/en/components/mxeditorjs/api), [Flows](/en/components/mxeditorjs/flows), [Architecture](/en/components/mxeditorjs/architecture), [Troubleshooting](/en/components/mxeditorjs/troubleshooting)

[modstore.pro](https://modstore.pro/packages/content/mxeditorjs), [GitHub](https://github.com/Ibochkarev/mxEditorJs). Changelog: `core/components/mxeditorjs/docs/changelog.txt`.

## Features

- **15 block types:** paragraph, header, list, checklist, quote, table, code, raw HTML, embed, image, **gallery**, **mxGallery**, attachment, delimiter, warning. The `mxgallery` toolbox appears only when the mxGallery package is installed.
- **TVs**: main resource content and Template Variables of type `textarea` with richtext
- **Media**: drag-and-drop via MODX Media Sources. Separate paths for images and attachments (Attaches)
- **Gallery**: multiple images, sorting, fit or slider, upload and Browse via Media Source
- **File browser**: browse Media Source directories
- **Link autocomplete**: MODX resource search
- **HTML → Editor.js migration**
- **Tool profiles**: default, minimal, blog, full, and custom
- **Fullscreen**, **Source Preview**, **Undo/Redo**, text alignment
- **Localization**: Russian and English, inherits manager locale
- **CSS presets**: classes for images and links

## Editor.js plugins used

Tool catalog: [Awesome Editor.js](https://github.com/editor-js/awesome-editorjs).

### Block tools

| Plugin | Description | Links |
| --- | --- | --- |
| **@editorjs/paragraph** | Basic text block | [npm](https://www.npmjs.com/package/@editorjs/paragraph) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/header** | Headings H2–H5 | [npm](https://www.npmjs.com/package/@editorjs/header) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/list** | Bullet and numbered lists | [npm](https://www.npmjs.com/package/@editorjs/list) · [awesome](https://github.com/editor-js/awesome-editorjs#lists) |
| **@editorjs/checklist** | Checklist with checkboxes | [npm](https://www.npmjs.com/package/@editorjs/checklist) · [awesome](https://github.com/editor-js/awesome-editorjs#lists) |
| **@editorjs/quote** | Quote | [npm](https://www.npmjs.com/package/@editorjs/quote) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/table** | Table | [npm](https://www.npmjs.com/package/@editorjs/table) · [awesome](https://github.com/editor-js/awesome-editorjs#table) |
| **@editorjs/code** | Code block | [npm](https://www.npmjs.com/package/@editorjs/code) · [awesome](https://github.com/editor-js/awesome-editorjs#code) |
| **@editorjs/raw** | Raw HTML | [npm](https://www.npmjs.com/package/@editorjs/raw) · [awesome](https://github.com/editor-js/awesome-editorjs#code) |
| **@editorjs/embed** | Embed (YouTube, Paste, etc.) | [npm](https://www.npmjs.com/package/@editorjs/embed) · [awesome](https://github.com/editor-js/awesome-editorjs#media--embed) |
| **@editorjs/attaches** | File attachments | [npm](https://www.npmjs.com/package/@editorjs/attaches) · [awesome](https://github.com/editor-js/awesome-editorjs#media--embed) |
| **@editorjs/delimiter** | Delimiter | [npm](https://www.npmjs.com/package/@editorjs/delimiter) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/warning** | Warning block | [npm](https://www.npmjs.com/package/@editorjs/warning) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **Image** | Image with MODX Media Source upload and browser | Part of mxEditorJs (`ImageTool.ts`), similar to [@editorjs/image](https://github.com/editor-js/awesome-editorjs#media--embed) |
| **Gallery** | Image gallery on `@kiberpro/editorjs-gallery`: sorting, fit/slider modes | Part of mxEditorJs (`GalleryTool.ts`) |
| **mxGallery** | mxGallery package block: media by `ids` or a collection | Part of mxEditorJs (`MxGalleryTool.ts`). Toolbox only if `core/components/mxgallery/` exists |

### Inline tools

| Plugin | Description | Links |
| --- | --- | --- |
| **@editorjs/marker** | Text highlight (marker) | [npm](https://www.npmjs.com/package/@editorjs/marker) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |
| **@editorjs/inline-code** | Monospace code in text | [npm](https://www.npmjs.com/package/@editorjs/inline-code) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |
| **@editorjs/underline** | Underline | [npm](https://www.npmjs.com/package/@editorjs/underline) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |

Links and MODX resource autocomplete: the **LinkAutocomplete** tool in mxEditorJs (inspired by [@editorjs/link-autocomplete](https://github.com/editor-js/awesome-editorjs#inline-tools)).

### Block tune

| Plugin | Description | Links |
| --- | --- | --- |
| **editorjs-text-alignment-blocktune** | Text alignment in blocks (left, center, right) | [npm](https://www.npmjs.com/package/editorjs-text-alignment-blocktune) · [GitHub](https://github.com/kaaaaaaaaaaai/editorjs-alignment-blocktune) · [awesome](https://github.com/editor-js/awesome-editorjs#block-tune-tools) |

### Editor plugins

| Plugin | Description | Links |
| --- | --- | --- |
| **editorjs-undo** | Undo/Redo | [npm](https://www.npmjs.com/package/editorjs-undo) · [GitHub](https://github.com/kommitters/editorjs-undo) · [awesome](https://github.com/editor-js/awesome-editorjs#plugins) |

### Core

| Plugin | Links |
| --- | --- |
| **@editorjs/editorjs** — Editor.js core | [npm](https://www.npmjs.com/package/@editorjs/editorjs) · [GitHub](https://github.com/codex-team/editor.js) · [docs](https://editorjs.io/) |

## Requirements

| Dependency | Version |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| Node.js | 18+ (only for building frontend from source) |

## Installation

### Via package manager

1. **Extras → Installer** (MODX 3: **Packages → Installer**)
2. **Download Extras**, refresh the package list
3. Find **mxEditorJs** → **Download** → **Install**
4. **Manage → Clear cache** (MODX 3: **Settings → Clear cache**)

Or install `mxeditorjs-*.transport.zip`: **Packages → Installer** → **Upload package** → install → clear cache.

### From source (development)

```bash
cd /path/to/modx/Extras/
git clone https://github.com/Ibochkarev/mxEditorJs mxEditorJs
cd mxEditorJs
npm install
npm run build
php _build/build.php
```

## Quick start (3 steps)

1. **System → System settings** → `which_editor` → **mxEditorJs**
2. `mxeditorjs.enabled` = **Yes**
3. Open any resource: the block editor appears in the content field

See: [Quick start](/en/components/mxeditorjs/quick-start).

## System settings (overview)

All settings are in the **mxeditorjs** namespace.

| Key | Default | Purpose |
| --- | --- | --- |
| `mxeditorjs.enabled` | `true` | Enable/disable editor |
| `mxeditorjs.profile` | `default` | Active tool profile |
| `mxeditorjs.enabled_tools` | — | Override profile: comma-separated tool list |
| `mxeditorjs.image_mediasource` | `1` | Media Source ID for images and gallery |
| `mxeditorjs.image_upload_path` | `images/resources/{resource_id}/` | Image upload path (Image, Gallery) |
| `mxeditorjs.file_upload_path` | `files/resources/{resource_id}/` | Attachment upload path (Attaches) |
| `mxeditorjs.gallery_max_count` | `0` | Max images in Gallery block (`0` = no limit) |
| `mxeditorjs.max_upload_size` | `5242880` (5 MB) | Max upload size (bytes) |

Full list: [System settings](/en/components/mxeditorjs/settings).
