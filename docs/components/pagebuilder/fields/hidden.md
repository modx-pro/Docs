---
title: "hidden"
description: "Скрытая строка: есть в данных секции, нет в инспекторе"
---

# Поле hidden

Версия: **Free**.

<!-- ![hidden](/components/pagebuilder/screenshots/fields/hidden.jpg) -->

## Зачем этот тип

Значение сохраняется и попадает в чанк, но в форме редактора поля не видно. Значение по умолчанию задают в JSON или в панели управления.

## Когда использовать

- Служебный token, preset key, analytics id
- Константа секции, которую меняет только dev
- Дублирование default для форм на фронте

## Советы

Редактору нужен просмотр: [readonly](readonly). `active: false` скрывает любой тип, hidden семантически для data-only.

## Похожие типы

- [readonly](readonly) для видимого но не редактируемого
- [text](text) с active false если нужен toggle в панели управления

## Настройка

```json
{
  "name": "token",
  "type": "hidden",
  "label": "Token",
  "tab": "Контент",
  "width": 100
}
```

## Значение

Строка в данных секции, в форме не показывается визуально.

## Данные секции {#vyvod-v-section-data}

Ключ `token` в данных секции:

```json
{
  "token": "sku-001"
}
```

## Пример в chunk

::: code-group

```modx
<input type="hidden" name="token" value="[[+token]]">
```

```fenom
<input type="hidden" name="token" value="{$token|escape}">
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

- Поле скрыто в UI; `active: false` тоже скрывает любое поле.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
