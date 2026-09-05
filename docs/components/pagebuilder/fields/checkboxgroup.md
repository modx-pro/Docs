---
title: "checkboxgroup"
description: "Массив значений из статического списка options для нескольких флагов"
---

# Поле checkboxgroup

Версия: **Free**.

<!-- ![checkboxgroup](/components/pagebuilder/screenshots/fields/checkboxgroup.png) -->

## Зачем этот тип

Несколько флагов из одного списка `options`. В данных секции попадает массив строк `value`, не объектов. Для коротких списков без поиска удобнее, чем multiselect.

## Когда использовать

- Теги фильтра, набор иконок, флаги возможностей
- «Какие колонки показать» из фиксированного набора
- Несколько значений, когда multiselect избыточен

## Советы

Один флаг: [checkbox](checkbox). Длинный список с поиском: [multiselect](multiselect).

## Похожие типы

- [multiselect](multiselect) для MultiSelect с поиском
- [tag](tag) для свободного ввода строк (Pro)

## Настройка

```json
{
  "name": "tags",
  "type": "checkboxgroup",
  "label": "Теги",
  "options": [
    {
      "label": "Новинка",
      "value": "new"
    },
    {
      "label": "Хит",
      "value": "hit"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив строк (`value` отмеченных опций).

## Данные секции {#vyvod-v-section-data}

Ключ `tags` в данных секции: массив `value` отмеченных опций:

```json
{
  "tags": [
    "new",
    "hit"
  ]
}
```

## Пример в chunk

```fenom
{foreach $tags as $tag}
  <span class="tag">{$tag|escape}</span>
{/foreach}
```

## Примечание

Опции из `options` или `optionsSource`, как у select.

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
