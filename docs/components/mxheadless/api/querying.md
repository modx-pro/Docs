---
title: Запросы
description: filter, sort, fields, pagination и includes в mxHeadless
---

# Запросы

Параметры списка и карточки для зарегистрированных объектов.

## Pagination

| Параметр | По умолчанию | Примечание |
| --- | --- | --- |
| `limit` | `20` | Не больше `mxheadless_max_limit` (100) |
| `offset` | `0` | Не больше `mxheadless_max_offset` |
| `page` | - | Вместо `offset`. Вместе с `offset` даёт `422` |

В `meta`: `total`, `count`, `limit`, `offset`, `has_more`. В `links`: `self`, `next`, `prev` при наличии.

## Fields

```text
fields=id,pagetitle,uri
```

Не больше `mxheadless_max_fields` (50) полей. Неизвестное или запрещённое поле даёт `422`.

## Filter

```text
filter[published]=1
filter[parent]=5
filter[alias][like]=%news%
```

`filter[field]=value` равен `filter[field][eq]=value`. Синоним параметра: `filters`. Неизвестное поле или оператор даёт `422`.

| Оператор | Синоним |
| --- | --- |
| `eq` | |
| `neq` | `ne` |
| `gt` `gte` `lt` `lte` | |
| `like` | |
| `in` `not_in` | |
| `null` `not_null` | |

У `resources` нет `pagetitle` в `filterable`. Поиск по заголовку: `?q=`.

## Sort

```text
sort=menuindex
sort=-createdon
sort=menuindex,-id
sort=publishedon:desc
```

Префикс `-` или суффикс `:desc` задаёт DESC. `:asc` и `+` задают ASC. У `resources` нельзя `sort=parent`.

## Поиск

```text
?q=installation
```

`QueryParser` строит `LIKE %term%` по полям `searchable` из определения. У `resources` в ядре: `pagetitle`, `longtitle`, `description`, `introtext`, `alias`, `uri`. Поля объединяются через OR.

Короткий термин может вернуть много строк. Сужайте выборку через `filter`. Если `searchable` пуст, ответ `422 Search not supported`. Список полей: [Schema](schema).

## Includes

```text
include=parent,children
include=tvs
```

У `resources` связи: `parent`, `children`. Поле `template` — id шаблона, не include. TV: `include=tvs` / `include=tv` или `?tv_fields=name1,name2`. Чанки, шаблоны, сниппеты, TV: `include=category`. Категории: `include=parent`.

Лимиты: `mxheadless_max_include_relations` (10), `mxheadless_max_include_depth` (2). Имена связей берутся из schema.

## Контекст

```text
?context=web
X-Context: web
```

Заголовок удобнее для кэша. Без параметра берётся контекст запуска: `mxheadless_context`, по умолчанию `web`.

Список `mxheadless_allowed_contexts` (по умолчанию `web,mgr`) ограничивает допустимые значения. Каталог и settings: [Elements и Contexts](elements).

## Preview / deleted

```text
?preview=true
?include_deleted=1
?includeDeleted=1
```

Только с соответствующими правами. Подробнее: [Preview](preview), [Авторизация](/components/mxheadless/authorization).
