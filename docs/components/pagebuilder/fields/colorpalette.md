---
title: "colorpalette"
description: "Одно значение из preset options с образцами цвета"
---

# Поле colorpalette

Версия: **Free**.

<!-- ![colorpalette](/components/pagebuilder/screenshots/fields/colorpalette.png) -->

## Зачем этот тип

Редактор выбирает из brand-палитры, не любой hex. Статический список options как у select, с UI swatch. Меньше «случайных» цветов на проде.

## Когда использовать

- Токены темы primary / secondary / muted
- Фон секции из design system
- Ограниченный набор для white-label

## Советы

Произвольный hex: [color](color). В data сохраняется ключ option, не CSS напрямую.

## Похожие типы

- [color](color) для свободного color picker
- [select](select) без визуальных swatch

## Настройка

```json
{
  "name": "theme",
  "type": "colorpalette",
  "label": "Цвет",
  "swatches": [
    "#111827",
    "#c2410c"
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

HEX-строка.

## Данные секции {#vyvod-v-section-data}

Ключ `theme` в данных секции (HEX):

```json
{
  "theme": "#3b82f6"
}
```

## Пример в chunk

```html
<span style="color: {$theme|escape}">…</span>
```

## Примечание

В панели управления: `optionsText` (как у select); при сохранении пишутся `options` и `swatches`.

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

- Дополнительно: `swatches` или `options` со цветами.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
