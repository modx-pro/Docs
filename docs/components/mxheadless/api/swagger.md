---
title: Swagger и OpenAPI
description: Swagger UI, живой OpenAPI и каталог эндпоинтов mxHeadless
---

# Swagger и OpenAPI

mxHeadless строит спецификацию из `RouteCollection` и `ObjectRegistry` на **текущей** установке. Extras, зарегистрированные через `OnMxHeadlessRegister`, попадают в meta-маршруты вместе с core.

Публичные meta-маршруты работают без аутентификации.

## Swagger UI

Интерактивная документация на:

```text
GET /api/v1/docs
```

UI грузит Swagger UI с CDN (версия из пакета) и подставляет spec с `/api/v1/meta/openapi.json`. Включён `tryItOutEnabled` и `persistAuthorization`: Bearer или API key, введённые в UI, сохраняются между перезагрузками страницы.

Выключатель: `mxheadless_swagger_enabled` (default `true`). При `false` `/docs` отдаёт `404`. Сырой OpenAPI JSON остаётся доступен.

На production часто отключают UI в публичном интернете, если docs снаружи не нужны. См. [чеклист production](/components/mxheadless/operations/production-checklist).

## Живой OpenAPI

В envelope (как остальные JSON-ответы API):

```bash
curl -s https://example.com/api/v1/meta/openapi | jq '.data.openapi'
```

Поле `data` — документ OpenAPI 3.0.3: пути, параметры, security schemes, теги.

Сырой JSON без envelope для Swagger UI и генераторов клиентов:

```bash
curl -s https://example.com/api/v1/meta/openapi.json | jq '.openapi'
```

Content-Type: `application/openapi+json`.

## Каталог эндпоинтов

Список маршрутов с метаданными (core + extras через `registerEndpoint`):

```bash
curl -s https://example.com/api/v1/meta/endpoints | jq
```

Discovery (`GET /api/v1`) ссылается на meta-URL в `links`. Полный список core-маршрутов: [Обзор API](overview).

## Schema vs OpenAPI

| Источник | Путь | Что описывает |
| --- | --- | --- |
| Schema | `GET /schema` | Объекты из registry: fields, filterable, sortable, relations, флаги CRUD |
| OpenAPI | `GET /meta/openapi`, `/meta/openapi.json` | HTTP: методы, path/query params, коды ответов, security |

Schema удобен для построения query-клиента. OpenAPI — для HTTP-контракта и codegen. При регистрации нового object через Extension API обновляется runtime schema и OpenAPI на сайте.

## Генерация TypeScript-клиента

Укажите генератору `/api/v1/meta/openapi.json`, не enveloped `/meta/openapi`, если инструмент ждёт корневое поле `openapi`.

Пример с [openapi-typescript](https://github.com/drwpow/openapi-typescript):

```bash
npx openapi-typescript https://your-site.example/api/v1/meta/openapi.json -o mxheadless.d.ts
```

На CI можно сверять статический `openapi.yaml` из [репозитория mxHeadless](https://github.com/Ibochkarev/mxHeadless/blob/main/docs/openapi.yaml) с live spec на staging.

## См. также

- [Обзор API](overview)
- [Запросы](querying)
- [Системные настройки](/components/mxheadless/settings)
- [Регистрация эндпоинтов](/components/mxheadless/extensions/objects)
