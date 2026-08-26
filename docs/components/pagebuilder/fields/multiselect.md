---
title: "multiselect"
description: "Массив значений из статического списка options через MultiSelect"
---

# Поле multiselect

Версия: **Free**.

<!-- ![multiselect](/components/pagebuilder/screenshots/fields/multiselect.png) -->

## Зачем этот тип

Несколько значений из статического `options` с поиском в выпадающем списке. Тот же контракт options, что у [select](select).

## Когда использовать

- Несколько theme-тегов из фиксированного списка
- Флаги из enum без [checkboxgroup](checkboxgroup)
- Несколько значений без xPDO

## Советы

Динамический список из БД: [multicombo](multicombo) или [tablemulticombo](tablemulticombo). Короткий список на экране: [checkboxgroup](checkboxgroup).

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

## Данные секции {#vyvod-v-section-data}

Ключ `roles` в данных секции: массив значений:

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
