---
title: Installation
description: Build the mxHeadless transport package, configure the gateway, and verify
---

# Installation

mxHeadless targets MODX Revolution **3.2.3+** and PHP **8.1+**.

## Via Package Manager

### From modstore.pro

If the transport is encrypted, installation fails with `Package provider not found` unless the provider is configured.

1. **System → Package Management → Providers** → add **modstore.pro**:
   - URL: `https://modstore.pro/extras/`
   - Email and API key from your [modstore.pro](https://modstore.pro/) account
2. **Package Management** → find and install **mxHeadless**. In **Show Details**, set provider **modstore.pro**.
3. **Manage → Clear Cache**.

The installer creates namespace `mxheadless`, the `OnHandleRequest` plugin, menu, system settings, tables, and the `mxheadless_apikeys` permission.

### From a local transport.zip

1. Build from source or download a release from [GitHub](https://github.com/Ibochkarev/mxHeadless):

   ```bash
   cd _build
   php build.php
   ```

2. In Manager: **Packages → Install Package**, upload the `.transport.zip`.

3. Finish installation and clear the cache.

## Manual install (development)

Copy or mount `core/components/mxheadless/` into your MODX install:

```bash
cd core/components/mxheadless
composer install --no-dev --optimize-autoloader
```

Verify namespace `mxheadless` under **System → Namespaces**.

## HTTP gateway

### Primary path: `OnHandleRequest` plugin

Default prefix: `/api` (`mxheadless.api.prefix`). Requests to `/api/v1/...` are handled by the package application.

| Setting | Default | Purpose |
| --- | --- | --- |
| `mxheadless.api.prefix` | `/api` | URL prefix before `/v1` |
| `mxheadless.enabled` | `true` | Kill switch |
| `mxheadless.debug` | `false` | Verbose errors (dev only) |

### Fallback entry: `api.php`

Without friendly URLs. With PATH_INFO:

```text
https://your-site.example/assets/components/mxheadless/api.php/v1/health
```

On nginx/Herd (often no PATH_INFO for nested `.php`), use query `route`:

```text
https://your-site.example/assets/components/mxheadless/api.php?route=/v1/health
https://your-site.example/assets/components/mxheadless/api.php?route=/api/v1/resources&limit=5
```

Bare `api.php` serves discovery. Both entry points share the same middleware pipeline.

## What gets created

| Item | Details |
| --- | --- |
| Tables | `mxheadless_api_keys`, `mxheadless_oauth_clients`, `mxheadless_oauth_tokens`, `mxheadless_webhook_subscriptions`, `mxheadless_webhook_deliveries`, `mxheadless_api_log` |
| Permission | `mxheadless_apikeys` (default for Administrator) |
| Menu | **Components → mxHeadless** |
| Event | `OnMxHeadlessRegister` |

## Friendly URLs

Enable friendly URLs. You do not need a separate MODX resource for the API. Behind a load balancer, configure [trusted proxies](configuration/trusted-proxies).

## Verify

```bash
curl -s https://your-site.example/api/v1 | jq
curl -s https://your-site.example/api/v1/health | jq
curl -s 'https://your-site.example/api/v1/resources?limit=5&filter[published]=1' | jq
```

## Next steps

- [Web server](web-server)
- [System settings](settings)
- [Quick start](quick-start)
