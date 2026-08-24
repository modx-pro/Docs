---
title: "xtype"
description: "Строка scalar с подсказкой xtype без ExtJS виджета MODX"
---

# Поле xtype

Слой: **Pro**.

<!-- ![xtype](/components/pagebuilder/screenshots/fields/xtype.png) -->

## Зачем этот тип

- Legacy key xtype для миграции схем
- В инспекторе обычный InputText
- Pro когда нужен semantic alias text

## Когда использовать

- Поля из старых MODX form configs
- Placeholder для future widget
- Dev-only semantic type name

## Советы

- Реальный UI не подключает Ext modx-combo
- Новые схемы берите нативный [text](text) или [combo](combo)

## Похожие типы

- [text](text) для новых scalar полей
- [combo](combo) для dynamic select behavior

## Настройка

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

## Значение

Строка.

## Вывод в section.data

Ключ `ext` в `section.data`:

```json
{
  "ext": "sku-001"
}
```

## Пример в chunk

```fenom
{$ext|escape}
```

## Примечание

В инспекторе обычный `InputText`. `xtype` только подсказка, ExtJS-виджет MODX не подключается.

## Общие свойства

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
