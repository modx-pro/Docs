---
title: "combo"
description: "Одно значение из xPDO optionsSource через Select с поиском"
---

# Поле combo

Слой: **Pro**.

<!-- ![combo](/components/pagebuilder/screenshots/fields/combo.png) -->

## Зачем этот тип

- Список из БД: modResource, modTemplate и другие классы из whitelist
- Загрузка через `mgr/field/options` и событие `pbOnFieldValues`
- Поиск в выпадающем списке без модального окна relation

## Когда использовать

- Выбор шаблона, чанка или TV по классу xPDO
- Сохранение id связанной записи, если в chunk не нужен pagetitle
- Динамический enum из таблицы MODX

## Советы

- Нужен ресурс с pagetitle в data → [relation](relation)
- Несколько значений → [multicombo](multicombo)

## Похожие типы

- [select](select) для статического списка `options`
- [tablecombo](tablecombo) для id строки custom table

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

## Вывод в section.data

Ключ `related` в `section.data` — строка или id из `optionsSource`:

```json
{
  "related": 5
}
```

## Пример в chunk

```fenom
{$related|escape}
```

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
