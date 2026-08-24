---
title: "currency"
description: "Число суммы с символом валюты из настройки currency"
---

# Поле currency

Слой: **Pro**.

<!-- ![currency](/components/pagebuilder/screenshots/fields/currency.png) -->

## Зачем этот тип

- Formatter в инспекторе, не plain number
- Pro responsive как у number и text
- Отделяет деньги от счётчиков и процентов

## Когда использовать

- Цена в custom секции без MS3
- Old price и price в promo
- Donation amount field

## Советы

- Ключ currency в schema задаёт ISO или symbol config
- Процент скидки это [number](number), не currency

## Похожие типы

- [number](number) для non-money numeric
- [imask](imask) для formatted string без decimal type

## Настройка

```json
{
  "name": "price",
  "type": "currency",
  "label": "Цена",
  "currency": "RUB",
  "min": 0,
  "max": 999999,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Число или `null`.

## Вывод в section.data

Ключ `price` в `section.data` (число или `null`):

```json
{
  "price": 1990.5
}
```

## Пример в chunk

```fenom
{if $price !== null}<span class="price">{$price} ₽</span>{/if}
```

## Примечание

Валюта: `currency`. Лимиты как у `number`. Pro: `responsive`.

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

**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
