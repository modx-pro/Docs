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

| Method | Path | Scope |
| --- | --- | --- |
| GET | `/contexts` | `contexts.read` |
| GET | `/contexts/{key}` | `contexts.read` |
| GET | `/contexts/{key}/settings` | `contexts.read` |

`{key}` is the context key (`web`, `mgr`, …). Settings are returned from an allowlist, not the full `modContextSetting`.

```bash
curl -s https://example.com/api/v1/contexts/web \
  -H 'Authorization: Bearer mxh_...'
```
