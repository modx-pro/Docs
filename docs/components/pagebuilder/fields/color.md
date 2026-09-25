---
title: "color"
description: "Строка цвета #rrggbb из color picker"
---

# Поле color

Версия: **Free**.

<!-- ![color](/components/pagebuilder/screenshots/fields/color.jpg) -->

## Зачем этот тип

Выбор цвета в палитре, а не ввод кода в текстовое поле. Подходит для фона секции и акцента. В данных строка: её подставляют в CSS в чанке, в стиль или в переменную.

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

::: code-group

```modx
<span style="color: [[+accent]]">…</span>
```

```fenom
<span style="color: {$accent|escape}">…</span>
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
