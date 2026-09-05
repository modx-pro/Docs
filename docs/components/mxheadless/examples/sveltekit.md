---
title: SvelteKit
description: SvelteKit server load и proxy к mxHeadless
---

# SvelteKit

Серверный `fetch` в `+page.server.ts` и API proxy.

## Env

`.env`:

```env
PUBLIC_MXHEADLESS_BASE_URL=https://example.com/api/v1
MXHEADLESS_API_KEY=mxh_...
```

## Server helper

`src/lib/server/mxheadless.ts` (только из `+page.server.ts` / `+server.ts`):

```ts
import { env } from '$env/dynamic/private'
import { env as publicEnv } from '$env/dynamic/public'

type Envelope<T> = {
  data: T
  meta?: Record<string, unknown>
  links?: Record<string, string>
}

const baseURL = publicEnv.PUBLIC_MXHEADLESS_BASE_URL ?? env.MXHEADLESS_BASE_URL
const apiKey = env.MXHEADLESS_API_KEY

export async function mxGet<T>(
  fetchFn: typeof fetch,
  path: string,
  query?: Record<string, string | number | boolean>,
): Promise<Envelope<T>> {
  const url = new URL(path.replace(/^\//, ''), baseURL.endsWith('/') ? baseURL : baseURL + '/')
  if (query) {
    for (const [k, v] of Object.entries(query)) {
      url.searchParams.set(k, String(v))
    }
  }

  const res = await fetchFn(url, {
    headers: {
      Accept: 'application/json',
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error(`mxHeadless ${res.status}`)
  }

  return res.json()
}
```

Передавайте `event.fetch`, чтобы SvelteKit учитывал запрос при SSR.

## Страница по URI

`src/routes/[...slug]/+page.server.ts`:

```ts
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { mxGet } from '$lib/server/mxheadless'

export const load: PageServerLoad = async ({ params, fetch }) => {
  const uri = `${params.slug}.html`

  try {
    const page = await mxGet<Record<string, unknown>>(fetch, `/pages/${encodeURIComponent(uri)}`, {
      fields: 'id,pagetitle,content,uri',
    })
    return { page: page.data }
  } catch {
    error(404, 'Page not found')
  }
}
```

`+page.svelte`:

```svelte
<script lang="ts">
  let { data } = $props()
</script>

<article>
  <h1>{data.page.pagetitle}</h1>
  <!-- Санитизируйте HTML перед {@html} -->
  <div>{data.page.content}</div>
</article>
```

## API proxy

`src/routes/api/news/+server.ts`:

```ts
import { json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { mxGet } from '$lib/server/mxheadless'

export const GET: RequestHandler = async ({ fetch, url }) => {
  const parent = url.searchParams.get('parent') ?? '2'
  const body = await mxGet(fetch, '/resources', {
    'filter[published]': 1,
    'filter[parent]': parent,
    limit: 20,
    fields: 'id,pagetitle,uri',
  })
  return json(body)
}
```

## См. также

- [JavaScript](javascript) · [Nuxt](nuxt) · [Next.js](nextjs)
- [Репозиторий](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/ru/examples/sveltekit.md)
