---
title: "jsongrid"
description: "Single object with nested field keys not an array"
---

# Field jsongrid

Layer: **Pro**.

<!-- ![jsongrid](/components/pagebuilder/screenshots/fields/jsongrid.png) -->

## Why this type

- fields schema like repeater but single row object
- Compact than one-row repeater
- Pro for fixed-shape config block

## When to use

- SEO object title description in one field
- Overlay settings bundle
- Single row table without array foreach

## Tips

- Row list is [repeater](repeater)
- Flat keys without wrapper object is [fieldset](fieldset)

## Similar types

- [repeater](repeater) for arrays (Free)
- [fieldset](fieldset) for flat nested keys (Pro)

## Schema

```json
{
  "name": "row",
  "type": "jsongrid",
  "label": "Строка",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "label": "Title"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект с ключами вложенных полей.

## Output in section.data в section.data

Ключ `row` в `section.data` — один объект с ключами вложенных полей:

```json
{
  "row": {
    "title": "SEO title",
    "description": "SEO description"
  }
}
```

## Chunk example в chunk

```fenom
{if $row.title}
  <h4>{$row.title|escape}</h4>
{/if}
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

- Дополнительно: `fields[]` — одна строка = один объект в data (не массив).

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
