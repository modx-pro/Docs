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

## Includes

```text
include=template,tvs
```

Limits: `mxheadless_max_include_relations` (10), `mxheadless_max_include_depth` (2). Relation names come from schema.

## Context

```text
?context=web
```

or header `X-Context`.

## Preview / deleted

```text
?preview=true
?include_deleted=1
```

Requires matching permissions. See [Authorization](/components/mxheadless/authorization).
