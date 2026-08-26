---
title: "currency"
description: "Число суммы с символом валюты из настройки currency"
---

# Поле currency

Версия: **Pro**.

<!-- ![currency](/components/pagebuilder/screenshots/fields/currency.png) -->

## Зачем этот тип

Форматирование суммы в инспекторе, не простой number. Pro responsive как у number и text. Отделяет деньги от счётчиков и процентов.

## Когда использовать

- Цена в custom-секции без MS3
- Старая и новая цена в promo
- Поле суммы пожертвования

## Советы

Ключ `currency` в schema задаёт ISO или symbol config. Процент скидки: [number](number), не currency.

## Похожие типы

- [number](number) для чисел без валюты
- [imask](imask) для форматированной строки без decimal type

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

## Данные секции {#vyvod-v-section-data}

Ключ `price` в данных секции (число или `null`):

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в данных секции: ключи `desktop`, `tablet`, `mobile` вместо скаляра.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
