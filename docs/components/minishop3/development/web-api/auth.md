---
title: Авторизация Web API
description: "Токен MiniShop3: cookie, Bearer, auto-mint, login, me, refresh"
---

# Авторизация

Web API не использует сессию менеджера MODX. Клиент ходит с API-токеном покупателя (гость или авторизованный).

## Порядок resolve

`TokenService::resolveTokenFromRequest()`:

1. `Authorization: Bearer {token}`
2. Заголовок `MS3TOKEN` (legacy)
3. httpOnly cookie `ms3_token`
4. `$_REQUEST['ms3_token']` (после inject cookie middleware)
5. `$_SESSION['ms3']['customer_token']`

Query-параметры `token` и `ms3_token` снимаются и не принимаются как credentials. Не копируйте старые примеры с `?ms3_token=` в URL.

## Cookie vs Bearer

| Режим | Как передавать | Когда |
| --- | --- | --- |
| Same-site витрина | cookie `ms3_token` + `credentials: 'include'` | Браузер на том же сайте |
| Nuxt BFF / mobile | `Authorization: Bearer` | Другой origin или серверный прокси |

Не храните API-токен в `localStorage`: с 1.6 для браузера основной способ это httpOnly cookie. Same-origin JS витрины: [Frontend JavaScript](/components/minishop3/development/frontend-js).

Cookie наследует параметры сессии MODX: `session_cookie_domain`, `session_cookie_path`, `session_cookie_secure`, `session_cookie_samesite`.

## Auto-mint

На роутах с `TokenMiddleware` (корзина, заказ, часть customer) без валидного токена сервер создаёт гостевой токен и ставит cookie. Каталог, health и `GET /customer/token/get` middleware не вешают.

`POST /customer/logout` висит на middleware, но путь в `publicRoutes`: без токена не mint и не 401.

## GET /customer/token/get

Публичный. Возвращает текущий или новый токен.

```json
{
  "success": true,
  "message": "",
  "data": {
    "token": "…",
    "lifetime": 604800000
  }
}
```

`lifetime` это миллисекунды до expiry (из `ms3_customer_token_ttl`, default 7 дней → ~`604800000` для свежего токена). Поле `expires` во внутреннем генераторе есть, в HTTP `data` не отдаётся.

Сервер также выставляет httpOnly cookie.

## Login / register

`POST /customer/login` и `POST /customer/register` без TokenMiddleware. Тело JSON: `email`, `password` (+ поля регистрации).

После успеха сервер ротирует токен (защита от fixation): старый гостевой отзывается, черновик корзины переносится на сессию покупателя, новый токен уходит в cookie.

Для bind корзины при login headless передайте текущий гостевой токен через Bearer или cookie до вызова.

## GET /customer/me

`TokenMiddleware` + auto-mint. Ответ строится из текущего токена: `authenticated`, `customer` (или `null`), сведения о токене (`expires_at`, `customer_id`). Невалидный токен → 401.

## POST /customer/token/refresh

Ротация: нужен валидный токен. Успех отдаёт новый token и метаданные (`expires_at`, `customer_id`).

## CORS и credentials

Для cookie с другого origin укажите явные origins в `ms3_cors_allowed_origins` и `credentials: 'include'`. Значение `*` с credentials несовместимо: см. [CORS](cors).

## См. также

- [Карта эндпоинтов](endpoints)
- [Примеры](examples)
- [Клиент](customer)
