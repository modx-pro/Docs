---
title: Web API
description: "Обзор Web API MiniShop3: api.php, envelope и middleware"
---

# Web API

Точка входа витрины и headless:

```text
/assets/components/minishop3/api.php?route=/api/v1/{path}
```

Параметр `route` обязателен. Группа `/api/v1` всегда проходит три middleware: CORS → RateLimit → ServiceCheck. `TokenMiddleware` вешается не на всю группу, а на cart, order и часть customer.

Manager API (`connector.php`) на этой странице не описан.

## Envelope

**Успех:**

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

**Ошибка:**

```json
{
  "success": false,
  "message": "…",
  "code": 400,
  "errors": null,
  "error_code": "bad_request"
}
```

Ключ `errors` в теле ошибки есть всегда (часто `null`). `error_code` резолвится на сервере. Подробнее: [Ошибки](errors).

## Middleware

| Порядок | Middleware | Назначение |
| --- | --- | --- |
| 1 | `CorsMiddleware` | Origins из `ms3_cors_allowed_origins` |
| 2 | `RateLimitMiddleware` | `ms3_rate_limit_*` |
| 3 | `ServiceCheckMiddleware` | Сервисы MS3 доступны |
| (по роуту) | `TokenMiddleware` | Resolve / auto-mint токена |

Настройки CORS и rate limit: [CORS](cors), [Системные настройки](/components/minishop3/settings#api).

## Разделы

1. [Авторизация](auth)
2. [Карта эндпоинтов](endpoints)
3. [Каталог](catalog)
4. [Корзина](cart)
5. [Checkout](checkout)
6. [Клиент](customer)
7. [Ошибки](errors)
8. [CORS и rate limit](cors)
9. [Примеры](examples)

Кастомные роуты и детали FastRoute: [API Router](/components/minishop3/development/routing).
