---
title: Nuxt
description: Подключение Nuxt 3/4 к mxHeadless как headless CMS
---

# Nuxt

Nuxt 3/4 к mxHeadless: runtime config, composable, страница по URI и server proxy.

## Runtime config

`nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    mxheadlessApiKey: '',
    public: {
      mxheadlessBaseUrl: 'https://example.com/api/v1',
    },
  },
})
```

`.env`:

```env
NUXT_PUBLIC_MXHEADLESS_BASE_URL=https://example.com/api/v1
NUXT_MXHEADLESS_API_KEY=mxh_...
```

API key только на сервере (SSR, `server/`). Публичное чтение часто работает без ключа.

## Composable

`composables/useModxRest.ts`:

```typescript
type ModxRestEnvelope<T> = {
  data: T
  meta?: Record<string, unknown>
  links?: Record<string, string>
}

export function useModxRest() {
  const config = useRuntimeConfig()
  const baseURL = config.public.mxheadlessBaseUrl as string

  async function get<T>(path: string, query?: Record<string, string | number | boolean>) {
    return $fetch<ModxRestEnvelope<T>>(path, {
      baseURL,
      query,
      headers: import.meta.server && config.mxheadlessApiKey
        ? { Authorization: `Bearer ${config.mxheadlessApiKey}` }
        : undefined,
    })
  }

  return { get, baseURL }
}
```

## Страница по URI

`pages/[...slug].vue`:

```vue
<script setup lang="ts">
const route = useRoute()
const uri = Array.isArray(route.params.slug)
  ? route.params.slug.join('/') + '.html'
  : `${route.params.slug}.html`

const { get } = useModxRest()

const { data, error } = await useAsyncData(
  `page-${uri}`,
  () => get<Record<string, unknown>>(`/pages/${uri}`, {
    fields: 'id,pagetitle,content,uri',
  }),
)

if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: () => String(data.value?.data?.pagetitle ?? ''),
})
</script>

<template>
  <article v-if="data?.data">
    <h1>{{ data.data.pagetitle }}</h1>
    <!-- Санитизируйте HTML (DOMPurify) перед выводом -->
    <div>{{ data.data.content }}</div>
  </article>
</template>
```

Суффикс URI (`.html` или `/`) подстройте под ЧПУ MODX.

## Server proxy

`server/api/news.get.ts` держит ключ вне браузера:

```typescript
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  return $fetch('/resources', {
    baseURL: config.public.mxheadlessBaseUrl,
    query: {
      ...query,
      'filter[published]': 1,
    },
    headers: {
      Authorization: `Bearer ${config.mxheadlessApiKey}`,
    },
  })
})
```

Клиент: `useFetch('/api/news')`.

## MiniShop3

```typescript
const { get } = useModxRest()
const { data: products } = await useAsyncData('products', () =>
  get('/objects/products', {
    'filter[parent]': categoryId,
    limit: 24,
    sort: 'price',
    fields: 'id,pagetitle,price,uri',
  }),
)
```

Нужны scope `products.read` на ключе и [CORS](/components/mxheadless/configuration/cors), если origin другой.

## См. также

- [JavaScript](javascript) · [Next.js](nextjs) · [SvelteKit](sveltekit)
- [Webhooks](/components/mxheadless/operations/webhooks) для revalidation
- Полный гайд в [репозитории](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/ru/examples/nuxt.md)
