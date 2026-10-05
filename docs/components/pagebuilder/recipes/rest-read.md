---
title: Токен REST
description: "Bearer-токен только на чтение: GET /pages и каталог типов. Слой Pro"
---

# Токен REST

Результат: внешний сайт читает опубликованные страницы по Bearer. Запись страниц этим токеном недоступна. Нужен PageBuilder Pro. Free [Public API](../public-api) (`api.php`) остаётся отдельно.

## Что нужно заранее

1. Включена `pagebuilder_rest_api_enabled`.
2. PageBuilder Pro установлен. Токен выпускают во вкладке **API tokens**.

## Шаги

1. В CMP **API tokens** выпустите токен. Секрет показывают один раз. В настройке `pagebuilder_rest_tokens` остаются prefix и hash.
2. Отметьте scopes `pages.read` и, если нужен каталог типов, `catalog.read`.
3. Запрос:

```http
GET /assets/components/pagebuilder/api/v1.php?path=/pages/42
Authorization: Bearer <secret>
```

`pages.read` открывает `GET /pages` и `GET /pages/{id-or-alias}`. `catalog.read` открывает `GET /health` и `GET /catalog/sections`. Список страниц не содержит тело документа. Повтор с `If-None-Match` отвечает `304`.

Отозванный токен отвечает `401`. Лимит `pagebuilder_rest_throttle_per_minute` (по умолчанию 120) при превышении отвечает `429` и `Retry-After`.

## Пример полей

Id `42` в пути это пример. Подставьте id или alias опубликованного ресурса.

Scope только `pages.read`: `GET /pages/42` возвращает документ, `GET /catalog/sections` без `catalog.read` недоступен. Оба scope: каталог типов открывается тем же Bearer.

## Что проверить

Первый запрос с секретом отвечает телом страницы и заголовком `ETag`. Повтор с `If-None-Match` отвечает `304`. После отзыва тот же секрет отвечает `401`. Сверх `pagebuilder_rest_throttle_per_minute` (по умолчанию 120) ответ `429` и `Retry-After`.

## Откат

Отзовите токен во вкладке **API tokens**.

## См. также

- [REST API v1](../rest-api)
- [Public API](../public-api)
