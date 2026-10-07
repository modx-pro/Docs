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
| `code` | HTTP-статус |
| `errors` | Карта полей или `null` (ключ есть всегда) |
| `error_code` | Машинный код |
| `data` | Есть только тогда, когда его передали |

Ключ `errors` есть в теле ошибки всегда (часто с `null`), `error_code` — обычно. Поля валидации приходят либо в `errors`, либо в `data`: зависит от сценария.

## Значения error_code

Полный перечень из `ApiErrorCode` — двенадцать значений: `validation_failed`, `unauthorized`, `token_required`, `token_expired`, `token_invalid`, `not_found`, `conflict`, `rate_limited`, `business_rule`, `bad_request`, `forbidden`, `internal_error`. Других ядро не отдаёт; дополнение может прислать свой код через `Response::errorWithCode()`.

## HTTP

| Статус | Когда |
| --- | --- |
| 400 | Валидация, некорректный запрос |
| 401 | Токена нет, он просрочен или испорчен |
| 404 | Сущность не найдена |
| 409 | Конфликт |
| 429 | Rate limit |
| 500 | Внутренняя ошибка |

Код 403 на фронтенде встречается реже, чем 401 и 400.

В TypeScript описывайте ответ как union: success | error с `error_code` и необязательным `errors`.

## Rate limit

`RateLimitMiddleware`: настройки `ms3_rate_limit_max_attempts`, `ms3_rate_limit_decay_seconds`. Превышение → 429 / `rate_limited`.

См. [CORS и rate limit](cors).
