---
title: API and interfaces
---
# API and interfaces

## Connector `assets/components/mxeditorjs/connector.php`

Requests require MODX manager authentication. Responses are JSON, `Content-Type: application/json`.

Normal resource save goes through form POST and `OnBeforeDocFormSave`, not the connector. `content/save` is for AJAX and integrations.

### Permissions by action

| Action | `save_document` |
| --- | --- |
| `content/get` | No |
| `content/save` | Yes |
| `content/fromHtml` | No (manager session is enough) |
| `content/migrate` (without `dry_run`) | Yes |
| `content/migrate` (`dry_run=1`) | No |
| `media/upload`, `media/uploadFile` | Yes |
| `media/browse` | No |
| `link/search` | No |

### Authentication

Unauthenticated request: HTTP **200**, JSON body (lexicon, ru/en):

```json
{ "success": false, "message": "Access denied." }
```

---

### content/get

JSON content of a resource or TV.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/get` |
| `resource_id` | int | ✓ | MODX resource ID |
| `tmplvar_id` | int | — | TV ID (if omitted: main content) |

**Response (content found):**

```json
{
  "success": true,
  "data": {
    "content_json": { "time": 1709827200000, "blocks": [...], "version": "2.31.0" },
    "content_version": 3
  }
}
```

**Response (not found):** `{ "success": true, "data": null }`

---

### content/save

Saves JSON with validation and builds an HTML snapshot.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/save` |
| `resource_id` | int | ✓ | Resource ID |
| `tmplvar_id` | int | — | TV ID (if omitted: main content) |
| `content_json` | string/object | ✓ | Editor.js OutputData |

**Response (success):**

```json
{
  "success": true,
  "data": { "html": "<h2>Heading</h2>\n<p>Text</p>" }
}
```

`ContentValidator` checks JSON. `HtmlRenderer` builds HTML. Main content: JSON to sidecar, HTML to `modResource.content`. TV: table `mxeditorjs_tv_content`.

---

### media/upload

Upload image (multipart/form-data).

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `media/upload` |
| `resource_id` | int | ✓ | Resource ID |
| `image` | file | ✓ | Image file |

**Response (success):**

```json
{
  "success": 1,
  "file": {
    "url": "/assets/images/resources/42/photo.jpg",
    "name": "photo.jpg",
    "size": 245760
  }
}
```

File checks:

- extension from `mxeditorjs.allowed_image_types`
- MIME from `ALLOWED_IMAGE_MIME`: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`
- size ≤ `mxeditorjs.max_upload_size`

**Image** and **Gallery** call this action.

---

### media/uploadFile

Upload file attachment (Attaches). Parameters: `action=media/uploadFile`, `resource_id`, `file`. Path: **mxeditorjs.file_upload_path**, not the image path. Response format same as `media/upload`.

---

### media/browse

Browse files in Media Source.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `media/browse` |
| `resource_id` | int | ✓ | Resource ID |
| `type` | string | — | `image` (default) or `file` |
| `path` | string | — | Path relative to Media Source root; `__root__` or `/` for root |

`type=image` uses the image Media Source. `type=file` uses attachments. The **Gallery** block calls `type=image` (same browse as Image).

**Response:** object with `files`, `folders`, `path`, `parentPath`.

---

### link/search

Search MODX resources for link autocomplete.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `link/search` |
| `query` | string | ✓ | Search query (min 2 chars) |
| `limit` | int | — | Max results (default 10, max 30) |

Search by `pagetitle`, `longtitle`, exact match by `id`. Deleted resources are excluded.

---

### content/fromHtml

Convert HTML to OutputData without writing a sidecar. Parameter `html`. Response: `{time, blocks, version}`. The client calls this when `storageMode === 'inline'` (MIGX fields and similar).

---

### content/migrate

Migrate resource HTML to Editor.js format.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/migrate` |
| `resource_id` | int | ✓ | Resource ID |
| `dry_run` | bool | — | Preview without saving |
| `confirmed` | bool | — | Confirm overwrite |
| `force` | bool | — | Force overwrite existing data |

With `dry_run`: preview and `blocks_count`. Overwrite may need `confirmed=true`. After `confirmed` the sidecar and HTML in `modResource.content` are written. Success: `migrated`, `blocks_count`, `overwritten`, `html`.

---

## PHP classes

### MxEditorJs\Renderer\HtmlRenderer

Builds HTML from Editor.js OutputData.

| Method | Description |
| --- | --- |
| `render(array $editorJsData): string` | Builds HTML for all blocks |
| `registerBlockRenderer(string $type, callable $renderer): void` | Registers a custom renderer for a block type. Callable: `function(array $data, array $block): string` |

### MxEditorJs\Validator\ContentValidator

Validates Editor.js structure.

| Method | Description |
| --- | --- |
| `validate(array $data): bool` | Validates structure; returns `true` if valid |
| `getErrors(): array` | Array of error messages |
| `getFirstError(): ?string` | First error or `null` |

