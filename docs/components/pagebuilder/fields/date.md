---
title: "date"
description: "Дата в формате ISO без времени суток"
---

# Поле date

Версия: **Free**.

<!-- ![date](/components/pagebuilder/screenshots/fields/date.jpg) -->

## Зачем этот тип

Календарь, а не ручной ввод. Это не время и не дата со временем: для них есть [time](time) и [datetime](datetime). Формат стабильный, дату можно сортировать в Fenom.

## Когда использовать

- Дата события, дедлайн акции, день публикации
- Поле «Срок до» в promo-секции
- Фильтр контента по календарной дате

## Советы

Нужны часы: [time](time) или [datetime](datetime). Timezone logic в chunk без явного контракта не смешивайте.

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

## Данные секции {#vyvod-v-section-data}

Ключ `starts_at` в данных секции (`YYYY-MM-DD`):

```json
{
  "starts_at": "2026-08-24"
}
```

## Пример в chunk

::: code-group

```modx
<time datetime="[[+starts_at]]">[[+starts_at]]</time>
```

```fenom
<time datetime="{$starts_at|escape}">{$starts_at|escape}</time>
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
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
