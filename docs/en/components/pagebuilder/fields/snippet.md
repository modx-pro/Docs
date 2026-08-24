---
title: "snippet"
description: "Object name of selected modSnippet for chunk call"
---

# Field snippet

Layer: **Pro**.

<!-- ![snippet](/components/pagebuilder/screenshots/fields/snippet.png) -->

## Why this type

- Snippet picker for `[[!{$snippet.name}]]`
- Pro dynamic processor hook in section
- Separates snippet call from chunk include

## When to use

- Section delegates render to snippet
- Editor picks from allowed snippets list
- Wrapper around legacy MODX snippet

## Tips

- Partial template include is [chunk](chunk)
- Snippet params are separate fields or static in chunk

## Similar types

- [chunk](chunk) for Fenom include
- [combo](combo) optionsSource modSnippet

## Schema

```json
{
  "name": "snippet",
  "type": "snippet",
  "label": "Snippet",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ name }`.

## Output in section.data в section.data

Ключ `snippet` в `section.data`:

```json
{
  "snippet": {
    "name": "pbHero"
  }
}
```

## Chunk example в chunk

```html
[[!{$snippet.name}]]
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
