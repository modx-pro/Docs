---
title: "radio"
description: "Одно значение из options; в инспекторе — выпадающий список Select"
---

# Поле radio

Версия: **Free**.

<!-- ![radio](/components/pagebuilder/screenshots/fields/radio.jpg) -->

## Зачем этот тип

Один выбор из списка `options`. В инспекторе тот же виджет PrimeVue Select, что у [select](select): выпадающий список, не группа переключателей. Имя типа `radio` в схеме отличает поле от `select` в шаблонах и условиях.

## Когда использовать

- Выравнивание left / center / right
- Тип фона image / color / video
- Бинарный или трёхсторонний выбор с подписями

## Советы

Много вариантов: [select](select) или `optionsSource` (см. ниже). Boolean on/off быстрее в [yesno](yesno) или [toggle](toggle).

## Похожие типы

- [select](select) — тот же виджет в инспекторе, другое имя типа в JSON
- [checkboxgroup](checkboxgroup) для нескольких флагов

## Настройка

```json
{
  "name": "align",
  "type": "radio",
  "label": "Выравнивание",
  "options": [
    {
      "label": "Слева",
      "value": "left"
    },
    {
      "label": "По центру",
      "value": "center"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка выбранного `value`.

## Данные секции {#vyvod-v-section-data}

Ключ `align` в данных секции: строка `value` выбранной опции:

```json
{
  "align": "left"
}
```

## Пример в chunk

::: code-group

```modx
<div class="align-[[+align]]">
  …
</div>
```

```fenom
<div class="align-{$align|escape}">
  …
</div>
```

:::

## Примечание

Динамический список: `optionsSource` и connector `mgr/field/options` — как у [select](select#примечание). См. [обзор полей](overview#optionssource).

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
