---
title: API keys
description: Create and use mxh_ keys in mxHeadless
---

# API keys

Long-lived credentials for CI, static builds, and integrations. Prefix `mxh_`.

## Format

```text
mxh_{lookupId}_{secret}
```

- `lookupId`: public id in `{prefix}mxheadless_api_keys`
- `secret` is shown once at creation

Per-key rate limits: columns `rate_limit_max`, `rate_limit_window`.

## Manager

Requires permission **`mxheadless_apikeys`** (default for Administrator). Menu **Components → mxHeadless**: create a key, set name and scopes, revoke.

## CLI

```bash
php core/components/mxheadless/bin/api-key-create.php \
  --name=ci \
  --scopes=resources.read,chunks.read,preview \
  --rate-limit-max=300 \
  --rate-limit-window=60
```

The script prints the full key once. Store it in a secret manager.

## Request

```bash
# Authorization
curl -s https://example.com/api/v1/chunks \
  -H 'Authorization: Bearer mxh_...'

# or X-API-Key
curl -s https://example.com/api/v1/chunks \
  -H 'X-API-Key: mxh_...'
```

API keys do not need CSRF.

## Scopes

Comma-separated list at creation. Examples: `resources.read`, `resources.create`, `orders.read`, `*`.

Full list: [Authorization](authorization).

An empty scope set is usually useless for protected routes. See [Authorization](authorization).

## Rotation

Create a new key → switch clients → revoke the old key in Manager. Do not commit keys to git.
