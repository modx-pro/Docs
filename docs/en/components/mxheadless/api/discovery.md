---
title: Discovery
description: GET /api/v1 and capability snapshot in mxHeadless
---

# Discovery

`GET /api/v1` returns basic API metadata. Use it to verify the gateway and read the package version before wiring a frontend or CI.

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
    "version": "1.0.42",
    "api": "/api/v1",
    "cors": {
      "enabled": true,
      "allowed_origins": ["http://localhost:3000"]
    },
    "links": {
      "health": "/api/v1/health",
      "schema": "/api/v1/schema",
      "docs": "/api/v1/docs",
      "endpoints": "/api/v1/meta/endpoints",
      "openapi": "/api/v1/meta/openapi",
      "openapi_json": "/api/v1/meta/openapi.json",
      "resources": "/api/v1/resources",
      "pages": "/api/v1/pages/{uri}"
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
