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

Контексты MODX разделяют сайты, языки, web и mgr. mxHeadless берёт активный контекст из запроса и проверяет whitelist.

| Method | Path | Scope |
| --- | --- | --- |
| GET | `/contexts` | `contexts.read` |
| GET | `/contexts/{key}` | `contexts.read` |
| GET | `/contexts/{key}/settings` | `contexts.read` |
| GET | `/objects/contexts` | `contexts.read` |
| GET | `/objects/contexts/{key}` | `contexts.read` |

`{key}`: ключ контекста (`web`, `mgr`, …). Каждая запись фильтруется по ACL MODX (`context_{key}` для сессии, `context.{key}` для API key). Контексты вне `mxheadless_allowed_contexts` не попадают в ответ.

Поля каталога: `key`, `name`, `description`, `rank`.

Settings отдаются по allowlist, не весь `modContextSetting`. В ответе: `site_url`, `base_url`, `http_host`, `site_start`, `error_page`, `unauthorized_page`, `cultureKey`, `locale`.

Передать контекст в запросе:

```text
GET /api/v1/resources?context=web
X-Context: web
```

Если не указано, используется контекст bootstrap (`mxheadless_context`, по умолчанию `web`).

Whitelist `mxheadless_allowed_contexts` (default `web,mgr`) ограничивает значения `?context=` и `X-Context`. Остальные дают `422 Invalid context`. Запись `context_key` у ресурса: контекст из whitelist, который MODX может загрузить. Несуществующие и незагружаемые (часто `mgr` с web front controller) → `422`, не `500`.

```bash
curl -s https://example.com/api/v1/contexts/web \
  -H 'Authorization: Bearer mxh_...'
```
