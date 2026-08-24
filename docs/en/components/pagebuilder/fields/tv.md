---
title: "tv"
description: "Object id name caption of selected MODX TV"
---

# Field tv

Layer: **Pro**.

<!-- ![tv](/components/pagebuilder/screenshots/fields/tv.png) -->

## Why this type

- Picker for template variable hybrid chunk
- Front output `[[*{$tv.name}]]`
- Pro bridge between PB section and resource TV

## When to use

- Section reads resource TV chosen by editor
- Shared hero image TV across templates
- Dev tooling which TV to expose

## Tips

- TV value is not duplicated in section.data
- Inline upload in section is [image](image) or [file](file)

## Similar types

- [chunk](chunk) pick chunk by name
- [relation](relation) pick resource not TV

## Schema

```json
{
  "name": "tv",
  "type": "tv",
  "label": "TV",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ id, name, caption }`.

## Output in section.data в section.data

Ключ `tv` в `section.data`:

```json
{
  "tv": {
    "id": 7,
    "name": "hero_image",
    "caption": "Hero image"
  }
}
```

## Chunk example в chunk

```html
[[*{$tv.name}]]
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

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
