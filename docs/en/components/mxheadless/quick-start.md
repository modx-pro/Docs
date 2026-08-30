---
title: Quick start
description: Install mxHeadless, configure rewrite, run health checks, and fetch your first resources
---

# Quick start

## 1. Install the package

Via **modstore.pro** (provider `https://modstore.pro/extras/`, email and API key from your account) find and install **mxHeadless**. Or build the transport:

```bash
cd _build
php build.php
```

In Manager: **Packages → Install Package** → upload the `.transport.zip`.

Clear the MODX cache. Details: [Installation](installation).

## 2. Friendly URLs and web server

Enable friendly URLs. Requests to `/api/v1/*` must reach MODX `index.php`. Rules: [Web server](web-server).

Without rewrite:

```bash
curl -s 'https://your-site.example/assets/components/mxheadless/api.php?route=/v1/health'
```

## 3. Verify the gateway

```bash
curl -s https://your-site.example/api/v1 | jq
curl -s https://your-site.example/api/v1/health | jq
```

Discovery returns the package version and a capability snapshot. Health checks the database.

## 4. List resources

```bash
curl -s 'https://your-site.example/api/v1/resources?limit=5&filter[published]=1' | jq
```

Public reads on `resources` and `pages` work without a key. Elements, contexts, and most objects require authentication.

## 5. OpenAPI

Open in a browser:

```text
https://your-site.example/api/v1/docs
```

Raw JSON: `/api/v1/meta/openapi.json`.

## 6. Key for protected routes

In Manager: **Components → mxHeadless** (requires `mxheadless_apikeys`) or CLI:

```bash
php core/components/mxheadless/bin/api-key-create.php --name=ci --scopes=resources.read,chunks.read
```

The secret is shown once. Then:

```bash
curl -s https://your-site.example/api/v1/chunks \
  -H 'Authorization: Bearer mxh_...'
```

## Next steps

- [System settings](settings)
- [Authentication](authentication)
- [Querying](api/querying)
- [cURL examples](examples/curl)
