---
title: "dependent"
description: "showWhen block marker with no section.data entry"
---

# Field dependent

Layer: **Pro**.

<!-- ![dependent](/components/pagebuilder/screenshots/fields/dependent.png) -->

## Why this type

- Type hidden in inspector fieldVisibility false
- Documents conditional field group
- Neighbors controlled by showWhen on other fields

## When to use

- JSON note that fields below depend on toggle
- CMP organization for complex branches
- Pairs with yesno toggle and hidden url fields

## Tips

- Condition lives on visible fields via showWhen
- Decorative title without logic is [heading](heading)

## Similar types

- [heading](heading) visible subheading (Free)
- [toggle](toggle) common showWhen trigger (Free)

## Schema

```json
{
  "name": "_dep",
  "type": "dependent",
  "label": "Зависимые поля",
  "tab": "Контент",
  "width": 100
}
```

## Value

Не сохраняется.

## Output in section.data в section.data

В `section.data` не сохраняется.

## Chunk example в chunk

Не используется в chunk.

## Notes

Сам тип в инспекторе не рисуется (`fieldVisibility` возвращает false). Соседние поля управляют видимостью через `showWhen`.

## Common properties

Значение в `section.data` **не сохраняется**.

| Ключ | Роль | CMP |
| --- | --- | --- |
| `tab` | Группа в инспекторе | да |
| `width` | Ширина подписи, 25–100 (%) | да |
| `label` | Текст подзаголовка / маркера | да |

См. [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
