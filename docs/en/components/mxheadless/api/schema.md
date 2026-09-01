---
title: Schema
description: GET /schema and ObjectRegistry in mxHeadless
---

# Schema

`GET /api/v1/schema` returns objects from `ObjectRegistry` after bootstrap. Clients use it to learn public names, fields, and allowed mutations on **this** install.

No authentication required. The response lists only what code registered. Hidden fields never appear.

```bash
curl -s https://example.com/api/v1/schema
```

## Format

```json
{
  "data": {
    "objects": {
      "resources": {
        "class": "MODX\\Revolution\\modResource",
        "fields": ["id", "pagetitle", "uri"],
        "filterable": ["parent", "published", "deleted"],
        "sortable": ["id", "menuindex", "pagetitle"],
        "searchable": ["pagetitle", "longtitle", "alias", "uri"],
        "required": ["pagetitle"],
        "protected": ["createdby", "editedby"],
        "immutable": ["id", "createdon"],
        "readable": true,
        "creatable": true,
        "updatable": true,
        "deletable": true,
        "relations": []
      }
    }
  },
  "meta": {
    "count": 1
  }
}
```

| Key | Meaning |
| --- | --- |
| `fields` | Fields that may appear in responses when permitted |
| `filterable` | Fields for `filter[field][op]` |
| `sortable` | Fields for `sort` |
| `searchable` | Fields for query parameter `q` |
| `required` | Required on create, cannot be cleared on update |
| `protected` | Needs field-level write permission |
| `immutable` | Explicit write returns `422` |
| `readable` / `creatable` / `updatable` / `deletable` | Flags from `ObjectDefinition` |
| `relations` | Includes for `include=` (`name`, `target`, `type`) |

Extras add entries in `OnMxHeadlessRegister`. Before core bootstrap, `count` may be `0`.

## Schema vs OpenAPI

Schema describes objects and query capabilities from PHP definitions. OpenAPI describes HTTP paths and status codes. See [Swagger and OpenAPI](swagger).

## See also

- [Objects](objects)
- [Querying](querying)
- [Extension API](/components/mxheadless/extensions/overview)
