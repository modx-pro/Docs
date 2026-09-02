---
title: Querying
description: filter, sort, fields, pagination, and includes in mxHeadless
---

# Querying

Common query parameters for list/detail on registered objects.

## Pagination

| Parameter | Default | Note |
| --- | --- | --- |
| `limit` | `20` | Max: `mxheadless_max_limit` (100) |
| `offset` | `0` | Max: `mxheadless_max_offset` |
| `page` | - | Alternative to offset. **Do not** combine with `offset` (422) |

In `meta`: `total`, `count`, `limit`, `offset`, `has_more`. In `links`: `self`, `next`, `prev` when applicable.

## Fields

```text
fields=id,pagetitle,uri
```

Max fields: `mxheadless_max_fields` (50). Unknown or forbidden field → `422`.

## Filter

Simple forms:

```text
filter[published]=1
filter[parent]=5
filter[pagetitle][like]=news
```

Operators depend on the definition (eq, like, gt, …). Only registered filterable fields.

## Sort

```text
sort=menuindex
sort=-createdon
sort=parent,-id
```

A leading `-` sorts DESC.

## Search

```text
?q=installation
```

`QueryParser` builds `LIKE %term%` over fields from `searchable` in the definition. For core `resources`: `pagetitle`, `longtitle`, `description`, `introtext`, `alias`, `uri`. Fields are ORed.

A short term may return many rows. Narrow with `filter`. Empty searchable list → `422 Search not supported`. Field list: [Schema](schema).

## Includes

```text
include=template,tvs
```

Limits: `mxheadless_max_include_relations` (10), `mxheadless_max_include_depth` (2). Relation names come from schema.

## Context

```text
?context=web
X-Context: web
```

The header works better with caches. When omitted, the bootstrap context applies (`mxheadless_context`, default `web`).

The `mxheadless_allowed_contexts` whitelist (default `web,mgr`) limits allowed values. Catalog and settings: [Elements and Contexts](elements).

## Preview / deleted

```text
?preview=true
?include_deleted=1
```

Requires matching permissions. Details: [Preview](preview), [Authorization](/components/mxheadless/authorization).
