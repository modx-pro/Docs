---
title: "map"
description: "Map point with enrich embed_url and watch_url"
---

# Field map

Layer: **Pro**.

<!-- ![map](/components/pagebuilder/screenshots/fields/map.png) -->

## Why this type

- Coordinates and address for contact_map sections
- enrich builds embed and maps link
- Flat map_* when type=map or name contains map

## When to use

- Office on contact_map landing
- Single delivery or pickup point
- Geo block next to form

## Tips

- Multiple points use repeater with lat lng text or custom
- Output embed from enrich, do not hand-build URL

## Similar types

- [textarea](textarea) for address without coordinates
- [url](url) for manual maps.google link

## Schema

```json
{
  "name": "location",
  "type": "map",
  "label": "Карта",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ lat, lng, zoom, provider }`; enrich: `embed_url` в объекте и плоский `map_embed_url`.

## Output in section.data в section.data

Ключ `location` в `section.data` после save enrich (`MapEmbedResolver`):

```json
{
  "location": {
    "lat": 55.751244,
    "lng": 37.618423,
    "zoom": 14,
    "provider": "yandex",
    "embed_url": "https://yandex.ru/map-widget/v1/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map",
    "watch_url": "https://yandex.ru/maps/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map"
  },
  "map_embed_url": "https://yandex.ru/map-widget/v1/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map",
  "map_provider": "yandex",
  "map_watch_url": "https://yandex.ru/maps/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map"
}
```

- Плоские `map_embed_url`, `map_provider`, `map_watch_url` дублируют embed первого map-поля (приоритет у ключа `location`).
- Провайдер по умолчанию `yandex`; `osm` — OpenStreetMap.

## Chunk example в chunk

```html
<iframe src="{$location.embed_url|default($map_embed_url)|escape}" title="Карта"></iframe>
```

## Common properties

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: enrich добавляет `embed_url`, `watch_url` и плоские `map_*` в `section.data`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
