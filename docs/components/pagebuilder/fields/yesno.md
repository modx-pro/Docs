---
title: "yesno"
description: "Boolean да/нет в стиле классического MODX TV"
---

# Поле yesno

Версия: **Free**.

<!-- ![yesno](/components/pagebuilder/screenshots/fields/yesno.png) -->

## Зачем этот тип

Привычный UX редакторам MODX: boolean в данных секции. Компактнее [radio](radio) для простого да/нет.

## Когда использовать

- «Опубликовано», «Показать на главной»
- `showWhen` со значением `true` или `false`
- Legacy-схемы с yesno TV

## Советы

Switch UI: [toggle](toggle). Несколько опций из списка: [select](select), не yesno.

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

## Данные секции {#vyvod-v-section-data}

Ключ `visible` в данных секции:

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
