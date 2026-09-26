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

Delete is soft by default. `?force=1` removes the resource permanently. Restore with PATCH `deleted: 0`, `?include_deleted=1`, and the matching permissions.

## Pages

| Method | Path | Public read | Scope |
| --- | --- | --- | --- |
| GET | `/pages/{uri}` | yes | `resources.read` |

`{uri}` is the path without a leading `/`. Do not `encodeURIComponent` the whole path. You may encode each segment. `%XX` encoding is decoded.

| Request | URI candidates |
| --- | --- |
| `/pages/about` | `about`, `about.html`, `about/` |
| `/pages/about.html` | `about.html`, `about` |
| `/pages/blog/post` | `blog/post`, `blog/post.html`, `blog/post/` |
| `/pages/index` | `index.html`, `index`, `` |

In `meta`: `uri` (as requested), `resolved_uri` (matched MODX URI), `context`.

```bash
curl -s 'https://example.com/api/v1/pages/about' \
  -H 'X-Context: web'
```

## Query

Parameters from [Querying](querying): `filter`, `sort`, `fields`, `limit`/`offset`/`page`, `include`.

## TVs, media, and relations

TV values on a resource: `?tv_fields=name1,name2` or `include=tvs` (no list → all TVs). TV definitions: `GET /tvs`, not `resources` fields. Resource relations: `include=parent,children`. Details are in `/schema`.

File paths in resource fields become absolute URLs through MODX media sources (`MediaUrlResolver`). Relative paths use `site_url` and the active context. Values starting with `http://` or `https://` are unchanged.
