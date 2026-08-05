---
title: Editor guide
---
# Editor guide

For content editors in the MODX manager. Tool profiles and media: [System settings](settings).

## Enabling

1. **Settings → System settings**
2. `which_editor` = **mxEditorJs**
3. `mxeditorjs.enabled` = **Yes**
4. Open a resource — Editor.js appears in the content field

Editor did not load — see [FAQ](faq).

## Blocks

**Add block:** Enter at end of block or **«+»** on the left.

**Move:** ⋮⋮ handle on the left, drag.

**Delete:** ⋮⋮ → **Delete**.

**Formatting:** select text — **B**, **I**, **Link**, **Code**, **Marker**, **U**.

| Block | Purpose |
| --- | --- |
| Paragraph | Body text, alignment |
| Header | Headings H2–H5 |
| List | Bulleted or numbered list |
| Checklist | Checkbox list |
| Quote | Quote with caption |
| Table | Table, first row can be header |
| Code | Code block |
| Raw HTML | Arbitrary HTML |
| Delimiter | Horizontal rule |
| Warning | Warning title and text |
| Attaches | Downloadable file (PDF, DOC, ZIP) |
| Image | Single image with caption |
| Gallery | Multiple images, fit or slider modes |
| Embed | Video and iframe (paste URL, see below) |

Block set is defined by admin via profile (`default`, `minimal`, `blog`, `full`) or `mxeditorjs.enabled_tools`.

## Images

1. **«+»** → **Image**
2. **Upload** — drag-and-drop or file picker
3. **Browse** — Media Source browser

After insert: caption, border, stretch, background, CSS preset (if configured).

Formats: JPG, JPEG, PNG, GIF, WebP, SVG. Default max size 5 MB (`mxeditorjs.max_upload_size`).

## Gallery

1. **«+»** → **Gallery**
2. Add images via **Upload** or **Browse** (same Media Source as Image)
3. Drag thumbnails to reorder
4. Block settings: **fit** (grid) or **slider** (horizontal scroll)
5. Optional shared caption

Image limit — `mxeditorjs.gallery_max_count` (`0` = no limit).

## Links

1. Select text → **Link**
2. URL or MODX resource name (autocomplete by pagetitle, longtitle, ID)
3. Target, rel, CSS class — if presets are configured

## Embed (video and iframe)

There is no separate Embed button. Paste a URL into an empty block (Ctrl+V / Cmd+V) — the editor creates the block automatically.

Supports YouTube, Vimeo, RuTube (`https://rutube.ru/video/...`), Twitter/X, Instagram, CodePen and other `@editorjs/embed` services. Frontend output is an iframe.

## TVs (Template Variables)

Works in **Textarea** TVs with **Rich Text** = **Yes**.

1. Create a TV, assign to template
2. On the resource open **Template Variables** tab

Each TV has its own editor instance and JSON storage. HTML auto-migration for TVs **does not run**.

## Fullscreen and HTML

| Button | Action |
| --- | --- |
| **Fullscreen** | Editor full screen (F11, Escape to exit) |
| **Source** | HTML preview (Ctrl+U / Cmd+U), read-only |

## Migration from HTML

If the resource has HTML from TinyMCE/CKEditor but no JSON in sidecar, a dialog appears on first open:

1. Preview: block count and HTML size
2. **Migrate** — convert to Editor.js
3. **Cancel** — empty editor

Migrator handles headings, paragraphs, lists, quotes, images, tables, code, delimiters. Does **not** restore embed, gallery, attachments, or checklists from HTML.

Migration applies to main content only, not TVs. Details: [Integration](integration).

## Shortcuts

| Key | Action |
| --- | --- |
| Enter | New block |
| Backspace in empty block | Delete block |
| Tab / Shift+Tab | List nesting |
| Ctrl+B / Cmd+B | Bold |
| Ctrl+I / Cmd+I | Italic |
| Ctrl+K / Cmd+K | Link |
| Ctrl+Z / Cmd+Z | Undo |
| Ctrl+Shift+Z / Cmd+Shift+Z | Redo |
| Ctrl+U / Cmd+U | Source Preview |
| F11 | Fullscreen |
| Escape | Exit fullscreen |
