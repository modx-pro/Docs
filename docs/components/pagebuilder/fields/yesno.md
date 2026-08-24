---
title: "yesno"
description: "Boolean да/нет в стиле классического MODX TV"
---

# Поле yesno

Слой: **Free**.

<!-- ![yesno](/components/pagebuilder/screenshots/fields/yesno.png) -->

## Зачем этот тип

- Привычный UX редакторам MODX
- Boolean в section.data
- Компактнее radio для простого да/нет

## Когда использовать

- «Опубликовано», «Показать на главной»
- showWhen со значением true или false
- Legacy-схемы, где уже использовался yesno TV

## Советы

- Switch UI возьмите [toggle](toggle)
- Несколько опций из списка не сюда, нужен [select](select)

## Похожие типы

- [toggle](toggle) для переключателя PrimeVue
- [checkbox](checkbox) для одного unnamed флага

## Настройка

```json
{
  "name": "visible",
  "type": "yesno",
  "label": "Показывать",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Булево.

## Вывод в section.data

Ключ `visible` в `section.data`:

```json
{
  "visible": true
}
```

## Пример в chunk

```fenom
{if $visible}<div class="block">…</div>{/if}
```

## Примечание

Алиасы: `boolean`, `listyesno`, `list_yes_no`.

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
