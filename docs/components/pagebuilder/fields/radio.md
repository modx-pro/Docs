---
title: "radio"
description: "Одно значение из options с радиокнопками в инспекторе"
---

# Поле radio

Слой: **Free**.

<!-- ![radio](/components/pagebuilder/screenshots/fields/radio.png) -->

## Зачем этот тип

- Все варианты видны сразу, без раскрытия select
- Тот же массив options, что у select
- Удобен для 2–5 взаимоисключающих значений

## Когда использовать

- Выравнивание left / center / right
- Тип фона image / color / video
- Бинарный или трёхсторонний выбор с подписями

## Советы

- Длинный список лучше свернуть в [select](select)
- Boolean on/off быстрее в [yesno](yesno) или [toggle](toggle)

## Похожие типы

- [select](select) для длинного статического списка
- [checkboxgroup](checkboxgroup) для нескольких флагов

## Настройка

```json
{
  "name": "align",
  "type": "radio",
  "label": "Выравнивание",
  "options": [
    {
      "label": "Слева",
      "value": "left"
    },
    {
      "label": "По центру",
      "value": "center"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка выбранного `value`.

## Вывод в section.data

Ключ `align` в `section.data` — строка `value` выбранной опции:

```json
{
  "align": "lg"
}
```

## Пример в chunk

```html
<div class="align-{$align|escape}">
  …
</div>
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
