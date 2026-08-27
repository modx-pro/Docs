---
title: "tag"
description: "Массив строк tags с chip UI в инспекторе"
---

# Поле tag

Версия: **Pro**.

<!-- ![tag](/components/pagebuilder/screenshots/fields/tag.png) -->

## Зачем этот тип

Свободный ввод строк без static `options`. Pro advanced-fields. Удобен для фильтров и меток на карточках.

## Когда использовать

- Хештеги статьи, бейджи стека технологий
- Фасеты фильтра на landing
- Ключевые слова для SEO-блока в секции

## Советы

Фиксированный enum: [multiselect](multiselect) или [checkboxgroup](checkboxgroup). Значения строки, не объекты.

## Похожие типы

- [multiselect](multiselect) для выбора из options
- [checkboxgroup](checkboxgroup) для static flags (Free)

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

Ключ `labels` в данных секции: массив строк:

```json
{
  "labels": [
    "новинка",
    "акция"
  ]
}
```

## Пример в chunk

```fenom
{foreach $labels as $label}
  <span class="label">{$label|escape}</span>
{/foreach}
```

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
- [Pro в менеджере](../integration)
