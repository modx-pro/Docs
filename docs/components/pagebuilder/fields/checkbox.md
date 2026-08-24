---
title: "checkbox"
description: "Один boolean-флаг true или false в section.data"
---

# Поле checkbox

Слой: **Free**.

<!-- ![checkbox](/components/pagebuilder/screenshots/fields/checkbox.png) -->

## Зачем этот тип

- Явный чекбокс для одной опции
- Значение boolean, не строка "1"/"0"
- Пара с showWhen для условных полей

## Когда использовать

- «Показать кнопку», «Открыть в новой вкладке»
- Флаг включения блока или overlay
- Триггер showWhen для зависимых полей

## Советы

- Несколько независимых флагов возьмите [checkboxgroup](checkboxgroup)
- Переключатель on/off на виду удобнее [toggle](toggle)

## Похожие типы

- [toggle](toggle) для switch UI
- [yesno](yesno) для классического да/нет MODX

## Настройка

```json
{
  "name": "featured",
  "type": "checkbox",
  "label": "Избранное",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Булево.

## Вывод в section.data

Ключ `featured` в `section.data`:

```json
{
  "featured": true
}
```

## Пример в chunk

```fenom
{if $featured}<span class="badge">Избранное</span>{/if}
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
