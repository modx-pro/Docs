---
title: REST API v1
description: "Read-only PageBuilder Pro REST: Bearer, scopes, GET /pages, ETag, and throttle"
---

# REST API v1 (Pro)

Read-only delivery of published content. It does not replace the Free [Public API](public-api). Page writes stay in the manager and in [Agent API](agent-api).

```text
/assets/components/pagebuilder/api/v1.php?path=/pages/42
```

You need PageBuilder Pro and `pagebuilder_rest_api_enabled = 1`.

## Which API

| | Public API (Free) | REST API v1 (Pro) |
| --- | --- | --- |
| URL | `api.php` | `api/v1.php?path=…` |
| Auth | `X-PageBuilder-Api-Key` or query `api_key` | `Authorization: Bearer` |
| Page list | no | `GET /pages` |
| One page | `action=web/page/get` | `GET /pages/{id-or-alias}` |
| Type catalog | `action=web/catalog/list` | `GET /catalog/sections` |
| ETag / 304 | no | yes |
| Per-token throttle | no | yes |

1. One frontend and a key in server env: [Public API](public-api).
2. Several apps, token revoke, scopes, and `If-None-Match`: REST v1.
3. Draft or field schemas from the manager: [Agent API](agent-api), not this transport.

After publish in the manager, `publishedRevision` grows. PageBuilder does not send an outbound webhook. The frontend compares the revision itself.

## Settings

Keys: [system settings](settings#rest-api). Issue tokens on the CMP **API tokens** tab.

| Key | Default | Description |
| --- | --- | --- |
| `pagebuilder_rest_api_enabled` | `0` | Enable the transport |
| `pagebuilder_rest_token_pepper` | empty | SHA-256 pepper. Empty means `site_id` |
| `pagebuilder_rest_tokens` | `[]` | Token JSON without secrets |
| `pagebuilder_rest_throttle_per_minute` | `120` | Request limit per token prefix. `0` disables the limit |

## Authorization

```http
Authorization: Bearer <secret>
```

The secret is shown once when you issue the token in the CMP. The setting keeps `prefix` and `hash`. A revoked or expired token returns `401`. Over the throttle the response is `429` with `Retry-After`. Bucket: `{token.prefix}|read` or `|write`. The IP is not part of the bucket.

Scope `pages.read` opens `GET /pages` and `GET /pages/{id-or-alias}`. This token cannot write.

## Routes

| Scope | Route |
| --- | --- |
| `catalog.read` | `GET /health`, `GET /catalog/sections` |
| `pages.read` | `GET /pages`, `GET /pages/{id-or-alias}` |

`GET /pages` returns published pages with `publishedRevision > 0`. The list has no document body.

| Query | Description |
| --- | --- |
| `limit` | 1–100, default 20 |
| `offset` | Offset |
| `context` | Context, default `web` |
| `q` | Search pagetitle, alias, or id |

`GET /pages/{id-or-alias}` returns one page by numeric id or alias.

| Query | Description |
| --- | --- |
| `include` | `document`, `values`. Fields match `web/page/get` |
| `context` | Context for alias |
| `section_types` | Type filter, for example `hero,cta` |

The envelope is `{ success, message, object }`, same as Public API.

OpenAPI: `GET /openapi.json`. Paths are filtered by the token scopes. Without Bearer the schema returns both read scopes.

## Cache and ETag

With Bearer the response uses `Cache-Control: private, no-store` and an `ETag` header. A matching `If-None-Match` returns `304` and an empty `object`.

Also: `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, CSP `default-src 'none'; frame-ancestors 'none'`.

## curl

```bash
BASE="https://cms.example.com/assets/components/pagebuilder/api/v1.php"
TOKEN="pb_live_secret"

curl -s -H "Authorization: Bearer $TOKEN" \
  "${BASE}?path=/health"

curl -s -H "Authorization: Bearer $TOKEN" \
  "${BASE}?path=/pages&limit=20&q=about"

curl -s -H "Authorization: Bearer $TOKEN" \
  "${BASE}?path=/pages/42&include=document,values"

curl -s -H "Authorization: Bearer $TOKEN" \
  -H 'If-None-Match: "abc"' \
  "${BASE}?path=/pages/42&include=document,values" -D -
```

## Next.js (App Router)

Keep `PAGEBUILDER_REST_URL` and `PAGEBUILDER_REST_TOKEN` on the server, not in `NEXT_PUBLIC_*`.

```typescript
export async function restGetPage(idOrAlias: string | number, etag?: string) {
  const url = new URL(process.env.PAGEBUILDER_REST_URL!)
  url.searchParams.set('path', `/pages/${idOrAlias}`)
  url.searchParams.set('include', 'document,values')

  const headers: HeadersInit = {
    Authorization: `Bearer ${process.env.PAGEBUILDER_REST_TOKEN!}`,
  }
  if (etag) headers['If-None-Match'] = etag

  const res = await fetch(url, { headers, cache: 'no-store' })
  if (res.status === 304) {
    return { status: 304 as const, page: null, etag: res.headers.get('ETag') }
  }
  const body = await res.json()
  return {
    status: res.status,
    page: body.success ? body.object : null,
    etag: res.headers.get('ETag'),
  }
}
```

List for a sitemap:

```typescript
export async function restListPages(limit = 50) {
  const url = new URL(process.env.PAGEBUILDER_REST_URL!)
  url.searchParams.set('path', '/pages')
  url.searchParams.set('limit', String(limit))
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.PAGEBUILDER_REST_TOKEN!}` },
    next: { revalidate: 60 },
  })
  const body = await res.json()
  if (!body.success) throw new Error(body.message)
  return body.object as { items: unknown[]; total: number }
}
```

## Nuxt 4

Put the token only in `runtimeConfig`, not in `public`. BFF:

```typescript
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const config = useRuntimeConfig()
  const url = new URL(config.pageBuilderRestUrl)
  url.searchParams.set('path', `/pages/${id}`)
  url.searchParams.set('include', 'document,values')

  const data = await $fetch(url.toString(), {
    headers: { Authorization: `Bearer ${config.pageBuilderRestToken}` },
  })
  if (!data.success) {
    throw createError({ statusCode: 404, statusMessage: data.message })
  }
  return data.object
})
```

```vue
<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(
  () => `rest-${route.params.id}`,
  () => $fetch(`/api/cms/${route.params.id}`),
)
</script>
```

## Related pages

- [Public API](public-api)
- [Agent API](agent-api)
- [System settings](settings#rest-api)
- [Control panel](cmp#api-tokens)
