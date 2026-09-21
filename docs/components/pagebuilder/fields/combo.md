---
title: "combo"
description: "Одно значение из xPDO optionsSource через Select с поиском"
---

# Поле combo

Версия: **Pro**.

<!-- ![combo](/components/pagebuilder/screenshots/fields/combo.jpg) -->

## Зачем этот тип

Список из базы: ресурсы, шаблоны и другие разрешённые классы. Варианты подгружаются действием `mgr/field/options` и событием `pbOnFieldValues`. Поиск идёт в выпадающем списке, без окна как у [relation](relation).

## Когда использовать

- Выбор шаблона, чанка или TV по классу xPDO
- Сохранение id связанной записи, если в chunk не нужен pagetitle
- Динамический enum из таблицы MODX

## Советы

Нужен ресурс с pagetitle в data: [relation](relation). Несколько значений: [multicombo](multicombo).

## Похожие типы

- [select](select) для статического списка `options`
- [tablecombo](tablecombo) тоже список из класса MODX через `optionsSource`. Сетка в инспекторе у [table](table)

## Настройка

```json
{
  "name": "related",
  "type": "combo",
  "label": "Связанная",
  "optionsSource": {
    "class": "modResource"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Выбранное значение (строка или id).

## Данные секции {#vyvod-v-section-data}

Ключ `related` в данных секции: строка или id из `optionsSource`:

```json
{
  "related": 5
}
```

## Пример в chunk

::: code-group

```modx
[[+related]]
```

```fenom
{$related|pb_text}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
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
- [Pro в менеджере](../integration)
