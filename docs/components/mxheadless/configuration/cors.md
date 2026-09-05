---
title: CORS
description: Настройка cross-origin запросов для mxHeadless
---

# CORS

CORS нужен, когда **браузер** с другого origin ходит в API напрямую (Nuxt SPA, client components в Next). Server-side вызовы (`$fetch` в server routes, RSC, Route Handlers) CORS не требуют.

## Настройки

| Ключ | По умолчанию | Заметки |
| --- | --- | --- |
| `mxheadless_cors_enabled` | `false` | Главный переключатель |
| `mxheadless_cors_allowed_origins` | пусто | Точные origin через запятую или `*` |
| `mxheadless_cors_allowed_methods` | `GET,POST,PUT,PATCH,DELETE,OPTIONS` | |
| `mxheadless_cors_allowed_headers` | `Authorization,Content-Type,X-Request-ID,X-CSRF-Token,X-Context,X-API-Key,Idempotency-Key` | |
| `mxheadless_cors_expose_headers` | `ETag,X-Request-ID,X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Idempotency-Replayed` | Доступны из JS |
| `mxheadless_cors_allow_credentials` | `false` | Не сочетать с `*` в origins |

## Что значит дефолт

`mxheadless_cors_enabled=false` выключает CORS. API не отдаёт заголовки `Access-Control-*`.

Это не «разрешить всем». При выключенном CORS cross-origin запрос из браузера падает на клиенте. Same-origin страницы и server-side вызовы работают как раньше.

Если включить `mxheadless_cors_enabled=true`, срабатывает allowlist. Заголовки появляются только когда `Origin` совпал с `mxheadless_cors_allowed_origins`, либо в списке ровно `*`. Даже при `*` в ответ подставляется origin запроса, а не безусловный wildcard с credentials.

## Локальный Nuxt или Next SPA

Фронт на `localhost:3000`, MODX на другом хосте или порту:

```text
mxheadless_cors_enabled = true
mxheadless_cors_allowed_origins = http://localhost:3000
mxheadless_cors_allow_credentials = false
```

Если в браузере нужны session-cookie MODX, ставьте `mxheadless_cors_allow_credentials = true` и указывайте точный origin (не `*`).

В devtools preflight `OPTIONS` должен вернуть `204` и `Access-Control-Allow-Origin: http://localhost:3000`.

## Production SPA на другом домене

```text
mxheadless_cors_enabled = true
mxheadless_cors_allowed_origins = https://app.example.com
```

Staging добавляйте явно:

```text
mxheadless_cors_allowed_origins = https://app.example.com,https://staging.example.com
```

Discovery (`GET /api/v1`) отдаёт `data.cors.enabled` и `data.cors.allowed_origins`. Сверьте с origin SPA, прежде чем копать ошибки fetch.

## Обойтись без CORS

Если Nuxt или Next ходит в MODX только из server routes (BFF), оставьте `mxheadless_cors_enabled=false`. Браузер до MODX не доходит, CORS не нужен.

## Preflight и проверка curl

Matched Origin на `OPTIONS` → `204` с CORS-заголовками. Даже при выключенном CORS preflight возвращает `204`, но без `Access-Control-*`.

Имитация preflight:

```bash
curl -i -X OPTIONS 'https://modx.example.com/api/v1/health' \
  -H 'Origin: https://app.example.com' \
  -H 'Access-Control-Request-Method: GET'
```

CORS включён и origin в списке: `204` и `Access-Control-Allow-Origin: https://app.example.com`. CORS выключен или origin чужой: этих заголовков не будет.

В `Access-Control-Expose-Headers` есть `ETag` для conditional revalidation из `fetch`.

## MiniShop3

Если на том же сайте крутится MiniShop3 Web API, продублируйте origin SPA в `ms3_cors_allowed_origins`. См. [MiniShop3](/components/mxheadless/extensions/minishop3).
