---
title: Elements и Contexts
description: Чтение chunks, templates, snippets, TVs, categories и контекстов
---

# Elements и Contexts

Чтение требует аутентификации (API key, OAuth или сессия) и соответствующего scope.

## Elements

| Path prefix | Scope |
| --- | --- |
| `/chunks` | `chunks.read` |
| `/templates` | `templates.read` |
| `/snippets` | `snippets.read` |
| `/tvs` | `tvs.read` |
| `/categories` | `categories.read` |
| `/content_types` | `content_types.read` |

Список и `GET /{prefix}/{id}` на каждом типе.

```bash
curl -s https://example.com/api/v1/chunks \
  -H 'Authorization: Bearer mxh_...'
```

Write API для элементов в core не поставляется как полноценный CRUD сайта. Ориентируйтесь на OpenAPI live registry.

## Contexts

| Method | Path | Scope |
| --- | --- | --- |
| GET | `/contexts` | `contexts.read` |
| GET | `/contexts/{key}` | `contexts.read` |
| GET | `/contexts/{key}/settings` | `contexts.read` |

`{key}`: ключ контекста (`web`, `mgr`, …). Settings отдаются по allowlist, не весь `modContextSetting`.

```bash
curl -s https://example.com/api/v1/contexts/web \
  -H 'Authorization: Bearer mxh_...'
```
