---
title: Preview
description: Неопубликованный контент через ?preview=true
---

# Preview

Параметр `?preview=true` на GET ресурса или страницы включает неопубликованный контент.

## Кто может

| Identity | Условие |
| --- | --- |
| Anonymous | Запрещено |
| Сессия | Право MODX `view_unpublished` |
| API key / OAuth | Scope `preview` и ACL пользователя key |

```bash
curl -s 'https://example.com/api/v1/resources/12?preview=true' \
  -H 'Authorization: Bearer mxh_...'
```

Контекст и политика полей сохраняются. Hidden поля не отдаются.

## Кэш

Ответы preview с `Cache-Control: private, no-store`. Не кладите на CDN. См. [HTTP-кэш](http-caching).

## См. также

- [Resources и Pages](resources)
- [Scopes и ACL](/components/mxheadless/authorization)
