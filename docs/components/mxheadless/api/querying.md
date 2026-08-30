---
title: Запросы
description: filter, sort, fields, pagination и includes в mxHeadless
---

# Запросы

Общие query-параметры для list/detail на registered objects.

## Pagination

| Параметр | Default | Примечание |
| --- | --- | --- |
| `limit` | `20` | Max: `mxheadless.max_limit` (100) |
| `offset` | `0` | Max: `mxheadless.max_offset` |
| `page` | - | Альтернатива offset. **Не** комбинируйте с `offset` (422) |

В `meta`: `total`, `count`, `limit`, `offset`, `has_more`. В `links`: `self`, `next`, `prev` при наличии.

## Fields

```text
fields=id,pagetitle,uri
```

Максимум полей: `mxheadless.max_fields` (50). Неизвестное или forbidden поле → `422`.

## Filter

Простые формы:

```text
filter[published]=1
filter[parent]=5
filter[pagetitle][like]=news
```

Операторы зависят от definition (eq, like, gt, …). Только зарегистрированные filterable fields.

## Sort

```text
sort=menuindex
sort=-createdon
sort=parent,-id
```

Префикс `-` задаёт DESC.

## Includes

```text
include=template,tvs
```

Лимиты: `mxheadless.max_include_relations` (10), `mxheadless.max_include_depth` (2). Имена relations берутся из schema.

## Контекст

```text
?context=web
```

или заголовок `X-Context`.

## Preview / deleted

```text
?preview=true
?include_deleted=1
```

Только с соответствующими правами. См. [Авторизация](/components/mxheadless/authorization).
