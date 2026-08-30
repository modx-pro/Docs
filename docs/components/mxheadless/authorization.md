---
title: Авторизация
description: Полный список scopes, MODX ACL и field policy в mxHeadless
---

# Авторизация

После аутентификации mxHeadless проверяет право на действие в четыре шага:

1. Permission маршрута: публичный или нужен identity
2. Scope ключа или токена: строка вида `{object}.{action}`
3. MODX ACL: контекст, просмотр ресурса, `view_unpublished`
4. Field policy: hidden и protected поля

Нет нужного scope у API key / OAuth → `403` `scope_denied`.

## Как проверяются scopes

| Identity | Проверка |
| --- | --- |
| API key (`mxh_*`) | Список scopes ключа. Есть `*` → все действия |
| OAuth (`mxt_*`) | Scopes токена (пересечение с scopes клиента) |
| Session | `modX->hasPermission()` с той же строкой (`resources.read` и т.д.) |
| Anonymous | Только public GET. Scopes не задают |

Для интеграций обычно хватает API key. Session удобна для mgr / same-origin UI с CSRF.

## Core scopes (фиксированные маршруты)

| Scope | Маршруты |
| --- | --- |
| `resources.read` | `GET /resources`, `GET /resources/{id}`, `GET /pages/{uri}` |
| `resources.create` | `POST /resources` |
| `resources.update` | `PUT` / `PATCH /resources/{id}` |
| `resources.delete` | `DELETE /resources/{id}` |
| `contexts.read` | `GET /contexts`, `GET /contexts/{key}`, `GET /contexts/{key}/settings` |
| `chunks.read` | `GET /chunks`, `GET /chunks/{id}` |
| `templates.read` | `GET /templates`, `GET /templates/{id}` |
| `snippets.read` | `GET /snippets`, `GET /snippets/{id}` |
| `tvs.read` | `GET /tvs`, `GET /tvs/{id}` |
| `categories.read` | `GET /categories`, `GET /categories/{id}` |
| `content_types.read` | `GET /content_types`, `GET /content_types/{id}` |
| `preview` | `?preview=true` без `view_unpublished` у сессии. Также участвует в проверке `include_deleted` |
| `*` | Все scopes (только для ключей и токенов) |

Meta-маршруты (`/`, `/health`, `/schema`, `/docs`, `/meta/*`) и `POST /auth/token` не требуют scope.

## Scopes для `/objects/{name}`

Паттерн из кода: `{name}.{action}`, где `{name}` — имя в registry, не PHP-класс и не префикс `objects.`.

| Scope | Method | Path |
| --- | --- | --- |
| `{name}.read` | GET | `/objects/{name}`, `/objects/{name}/{id}` |
| `{name}.create` | POST | `/objects/{name}` |
| `{name}.update` | PUT, PATCH | `/objects/{name}/{id}` |
| `{name}.delete` | DELETE | `/objects/{name}/{id}` |

Примеры после регистрации MiniShop3-объектов:

| Scope | Смысл |
| --- | --- |
| `products.read` | Каталог товаров |
| `categories.read` | Категории |
| `orders.read` | Заказы (обычно не public, плюс ACL) |
| `orders.update` | Обновление заказа, если object writable |

Список зарегистрированных имён: `GET /schema` или `GET /meta/endpoints` на живом сайте.

## Пример набора для ключа

Публичный фронт (только чтение контента) часто обходится без ключа.

CI / preview:

```text
resources.read,preview,chunks.read,templates.read
```

Каталог MS3 + CMS:

```text
resources.read,products.read,categories.read
```

Admin API (узко, без `*`):

```text
resources.read,resources.create,resources.update,orders.read
```

Создание ключа: [API keys](api-keys). OAuth: [OAuth](oauth).

## Public vs protected

Anonymous может читать discovery, health, schema, docs, meta, `GET /resources` и `GET /pages/{uri}` в рамках ACL опубликованных ресурсов.

Элементы, контексты, write-операции и `/objects/*` требуют credentials.

## Контекст

Заголовок `X-Context` или query `?context=`. Значение должно входить в `mxheadless_allowed_contexts` (default `web,mgr`).

## Поля

Скрытые поля не попадают в JSON. Protected отдаются только при отдельном праве в definition. Запрос `fields=` на неизвестное или запрещённое поле даёт `422`.

## Preview и deleted

| Query | Кто |
| --- | --- |
| `preview=true` | Session с `view_unpublished` или scope `preview` |
| `include_deleted=1` | Не для anonymous. Нужны `preview`, `resources.update`, `resources.delete` или соответствующие права MODX |

## См. также

- [Каталог эндпоинтов](api/overview)
- [Аутентификация](authentication)
