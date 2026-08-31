---
title: Elements and Contexts
description: Read chunks, templates, snippets, TVs, categories, and contexts
---

# Elements and Contexts

Reads require authentication (API key, OAuth, or session) and the matching scope.

## Elements

| Path prefix | Scope |
| --- | --- |
| `/chunks` | `chunks.read` |
| `/templates` | `templates.read` |
| `/snippets` | `snippets.read` |
| `/tvs` | `tvs.read` |
| `/categories` | `categories.read` |
| `/content_types` | `content_types.read` |

List and `GET /{prefix}/{id}` for each type.

```bash
curl -s https://example.com/api/v1/chunks \
  -H 'Authorization: Bearer mxh_...'
```

Core does not ship full site CRUD for elements. Check the live OpenAPI registry for available routes.

## Contexts

MODX contexts isolate sites, languages, or manager vs web. mxHeadless reads the active context from the request and enforces a whitelist.

| Method | Path | Scope |
| --- | --- | --- |
| GET | `/contexts` | `contexts.read` |
| GET | `/contexts/{key}` | `contexts.read` |
| GET | `/contexts/{key}/settings` | `contexts.read` |
| GET | `/objects/contexts` | `contexts.read` |
| GET | `/objects/contexts/{key}` | `contexts.read` |

`{key}` is the context key (`web`, `mgr`, …). Each record is filtered by MODX ACL (`context_{key}` for session users, `context.{key}` for API keys). Contexts outside `mxheadless_allowed_contexts` are never returned.

Catalog fields: `key`, `name`, `description`, `rank`.

Settings are returned from an allowlist, not the full `modContextSetting`. Response includes `site_url`, `base_url`, `http_host`, `site_start`, `error_page`, `unauthorized_page`, `cultureKey`, `locale`.

Set context on a request:

```text
GET /api/v1/resources?context=web
X-Context: web
```

When omitted, the bootstrap context applies (`mxheadless_context`, default `web`).

The `mxheadless_allowed_contexts` whitelist (default `web,mgr`) limits `?context=` and `X-Context`. Others return `422 Invalid context`. Writing `context_key` on a resource must use a context from the whitelist that MODX can load. Unknown or unloadable contexts (often `mgr` from a web front controller) return `422`, not `500`.

```bash
curl -s https://example.com/api/v1/contexts/web \
  -H 'Authorization: Bearer mxh_...'
```
