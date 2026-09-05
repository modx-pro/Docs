---
title: API keys
description: Создание и использование ключей mxh_ в mxHeadless
---

# API keys

Ключи `mxh_*` для CI, статических сборок и server-to-server интеграций.

## Формат

```text
mxh_{lookupId}_{secret}
```

- `lookupId`: публичный id в таблице `{prefix}mxheadless_api_keys`
- `secret` показывают один раз при создании

Per-key rate limits: колонки `rate_limit_max`, `rate_limit_window`.

## Manager

Нужно право **`mxheadless_apikeys`** (по умолчанию у Administrator). Меню **Компоненты → mxHeadless**: создать ключ, задать name и scopes, отозвать.

## CLI

```bash
php core/components/mxheadless/bin/api-key-create.php \
  --name=ci \
  --scopes=resources.read,chunks.read,preview \
  --rate-limit-max=300 \
  --rate-limit-window=60
```

Скрипт печатает полный ключ один раз. Сохраните его в secret store.

## Запрос

```bash
# Authorization
curl -s https://example.com/api/v1/chunks \
  -H 'Authorization: Bearer mxh_...'

# или X-API-Key
curl -s https://example.com/api/v1/chunks \
  -H 'X-API-Key: mxh_...'
```

CSRF для API key не нужен.

## Scopes

Список через запятую при создании. Примеры: `resources.read`, `resources.create`, `orders.read`, `*`.

Полный перечень: [Авторизация](authorization).

Пустой набор scopes обычно бесполезен для защищённых маршрутов. См. [Авторизация](authorization).

## Ротация

Создайте новый ключ → переключите клиенты → отзовите старый в Manager. Не коммитьте ключи в git.
