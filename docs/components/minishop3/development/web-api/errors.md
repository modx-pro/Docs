---
title: Ошибки Web API
description: "Формат ошибок MiniShop3: code, errors, error_code, HTTP"
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

В ответе роутера ключи `errors` и `error_code` есть всегда (`errors` часто `null`). До роутера при пустом `route` этих ключей нет. Карта полей валидации приходит в `errors` со статусом 422 и кодом `validation_failed`. Пустой `fields` у `order/set` и пустой ключ корзины остаются 400.

## Значения error_code

| `error_code` | Когда |
| --- | --- |
| `validation_failed` | 422, карта полей |
| `unauthorized` | 401, нет покупателя там, где он нужен |
| `token_required` | 401, токен обязателен и гостевой не создан |
| `token_expired` | 401, срок токена вышел |
| `token_invalid` | 401, токен не найден или испорчен |
| `not_found` | 404 |
| `conflict` | 409 |
| `rate_limited` | 429 |
| `business_rule` | Правило магазина, статус берёт вызывающий код |
| `bad_request` | 400 |
| `forbidden` | 403. Контроллеры Web API этот код не возвращают |
| `internal_error` | 500 и 503 |

Других кодов ядро не отдаёт. Дополнение может прислать свой через `Response::errorWithCode()`.

## HTTP

| Статус | Когда |
| --- | --- |
| 400 | Битый запрос без карты полей: пустой `route`, пустой `fields`, пустой ключ позиции |
| 401 | Токен просрочен, испорчен или обязателен там, где сервер не создал гостевой токен: `token_expired`, `token_invalid`, `token_required`, `unauthorized` |
| 404 | Сущность не найдена |
| 409 | Конфликт |
| 422 | Карта полей: адрес, профиль, `validation_failed` |
| 429 | Rate limit |
| 500 | Внутренняя ошибка |
| 503 | Сервис `ms3` не поднят. `error_code` при этом `internal_error` |

На маршрутах Web API контроллеры не возвращают 403. Этот статус есть у middleware прав менеджерского API.

## Закрытое поле черновика

С 1.14.2-beta1 служебные колонки черновика заказа недоступны для записи с фронтенда. Попытка отдаёт лексикон `ms3_err_field_protected`: `POST /order/add` — 400 с `business_rule`, `POST /order/set` — 422 с `validation_failed` и ключом в `errors`. `POST /order/remove` на таком ключе отвечает 404 `ms3_err_field_nf`, а `POST /order/submit` отбрасывает его молча.

Перечень закрытых колонок и способ расширить его — в [оформлении заказа](checkout#protected-fields).

В TypeScript описывайте ответ роутера как union: success | error с обязательным `error_code`. У ответа до роутера `error_code` и `errors` нет.

## Rate limit

`RateLimitMiddleware`: настройки `ms3_rate_limit_max_attempts`, `ms3_rate_limit_decay_seconds`. Превышение даёт 429 и `rate_limited`.

См. [CORS и rate limit](cors).
