---
title: "xtype"
description: "Scalar string with xtype hint without MODX ExtJS widget"
---

# Field xtype

Layer: **Pro**.

<!-- ![xtype](/components/pagebuilder/screenshots/fields/xtype.png) -->

## Why this type

- Legacy xtype key for schema migration
- Inspector renders plain InputText
- Pro semantic alias over text when needed

## When to use

- Fields from old MODX form configs
- Placeholder for future widget
- Dev-only semantic type name

## Tips

- UI does not mount Ext modx-combo
- New schemas use native [text](text) or [combo](combo)

## Similar types

- [text](text) for new scalar fields
- [combo](combo) for dynamic select behavior

## Schema

```json
{
  "name": "ext",
  "type": "xtype",
  "label": "Ext",
  "xtype": "modx-combo",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка.

## Output in section.data в section.data

Ключ `ext` в `section.data`:

```json
{
  "ext": "sku-001"
}
```

## Chunk example в chunk

```fenom
{$ext|escape}
```

## Notes

В инспекторе обычный `InputText`. `xtype` только подсказка, ExtJS-виджет MODX не подключается.

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
