---
title: "time"
description: "Время суток в section.data без календарной даты"
---

# Поле time

Слой: **Free**.

<!-- ![time](/components/pagebuilder/screenshots/fields/time.png) -->

## Зачем этот тип

- Time picker, не произвольная строка
- Комбинируется с date в отдельных полях
- Удобно для расписания и часов работы

## Когда использовать

- Время начала вебинара при дате в другом поле
- «Открыто до 18:00» в contact
- Слот доставки без полной datetime

## Советы

- Дата и время в одном значении возьмите [datetime](datetime)
- Таймзона сайта задаётся на уровне MODX, не поля

## Похожие типы

- [datetime](datetime) для полного timestamp
- [date](date) для календарного дня

## Настройка

```json
{
  "name": "starts_at",
  "type": "time",
  "label": "Время",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка `HH:MM`.

## Вывод в section.data

Ключ `starts_at` в `section.data` (`HH:MM`):

```json
{
  "starts_at": "14:30"
}
```

## Пример в chunk

```html
<span class="time">{$starts_at|escape}</span>
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
