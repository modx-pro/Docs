---
title: "date"
description: "Дата ISO в section.data без времени суток"
---

# Поле date

Слой: **Free**.

<!-- ![date](/components/pagebuilder/screenshots/fields/date.png) -->

## Зачем этот тип

- Календарь PrimeVue, не ручной ввод text
- Отдельно от time и datetime
- Предсказуемый формат для сортировки и Fenom

## Когда использовать

- Дата события, дедлайн акции, день публикации
- Поле «Срок до» в promo-секции
- Фильтр контента по календарной дате

## Советы

- Нужны часы возьмите [time](time) или [datetime](datetime)
- Не смешивайте timezone logic в chunk без явного контракта

## Похожие типы

- [datetime](datetime) для даты и времени
- [time](time) только для часов

## Настройка

```json
{
  "name": "starts_at",
  "type": "date",
  "label": "Дата",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка `YYYY-MM-DD`.

## Вывод в section.data

Ключ `starts_at` в `section.data` (`YYYY-MM-DD`):

```json
{
  "starts_at": "2026-08-24"
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
