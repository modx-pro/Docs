---
title: "chunk"
description: "Object name of selected modChunk for Fenom include"
---

# Field chunk

Layer: **Pro**.

<!-- ![chunk](/components/pagebuilder/screenshots/fields/chunk.png) -->

## Why this type

- Chunk picker by name without typing
- `{include file="file:chunks/{$chunk.name}.tpl"}` pattern
- Pro for dynamic partial sections

## When to use

- Editor picks variant chunk layout
- A/B partial swap in custom section
- Dev-curated allowed chunk list

## Tips

- Snippet call is [snippet](snippet) type
- Static chunk name can be [text](text) if list is closed

## Similar types

- [snippet](snippet) for modSnippet name
- [combo](combo) optionsSource modChunk for id-style pick

## Schema

```json
{
  "name": "chunk",
  "type": "chunk",
  "label": "Chunk",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ name }`.

## Output in section.data в section.data

Ключ `chunk` в `section.data`:

```json
{
  "chunk": {
    "name": "pbHero"
  }
}
```

## Chunk example в chunk

```fenom
{include file="file:chunks/{$chunk.name}.tpl"}
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
