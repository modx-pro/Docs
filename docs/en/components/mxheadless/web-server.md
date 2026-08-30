---
title: Web server
description: Apache, Nginx, and api.php fallback for mxHeadless
---

# Web server

Default gateway prefix is `/api` (`mxheadless.api.prefix`). Requests to `/api/v1/*` must reach MODX `index.php`, where the `OnHandleRequest` plugin intercepts the API.

## Apache

Enable `mod_rewrite`. MODX friendly URLs already route unknown paths to `index.php`. You usually do not need a separate rewrite block for `/api`.

## Nginx

```nginx
location / {
    try_files $uri $uri/ /index.php?$args;
}
```

The path `/api/v1/*` must not be served as static files and must not bypass PHP.

## Fallback entry

Without rewrite, use `assets/components/mxheadless/api.php`.

- With PATH_INFO: `.../api.php/v1/health`
- Without PATH_INFO (typical nginx/Herd): `.../api.php?route=/v1/health`

Bare `api.php` serves discovery. See [Installation](installation).

## Proxy and HTTPS

Behind a load balancer, set `mxheadless.trusted_proxies` or rate limit and audit will see the proxy IP. The package does not rewrite URL scheme from `X-Forwarded-Proto`. Configure HTTPS on the web server or reverse proxy.
