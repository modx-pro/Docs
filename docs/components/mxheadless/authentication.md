---
title: Аутентификация
description: Сессии MODX, API keys mxh_, OAuth mxt_ и CSRF в mxHeadless
---

# Аутентификация

mxHeadless определяет, кто вызывает API. Что можно делать, решает [авторизация](authorization) (scopes и ACL MODX).

## Типы identity

| Тип | Когда | Механизм |
| --- | --- | --- |
| Anonymous | Публичное чтение | Без заголовков |
| Session | UI в mgr или фронт с cookie MODX | Cookie сессии |
| API key | CI, сборки, server-to-server | `Authorization: Bearer mxh_...` или `X-API-Key` |
| OAuth token | Короткоживущий machine access | `Authorization: Bearer mxt_...` |

Порядок authenticator: OAuth token → API key → session → anonymous.

## API keys (`mxh_*`)

Формат: `mxh_{lookupId}_{secret}`. Secret показывают один раз. В БД лежит `password_hash()`.

```bash
curl -s https://example.com/api/v1/resources \
  -H 'Authorization: Bearer mxh_a1b2c3d4_xK9mN2pQ8rT5vW1yZ6'
```

Создание: [API keys](api-keys).

## OAuth tokens (`mxt_*`)

По умолчанию выключено (`mxheadless_oauth_enabled`). Выпуск: `POST /api/v1/auth/token`.

Формат: `mxt_{tokenId}_{secret}`. TTL задаёт `mxheadless_oauth_token_ttl` (3600 с).

Подробнее: [OAuth](oauth).

## Сессия и CSRF

При cookie сессии подставляется текущий пользователь MODX. Для `POST`/`PUT`/`PATCH`/`DELETE` нужен заголовок:

```text
X-CSRF-Token: {токен из сессии MODX}
```

Настройка: `mxheadless_csrf_enabled` (default `true`). Bearer-ключи CSRF не требуют.

## Scopes

Паттерн `{object}.{action}`: `resources.read`, `chunks.read`, `products.read`, `preview`, `*`.

Нет scope → `403` `scope_denied`. Нет credentials на защищённом маршруте → `401` `token_required`.

## Preview

`?preview=true` отдаёт неопубликованное при `view_unpublished` (сессия) или scope `preview` (key/token). Anonymous preview запрещён.

## Цепочка

```text
Запрос → Authentication → Identity
       → Authorization → scope + MODX ACL + контекст + поля
       → Сервис
```
