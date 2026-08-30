---
title: OAuth
description: Token endpoint, grants client_credentials и password в mxHeadless
---

# OAuth

Bearer-токены `mxt_*` с коротким TTL. По умолчанию выключено.

## Включение

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `mxheadless.oauth.enabled` | `false` | `POST /api/v1/auth/token` |
| `mxheadless.oauth.token_ttl` | `3600` | TTL access token (секунды) |
| `mxheadless.oauth.password_grant_enabled` | `false` | Grant `password` |

## Клиент

```bash
php core/components/mxheadless/bin/oauth-client-create.php \
  --client-id=next-preview \
  --name='Next preview' \
  --scopes=resources.read,preview \
  --grants=client_credentials
```

Secret показывают один раз. Таблицы: `mxheadless_oauth_clients`, `mxheadless_oauth_tokens` (hash).

## Выпуск токена

```bash
curl -s -X POST https://example.com/api/v1/auth/token \
  -H 'Content-Type: application/json' \
  -d '{
    "grant_type": "client_credentials",
    "client_id": "next-preview",
    "client_secret": "YOUR_CLIENT_SECRET",
    "scope": "resources.read"
  }'
```

Ответ содержит `access_token` (`mxt_...`), `token_type`, `expires_in`. Дальше:

```bash
curl -s https://example.com/api/v1/resources \
  -H "Authorization: Bearer mxt_..."
```

Поддерживаются `application/json` и `application/x-www-form-urlencoded`. Для client credentials допускается HTTP Basic с `client_id`/`client_secret`.

## Grants

| Grant | Когда |
| --- | --- |
| `client_credentials` | Machine-to-machine (default) |
| `password` | Только если `mxheadless.oauth.password_grant_enabled=true` |

Ошибка OAuth: `400` `invalid_grant`.

## Key или token

| Credential | Когда |
| --- | --- |
| `mxh_*` | CI, долгие workers, без refresh |
| `mxt_*` | TTL, ротация без redeploy секрета в каждом сервисе |

Оба типа проходят один scope checker. CSRF не нужен.
