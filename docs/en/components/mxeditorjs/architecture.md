---
title: Architecture
---
# Architecture

Component overview for developers. Connector API: [API](api). Save flows: [Flows](flows).

## Components

| Layer | Path | Role |
| --- | --- | --- |
| Plugin | `core/.../elements/plugins/mxeditorjs.plugin.php` | MODX RTE hooks |
| Connector | `assets/components/mxeditorjs/connector.php` | Manager JSON API |
| Frontend | `assets/components/mxeditorjs/js/mxeditorjs.js` | Editor.js, `MxEditorJsApp` |
| PHP | `core/components/mxeditorjs/src/` | Renderer, Validator, Repository, MediaUploader, HtmlMigrator |
| Config | `src/Config/EditorTools.php` | Profiles and tool whitelist |

No snippets or MODX processors in the package.

## Two HTML renderers

| Path | When | Where |
| --- | --- | --- |
| Client `renderPreviewHtml()` | Resource form save | `mxeditorjs.ts` |
| Server `HtmlRenderer` | `content/save`, migration | PHP |

Duplicate logic for new blocks in both places or manager preview and site HTML will diverge.

## Database tables

Schema: `core/components/mxeditorjs/model/schema/mxeditorjs.mysql.schema.xml`

### `mxeditorjs_content`

| Field | Purpose |
| --- | --- |
| `resource_id` | UNIQUE, resource ID |
| `content_json` | Editor.js OutputData |
| `content_version` | Version counter |
| `content_hash` | SHA-256 of JSON |
| `schema_version` | Editor.js version from JSON |
| `created_at`, `updated_at`, `created_by`, `updated_by` | Audit |

### `mxeditorjs_tv_content`

Same fields + `tmplvar_id`, UNIQUE `(resource_id, tmplvar_id)`.

## HtmlRenderer

14 block types. Alignment via `tunes.alignmentTune.alignment` for paragraph, header, list, quote.

| Type | HTML |
| --- | --- |
| `paragraph` | `<p>` |
| `header` | `<h1>`–`<h6>` |
| `list` | `<ul>` / `<ol>` |
| `checklist` | `<ul class="mxeditorjs-checklist">` |
| `image` | `<figure class="mxeditorjs-image"><img>` |
| `gallery` | `<figure class="mxeditorjs-gallery mxeditorjs-gallery--{fit\|slider}">` |
| `attaches` | `<p><a download>` |
| `embed` | `<div class="mxeditorjs-embed"><iframe>` |
| `delimiter` | `<hr>` |
| `quote` | `<blockquote>` + `<cite>` |
| `code` | `<pre><code>` |
| `raw` | raw HTML |
| `table` | `<table>` |
| `warning` | `<div class="mxeditorjs-warning">` |

Extension:

```php
$renderer->registerBlockRenderer('myBlock', function (array $data, array $block): string {
    return '<div>...</div>';
});
```

## EditorTools

Class `MxEditorJs\Config\EditorTools`:

- `DEFAULT_AVAILABLE` — CSV of all block tools
- `PACKAGE_PROFILES` — reference default, minimal, blog, full
- `resolve()` — final list with whitelist and upgrade merge
- `migrateProfiles()` / `migrateAvailableTools()` — add `gallery` on upgrade

Priority: `enabled_tools` → `profiles[profile].tools ∩ available_tools` (+ upgrade merge) → `available_tools`.

## ContentValidator

Allowed types: `paragraph`, `header`, `list`, `checklist`, `quote`, `table`, `code`, `raw`, `embed`, `image`, `gallery`, `attaches`, `delimiter`, `warning`.

## Client (TypeScript)

Sources: `assets/components/mxeditorjs/js/src/`.

| Module | Purpose |
| --- | --- |
| `mxeditorjs.ts` | `MxEditorJsApp`, RTE hooks, syncToTextarea, renderPreviewHtml |
| `tools/ImageTool.ts` | Image + Media Browser |
| `tools/GalleryTool.ts` | Gallery on `@kiberpro/editorjs-gallery` |
| `tools/AttachesTool.ts` | Attaches + patch-package |
| `tools/LinkAutocomplete.ts` | MODX resource search |
| `tools/MediaBrowser.ts` | Shared browser for Image/Gallery |
| `tools/ParagraphTool.ts`, `HeaderTool.ts`, `ChecklistTool.ts` | Wrappers with validate |

**Block tools** (profile): paragraph, header, list, checklist, quote, table, code, raw, embed, image, gallery, attaches, delimiter, warning.

**Always on:** inline marker, inlineCode, underline, linkAutocomplete. Tunes: alignmentTune. Plugin: editorjs-undo.

### Embed

`@editorjs/embed` has no toolbox button — Paste API only. `buildTools()` defines `services`, including RuTube (`embedUrl` for `rutube.ru/video/...`). Add custom services in `mxeditorjs.ts`, not via system settings.

### RTE integration

- `MODx.loadRTE` / `unloadRTE` — main content and TVs
- `MutationObserver` — `textarea.modx-richtext` (except `#ta`)
- Toolbar: Source (Ctrl+U), Fullscreen (F11)
- Cache-bust: `?v={filemtime}` on CSS/JS

## Frontend build

```bash
npm install    # postinstall → patch-package (@editorjs/attaches)
npm run build  # IIFE → assets/.../js/mxeditorjs.js
npm run dev    # watch + sourcemap
```

Entry: `assets/.../src/mxeditorjs.ts`. Target ES2020, format IIFE, global `MxEditorJs`.

Patch `patches/@editorjs+attaches+1.3.2.patch` replaces `appendCallback` with `rendered` or Attaches file dialog will not open.

## Adding a new block tool

1. `npm install @editorjs/new-tool`
2. Import and register in `buildTools()` (`mxeditorjs.ts`)
3. Add type to `ContentValidator::ALLOWED_BLOCK_TYPES`
4. Render in `HtmlRenderer` and `renderPreviewHtml()`
5. Add ID to `mxeditorjs.available_tools` and profiles
6. `npm run build`, sync to installed MODX

## Transport and upgrade

```bash
php _build/build.php
# → core/packages/mxeditorjs-*.transport.zip
```

On upgrade, transport settings are **not overwritten** (`settings => false`). New keys are added by resolvers (`resolve.settings.php` for gallery).

Resolver `resolver_06_metrics.php` sends anonymous install stats to `https://metrics.modx.pro/`.

## Site styles

`gallery-front.css` loads only in manager. Connect CSS on the frontend manually — see [Integration](integration).

## Requirements

| | Version |
| --- | --- |
| MODX | 3.0.3+ |
| PHP | 8.2+ |
| Node.js | 18+ (frontend build only) |
