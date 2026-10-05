---
title: "checkbox"
description: "Один boolean-флаг: true или false"
---

# Поле checkbox

Версия: **Free**.

<!-- ![checkbox](/components/pagebuilder/screenshots/fields/checkbox.jpg) -->

## Зачем этот тип

Один флажок для одного варианта. В данных `true` или `false`, не строка `1` или `0`.

## Когда использовать

- «Показать кнопку», «Открыть в новой вкладке»
- Флаг включения блока или всплывающего слоя
- Триггер showWhen для зависимых полей

## Советы

Несколько независимых флагов: [checkboxgroup](checkboxgroup).

## Похожие типы

- [toggle](toggle) для переключателя on/off
- [yesno](yesno) для классического да/нет MODX

## Настройка

```json
{
  "name": "featured",
  "type": "checkbox",
  "label": "Избранное",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Булево.

## Данные секции {#vyvod-v-section-data}

Ключ `featured` в данных секции:

```json
{
  "featured": true
}
```

## Пример в chunk

::: code-group

```modx
[[+featured:is=`1`:then=`<span class="badge">Избранное</span>`]]
```

```fenom
{if $featured}<span class="badge">Избранное</span>{/if}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
