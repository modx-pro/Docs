---
title: "imask"
description: "Строка с маской ввода IMask в инспекторе"
---

# Поле imask

Слой: **Pro**.

<!-- ![imask](/components/pagebuilder/screenshots/fields/imask.png) -->

## Зачем этот тип

- Телефон, ИНН, card pattern без post-validation только
- mask или preset в schema
- Pro advanced-fields

## Когда использовать

- Телефон в contact_form fields
- SKU или serial с фиксированным форматом
- Promo code pattern

## Советы

- Чистое число без маски возьмите [number](number)
- Значение строка с literal chars маски по preset

## Похожие типы

- [text](text) без ограничения формата
- [url](url) для ссылок, не phone mask

## Настройка

```json
{
  "name": "phone",
  "type": "imask",
  "label": "Телефон",
  "mask": "+7 (000) 000-00-00",
  "maskOptions": {
    "lazy": false
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка по маске.

## Вывод в section.data

Ключ `phone` в `section.data` — строка по маске:

```json
{
  "phone": "+7 (495) 123-45-67"
}
```

## Пример в chunk

```html
<a href="tel:{$phone|escape}">{$phone|escape}</a>
```

## Примечание

Короткая маска: `mask`. Полный конфиг IMask: `maskOptions` (object или JSON-строка).

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

- Дополнительно: `mask` или `maskOptions` (JSON IMask).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
