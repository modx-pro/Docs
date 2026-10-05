---
title: "tag"
description: "Массив строк tags с chip UI в инспекторе"
---

# Поле tag

Версия: **Free**.

<!-- ![tag](/components/pagebuilder/screenshots/fields/tag.jpg) -->

## Зачем этот тип

Редактор вписывает метки сам. Готового списка `options` нет.

## Когда использовать

- Хештеги статьи, бейджи стека технологий
- Фасеты фильтра на landing
- Ключевые слова для SEO-блока в секции

## Советы

Фиксированный список: [multiselect](multiselect) или [checkboxgroup](checkboxgroup).

## Похожие типы

- [multiselect](multiselect) для выбора из options
- [checkboxgroup](checkboxgroup) для статических флагов (Free)

## Настройка

```json
{
  "name": "labels",
  "type": "tag",
  "label": "Метки",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив строк.

## Данные секции {#vyvod-v-section-data}

Ключ `labels` в данных секции:

```json
{
  "labels": [
    "новинка",
    "акция"
  ]
}
```

## Пример в chunk

::: code-group

```modx
<span class="label">[[+labels.0]]</span>
```

```fenom
{foreach $labels as $label}
  <span class="label">{$label|pb_text}</span>
{/foreach}
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
- [Pro в менеджере](../integration)
