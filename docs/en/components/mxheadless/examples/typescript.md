---
title: TypeScript
description: Types and a fetch wrapper for mxHeadless
---

# TypeScript

Generate types from live OpenAPI, then call mxHeadless with a typed envelope.

## Generate types

From a running site (preferred):

```bash
npx openapi-typescript https://example.com/api/v1/meta/openapi.json -o types/mxheadless.d.ts
```

Or from `docs/openapi.yaml` in the [mxHeadless repo](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/openapi.yaml).

`GET /meta/openapi` returns the same schema inside `{ "data": { ... } }`. Point the generator at `/meta/openapi.json` if the tool expects a root `openapi` field. See [Swagger and OpenAPI](/components/mxheadless/api/swagger).

## Envelope type

```ts
export type MxEnvelope<T> = {
  data: T
  meta?: {
    total?: number
    count?: number
    limit?: number
    offset?: number
    has_more?: boolean
    [key: string]: unknown
  }
  links?: {
    self?: string
    next?: string
    prev?: string
    [key: string]: string | undefined
  }
}

export type MxProblem = {
  type?: string
  title?: string
  status: number
  detail?: string
  instance?: string
  code?: string
}
```

## Typed fetch

```ts
async function mxGet<T>(
  path: string,
  query?: Record<string, string | number | boolean>,
  init?: RequestInit,
): Promise<MxEnvelope<T>> {
  const base = process.env.MXHEADLESS_BASE_URL!
  const url = new URL(path.replace(/^\//, ''), base.endsWith('/') ? base : base + '/')
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.set(k, String(v))
    }
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(process.env.MXHEADLESS_API_KEY
        ? { Authorization: `Bearer ${process.env.MXHEADLESS_API_KEY}` }
        : {}),
      ...(init?.headers || {}),
    },
  })

  const body = await res.json()
  if (!res.ok) {
    throw body as MxProblem
  }

  return body as MxEnvelope<T>
}

type ResourceCard = {
  id: number
  pagetitle: string
  uri: string
}

const list = await mxGet<ResourceCard[]>('/resources', {
  limit: 10,
  'filter[published]': 1,
  fields: 'id,pagetitle,uri',
  sort: '-id',
})
```

## See also

- [JavaScript](javascript)
- [Nuxt](nuxt)
- [Next.js](nextjs)
