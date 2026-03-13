---
title: API and interfaces
---
# API and interfaces

## Connector `assets/components/mxeditorjs/connector.php`

All connector requests require MODX manager authentication. Responses are JSON. Write operations require `save_document` permission.

### Authentication

Unauthenticated requests return:

```json
{ "success": false, "message": "Permission denied" }
```

---

### content/get

Get JSON content of a resource or TV.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/get` |
| `resource_id` | int | ✓ | MODX resource ID |
| `tmplvar_id` | int | — | TV ID (if omitted — main content) |

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

Save JSON content with validation and HTML snapshot generation.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/save` |
| `resource_id` | int | ✓ | Resource ID |
| `tmplvar_id` | int | — | TV ID (if omitted — main content) |
| `content_json` | string/object | ✓ | Editor.js OutputData |

**Response (success):**

```json
{
  "success": true,
  "data": { "html": "<h2>Heading</h2>\n<p>Text</p>" }
}
```

**Logic:** JSON is validated (`ContentValidator`), `HtmlRenderer` generates HTML; for main content JSON goes to sidecar, HTML to `modResource.content`; for TV — to `mxeditorjs_tv_content`.

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

Validation: extension from `mxeditorjs.allowed_image_types`, MIME image/*, size ≤ `mxeditorjs.max_upload_size`.

---

### media/uploadFile

Upload file attachment (Attaches). Parameters: `action=media/uploadFile`, `resource_id`, `file`. Response format same as `media/upload`.

---

### media/browse

Browse files in Media Source.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `media/browse` |
| `resource_id` | int | ✓ | Resource ID |
| `type` | string | — | `image` (default) or `file` |
| `path` | string | — | Path relative to Media Source root; `__root__` or `/` for root |

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

### content/migrate

Migrate resource HTML content to Editor.js format.

| Parameter | Type | Required | Description |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/migrate` |
| `resource_id` | int | ✓ | Resource ID |
| `dry_run` | bool | — | Preview without saving |
| `confirmed` | bool | — | Confirm overwrite |
| `force` | bool | — | Force overwrite existing data |

Responses: with `dry_run` — preview and `blocks_count`; overwrite may require `confirmed=true`; on success — `migrated`, `blocks_count`, `overwritten`.

---

## PHP classes

### MxEditorJs\Renderer\HtmlRenderer

Renders Editor.js OutputData to HTML.

| Method | Description |
| --- | --- |
| `render(array $editorJsData): string` | Renders all blocks to an HTML string |
| `registerBlockRenderer(string $type, callable $renderer): void` | Registers custom renderer for block type. Callable: `function(array $data, array $block): string` |

### MxEditorJs\Validator\ContentValidator

Validates Editor.js structure.

| Method | Description |
| --- | --- |
| `validate(array $data): bool` | Validates structure; returns `true` if valid |
| `getErrors(): array` | Array of error messages |
| `getFirstError(): ?string` | First error or `null` |

### MxEditorJs\Repository\ContentRepository

Main resource content (JSON sidecar + HTML in `modResource.content`).

| Method | Description |
| --- | --- |
| `findByResourceId(int $resourceId): ?array` | Record by resource ID or `null` |
| `save(int $resourceId, array $jsonData, int $userId = 0): bool` | Create/update; skips if hash unchanged |
| `deleteByResourceId(int $resourceId): bool` | Delete record |

### MxEditorJs\Repository\TvContentRepository

TV content (sidecar table for TV).

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

Config available after `OnDocFormPrerender`:

- `connectorUrl` — Connector URL  
- `resourceId` — Current resource ID  
- `assetsUrl` — Assets directory URL  
- `profile` — Profile name  
- `enabledTools` — Array of enabled tools  
- `presets` — imageClass, linkClass, linkTarget, linkRel  
- `locale` — Language code  
- `i18n`, `editorJsI18n` — UI translations  

### MODx.loadRTE / MODx.unloadRTE

mxEditorJs hooks into MODX RTE init: `MODx.loadRTE(textareaId)` when the field appears, `MODx.unloadRTE(textareaId)` when it is removed.

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

### API response

Success: `{ "success": true, "data": { ... } }`  
Error: `{ "success": false, "message": "..." }`
