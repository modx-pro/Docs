---
title: Schema
description: GET /schema и ObjectRegistry mxHeadless
---

# Schema

`GET /api/v1/schema` возвращает объекты из `ObjectRegistry` после bootstrap. По нему клиент узнаёт публичные имена, поля и разрешённые мутации на **этой** установке.

Аутентификация не нужна. В ответе только зарегистрированное в коде. Скрытые поля в registry не попадают.

```bash
curl -s https://example.com/api/v1/schema
```

## Формат

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

| Ключ | Смысл |
| --- | --- |
| `fields` | Поля, которые могут попасть в ответ при наличии прав |
| `filterable` | Поля для `filter[field][op]` |
| `sortable` | Поля для `sort` |
| `searchable` | Поля для параметра `q` |
| `required` | Обязательны при create, нельзя очистить при update |
| `protected` | Нужно field-level право на запись |
| `immutable` | Явная запись даёт `422` |
| `readable` / `creatable` / `updatable` / `deletable` | Флаги из `ObjectDefinition` |
| `relations` | Include для `include=` (`name`, `target`, `type`) |

Extras добавляют записи в `OnMxHeadlessRegister`. До bootstrap core `count` может быть `0`.

## Schema и OpenAPI

Schema описывает объекты и query из PHP-определений. OpenAPI описывает HTTP-пути и коды ответов. См. [Swagger и OpenAPI](swagger).

## См. также

- [Objects](objects)
- [Запросы](querying)
- [Расширение API](/components/mxheadless/extensions/overview)
