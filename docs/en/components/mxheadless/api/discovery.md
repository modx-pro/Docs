---
title: Discovery
description: GET /api/v1 and capability snapshot in mxHeadless
---

# Discovery

`GET /api/v1` returns basic API metadata. Use it to check the gateway and version before connecting a frontend or CI.

No authentication required. Works with the kill switch enabled (along with `/health`).

```bash
curl -s https://your-site.example/api/v1 | jq
```

The path prefix comes from `mxheadless_api_prefix` (default `/api`). The `v1` segment is fixed in the router.

## Response

```json
{
  "data": {
    "name": "mxHeadless",
    "version": "1.0.43",
    "api": "/api/v1",
    "cors": {
      "enabled": false,
      "allowed_origins": []
    },
    "links": {
      "health": "/api/v1/health",
      "schema": "/api/v1/schema",
      "docs": "/api/v1/docs",
      "endpoints": "/api/v1/meta/endpoints",
      "openapi": "/api/v1/meta/openapi",
      "openapi_json": "/api/v1/meta/openapi.json",
      "auth_token": "/api/v1/auth/token",
      "resources": "/api/v1/resources",
      "pages": "/api/v1/pages/{uri}",
      "contexts": "/api/v1/contexts",
      "chunks": "/api/v1/chunks",
      "templates": "/api/v1/templates",
      "snippets": "/api/v1/snippets",
      "tvs": "/api/v1/tvs",
      "categories": "/api/v1/categories",
      "content_types": "/api/v1/content_types",
      "objects": "/api/v1/objects/{name}"
    }
  },
  "meta": {}
}
```

| Field | Meaning |
| --- | --- |
| `version` | Installed package version |
| `cors` | CORS toggle and origins snapshot |
| `links` | Public meta and content API URLs |

Discovery does not list every route. Full list: `GET /meta/endpoints`. Parameter shapes: [Swagger and OpenAPI](swagger) or `/schema`.

## When to call

- Uptime checks
- Client build scripts
- First smoke test after install

## See also

- [API overview](overview)
- [Schema](schema)
- [CORS](/components/mxheadless/configuration/cors)
