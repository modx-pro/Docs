---
title: Troubleshooting
---
# Troubleshooting

Common manager and development issues. Editor FAQ: [FAQ](faq).

## Editor does not load

1. `which_editor` = **mxEditorJs**, `use_editor` = **Yes**, `mxeditorjs.enabled` = **Yes**
2. Clear MODX cache
3. Console (F12): JS errors, `mxeditorjs.js?v=...` load
4. Plugin **mxEditorJs** is enabled

On init failure Editor.js falls back to textarea.

Console:

```javascript
console.log(window.mxEditorJsConfig);
```

Expected: `connectorUrl`, `resourceId`, `enabledTools`, `galleryMaxCount`, `locale`.

## Media upload errors

| Symptom | Check |
| --- | --- |
| 403 / Permission denied | `save_document` permission, manager session |
| File too large | `mxeditorjs.max_upload_size`, PHP `upload_max_filesize` |
| Wrong type | `mxeditorjs.allowed_image_types`, MIME via `finfo_file` |
| Folder not writable | Media Source ID, write access to `image_upload_path` / `file_upload_path` |

## Attaches does not open file dialog

`patch-package` for `@editorjs/attaches` did not apply. In package directory:

```bash
npm install
npm run build
```

Copy `mxeditorjs.js` to `assets/components/mxeditorjs/js/`. After `npm update @editorjs/attaches` rebuild patch: `npx patch-package @editorjs/attaches`.

## Connector returns error

URL: `assets/components/mxeditorjs/connector.php`. In Network inspect `action`, body `{ success, message }`. Auth errors use HTTP **200**, not 403.

Typical `message`: validation errors from `ContentValidator`.

## Site HTML ≠ Source Preview

Two renderers: client `renderPreviewHtml` (form) and server `HtmlRenderer` (`content/save`). Align block logic in both. See [Architecture](architecture).

## Gallery missing from toolbar after upgrade

Resolver adds `gallery` to `available_tools` and profiles. Check JSON in `mxeditorjs.profiles` if edited manually. Clear cache.

## Two copies of files during development

MODX reads not `Extras/` but:

- `core/components/mxeditorjs/`
- `assets/components/mxeditorjs/`

Sync:

```bash
cp -r Extras/mxEditorJs/core/components/mxeditorjs/ core/components/mxeditorjs/
cp -r Extras/mxEditorJs/assets/components/mxeditorjs/ assets/components/mxeditorjs/
```

Or rsync:

```bash
rsync -av --delete Extras/mxEditorJs/core/components/mxeditorjs/ core/components/mxeditorjs/
rsync -av --delete --exclude='node_modules' Extras/mxEditorJs/assets/components/mxeditorjs/ assets/components/mxeditorjs/
```

### Static plugin

```sql
SELECT id, name, static, static_file FROM modx_site_plugins WHERE name = 'mxEditorJs';
```

With `static = 1`, edit `Extras/.../mxeditorjs.plugin.php` without re-saving the element in manager.

## Clear cache (CLI)

```bash
rm -rf core/cache/mgr/ core/cache/includes/ core/cache/scripts/
```

Or **Settings → Clear cache**.

## Debug save flow

1. **Network** — resource form POST: `mxeditorjs_json`, `mxeditorjs_tv_{id}_json`
2. **Console** — `[mxEditorJs]` errors in `syncToTextarea` / `renderPreviewHtml`
3. DB — row in `mxeditorjs_content`, `content_hash` field

## PHP log

```bash
grep '\[mxEditorJs\]' core/cache/logs/error.log
```

## Common dev symptoms

| Symptom | Fix |
| --- | --- |
| Editor does not load | `npm run build`, copy `mxeditorjs.js` |
| MutationObserver error | Rebuild and copy JS |
| TV does not init | Textarea + Rich Text = Yes |
| Attaches no dialog | `npm install`, patch-package |
| Gallery missing from toolbar | Check `available_tools`, profile, cache |
