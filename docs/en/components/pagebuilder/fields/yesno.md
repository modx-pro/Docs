---
title: "yesno"
description: "Boolean yes/no in classic MODX TV style"
---

# Field yesno

Layer: **Free**.

<!-- ![yesno](/components/pagebuilder/screenshots/fields/yesno.png) -->

## Why this type

- Familiar UX for MODX editors
- Boolean in section.data
- Compact than radio for simple yes/no

## When to use

- "Published", "Show on homepage"
- showWhen with value true or false
- Legacy schemas that used yesno TVs

## Tips

- Switch UI use [toggle](toggle)
- Multiple labeled options need [select](select), not yesno

## Similar types

- [toggle](toggle) for PrimeVue switch
- [checkbox](checkbox) for a single unnamed flag

## Schema

```json
{
  "name": "visible",
  "type": "yesno",
  "label": "Показывать",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Булево.

## Output in section.data в section.data

Ключ `visible` в `section.data`:

```json
{
  "visible": true
}
```

## Chunk example в chunk

```fenom
{if $visible}<div class="block">…</div>{/if}
```

## Notes

Алиасы: `boolean`, `listyesno`, `list_yes_no`.

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
