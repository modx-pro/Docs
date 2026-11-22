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
| API key / OAuth | Scope `preview` |

Проверка идёт одним условием: scope `preview` у ключа или токена либо право `view_unpublished` у текущей сессии MODX. ACL пользователя, создавшего ключ, в проверку не входит: identity ключа никогда не пробрасывается в `modX` как пользователь.

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
