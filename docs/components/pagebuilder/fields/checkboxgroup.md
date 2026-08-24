---
title: "checkboxgroup"
description: "Массив значений из статического списка options для нескольких флагов"
---

# Поле checkboxgroup

Слой: **Free**.

<!-- ![checkboxgroup](/components/pagebuilder/screenshots/fields/checkboxgroup.png) -->

## Зачем этот тип

- Несколько выборов из одного списка options
- В data массив строк value, не объектов
- Альтернатива multiselect для коротких списков без поиска

## Когда использовать

- Теги фильтра, набор иконок, feature flags
- «Какие колонки показать» из фиксированного набора
- Мультивыбор без Pro multiselect

## Советы

- Один флаг достаточно в [checkbox](checkbox)
- Длинный список с поиском лучше [multiselect](multiselect) (Pro)

## Похожие типы

- [multiselect](multiselect) для MultiSelect с поиском (Pro)
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

## Вывод в section.data

Ключ `tags` в `section.data` — массив `value` отмеченных опций:

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
