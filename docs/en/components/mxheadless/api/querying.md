---
title: Querying
description: filter, sort, fields, pagination, and includes in mxHeadless
---

# Querying

Query parameters for list and detail on registered objects.

## Pagination

| Parameter | Default | Note |
| --- | --- | --- |
| `limit` | `20` | At most `mxheadless_max_limit` (100) |
| `offset` | `0` | At most `mxheadless_max_offset` |
| `page` | - | Instead of `offset`. Together with `offset` returns `422` |

In `meta`: `total`, `count`, `limit`, `offset`, `has_more`. In `links`: `self`, `next`, `prev` when applicable.

## Fields

```text
fields=id,pagetitle,uri
```

At most `mxheadless_max_fields` (50) fields. Unknown or forbidden field returns `422`.

## Filter

```text
filter[published]=1
filter[parent]=5
filter[alias][like]=%news%
```

`filter[field]=value` is the same as `filter[field][eq]=value`. Parameter alias: `filters`. Unknown field or operator returns `422`.

| Operator | Alias |
| --- | --- |
| `eq` | |
| `neq` | `ne` |
| `gt` `gte` `lt` `lte` | |
| `like` | |
| `in` `not_in` | |
| `null` `not_null` | |

`pagetitle` is not in `filterable` on `resources`. Search by title with `?q=`.

## Sort

```text
sort=menuindex
sort=-createdon
sort=menuindex,-id
sort=publishedon:desc
```

A leading `-` or `:desc` sorts DESC. `:asc` and `+` sort ASC. `sort=parent` is not allowed on `resources`.

## Search

```text
?q=installation
```

`QueryParser` builds `LIKE %term%` over `searchable` fields from the definition. For core `resources`: `pagetitle`, `longtitle`, `description`, `introtext`, `alias`, `uri`. Fields are ORed.

A short term may return many rows. Narrow with `filter`. Empty `searchable` list returns `422 Search not supported`. Field list: [Schema](schema).

## Includes

```text
include=parent,children
include=tvs
```

`resources` relations: `parent`, `children`. `template` is a field (template id), not an include. TVs: `include=tvs` / `include=tv` or `?tv_fields=name1,name2`. Chunks, templates, snippets, TVs: `include=category`. Categories: `include=parent`.

Limits: `mxheadless_max_include_relations` (10), `mxheadless_max_include_depth` (2). Relation names come from schema.

## Context

```text
?context=web
X-Context: web
```

The header works better with caches. When omitted, the startup context applies: `mxheadless_context`, default `web`.

The `mxheadless_allowed_contexts` list (default `web,mgr`) limits allowed values. Catalog and settings: [Elements and Contexts](elements).

## Preview / deleted

```text
?preview=true
?include_deleted=1
?includeDeleted=1
```

Requires matching permissions. Details: [Preview](preview), [Authorization](/components/mxheadless/authorization).
