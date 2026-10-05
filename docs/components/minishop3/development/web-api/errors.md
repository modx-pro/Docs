---
title: Ошибки Web API
description: "Envelope ошибок MiniShop3: code, errors, error_code, HTTP"
---

# Ошибки

## Форма

```json
{
  "success": false,
  "message": "…",
  "code": 400,
  "errors": null,
  "error_code": "bad_request"
}
```

| Поле | Смысл |
| --- | --- |
| `code` | HTTP status |
| `errors` | Field-map или `null` (ключ есть всегда) |
| `error_code` | Машинный код |
| `data` | Опционально, если передан |

В теле ошибки всегда есть ключ `errors` (часто `null`) и обычно `error_code`. Часть сценариев кладёт поля валидации в `errors` или в `data`.

## Типичные error_code

Примеры из `Response` / `ApiErrorCode`: `validation_failed`, `unauthorized`, `token_required`, `token_expired`, `token_invalid`, `not_found`, `conflict`, `rate_limited`, `business_rule`, `bad_request`, `forbidden`, `internal_error`.

## HTTP

| Status | Когда |
| --- | --- |
| 400 | Валидация / bad request |
| 401 | Нет / просрочен / битый токен |
| 404 | Сущность не найдена |
| 409 | Конфликт |
| 429 | Rate limit |
| 500 | Внутренняя ошибка |

Код 403 на витрине встречается реже, чем 401/400. Клиент TypeScript: union success | error с `error_code` и опциональным `errors`.

## Rate limit

`RateLimitMiddleware`: настройки `ms3_rate_limit_max_attempts`, `ms3_rate_limit_decay_seconds`. Превышение → 429 / `rate_limited`.

См. [CORS и rate limit](cors).