### MxEditorJs\Repository\ContentRepository

Sidecar `mxeditorjs_content`. HTML in `modResource.content` is written by connector `content/save` or the form client, not this class.

| Method | Description |
| --- | --- |
| `findByResourceId(int $resourceId): ?array` | Record by resource ID or `null` |
| `save(int $resourceId, array $jsonData, int $userId = 0): bool` | Create/update; skips if hash unchanged |
| `deleteByResourceId(int $resourceId): bool` | Delete record |

### MxEditorJs\Repository\TvContentRepository

TV sidecar: table `mxeditorjs_tv_content`.

| Method | Description |
| --- | --- |
| `findByResourceAndTv(int $resourceId, int $tmplvarId): ?array` | Lookup by (resource_id, tmplvar_id) |
| `save(int $resourceId, int $tmplvarId, array $jsonData, int $userId = 0): bool` | Create/update |
| `deleteByResourceAndTv(int $resourceId, int $tmplvarId): bool` | Delete one TV record |
| `deleteByResourceId(int $resourceId): bool` | Delete all TV records for resource |

### MxEditorJs\Service\MediaUploader

Media upload and browse.

| Method | Description |
| --- | --- |
| `upload(array $file, int $resourceId): array` | Upload image to Media Source; throws RuntimeException on error |
| `uploadFile(array $file, int $resourceId): array` | Upload attachment file |
| `browse(int $resourceId, string $type = 'image', string $subPath = ''): array` | Returns `{files, folders, path, parentPath}` |

### MxEditorJs\Service\HtmlMigrator

Converts HTML to Editor.js OutputData.

| Method | Description |
| --- | --- |
| `convert(string $html): array` | Takes HTML, returns `{time, blocks, version}` |

Supports: `p`, `h1`–`h6`, `ul`/`ol`, `blockquote`, `hr`, `pre`/`code`, `figure`/`img`, `img`, `table`, `div`/`section`/`article` (as paragraph).

---

## JavaScript API

### window.mxEditorJsConfig

Config after `OnDocFormPrerender`:

- `connectorUrl`: Connector URL
- `resourceId`: Current resource ID
- `assetsUrl`: Assets directory URL
- `profile`: Profile name
- `enabledTools`: Array of enabled tools
- `galleryMaxCount`: max images per Gallery block (`0` = unlimited)
- `tmplvarId`: optional TV ID on the instance (from `tv[N]` / `tvN`)
- `mxGallery`: `{enabled, connectorUrl, pickerUrl, authToken}`. `enabled` is true when `core/components/mxgallery/` exists
- `presets`: imageClass, linkClass, linkTarget, linkRel
- `locale`: Language code
- `i18n`, `editorJsI18n`: UI translations

### MODx.loadRTE / MODx.unloadRTE

mxEditorJs hooks MODX RTE init. The `elements` argument is normalized: string, id array, or object with `id`. That avoids `TypeError: e.split is not a function` on static resources.

```javascript
window.MODx.loadRTE(textareaId);
window.MODx.unloadRTE(textareaId);
```

`window.MxEditorJsFlush()` writes HTML back to the textarea before the MIGX window submits (`onBeforeSubmit` in `migxmxeditorjs.tpl`).

Storage modes: `main` (`#ta`, resource sidecar), `tv` (`tv[N]`, TV sidecar), `inline` (not `#ta` and not a TV: no hidden JSON, load via `content/fromHtml`).

---

## Data formats

### Editor.js OutputData

```json
{
  "time": 1709827200000,
  "version": "2.31.0",
  "blocks": [
    {
      "id": "abc123",
      "type": "paragraph",
      "data": { "text": "Hello world" },
      "tunes": { "alignmentTune": { "alignment": "left" } }
    }
  ]
}
```

### Gallery block

```json
{
  "type": "gallery",
  "data": {
    "files": [
      { "url": "/assets/images/resources/42/photo1.jpg", "name": "photo1.jpg" },
      { "url": "/assets/images/resources/42/photo2.jpg", "name": "photo2.jpg" }
    ],
    "style": "fit",
    "caption": "Gallery caption"
  }
}
```

`style`: `fit` (grid) or `slider` (horizontal scroll). HTML snapshot: `<figure class="mxeditorjs-gallery mxeditorjs-gallery--{style}">` with images in `.mxeditorjs-gallery__track`.

### mxGallery block

```json
{
  "type": "mxgallery",
  "data": {
    "mode": "ids",
    "ids": [12, 34],
    "collectionId": null
  }
}
```

`mode`: `ids` or `collection`. `HtmlRenderer` outputs `[[!mxGallery]]`. A collection uses `collection` and `picture=1`. One id uses `id`. Several use `ids` and `sort=selection`. Toolbox only if mxGallery is installed.

### API response

Success: `{ "success": true, "data": { ... } }`
Error: `{ "success": false, "message": "..." }`
