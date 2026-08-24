---
title: "color"
description: "Строка цвета hex или rgba из color picker"
---

# Поле color

Слой: **Free**.

<!-- ![color](/components/pagebuilder/screenshots/fields/color.png) -->

## Зачем этот тип

- Picker вместо ручного ввода в text
- Подходит для фона секции и accent
- Значение строка, в chunk в CSS inline или variable

## Когда использовать

- Цвет фона hero, overlay, кнопки
- Accent border или badge
- Когда палитра не фиксирована заранее

## Советы

- Фиксированный brand-набор удобнее [colorpalette](colorpalette)
- Проверяйте контраст текста на выбранном фоне в chunk

## Похожие типы

- [colorpalette](colorpalette) для options из JSON
- [select](select) если цвета зашиты как named theme

## Настройка

```json
{
  "name": "accent",
  "type": "color",
  "label": "Акцент",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

HEX-строка.

## Вывод в section.data

Ключ `accent` в `section.data` (HEX):

```json
{
  "accent": "#3b82f6"
}
```

## Пример в chunk

```html
<span style="color: {$accent|escape}">…</span>
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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
