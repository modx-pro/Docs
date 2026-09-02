---
title: JavaScript examples
description: fetch helper and mxHeadless requests from browser or Node
---

# JavaScript examples

Use `fetch` in the browser or Node 18+. Replace the base URL.

```js
const base = 'https://example.com/api/v1'
```

## Helper

```js
async function api(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  })

  const body = await res.json().catch(() => null)
  if (!res.ok) {
    const err = new Error(body?.detail || res.statusText)
    err.status = res.status
    err.code = body?.code
    err.body = body
    throw err
  }

  return body
}
```

Success: `{ data, meta, links }`. Errors: problem+json with `status`, `detail`, often `code`.

## Discovery and list

```js
await api('')
await api('/health')

const list = await api(
  '/resources?' +
    new URLSearchParams({
      limit: '5',
      'filter[published]': '1',
      sort: '-id',
      fields: 'id,pagetitle,uri',
    }),
)
```

## With API key

```js
const key = process.env.MXHEADLESS_API_KEY

const chunks = await api('/chunks', {
  headers: { Authorization: `Bearer ${key}` },
})
```

## Mutation

```js
await api('/resources', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    'Idempotency-Key': 'create-about-001',
  },
  body: JSON.stringify({
    pagetitle: 'About',
    parent: 2,
    template: 1,
    published: 0,
  }),
})
```

## CORS

For another origin, enable [CORS](/components/mxheadless/configuration/cors) and add your frontend origin.

## Frameworks

- [Nuxt](nuxt)
- [Next.js](nextjs)
- [SvelteKit](sveltekit)
