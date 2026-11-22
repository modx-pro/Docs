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
- Выбор из двух-трёх вариантов с подписями

## Советы

Много вариантов: [select](select) или `optionsSource`. Boolean on/off быстрее в [yesno](yesno) или [toggle](toggle).

## Похожие типы

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

## Данные секции {#vyvod-v-section-data}

Ключ `align` — строка `value` выбранной опции:

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

Динамический список: `optionsSource` и connector `mgr/field/options` — как у [select](select#примечание), подробнее в [обзоре полей](overview#optionssource).

## Общие свойства

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
