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
        "fields": ["id", "type", "pagetitle", "longtitle", "description", "alias", "..."],
        "filterable": ["id", "parent", "published", "deleted", "context_key", "template", "alias", "class_key", "hidemenu", "isfolder", "menuindex"],
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
    "count": 8
  }
}
```

В примере сокращён только список `fields`: реальное определение `resources` содержит 39 полей, включая `type`, `link_attributes`, `pub_date`, `unpub_date`, `introtext`, `content`, `richtext`, `menuindex`, `searchable`, `cacheable`, `deleted`, `deletedon`, `deletedby`, `publishedon`, `publishedby`, `menutitle`, `content_dispo`, `class_key`, `context_key`, `content_type`, `uri`, `uri_override`, `hide_children_in_tree`, `show_in_tree`, `properties`. Остальные списки приведены полностью.

`meta.count` — число всех зарегистрированных объектов. Восемь core-объектов (`resources`, `contexts`, `chunks`, `templates`, `snippets`, `tvs`, `categories`, `content_types`) регистрируются до входа в pipeline запроса, поэтому по HTTP `count` не меньше 8 и равен нулю не бывает. Extras добавляют свои объекты через `OnMxHeadlessRegister`.

| Ключ | Смысл |
| --- | --- |
| `fields` | Поля, которые могут попасть в ответ при наличии прав |
| `filterable` | Поля для `filter[field][op]` |
| `sortable` | Поля для `sort` |
| `searchable` | Поля для параметра `q` |
| `required` | Обязательны при create, обязательны в теле на `PUT`, нельзя очистить |
| `protected` | Нужно field-level право на чтение и запись |
| `immutable` | Явная запись даёт `422` |
| `readable` / `creatable` / `updatable` / `deletable` | Флаги из `ObjectDefinition` |
| `relations` | Include для `include=` (`name`, `target`, `type`) |

## Schema и OpenAPI

Schema описывает объекты и параметры запроса из PHP-определений. OpenAPI описывает HTTP-пути и коды ответов. См. [Swagger и OpenAPI](swagger).

## См. также

- [Objects](objects)
- [Запросы](querying)
- [Расширение API](/components/mxheadless/extensions/overview)
