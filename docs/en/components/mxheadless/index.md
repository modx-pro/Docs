---
title: mxHeadless
description: REST API gateway for headless frontends on MODX 3. Resources, objects, OpenAPI, API keys, and OAuth
author: Ibochkarev
repository: https://github.com/Ibochkarev/mxHeadless
categories: utilities
items: [
  {
    text: 'Getting started',
    link: 'index',
    items: [
      { text: 'Overview', link: 'index' },
      { text: 'Quick start', link: 'quick-start' },
      { text: 'Requirements', link: 'requirements' },
      { text: 'Installation', link: 'installation' },
      { text: 'Web server', link: 'web-server' },
      { text: 'System settings', link: 'settings' },
    ],
  },
  {
    text: 'Authentication',
    link: 'authentication',
    items: [
      { text: 'Overview', link: 'authentication' },
      { text: 'API keys', link: 'api-keys' },
      { text: 'OAuth', link: 'oauth' },
      { text: 'Scopes and ACL', link: 'authorization' },
    ],
  },
  {
    text: 'API',
    link: 'api/overview',
    items: [
      { text: 'Overview and endpoints', link: 'api/overview' },
      { text: 'Resources and Pages', link: 'api/resources' },
      { text: 'Elements and Contexts', link: 'api/elements' },
      { text: 'Objects', link: 'api/objects' },
      { text: 'Querying', link: 'api/querying' },
      { text: 'Mutations', link: 'api/mutations' },
      { text: 'Errors', link: 'api/errors' },
    ],
  },
  {
    text: 'Configuration',
    link: 'configuration/cors',
    items: [
      { text: 'CORS', link: 'configuration/cors' },
      { text: 'Limits', link: 'configuration/limits' },
      { text: 'Trusted proxies', link: 'configuration/trusted-proxies' },
    ],
  },
  {
    text: 'Operations',
    link: 'operations/production-checklist',
    items: [
      { text: 'Production checklist', link: 'operations/production-checklist' },
      { text: 'Webhooks', link: 'operations/webhooks' },
      { text: 'Audit log', link: 'operations/audit-log' },
      { text: 'Troubleshooting', link: 'operations/troubleshooting' },
    ],
  },
  {
    text: 'Extensions',
    link: 'extensions/overview',
    items: [
      { text: 'Overview', link: 'extensions/overview' },
      { text: 'Registering objects', link: 'extensions/objects' },
      { text: 'MiniShop3', link: 'extensions/minishop3' },
    ],
  },
  {
    text: 'Examples',
    link: 'examples/curl',
    items: [
      { text: 'cURL', link: 'examples/curl' },
      { text: 'JavaScript', link: 'examples/javascript' },
      { text: 'Nuxt', link: 'examples/nuxt' },
      { text: 'Next.js', link: 'examples/nextjs' },
      { text: 'SvelteKit', link: 'examples/sveltekit' },
    ],
  },
]
---

# mxHeadless

REST API gateway for [MODX Revolution 3](https://modx.com/). Exposes resources, pages, elements, contexts, and registered xPDO objects as JSON for Nuxt, Next.js, SvelteKit, mobile apps, and custom clients.

Release **1.0.41**. License GPL-2.0-or-later, no feature tiers.

Source: [Ibochkarev/mxHeadless](https://github.com/Ibochkarev/mxHeadless).

## Features

- `/api/v1` prefix via the `OnHandleRequest` plugin (configurable)
- Only registered objects and fields appear in the API
- PSR-7/15 middleware: CORS, rate limit, CSRF, idempotency, HTTP cache, audit, webhooks
- Live OpenAPI and Swagger UI at `/api/v1/docs`
- API keys (`mxh_*`), OAuth (`mxt_*`), Manager session
- Extension API (`OnMxHeadlessRegister`) for MiniShop3 and custom extras

## Requirements

| | Version |
| --- | --- |
| MODX Revolution | **3.2.3+** (transport declares `modx >= 3.0.0`, follow the package README) |
| PHP | **8.1+** |
| Database | MySQL / MariaDB (InnoDB), xPDO 3 |

Details: [Requirements](requirements).

## Installation

Install via [modstore.pro](https://modstore.pro/extras/) in **Package Management**, or build the transport from source:

```bash
cd _build
php build.php
```

Next: [Installation](installation), [Web server](web-server), [Quick start](quick-start).

## Base URL

```text
https://your-site.example/api/v1
```

```bash
curl -s https://your-site.example/api/v1 | jq
curl -s https://your-site.example/api/v1/health | jq
```

Interactive spec: `/api/v1/docs`. Raw OpenAPI: `/api/v1/meta/openapi.json`.

Fallback without rewrite: `assets/components/mxheadless/api.php?route=/v1/health`.

## Response format

Success:

```json
{
  "data": {},
  "meta": {
    "total": 100,
    "count": 20,
    "limit": 20,
    "offset": 0,
    "has_more": true
  },
  "links": {
    "self": "/api/v1/resources?limit=20&offset=0",
    "next": "/api/v1/resources?limit=20&offset=20"
  }
}
```

Errors: RFC 9457 (`application/problem+json`). See [Errors](api/errors).

## How access works

An object appears in the API only after registration in `ObjectRegistry` with explicit fields, filters, and permissions. The URL name (`resources`, `products`) always maps to an `ObjectDefinition`, not an arbitrary PHP class. `QueryParser` accepts only fields, filters, and sorts from the definition.

## mxHeadless and mxApi

[mxApi](/components/mxapi/) is a transport and registry for third-party endpoints. mxHeadless ships resources and registered objects with a fixed envelope and live OpenAPI. Both packages can run on different prefixes.

## Quick links

| Topic | Link |
| --- | --- |
| Quick start | [quick-start](quick-start) |
| System settings | [settings](settings) |
| Authentication | [authentication](authentication) |
| Resources | [api/resources](api/resources) |
| MiniShop3 | [extensions/minishop3](extensions/minishop3) |
| Webhooks | [operations/webhooks](operations/webhooks) |
