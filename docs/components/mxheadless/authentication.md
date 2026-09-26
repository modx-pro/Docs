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
| API key | CI, сборки, вызовы сервер к серверу | `Authorization: Bearer mxh_...` или `X-API-Key` |
| OAuth token | Короткоживущий доступ сервиса | `Authorization: Bearer mxt_...` |

Порядок проверки: OAuth token → API key → session → anonymous.

```mermaid
flowchart TD
  R[Запрос] --> T{mxt_* в Authorization?}
  T -->|да| IO[OAuth identity]
  T -->|нет| K{mxh_* или X-API-Key?}
  K -->|да| IK[Identity ключа]
  K -->|нет| S{Cookie сессии MODX?}
  S -->|да| IS[Identity сессии]
  S -->|нет| AN[Anonymous]
```

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

При cookie сессии подставляется текущий пользователь MODX.

Любой запрос с сессией создаёт `$_SESSION['mxheadless.csrf_token']`, если его ещё нет, и возвращает его в заголовке `X-CSRF-Token`. Для `POST`/`PUT`/`PATCH`/`DELETE` отправьте тот же заголовок. Это не CSRF-токен ядра MODX.

Настройка: `mxheadless_csrf_enabled` (по умолчанию `true`). Bearer-ключи CSRF не требуют. При CORS добавьте `X-CSRF-Token` в `mxheadless_cors_expose_headers`, чтобы JS прочитал заголовок.

## Scopes

Шаблон `{object}.{action}`: `resources.read`, `chunks.read`, `products.read`, `preview`, `*`.

Нет scope → `403` `scope_denied`. Нет учётных данных на защищённом маршруте → `401` `token_required`.

## Preview

`?preview=true` отдаёт неопубликованное при `view_unpublished` (сессия) или scope `preview` (key/token). Anonymous preview запрещён.

## Цепочка

```mermaid
flowchart LR
  Q[Запрос] --> AUTH[Authentication]
  AUTH --> ID[Identity]
  ID --> AUTHZ[Authorization]
  AUTHZ --> SVC[Сервис]
  AUTHZ -.-> SC[scope]
  AUTHZ -.-> ACL[MODX ACL]
  AUTHZ -.-> CTX[контекст]
  AUTHZ -.-> FL[поля]
```
