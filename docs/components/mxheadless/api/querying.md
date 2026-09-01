---
title: Запросы
description: filter, sort, fields, pagination и includes в mxHeadless
---

# Запросы

Общие query-параметры для list/detail на registered objects.

## Pagination

| Параметр | Default | Примечание |
| --- | --- | --- |
| `limit` | `20` | Max: `mxheadless_max_limit` (100) |
| `offset` | `0` | Max: `mxheadless_max_offset` |
| `page` | - | Альтернатива offset. **Не** комбинируйте с `offset` (422) |

В `meta`: `total`, `count`, `limit`, `offset`, `has_more`. В `links`: `self`, `next`, `prev` при наличии.

## Fields

```text
fields=id,pagetitle,uri
```

Максимум полей: `mxheadless_max_fields` (50). Неизвестное или forbidden поле → `422`.

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

## Поиск

```text
?q=installation
```

`QueryParser` строит `LIKE %term%` по полям из `searchable` в definition. У `resources` в ядре: `pagetitle`, `longtitle`, `description`, `introtext`, `alias`, `uri`. Поля объединяются через OR.

Короткий термин может вернуть много строк. Сужайте выборку через `filter`. Если searchable пуст, ответ `422 Search not supported`. Список полей: [Schema](schema).

## Includes

```text
include=template,tvs
```

Лимиты: `mxheadless_max_include_relations` (10), `mxheadless_max_include_depth` (2). Имена relations берутся из schema.

## Контекст

```text
?context=web
X-Context: web
```

Заголовок удобнее для кэша. Без параметра используется bootstrap-контекст (`mxheadless_context`, по умолчанию `web`).

Whitelist `mxheadless_allowed_contexts` (default `web,mgr`) ограничивает допустимые значения. Каталог и settings: [Elements и Contexts](elements).

## Preview / deleted

```text
?preview=true
?include_deleted=1
```

Только с соответствующими правами. Подробнее: [Preview](preview), [Авторизация](/components/mxheadless/authorization).
