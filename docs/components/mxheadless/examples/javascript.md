---
title: Примеры JavaScript
description: fetch-хелпер и запросы к mxHeadless из браузера или Node
---

# Примеры JavaScript

`fetch` для браузера или Node 18+. Подставьте свой URL.

```js
const base = 'https://example.com/api/v1'
```

## Хелпер

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

Успешный ответ: `data` и `meta`, в списках ещё и `links` с `self`, `next`, `prev`. Ошибки приходят как problem+json с полями `status`, `detail`, часто `code`.

## Discovery и список

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

## С API key

Ключ можно передать и в `Authorization: Bearer`, и в `X-API-Key`.

```js
const key = process.env.MXHEADLESS_API_KEY

const chunks = await api('/chunks', {
  headers: { 'X-API-Key': key },
})
```

## Мутация

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

Для другого origin включите [CORS](/components/mxheadless/configuration/cors) и укажите origin фронтенда.

## Фреймворки

- [Nuxt](nuxt)
- [Next.js](nextjs)
- [SvelteKit](sveltekit)
