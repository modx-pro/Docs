---
title: "multiselect"
description: "Массив значений из статического списка options через MultiSelect"
---

# Поле multiselect

Слой: **Pro**.

<!-- ![multiselect](/components/pagebuilder/screenshots/fields/multiselect.png) -->

## Зачем этот тип

- Несколько options с поиском в выпадающем списке
- Pro capability advanced-fields
- Тот же массив options, что у select

## Когда использовать

- Несколько theme tags из фиксированного списка
- Feature flags из enum без checkboxgroup
- Несколько значений без xPDO

## Советы

- Динамический список из БД → [multicombo](multicombo) или [tablemulticombo](tablemulticombo)
- Короткий список на экране оставьте [checkboxgroup](checkboxgroup)

## Похожие типы

- [select](select) для одного статического значения
- [multicombo](multicombo) для optionsSource xPDO

## Настройка

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

## Значение

Массив значений.

## Вывод в section.data

Ключ `roles` в `section.data` — массив значений:

```json
{
  "roles": [
    "admin",
    "editor"
  ]
}
```

## Пример в chunk

```fenom
{foreach $roles as $role}
  <span class="role">{$role|escape}</span>
{/foreach}
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
