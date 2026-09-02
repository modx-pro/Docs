---
title: Preview
description: Unpublished content via ?preview=true
---

# Preview

Query parameter `?preview=true` on resource or page GET includes unpublished content.

## Who can

| Identity | Condition |
| --- | --- |
| Anonymous | Denied |
| Session | MODX permission `view_unpublished` |
| API key / OAuth | Scope `preview` and the key user's ACL |

```bash
curl -s 'https://example.com/api/v1/resources/12?preview=true' \
  -H 'Authorization: Bearer mxh_...'
```

Context and field policy still apply. Hidden fields are not returned.

## Cache

Preview responses use `Cache-Control: private, no-store`. Do not cache on a CDN. See [HTTP caching](http-caching).

## See also

- [Resources and Pages](resources)
- [Scopes and ACL](/components/mxheadless/authorization)
