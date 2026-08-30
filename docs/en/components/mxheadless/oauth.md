---
title: OAuth
description: Token endpoint and client_credentials and password grants in mxHeadless
---

# OAuth

Short-lived bearer tokens `mxt_*`. Disabled by default.

## Enable

| Key | Default | Purpose |
| --- | --- | --- |
| `mxheadless.oauth.enabled` | `false` | `POST /api/v1/auth/token` |
| `mxheadless.oauth.token_ttl` | `3600` | Access token TTL (seconds) |
| `mxheadless.oauth.password_grant_enabled` | `false` | `password` grant |

## Client

```bash
php core/components/mxheadless/bin/oauth-client-create.php \
  --client-id=next-preview \
  --name='Next preview' \
  --scopes=resources.read,preview \
  --grants=client_credentials
```

The secret is shown once. Tables: `mxheadless_oauth_clients`, `mxheadless_oauth_tokens` (hash).

## Issue a token

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

The response includes `access_token` (`mxt_...`), `token_type`, `expires_in`. Then:

```bash
curl -s https://example.com/api/v1/resources \
  -H "Authorization: Bearer mxt_..."
```

Supports `application/json` and `application/x-www-form-urlencoded`. For client credentials, HTTP Basic with `client_id`/`client_secret` is also allowed.

## Grants

| Grant | When |
| --- | --- |
| `client_credentials` | Machine-to-machine (default) |
| `password` | Only if `mxheadless.oauth.password_grant_enabled=true` |

OAuth error: `400` `invalid_grant`.

## Key or token

| Credential | When |
| --- | --- |
| `mxh_*` | CI, long-running workers, no refresh |
| `mxt_*` | TTL, rotation without redeploying secrets in every service |

Both types pass the same scope checker. CSRF is not required.
