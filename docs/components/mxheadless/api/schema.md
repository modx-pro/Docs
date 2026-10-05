---
title: Schema
description: GET /schema и ObjectRegistry mxHeadless
---

# Schema

`GET /api/v1/schema` возвращает объекты из `ObjectRegistry` после запуска. По нему клиент узнаёт публичные имена, поля и разрешённые мутации на **этой** установке.

Аутентификация не нужна. В ответе только зарегистрированное в коде. Поля из `hiddenFields` остаются в `fields` schema. Из JSON ответа их убирает serializer.

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

Schema описывает объекты и параметры запроса из PHP-определений. OpenAPI описывает HTTP-пути и коды ответов. См. [Swagger и OpenAPI](swagger).

## См. также

- [Objects](objects)
- [Запросы](querying)
- [Расширение API](/components/mxheadless/extensions/overview)
