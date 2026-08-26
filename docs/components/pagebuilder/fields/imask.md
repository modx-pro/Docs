---
title: "imask"
description: "Строка с маской ввода IMask в инспекторе"
---

# Поле imask

Версия: **Pro**.

<!-- ![imask](/components/pagebuilder/screenshots/fields/imask.png) -->

## Зачем этот тип

Телефон, ИНН, шаблон карты: маска на вводе, не только post-validation. `mask` или preset в schema. Pro advanced-fields.

## Когда использовать

- Телефон в полях contact_form
- SKU или serial с фиксированным форматом
- Шаблон промокода

## Советы

Чистое число без маски: [number](number). Значение строка с символами маски по preset.

## Похожие типы

- [text](text) без ограничения формата
- [url](url) для ссылок, не телефонной маски

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

## Данные секции {#vyvod-v-section-data}

Ключ `phone` в данных секции: строка по маске:

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `mask` или `maskOptions` (JSON IMask).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
