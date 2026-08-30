---
title: Next.js
description: App Router Next.js и mxHeadless server fetch
---

# Next.js

App Router: server helper, страница по URI, Route Handler proxy.

## Env

`.env.local`:

```env
MXHEADLESS_BASE_URL=https://example.com/api/v1
MXHEADLESS_API_KEY=mxh_...
```

Ключ только в Server Components, Route Handlers или модулях с `server-only`.

## Server helper

`lib/mxheadless.ts`:

```ts
import 'server-only'

type Envelope<T> = {
  data: T
  meta?: Record<string, unknown>
  links?: Record<string, string>
}

const baseURL = process.env.MXHEADLESS_BASE_URL!
const apiKey = process.env.MXHEADLESS_API_KEY

export async function mxGet<T>(
  path: string,
  query?: Record<string, string | number | boolean>,
  init?: RequestInit,
): Promise<Envelope<T>> {
  const url = new URL(path.replace(/^\//, ''), baseURL.endsWith('/') ? baseURL : baseURL + '/')
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.set(k, String(v))
    }
  }

  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      ...(init?.headers || {}),
    },
    next: init?.next ?? { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`mxHeadless ${res.status}: ${await res.text()}`)
  }

  return res.json() as Promise<Envelope<T>>
}
```

## Страница по URI

`app/[[...slug]]/page.tsx`:

```tsx
import { notFound } from 'next/navigation'
import { mxGet } from '@/lib/mxheadless'

type Props = { params: Promise<{ slug?: string[] }> }

export default async function CmsPage({ params }: Props) {
  const { slug } = await params
  const uri = slug?.length ? `${slug.join('/')}.html` : 'index.html'

  let page
  try {
    page = await mxGet<Record<string, unknown>>(`/pages/${encodeURIComponent(uri)}`, {
      fields: 'id,pagetitle,content,uri',
    })
  } catch {
    notFound()
  }

  return (
    <article>
      <h1>{String(page.data.pagetitle ?? '')}</h1>
      {/* Санитизируйте HTML (DOMPurify) перед выводом */}
      <div>{String(page.data.content ?? '')}</div>
    </article>
  )
}
```

## Route Handler proxy

`app/api/news/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { mxGet } from '@/lib/mxheadless'

export async function GET(req: NextRequest) {
  const parent = req.nextUrl.searchParams.get('parent') ?? '2'
  const body = await mxGet('/resources', {
    'filter[published]': 1,
    'filter[parent]': parent,
    limit: 20,
    fields: 'id,pagetitle,uri',
  })
  return NextResponse.json(body)
}
```

## ISR и webhooks

Webhook mxHeadless можно направить в Route Handler с проверкой `X-MxHeadless-Signature` и вызовом `revalidatePath` / `revalidateTag`. См. [Webhooks](/components/mxheadless/operations/webhooks).

## См. также

- [JavaScript](javascript) · [Nuxt](nuxt) · [SvelteKit](sveltekit)
- [Репозиторий](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/ru/examples/nextjs.md)
