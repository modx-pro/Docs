---
title: REST API v1
description: "Read-only REST PageBuilder Pro: Bearer, scopes, GET /pages, ETag и throttle"
---

# REST API v1 (Pro)

Read-only выдача опубликованного контента. Нужны PageBuilder Pro и `pagebuilder_rest_api_enabled = 1`. Не заменяет Free [Public API](public-api). Запись страниц остаётся в менеджере и в [Agent API](agent-api).

```text
/assets/components/pagebuilder/api/v1.php?path=/pages/42
```

## Что выбрать

1. Один фронт и ключ в server env: [Public API](public-api).
2. Несколько приложений, отзыв токенов, scopes и `If-None-Match`: REST v1.
3. Черновик или схемы полей из менеджера: [Agent API](agent-api), не этот транспорт.

| | Public API (Free) | REST API v1 (Pro) |
| --- | --- | --- |
| URL | `api.php` | `api/v1.php?path=…` |
| Авторизация | `X-PageBuilder-Api-Key` или query `api_key` | `Authorization: Bearer` |
| Список страниц | нет | `GET /pages` |
| Одна страница | `action=web/page/get` | `GET /pages/{id-or-alias}` |
| Каталог типов | `action=web/catalog/list` | `GET /catalog/sections` |
| ETag / 304 | нет | да |
| Throttle по токену | нет | да |

После публикации в менеджере растёт `publishedRevision`. PageBuilder не шлёт исходящий webhook. Фронт сам сравнивает revision.

## Настройки

Ключи: [системные настройки](settings#rest-api). Токены выпускают во вкладке CMP **API tokens**.

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `pagebuilder_rest_api_enabled` | `0` | Включить транспорт |
| `pagebuilder_rest_token_pepper` | пусто | Pepper для SHA-256. Пусто = `site_id` |
| `pagebuilder_rest_tokens` | `[]` | JSON токенов без секретов |
| `pagebuilder_rest_throttle_per_minute` | `120` | Лимит запросов на prefix токена. `0` выключает лимит |

## Авторизация

```http
Authorization: Bearer <secret>
```

Секрет показывают один раз при выпуске в CMP. В настройке остаются `prefix` и `hash`.

- Отозванный или просроченный токен отвечает `401`.
- Превышение throttle отвечает `429` и заголовком `Retry-After`.
- Bucket: `{token.prefix}|read` или `|write`. IP в bucket не входит.

Scope `pages.read` открывает `GET /pages` и `GET /pages/{id-or-alias}`. Записи через этот токен нет.

## Маршруты

| Scope | Маршрут |
| --- | --- |
| `catalog.read` | `GET /health`, `GET /catalog/sections` |
| `pages.read` | `GET /pages`, `GET /pages/{id-or-alias}` |

`GET /pages` отдаёт опубликованные страницы с `publishedRevision > 0`. Тела document в списке нет.

| Query | Описание |
| --- | --- |
| `limit` | 1–100, по умолчанию 20 |
| `offset` | Смещение |
| `context` | Контекст, по умолчанию `web` |
| `q` | Поиск по pagetitle, alias или id |

`GET /pages/{id-or-alias}` отдаёт одну страницу по числовому id или alias.

| Query | Описание |
| --- | --- |
| `include` | `document`, `values`, `html`, `sections`: как у `web/page/get` (Public API). По умолчанию `document,values` |
| `context` | Контекст для alias |
| `section_types` | Фильтр типов, например `hero,cta` |

Ответ в оболочке `{ success, message, object }`, как у Public API.

OpenAPI: `GET /openapi.json`. Список путей фильтруется scopes токена. Без Bearer схема отдаёт оба scope для чтения.

## Кеш и ETag

С Bearer ответ идёт с `Cache-Control: private, no-store` и заголовком `ETag`. Совпавший `If-None-Match` даёт `304` и пустой `object`.

Дополнительно: `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, CSP `default-src 'none'; frame-ancestors 'none'`.

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

Переменные `PAGEBUILDER_REST_URL` и `PAGEBUILDER_REST_TOKEN` держите на сервере, не в `NEXT_PUBLIC_*`.

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

Список для sitemap:

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

Токен только в `runtimeConfig`, не в `public`. BFF:

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

## Связанные страницы

- [Public API](public-api)
- [Agent API](agent-api)
- [Системные настройки](settings#rest-api)
- [Панель управления](cmp#api-tokens)
