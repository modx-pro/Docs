---
title: "tag"
description: "String tag array with chip UI in inspector"
---

# Field tag

Layer: **Pro**.

<!-- ![tag](/components/pagebuilder/screenshots/fields/tag.png) -->

## Why this type

- Free input without static options
- Pro advanced-fields
- Good for filters and card labels

## When to use

- Article hashtags, tech stack badges
- Filter facets on landing
- SEO keywords in section block

## Tips

- Fixed enum fits [multiselect](multiselect) or [checkboxgroup](checkboxgroup)
- Values are strings, not objects

## Similar types

- [multiselect](multiselect) for options pick
- [checkboxgroup](checkboxgroup) for static flags (Free)

## Schema

```json
{
  "name": "labels",
  "type": "tag",
  "label": "Метки",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив строк.

## Output in section.data в section.data

Ключ `labels` в `section.data` — массив строк:

```json
{
  "labels": [
    "новинка",
    "акция"
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $labels as $label}
  <span class="label">{$label|escape}</span>
{/foreach}
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
