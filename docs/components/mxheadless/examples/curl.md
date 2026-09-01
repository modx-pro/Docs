---
title: Примеры cURL
description: Рецепты curl для discovery, resources, keys и мутаций mxHeadless
---

# Примеры cURL

Подставьте свой host вместо `https://example.com`.

## Discovery и health

```bash
curl -s https://example.com/api/v1 | jq
curl -s https://example.com/api/v1/health | jq
curl -s https://example.com/api/v1/schema | jq
```

## Публичные ресурсы

```bash
curl -s 'https://example.com/api/v1/resources?limit=5&filter[published]=1&sort=-id&fields=id,pagetitle,uri' | jq

curl -s https://example.com/api/v1/resources/5 | jq

curl -s 'https://example.com/api/v1/pages/about?fields=id,pagetitle,content' | jq
```

## Фильтры

```bash
curl -s 'https://example.com/api/v1/resources?filter[parent]=2&filter[published]=1' | jq

curl -s 'https://example.com/api/v1/resources?filter[pagetitle][like]=%News%' | jq
```

## API key

```bash
export MXHEADLESS_API_KEY='mxh_...'

curl -s https://example.com/api/v1/chunks \
  -H "Authorization: Bearer $MXHEADLESS_API_KEY" | jq
```

## Создание ресурса

```bash
curl -s -X POST https://example.com/api/v1/resources \
  -H "Authorization: Bearer $MXHEADLESS_API_KEY" \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: create-page-001' \
  -d '{
    "pagetitle": "API created page",
    "parent": 2,
    "template": 1,
    "published": 0
  }' | jq
```

## OAuth token

```bash
TOKEN=$(curl -s -X POST https://example.com/api/v1/auth/token \
  -H 'Content-Type: application/json' \
  -d '{"grant_type":"client_credentials","client_id":"...","client_secret":"...","scope":"resources.read"}' \
  | jq -r .access_token)

curl -s https://example.com/api/v1/resources \
  -H "Authorization: Bearer $TOKEN" | jq
```

## Fallback без rewrite

```bash
curl -s 'https://example.com/assets/components/mxheadless/api.php?route=/v1/health' | jq
```

Фреймворки: [Nuxt / Next / SvelteKit в репозитории](https://github.com/Ibochkarev/mxHeadless/tree/main/docs/examples).
