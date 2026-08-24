---
title: "checkboxgroup"
description: "Array of values from static options for multiple flags"
---

# Field checkboxgroup

Layer: **Free**.

<!-- ![checkboxgroup](/components/pagebuilder/screenshots/fields/checkboxgroup.png) -->

## Why this type

- Multiple picks from one options list
- Data is an array of value strings, not objects
- Alternative to multiselect for short lists without search

## When to use

- Filter tags, icon set, feature flags
- "Which columns to show" from a fixed set
- Multi pick without Pro multiselect

## Tips

- A single flag fits [checkbox](checkbox)
- Long searchable lists need [multiselect](multiselect) (Pro)

## Similar types

- [multiselect](multiselect) for PrimeVue multi with filter (Pro)
- [tag](tag) for free-form strings (Pro)

## Schema

```json
{
  "name": "tags",
  "type": "checkboxgroup",
  "label": "Теги",
  "options": [
    {
      "label": "Новинка",
      "value": "new"
    },
    {
      "label": "Хит",
      "value": "hit"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив строк (`value` отмеченных опций).

## Output in section.data в section.data

Ключ `tags` в `section.data` — массив `value` отмеченных опций:

```json
{
  "tags": [
    "new",
    "hit"
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $tags as $tag}
  <span class="tag">{$tag|escape}</span>
{/foreach}
```

## Notes

Опции из `options` или `optionsSource`, как у select.

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
