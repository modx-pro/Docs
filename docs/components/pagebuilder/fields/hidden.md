---
title: "hidden"
description: "Строка в section.data без видимого поля в инспекторе"
---

# Поле hidden

Слой: **Free**.

<!-- ![hidden](/components/pagebuilder/screenshots/fields/hidden.png) -->

## Зачем этот тип

- Значение сохраняется и попадает в chunk
- Не занимает место в UI редактора
- default задаётся в JSON или CMP

## Когда использовать

- Служебный token, preset key, analytics id
- Константа секции, которую меняет только dev
- Дублирование default для форм на фронте

## Советы

- Редактору нужен просмотр возьмите [readonly](readonly)
- `active: false` скрывает любой тип, hidden семантически для data-only

## Похожие типы

- [readonly](readonly) для видимого но не редактируемого
- [text](text) с active false если нужен toggle в CMP

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

Строка в `section.data`, в форме не показывается визуально.

## Вывод в section.data

Ключ `token` в `section.data`:

```json
{
  "token": "sku-001"
}
```

## Пример в chunk

```html
<input type="hidden" name="token" value="{$token|escape}">
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

- Поле скрыто в UI; `active: false` тоже скрывает любое поле.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
