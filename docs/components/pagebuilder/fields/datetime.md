---
title: "datetime"
description: "Дата и время в одном значении section.data"
---

# Поле datetime

Слой: **Free**.

<!-- ![datetime](/components/pagebuilder/screenshots/fields/datetime.png) -->

## Зачем этот тип

- Один picker вместо пары date + time
- ISO-подобная строка для событий
- Меньше ошибок синхронизации двух полей

## Когда использовать

- Старт акции с точным часом
- Публикация новости по расписанию
- Countdown или timer на landing

## Советы

- Только день без часов достаточно [date](date)
- Для отображения форматируйте в chunk или сниппете

## Похожие типы

- [date](date) когда время не нужно
- [time](time) когда дата в другом поле

## Настройка

```json
{
  "name": "starts_at",
  "type": "datetime",
  "label": "Дата и время",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка datetime-local.

## Вывод в section.data

Ключ `starts_at` в `section.data` (строка `datetime-local`):

```json
{
  "starts_at": "2026-08-24T14:30"
}
```

## Пример в chunk

```html
<time datetime="{$starts_at|escape}">{$starts_at|escape}</time>
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
