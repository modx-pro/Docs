---
title: HTTP caching
description: ETag, Cache-Control, and conditional GET in mxHeadless
---

# HTTP caching

Public GET responses can be cached in the browser or CDN when `mxheadless_cache_enabled=true`.

## Headers

On safe routes for anonymous callers:

```text
Cache-Control: public, max-age=300
ETag: "a1b2c3d4e5f6..."
```

`max-age` comes from `mxheadless_cache_ttl` (default 300 seconds).

## Conditional GET

Send the ETag from a previous response:

```bash
curl -s -D - https://example.com/api/v1/resources/5 \
  -H 'If-None-Match: "a1b2c3d4e5f6..."'
```

When the representation is unchanged, the server returns `304 Not Modified` with no body.

`Access-Control-Expose-Headers` includes `ETag` so browser `fetch` can revalidate. See [CORS](/components/mxheadless/configuration/cors).

## Session and preview

Responses with a session, API key, or `?preview=true`:

```text
Cache-Control: private, no-store
```

Do not put them on a shared CDN.

## Invalidation

Saving or deleting a resource clears object and list cache tags. For a headless frontend, use [webhooks](/components/mxheadless/operations/webhooks) and [ISR revalidation](/components/mxheadless/operations/isr-revalidation).

## See also

- [System settings](/components/mxheadless/settings)
- [Preview](preview)
