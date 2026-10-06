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
| `not_found` | 404 | Нет маршрута, объекта или имени в registry |
| `validation_failed` | 422 | Тело, поля, фильтры, сортировка не прошли проверку |
| `internal_error` | 500 | Необработанное исключение |

Перечень совпадает с enum `code` в OpenAPI-схеме пакета: клиент, сгенерированный по спецификации, знает все коды.

Не у каждой ошибки есть `code`: у `400`, `406`, `413`, `414`, `415` поле отсутствует. Для общей обработки используйте `status` + `type`.

## HTTP

| Код | Когда |
| --- | --- |
| 400 | `invalid_grant`: клиент или grant отклонён на `POST /auth/token` |
| 401 / 403 | Auth: нет credentials, неверный токен, нет scope |
| 404 | Маршрут, объект или `{name}` вне registry |
| 406 | `Accept` без `application/json` и без `*/*` |
| 409 | `Idempotency-Key` занят или пришёл с другим телом |
| 413 | `Content-Length` больше `mxheadless_max_body_bytes` (1 MB) |
| 414 | Path длиннее `mxheadless_max_uri_bytes` (2048 байт) |
| 415 | `Content-Type` не `application/json` и не `application/x-www-form-urlencoded` |
| 422 | Валидация, неизвестный filter/field/sort |
| 429 | Rate limit |
| 500 | Сервер |
| 503 | Kill switch |

Кода `405` пакет не отдаёт. Неизвестный путь и неизвестный метод на существующем пути дают `404 not_found`, заголовка `Allow` в ответе нет. Если клиент шлёт `Accept: text/html`, ответ придёт только на `/api/v1/docs`; на остальных путях такой `Accept` даёт `406`.

## Не ошибки

Два кода из этого же списка HTTP-статусов относятся к успеху:

| Код | Когда |
| --- | --- |
| 201 | `POST` на маршрутах `*.create` |
| 304 | `GET` с совпавшим `If-None-Match` |

При `mxheadless_debug=false` в ответе нет SQL, stack trace и путей к файлам.
