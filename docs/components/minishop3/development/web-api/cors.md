---
title: CORS и rate limit
description: "ms3_cors_allowed_origins, credentials и rate limit Web API"
---

# CORS и rate limit

Настройки namespace `minishop3`: [Системные настройки → API](/components/minishop3/settings#api).

## CORS

`web.php` создаёт `CorsMiddleware` с `allow_credentials => true`. Origins берутся из `ms3_cors_allowed_origins` (default в transport: пустая строка).

| Значение настройки | Поведение |
| --- | --- |
| пусто | Same-origin only: CORS-заголовки не ставятся |
| `*` | `Access-Control-Allow-Origin: *`. Credentials выключаются (`CorsConfig` форсит `allow_credentials=false`) |
| список через запятую | Echo Origin + `Vary: Origin` + `Allow-Credentials: true` |

При `*` cookie с Nuxt на другом origin не заработает. Нужны явные origins и `credentials: 'include'` на клиенте.

Разрешённые methods: GET, POST, PUT, DELETE, OPTIONS. Headers: `Content-Type`, `Authorization`, `X-Requested-With`, `MS3TOKEN`. `max_age` 86400.

Паттерн вида `https://*.example.com`: одна DNS-метка, не произвольный `.*`.

OPTIONS preflight отвечает 200 без mint токена.

## Rate limit

| Ключ | Default | Смысл |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Запросов |
| `ms3_rate_limit_decay_seconds` | 60 | Окно |

Превышение → HTTP 429, `error_code` `rate_limited`. См. [Ошибки](errors).

## Nuxt на другом origin

1. В `ms3_cors_allowed_origins` перечислите origin фронта (или BFF).
2. Запросы с `credentials: 'include'` или Bearer без cookie.
3. Не используйте `*` вместе с cookie-сессией.
