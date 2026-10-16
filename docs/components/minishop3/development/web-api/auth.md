---
title: Авторизация Web API
description: "Токен MiniShop3: cookie, Bearer, auto-mint, login, me, refresh"
---

# Авторизация

Web API не использует сессию админки MODX. Клиент передаёт API-токен покупателя — гостевой или авторизованный.

## Где сервер ищет токен

Порядок источников в `TokenService::resolveTokenFromRequest()`:

1. `Authorization: Bearer {token}`
2. Заголовок `MS3TOKEN` (устаревший)
3. httpOnly cookie `ms3_token`
4. `$_REQUEST['ms3_token']` (после middleware, которое подставляет cookie в запрос)
5. `$_SESSION['ms3']['customer_token']`

Query-параметры `token` и `ms3_token` сервер отбрасывает: как credentials они больше не принимаются. Не копируйте старые примеры с `?ms3_token=` в URL.

## Cookie vs Bearer

| Режим | Как передавать | Когда |
| --- | --- | --- |
| Same-site фронтенд | cookie `ms3_token` + `credentials: 'include'` | Браузер на том же сайте |
| Nuxt BFF / mobile | `Authorization: Bearer` | Другой origin или серверный прокси |

Не храните API-токен в `localStorage`: с 1.6 основной способ для браузера — httpOnly cookie. Фронтенд на том же origin: [Frontend JavaScript](/components/minishop3/development/frontend-js).

Cookie наследует параметры сессии MODX: `session_cookie_domain`, `session_cookie_path`, `session_cookie_secure`, `session_cookie_samesite`.

## Auto-mint

На роутах с `TokenMiddleware` (корзина, заказ, часть customer) без валидного токена сервер создаёт гостевой токен и ставит cookie. У каталога и `/health` этого middleware нет.

У `GET /customer/token/get` и `POST /customer/logout` middleware работает в режиме optional: их пути указаны в `publicRoutes`. Без токена сервер не создаёт гостевой токен и не отвечает 401.

## GET /customer/token/get

Публичный. Возвращает текущий или новый токен и ставит httpOnly cookie.

```json
{
  "success": true,
  "message": "",
  "data": {
    "token": "…",
    "lifetime": 86400000
  }
}
```

`lifetime` — миллисекунды до истечения срока: секунды из `ms3_customer_token_ttl`, умноженные на 1000. Поле `expires` есть во внутреннем генераторе, но в `data` не отдаётся.

Значение по умолчанию у `ms3_customer_token_ttl` — **86400** секунд (24 часа). Его создаёт транспортный пакет, и это же значение подставляет код, если настройки в базе нет.

::: warning Сайты, обновлённые с версий до 1.14.2-beta1
На сайтах, где настройки в базе нет, код до 1.14.2-beta1 подставлял **604800** (7 дней). После обновления покупатели начнут входить заново через сутки, а не через неделю. Если нужен недельный срок — задайте `ms3_customer_token_ttl` явно.
:::

## Login / register

`POST /customer/login` и `POST /customer/register` работают без TokenMiddleware. Тело JSON: `email`, `password` (+ поля регистрации).

После успеха сервер ротирует токен (защита от фиксации сессии): старый гостевой отзывается, черновик корзины переносится на сессию покупателя, новый токен уходит в cookie.

Чтобы при headless-входе корзина привязалась к покупателю, передайте текущий гостевой токен — через Bearer или cookie — до вызова.

## GET /customer/me

`TokenMiddleware` + auto-mint. Ответ строится из текущего токена: `authenticated`, `customer` (или `null`), сведения о токене (`expires_at`, `customer_id`). Невалидный токен → 401.

## POST /customer/token/refresh

Ротация: нужен валидный токен. При успехе возвращает новый токен и метаданные (`expires_at`, `customer_id`).

## CORS и credentials

Для cookie с другого origin перечислите origins в `ms3_cors_allowed_origins` и отправляйте запросы с `credentials: 'include'`. Значение `*` с credentials несовместимо: см. [CORS](cors).

## См. также

- [Карта эндпоинтов](endpoints)
- [Примеры](examples)
- [Клиент](customer)
