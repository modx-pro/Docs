---
title: Schema
description: GET /schema and ObjectRegistry in mxHeadless
---

# Schema

`GET /api/v1/schema` returns objects from `ObjectRegistry` after startup. Clients use it to learn public names, fields, and allowed mutations on **this** install.

No authentication required. The response lists only what code registered. `hiddenFields` stay in schema `fields`. The serializer strips them from JSON responses.

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
        "fields": ["id", "pagetitle", "longtitle", "alias", "uri", "content", "published", "parent", "template", "properties"],
        "filterable": ["id", "parent", "published", "deleted", "alias", "hidemenu", "template"],
        "sortable": ["id", "menuindex", "pagetitle", "createdon", "editedon", "publishedon"],
        "searchable": ["pagetitle", "longtitle", "description", "introtext", "alias", "uri"],
        "required": ["pagetitle"],
        "protected": ["createdby", "editedby", "deletedby", "publishedby"],
        "immutable": ["id", "createdon", "createdby", "editedon", "editedby", "deletedon"],
        "readable": true,
        "creatable": true,
        "updatable": true,
        "deletable": true,
        "relations": [
          { "name": "parent", "target": "resources", "type": "to_one" },
          { "name": "children", "target": "resources", "type": "to_many" }
        ]
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

Schema describes objects and query parameters from PHP definitions. OpenAPI describes HTTP paths and status codes. See [Swagger and OpenAPI](swagger).

## See also

- [Objects](objects)
- [Querying](querying)
- [Extension API](/components/mxheadless/extensions/overview)
