---
title: TypeScript
description: Типы и fetch-обёртка для mxHeadless
---

# TypeScript

Сгенерируйте типы из live OpenAPI, затем вызывайте mxHeadless с типизированным envelope.

## Генерация типов

С работающего сайта (предпочтительно):

```bash
npx openapi-typescript https://example.com/api/v1/meta/openapi.json -o types/mxheadless.d.ts
```

Или из `docs/openapi.yaml` в [репозитории mxHeadless](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/openapi.yaml).

`GET /meta/openapi` отдаёт ту же схему в envelope `{ "data": { ... } }`. Генератору нужен `/meta/openapi.json`, если инструмент ждёт корневое поле `openapi`. См. [Swagger и OpenAPI](/components/mxheadless/api/swagger).

## Тип envelope

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

## Типизированный fetch

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

## См. также

- [JavaScript](javascript)
- [Nuxt](nuxt)
- [Next.js](nextjs)
