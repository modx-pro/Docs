---
title: Resources and Pages
description: MODX resource CRUD and page lookup by URI via mxHeadless
---

# Resources and Pages

## Resources

| Method | Path | Public read | Scope |
| --- | --- | --- | --- |
| GET | `/resources` | yes | `resources.read` |
| GET | `/resources/{id}` | yes | `resources.read` |
| POST | `/resources` | - | `resources.create` |
| PUT / PATCH | `/resources/{id}` | - | `resources.update` |
| DELETE | `/resources/{id}` | - | `resources.delete` |

```bash
curl -s 'https://example.com/api/v1/resources?limit=5&filter[published]=1&fields=id,pagetitle,uri'
```

Delete is soft by default. `?force=1` removes the resource permanently. Restore with PATCH `deleted: 0`, `?include_deleted=1`, and the right permissions.

## Pages

| Method | Path | Public read | Scope |
| --- | --- | --- | --- |
| GET | `/pages/{uri}` | yes | `resources.read` |

`uri` is the resource path in context. Context: `X-Context` or `?context=` from `allowed_contexts`.

```bash
curl -s 'https://example.com/api/v1/pages/about' \
  -H 'X-Context: web'
```

## Query

Standard parameters from [Querying](querying): `filter`, `sort`, `fields`, `limit`/`offset`/`page`, `include`.

## TVs, media, and relations

TVs are available as resource definition fields (when registered). Relations via `include=` when a relation exists in the registry. See live `/schema` and OpenAPI for details.

File paths in resource fields become absolute URLs through MODX media sources (`MediaUrlResolver`). Relative paths use `site_url` and the active context. Values starting with `http://` or `https://` are unchanged.
