---
title: "xtype"
description: "Строка scalar с подсказкой xtype без ExtJS виджета MODX"
---

# Поле xtype

Слой: **Free**.

<!-- ![xtype](/components/pagebuilder/screenshots/fields/xtype.png) -->

## Зачем этот тип

Legacy-ключ `xtype` для миграции старых схем. В инспекторе обычный `InputText`: ExtJS-виджет MODX не подключается. Семантический алиас для [text](text), если в JSON остался тип `xtype`.

## Когда использовать

- Поля из старых MODX form configs
- Заготовка под будущий виджет
- Только dev: имя типа в схеме без смены контракта

## Советы

Реальный UI не тянет Ext modx-combo. В новых схемах берите [text](text) или [combo](combo).

## Похожие типы

- [text](text) для новых scalar полей
- [combo](combo) для динамического select из БД

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

## Данные секции {#vyvod-v-section-data}

Ключ `ext` в данных секции:

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
