---
title: CORS и rate limit
description: "ms3_cors_allowed_origins, credentials и rate limit Web API"
---

# CORS и rate limit

Настройки namespace `minishop3`: [Системные настройки → API](/components/minishop3/settings#api).

## CORS

| Значение `ms3_cors_allowed_origins` | Поведение |
| --- | --- |
| пусто, так пишет установщик | Только same-origin: CORS-заголовки не ставятся |
| `*` | `Access-Control-Allow-Origin: *`. Credentials выключаются |
| список через запятую | Echo Origin, `Vary: Origin`, `Allow-Credentials: true` |

`web.php` создаёт `CorsMiddleware` с `allow_credentials => true`. Origins берутся из `ms3_cors_allowed_origins`.

При `*` cookie с Nuxt на другом origin не заработает. Нужны явные origins и `credentials: 'include'` на клиенте.

Разрешённые методы: GET, POST, PUT, DELETE, OPTIONS. Заголовки: `Content-Type`, `Authorization`, `X-Requested-With`, `MS3TOKEN`. `max_age` 86400.

Паттерн вида `https://*.example.com`: одна DNS-метка, не произвольный `.*`.

OPTIONS preflight отвечает 200 без создания токена.

## Rate limit

Превышение квоты:

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

`Retry-After` ставится только на 429. `X-RateLimit-Limit`, `X-RateLimit-Remaining` и `X-RateLimit-Reset` ставятся на запросы, которые ещё входят в окно. Бакет считается по IP. OPTIONS в квоту не входит.

| Ключ | По умолчанию | Смысл |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Запросов |
| `ms3_rate_limit_decay_seconds` | 60 | Окно |

Хранилище: `ms3_rate_limit_store` (по умолчанию `file`). Рядом в установщике есть ключи redis, memcached и путь к файлу. См. [Ошибки](errors).

## Nuxt на другом origin

1. В `ms3_cors_allowed_origins` перечислите origin фронта (или BFF).
2. Запросы с `credentials: 'include'` или Bearer без cookie.
3. Не используйте `*` вместе с cookie-сессией.
