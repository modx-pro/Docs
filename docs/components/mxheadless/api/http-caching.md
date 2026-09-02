---
title: HTTP-кэш
description: ETag, Cache-Control и conditional GET в mxHeadless
---

# HTTP-кэш

Публичные GET можно кэшировать в браузере или CDN, если `mxheadless_cache_enabled=true`.

## Заголовки

На безопасных маршрутах для anonymous:

```text
Cache-Control: public, max-age=300
ETag: "a1b2c3d4e5f6..."
```

`max-age` из `mxheadless_cache_ttl` (default 300 с).

## Conditional GET

Передайте ETag из прошлого ответа:

```bash
curl -s -D - https://example.com/api/v1/resources/5 \
  -H 'If-None-Match: "a1b2c3d4e5f6..."'
```

Если представление не изменилось, сервер ответит `304 Not Modified` без тела.

В `Access-Control-Expose-Headers` есть `ETag`, чтобы браузерный `fetch` мог revalidate. См. [CORS](/components/mxheadless/configuration/cors).

## Сессия и preview

Ответы с сессией, API key или `?preview=true`:

```text
Cache-Control: private, no-store
```

Не кладите их на общий CDN.

## Инвалидация

Save и delete ресурса сбрасывают теги кэша объекта и списков. Для headless-фронта используйте [webhooks](/components/mxheadless/operations/webhooks) и [ISR revalidation](/components/mxheadless/operations/isr-revalidation).

## См. также

- [Системные настройки](/components/mxheadless/settings)
- [Preview](preview)
