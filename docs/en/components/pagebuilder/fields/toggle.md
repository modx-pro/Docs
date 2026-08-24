---
title: "toggle"
description: "Boolean via PrimeVue switch in the inspector"
---

# Field toggle

Layer: **Free**.

<!-- ![toggle](/components/pagebuilder/screenshots/fields/toggle.png) -->

## Why this type

- Clear on/off without radio or checkbox
- Same boolean in data as yesno
- Good for frequent mode toggles

## When to use

- Enable overlay, autoplay, section dark mode
- showWhen on a neighbor boolean
- Quick flag without "Yes/No" copy

## Tips

- Classic MODX yes/no use [yesno](yesno)
- Value is still boolean, not a string

## Similar types

- [yesno](yesno) for familiar yes/no
- [checkbox](checkbox) when the option needs an explicit label

## Schema

```json
{
  "name": "enabled",
  "type": "toggle",
  "label": "Включено",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Булево.

## Output in section.data в section.data

Ключ `enabled` в `section.data`:

```json
{
  "enabled": true
}
```

## Chunk example в chunk

```fenom
{if $enabled}<div class="block is-enabled">…</div>{/if}
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
