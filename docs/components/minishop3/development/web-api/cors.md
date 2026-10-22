---
title: CORS и rate limit
description: "ms3_cors_allowed_origins, credentials и rate limit Web API"
---

# CORS и rate limit

Все настройки ниже — из пространства имён `minishop3`: [Системные настройки → API](/components/minishop3/settings#api).

## CORS

| Значение `ms3_cors_allowed_origins` | Поведение |
| --- | --- |
| пусто (так пишет установщик) | Только same-origin: CORS-заголовки не ставятся |
| `*` | `Access-Control-Allow-Origin: *`, credentials выключаются |
| список через запятую | Сервер отражает Origin запроса и добавляет `Vary: Origin` и `Allow-Credentials: true` |

Сам `CorsMiddleware` создаётся в `web.php` с `allow_credentials => true`.

Разрешённые методы: GET, POST, PUT, DELETE, OPTIONS. Разрешённые заголовки: `Content-Type`, `Authorization`, `X-Requested-With`, `MS3TOKEN`. Значение `max_age` — 86400.

В шаблоне вида `https://*.example.com` звёздочка заменяет одну DNS-метку, а не произвольную часть адреса.

На preflight-запрос OPTIONS сервер отвечает 200 и токен не создаёт.

## Rate limit

При превышении квоты сервер отвечает 429:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42
```

```json
{
  "success": false,
  "message": "ms3_err_rate_limit",
  "code": 429,
  "errors": null,
  "error_code": "rate_limited"
}
```

Заголовок `Retry-After` сервер ставит только на 429. Заголовки `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `X-RateLimit-Reset` приходят на запросы, которые ещё укладываются в окно. Счётчик ведётся по IP, запросы OPTIONS в квоту не попадают.

| Настройка | По умолчанию | Что задаёт |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Число запросов в окне |
| `ms3_rate_limit_decay_seconds` | 60 | Длину окна в секундах |

Хранилище счётчиков задаёт `ms3_rate_limit_store` (по умолчанию `file`). Рядом установщик создаёт ключи для redis, memcached и путь к файлу. Формат ответа с ошибкой — [Ошибки](errors).

## Nuxt на другом origin

1. Перечислите в `ms3_cors_allowed_origins` origin фронтенда (или BFF).
2. Отправляйте запросы с `credentials: 'include'` либо используйте Bearer без cookie.
3. Не ставьте `*` вместе с cookie-сессией: с таким значением cookie с другого origin не заработают.
