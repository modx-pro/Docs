---
title: Ошибки
description: RFC 9457 problem+json и коды ошибок mxHeadless
---

# Ошибки

Неуспешный ответ приходит в формате [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) (`application/problem+json`). Обёртки `{data, meta}` нет.

## Формат

```json
{
  "type": "https://mxheadless.dev/problems/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Authentication required",
  "instance": "/api/v1/resources",
  "code": "token_required"
}
```

| Поле | Роль |
| --- | --- |
| `type` | URI категории |
| `title` | Краткий заголовок |
| `status` | HTTP-код |
| `detail` | Текст, безопасный для production |
| `instance` | Путь запроса |
| `code` | Стабильный код для клиентов |
| `errors` | Опционально: ошибки по полям |

## Коды

| `code` | HTTP | Когда |
| --- | --- | --- |
| `service_disabled` | 503 | `mxheadless_enabled=false` |
| `token_required` | 401 | Нет credentials |
| `invalid_token` | 401 | Неверный / истёкший / отозванный |
| `scope_denied` | 403 | Нет нужного scope |
| `rate_limited` | 429 | Rate limit |
| `idempotency_conflict` | 409 | Конфликт Idempotency-Key |
| `invalid_grant` | 400 | OAuth отклонён |

Не у каждой ошибки есть `code`. Для общей обработки используйте `status` + `type`.

## HTTP

| Код | Когда |
| --- | --- |
| 400 | Неподдерживаемый media type |
| 401 / 403 | Auth |
| 404 | Маршрут или сущность |
| 405 | Метод |
| 422 | Валидация, неизвестный filter/field/sort |
| 429 | Rate limit |
| 500 | Сервер |
| 503 | Kill switch |

При `mxheadless_debug=false` в ответе нет SQL, stack trace и путей к файлам.
