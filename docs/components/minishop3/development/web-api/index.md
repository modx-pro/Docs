---
title: Web API
description: "Обзор Web API MiniShop3: api.php, формат ответа и middleware"
---

# Web API

Фронтенд и headless-клиенты работают через одну точку входа:

```text
/assets/components/minishop3/api.php?route=/api/v1/{path}
```

Параметр `route` обязателен. Запросы группы `/api/v1` проходят три middleware: CORS → RateLimit → ServiceCheck. `TokenMiddleware` добавляется только к cart, order и части customer.

Исключение — preflight `OPTIONS`: маршрут по этому методу не находится, и роутер выполняет **только** слои `CorsMiddleware`. RateLimit, ServiceCheck, `TokenMiddleware` и сам обработчик пропускаются.

Manager API (`connector.php`) на этой странице не описан.

## Формат ответа

Если `route` пустой, сервер отвечает 400 ещё до роутера:

```json
{
  "success": false,
  "message": "Route parameter is required",
  "code": 400
}
```

В ответе роутера есть `success`, `message` и `data`. У ошибки добавляются `code`, `errors` и `error_code`.

**Успех.** Поле `message` чаще всего `null`: контроллеры каталога и кабинета его не передают. Пустая строка приходит там, где вызывающий код передал `''` — например у `GET /customer/token/get`. Корзина и заказ отдают строку лексикона операции: `GET /cart/get` отвечает `Данные корзины получены`.

```json
{
  "success": true,
  "message": null,
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

Ключи `errors` и `error_code` в ответе роутера есть всегда, хотя `errors` часто `null`. У ответа до роутера их нет. Подробнее: [Ошибки](errors).

## Middleware

```mermaid
flowchart TD
  req["api.php?route="] --> method{"Метод OPTIONS?"}
  method -->|да: preflight| corsonly["Только слои CORS"]
  corsonly --> answer["Ответ без обработчика"]
  method -->|нет| cors["CORS"]
  cors --> limit["RateLimit"]
  limit --> service["ServiceCheck"]
  service --> token{"TokenMiddleware?"}
  token -->|нет: каталог, health, login| handler["Обработчик"]
  token -->|да, токена нет| mint["Гостевой токен и cookie"]
  token -->|optional: token/get, logout| skip["Без mint и без 401"]
  mint --> handler
  skip --> handler
```

| Порядок | Middleware | Назначение |
| --- | --- | --- |
| 1 | `CorsMiddleware` | Сверяет Origin со списком `ms3_cors_allowed_origins` |
| 2 | `RateLimitMiddleware` | Считает квоту запросов по `ms3_rate_limit_*` |
| 3 | `ServiceCheckMiddleware` | Проверяет доступность сервисов MS3 |
| (по роуту) | `TokenMiddleware` | Находит токен или выдаёт гостевой (auto-mint) |

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

Свои роуты и детали FastRoute: [API Router](/components/minishop3/development/routing).
