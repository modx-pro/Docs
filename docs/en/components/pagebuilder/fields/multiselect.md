---
title: "multiselect"
description: "Array of values from static options with PrimeVue MultiSelect"
---

# Field multiselect

Layer: **Pro**.

<!-- ![multiselect](/components/pagebuilder/screenshots/fields/multiselect.png) -->

## Why this type

- Multiple static options with dropdown search
- Pro capability advanced-fields
- Same options array as select

## When to use

- Several theme tags from fixed list
- Feature flags from enum without checkboxgroup
- Multivalue without xPDO

## Tips

- Database list is [multicombo](multicombo) or [tablemulticombo](tablemulticombo)
- Short on-screen list keep [checkboxgroup](checkboxgroup)

## Similar types

- [select](select) for single static value
- [multicombo](multicombo) for optionsSource xPDO

## Schema

```json
{
  "name": "roles",
  "type": "multiselect",
  "label": "Роли",
  "options": [],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Массив значений.

## Output in section.data в section.data

Ключ `roles` в `section.data` — массив значений:

```json
{
  "roles": [
    "admin",
    "editor"
  ]
}
```

## Chunk example в chunk

```fenom
{foreach $roles as $role}
  <span class="role">{$role|escape}</span>
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
