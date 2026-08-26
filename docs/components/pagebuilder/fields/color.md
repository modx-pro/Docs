---
title: "color"
description: "Строка цвета hex или rgba из color picker"
---

# Поле color

Версия: **Free**.

<!-- ![color](/components/pagebuilder/screenshots/fields/color.png) -->

## Зачем этот тип

Color picker вместо ручного ввода в text. Подходит для фона секции и акцентного цвета. Значение строка, в chunk в CSS inline или variable.

## Когда использовать

- Цвет фона hero, overlay, кнопки
- Акцентная рамка или badge
- Когда палитра не фиксирована заранее

## Советы

Фиксированный brand-набор: [colorpalette](colorpalette). Проверяйте контраст текста на выбранном фоне в chunk.

## Похожие типы

- [colorpalette](colorpalette) для options из JSON
- [select](select) если цвета зашиты как именованная тема

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

## Данные секции {#vyvod-v-section-data}

Ключ `accent` в данных секции (HEX):

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
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
