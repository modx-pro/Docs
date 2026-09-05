---
title: Быстрый старт
description: Установка mxHeadless, rewrite, health и первый запрос к resources
---

# Быстрый старт

## 1. Установить пакет

Через **modstore.pro** (провайдер `https://modstore.pro/extras/`, email и API-ключ из ЛК) найдите и установите **mxHeadless**. Либо соберите transport:

```bash
cd _build
php build.php
```

В Manager: **Пакеты → Установить пакет** → загрузите `.transport.zip`.

Очистите кэш MODX. Подробнее: [Установка](installation).

## 2. ЧПУ и веб-сервер

Включите friendly URLs. Запросы `/api/v1/*` должны попадать в `index.php` MODX. Правила: [Веб-сервер](web-server).

Без rewrite:

```bash
curl -s 'https://your-site.example/assets/components/mxheadless/api.php?route=/v1/health'
```

## 3. Проверить gateway

```bash
curl -s https://your-site.example/api/v1 | jq
curl -s https://your-site.example/api/v1/health | jq
```

Discovery возвращает версию пакета и снимок capabilities. Health проверяет подключение к БД.

## 4. Список ресурсов

```bash
curl -s 'https://your-site.example/api/v1/resources?limit=5&filter[published]=1' | jq
```

Публичное чтение `resources` и `pages` работает без ключа. Элементы, контексты и большинство objects требуют аутентификации.

## 5. Swagger и OpenAPI

Откройте в браузере `/api/v1/docs` или скачайте spec с `/api/v1/meta/openapi.json`. Подробнее: [Swagger и OpenAPI](api/swagger).

## 6. Ключ для защищённых маршрутов

В Manager: **Компоненты → mxHeadless** (нужно право `mxheadless_apikeys`) или CLI:

```bash
php core/components/mxheadless/bin/api-key-create.php --name=ci --scopes=resources.read,chunks.read
```

Secret показывают один раз. Дальше:

```bash
curl -s https://your-site.example/api/v1/chunks \
  -H 'Authorization: Bearer mxh_...'
```

## Дальше

- [Системные настройки](settings)
- [Аутентификация](authentication)
- [Запросы](api/querying)
- [Примеры cURL](examples/curl)
