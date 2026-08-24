---
title: "select"
description: "Одно значение из статического массива options"
---

# Поле select

Слой: **Free**.

<!-- ![select](/components/pagebuilder/screenshots/fields/select.png) -->

## Зачем этот тип

- Список задаётся в JSON секции, без xPDO
- Компактнее radio при длинном перечне
- В data сохраняется value из option, не label

## Когда использовать

- Размер, тема, выравнивание, preset макета
- 5–20 фиксированных вариантов без поиска
- Enum-подобные настройки секции

## Советы

- Динамический список из БД возьмите [combo](combo) (Pro)
- Два–четыре варианта на виду удобнее в [radio](radio)

## Похожие типы

- [radio](radio) для короткого списка на экране
- [multiselect](multiselect) для нескольких статических options (Pro)

## Настройка

```json
{
  "name": "size",
  "type": "select",
  "label": "Размер",
  "options": [
    {
      "label": "S",
      "value": "sm"
    },
    {
      "label": "L",
      "value": "lg"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка: `value` выбранной опции.

## Вывод в section.data

Ключ `size` в `section.data` — строка `value` выбранной опции:

```json
{
  "size": "lg"
}
```

## Пример в chunk

```fenom
{switch $size}
  {case 'sm'}<div class="block block--sm">{/case}
  {case 'lg'}<div class="block block--lg">{/case}
  {default}<div class="block">{/default}
{/switch}
```

## Примечание

Динамический список: `optionsSource` → processor `mgr/field/options`.

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

- Дополнительно: `options` или `optionsSource`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
