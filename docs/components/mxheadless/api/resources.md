---
title: Resources и Pages
description: CRUD ресурсов MODX и выборка страницы по URI через mxHeadless
---

# Resources и Pages

## Resources

| Method | Path | Public read | Scope |
| --- | --- | --- | --- |
| GET | `/resources` | да | `resources.read` |
| GET | `/resources/{id}` | да | `resources.read` |
| POST | `/resources` | - | `resources.create` |
| PUT / PATCH | `/resources/{id}` | - | `resources.update` |
| DELETE | `/resources/{id}` | - | `resources.delete` |

```bash
curl -s 'https://example.com/api/v1/resources?limit=5&filter[published]=1&fields=id,pagetitle,uri'
```

Удаление по умолчанию soft delete. `?force=1` делает permanent delete. Restore: PATCH `deleted: 0` с `?include_deleted=1` и правами.

## Pages

| Method | Path | Public read | Scope |
| --- | --- | --- | --- |
| GET | `/pages/{uri}` | да | `resources.read` |

`uri`: путь ресурса в контексте. Контекст задаётся через `X-Context` или `?context=` из `allowed_contexts`.

```bash
curl -s 'https://example.com/api/v1/pages/about' \
  -H 'X-Context: web'
```

## Query

Стандартные параметры: [Запросы](querying): `filter`, `sort`, `fields`, `limit`/`offset`/`page`, `include`.

## TV, media и связи

TV доступны как поля resource definition (если зарегистрированы). Связи через `include=` при наличии relation в registry. Подробности в live `/schema` и OpenAPI.

Пути к файлам в полях ресурсов превращаются в абсолютные URL через media sources MODX (`MediaUrlResolver`). Относительные пути собираются через `site_url` и активный контекст. Значения с `http://` или `https://` не меняются.
