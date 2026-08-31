---
title: mxHeadless
description: REST API gateway для headless-фронтендов на MODX 3. Ресурсы, объекты, OpenAPI, API keys и OAuth
author: Ibochkarev
repository: https://github.com/Ibochkarev/mxHeadless
categories: utilities
items: [
  {
    text: 'Начало работы',
    link: 'index',
    items: [
      { text: 'Обзор', link: 'index' },
      { text: 'Быстрый старт', link: 'quick-start' },
      { text: 'Требования', link: 'requirements' },
      { text: 'Установка', link: 'installation' },
      { text: 'Веб-сервер', link: 'web-server' },
      { text: 'Системные настройки', link: 'settings' },
    ],
  },
  {
    text: 'Аутентификация',
    link: 'authentication',
    items: [
      { text: 'Обзор', link: 'authentication' },
      { text: 'API keys', link: 'api-keys' },
      { text: 'OAuth', link: 'oauth' },
      { text: 'Scopes и ACL', link: 'authorization' },
    ],
  },
  {
    text: 'API',
    link: 'api/overview',
    items: [
      { text: 'Обзор и эндпоинты', link: 'api/overview' },
      { text: 'Discovery', link: 'api/discovery' },
      { text: 'Schema', link: 'api/schema' },
      { text: 'Swagger и OpenAPI', link: 'api/swagger' },
      { text: 'Resources и Pages', link: 'api/resources' },
      { text: 'Elements и Contexts', link: 'api/elements' },
      { text: 'Objects', link: 'api/objects' },
      { text: 'Запросы', link: 'api/querying' },
      { text: 'Preview', link: 'api/preview' },
      { text: 'HTTP-кэш', link: 'api/http-caching' },
      { text: 'Мутации', link: 'api/mutations' },
      { text: 'Ошибки', link: 'api/errors' },
    ],
  },
  {
    text: 'Конфигурация',
    link: 'configuration/cors',
    items: [
      { text: 'CORS', link: 'configuration/cors' },
      { text: 'Лимиты', link: 'configuration/limits' },
      { text: 'Trusted proxies', link: 'configuration/trusted-proxies' },
    ],
  },
  {
    text: 'Эксплуатация',
    link: 'operations/production-checklist',
    items: [
      { text: 'Чеклист production', link: 'operations/production-checklist' },
      { text: 'Webhooks', link: 'operations/webhooks' },
      { text: 'Workers', link: 'operations/workers' },
      { text: 'ISR revalidation', link: 'operations/isr-revalidation' },
      { text: 'Ротация ключей', link: 'operations/key-rotation' },
      { text: 'Audit log', link: 'operations/audit-log' },
      { text: 'Диагностика', link: 'operations/troubleshooting' },
    ],
  },
  {
    text: 'Расширение',
    link: 'extensions/overview',
    items: [
      { text: 'Обзор', link: 'extensions/overview' },
      { text: 'Регистрация объектов', link: 'extensions/objects' },
      { text: 'Custom endpoints', link: 'extensions/endpoints' },
      { text: 'MiniShop3', link: 'extensions/minishop3' },
    ],
  },
  {
    text: 'Примеры',
    link: 'examples/curl',
    items: [
      { text: 'cURL', link: 'examples/curl' },
      { text: 'JavaScript', link: 'examples/javascript' },
      { text: 'TypeScript', link: 'examples/typescript' },
      { text: 'Nuxt', link: 'examples/nuxt' },
      { text: 'Next.js', link: 'examples/nextjs' },
      { text: 'SvelteKit', link: 'examples/sveltekit' },
    ],
  },
]
---

# mxHeadless

REST API gateway для [MODX Revolution 3](https://modx.com/). Отдаёт ресурсы, страницы, элементы, контексты и зарегистрированные xPDO-объекты в JSON. Подходит для Nuxt, Next.js, SvelteKit, мобильных приложений и своих клиентов.

Версия 1.0.42. Лицензия GPL-2.0-or-later. Платных тарифов внутри пакета нет.

Исходники: [Ibochkarev/mxHeadless](https://github.com/Ibochkarev/mxHeadless).

## Возможности

- Префикс `/api/v1` через плагин `OnHandleRequest` (настраивается)
- В API попадают только зарегистрированные объекты и поля
- Middleware PSR-7/15: CORS, rate limit, CSRF, idempotency, HTTP-кэш, audit, webhooks
- Live OpenAPI и Swagger UI на `/api/v1/docs`
- API keys (`mxh_*`), OAuth (`mxt_*`), сессия менеджера
- Extension API (`OnMxHeadlessRegister`) для MiniShop3 и своих extras

## Требования

| | Версия |
| --- | --- |
| MODX Revolution | 3.2.3+ (в transport указано `modx >= 3.0.0`, ориентируйтесь на README) |
| PHP | 8.1+ |
| БД | MySQL / MariaDB (InnoDB), xPDO 3 |

Подробнее: [Требования](requirements).

## Установка

Через [modstore.pro](https://modstore.pro/extras/) в **Управление пакетами** или сборка transport из исходников:

```bash
cd _build
php build.php
```

Дальше: [Установка](installation), [Веб-сервер](web-server), [Быстрый старт](quick-start).

## Базовый URL

```text
https://your-site.example/api/v1
```

```bash
curl -s https://your-site.example/api/v1 | jq
curl -s https://your-site.example/api/v1/health | jq
```

Интерактивная спецификация: `/api/v1/docs`. Подробнее: [Swagger и OpenAPI](api/swagger).

Без rewrite: `assets/components/mxheadless/api.php?route=/v1/health`.

## Формат ответа

Успех:

```json
{
  "data": {},
  "meta": {
    "total": 100,
    "count": 20,
    "limit": 20,
    "offset": 0,
    "has_more": true
  },
  "links": {
    "self": "/api/v1/resources?limit=20&offset=0",
    "next": "/api/v1/resources?limit=20&offset=20"
  }
}
```

Ошибки: RFC 9457 (`application/problem+json`). См. [Ошибки](api/errors).

## Как устроен доступ

Объект появляется в API только после регистрации в `ObjectRegistry` с явными fields, filters и permissions. Имя в URL (`resources`, `products`) всегда мапится на `ObjectDefinition`, не на произвольный PHP-класс. `QueryParser` пропускает только field, filter и sort из definition.

## mxHeadless и mxApi

[mxApi](/components/mxapi/) даёт транспорт и реестр чужих эндпоинтов. mxHeadless сразу отдаёт ресурсы MODX и зарегистрированные объекты с фиксированным envelope и live OpenAPI. Оба пакета можно держать на разных префиксах.

## Быстрые ссылки

| Тема | Ссылка |
| --- | --- |
| Быстрый старт | [quick-start](quick-start) |
| Системные настройки | [settings](settings) |
| Аутентификация | [authentication](authentication) |
| Resources | [api/resources](api/resources) |
| Swagger и OpenAPI | [api/swagger](api/swagger) |
| MiniShop3 | [extensions/minishop3](extensions/minishop3) |
| Webhooks | [operations/webhooks](operations/webhooks) |
