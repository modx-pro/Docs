---
title: REST API
description: "Web API MiniShop3: точка входа и документация для витрины и Nuxt"
---

# REST API

Web API MiniShop3 (`api.php`) обслуживает витрину и headless-клиенты: корзина, checkout, ЛК, публичный каталог. Manager API (`connector.php`) работает под сессией MODX для Vue-админки и здесь не описан.

```text
/assets/components/minishop3/api.php?route=/api/v1/...
```

Источник роутов: `core/components/minishop3/config/routes/web.php`. Свои роуты: `core/config/ms3_routes_web.custom.php`, фрагменты аддонов: `core/config/ms3.routes.d/web/*.php`.

## Документация

| Раздел | Содержание |
| --- | --- |
| [Обзор](web-api/) | Envelope, middleware, базовый URL |
| [Авторизация](web-api/auth) | Токен, cookie, Bearer, login, `me`, refresh |
| [Карта эндпоинтов](web-api/endpoints) | Полная таблица = `web.php` |
| [Каталог](web-api/catalog) | product, category, filters, ACL |
| [Корзина](web-api/cart) | Mutations и формат `cart/get` |
| [Checkout](web-api/checkout) | delivery/payment list, order, cost, submit |
| [Клиент](web-api/customer) | Профиль, адреса, заказы, email |
| [Ошибки](web-api/errors) | `code`, `errors`, `error_code`, HTTP |
| [CORS и rate limit](web-api/cors) | Origins, credentials, 429 |
| [Примеры](web-api/examples) | curl и TypeScript/`$fetch` |

Маршрутизация и кастомные роуты: [API Router](routing). Same-origin JS витрины: [Frontend JavaScript](frontend-js).
