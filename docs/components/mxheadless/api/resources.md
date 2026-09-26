---
title: Resources и Pages
description: CRUD ресурсов MODX и выборка страницы по URI через mxHeadless
---

# Resources и Pages

## Resources

| Метод | Path | Публичное чтение | Scope |
| --- | --- | --- | --- |
| GET | `/resources` | да | `resources.read` |
| GET | `/resources/{id}` | да | `resources.read` |
| POST | `/resources` | - | `resources.create` |
| PUT / PATCH | `/resources/{id}` | - | `resources.update` |
| DELETE | `/resources/{id}` | - | `resources.delete` |

```bash
curl -s 'https://example.com/api/v1/resources?limit=5&filter[published]=1&fields=id,pagetitle,uri'
```

Удаление по умолчанию мягкое. `?force=1` удаляет окончательно. Восстановление: PATCH `deleted: 0` с `?include_deleted=1` и правами.

## Pages

| Метод | Path | Публичное чтение | Scope |
| --- | --- | --- | --- |
| GET | `/pages/{uri}` | да | `resources.read` |

`{uri}` — путь без ведущего `/`. Слэши в path не кодируйте целиком через `encodeURIComponent`. Сегменты можно кодировать по отдельности. Кодирование `%XX` снимается.

| Запрос | Кандидаты URI |
| --- | --- |
| `/pages/about` | `about`, `about.html`, `about/` |
| `/pages/about.html` | `about.html`, `about` |
| `/pages/blog/post` | `blog/post`, `blog/post.html`, `blog/post/` |
| `/pages/index` | `index.html`, `index`, `` |

В `meta`: `uri` (как в запросе), `resolved_uri` (совпавший URI MODX), `context`.

```bash
curl -s 'https://example.com/api/v1/pages/about' \
  -H 'X-Context: web'
```

## Query

Параметры: [Запросы](querying): `filter`, `sort`, `fields`, `limit`/`offset`/`page`, `include`.

## TV, media и связи

Значения TV на ресурсе: `?tv_fields=name1,name2` или `include=tvs` (без списка — все TV). Определения TV: `GET /tvs`, не поля `resources`. Связи ресурса: `include=parent,children`. Подробности в `/schema`.

Пути к файлам в полях ресурсов превращаются в абсолютные URL через media sources MODX (`MediaUrlResolver`). Относительные пути собираются через `site_url` и активный контекст. Значения с `http://` или `https://` не меняются.
