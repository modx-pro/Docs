---
title: "readonly"
description: "Строка только для чтения с отображением в инспекторе"
---

# Поле readonly

Слой: **Free**.

<!-- ![readonly](/components/pagebuilder/screenshots/fields/readonly.png) -->

## Зачем этот тип

- Редактор видит значение, но не меняет
- То же scalar в data, что у text
- Подходит для SKU, id, sync из внешней системы

## Когда использовать

- SKU или артикул из MS3 в секции товара
- Preview slug или id после save
- Подсказка «заполняется автоматически»

## Советы

- Полностью скрытое значение возьмите [hidden](hidden)
- Редактируемый текст это [text](text)

## Похожие типы

- [hidden](hidden) без UI
- [text](text) для обычного ввода

## Настройка

```json
{
  "name": "sku",
  "type": "readonly",
  "label": "SKU",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка только для чтения.

## Вывод в section.data

Ключ `sku` в `section.data`:

```json
{
  "sku": "sku-001"
}
```

## Пример в chunk

```html
<span class="sku">{$sku|escape}</span>
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
