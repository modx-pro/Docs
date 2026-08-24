---
title: "ace"
description: "Строка исходного кода с подсветкой Ace в инспекторе"
---

# Поле ace

Слой: **Free**.

<!-- ![ace](/components/pagebuilder/screenshots/fields/ace.png) -->

## Зачем этот тип

- Полный контроль над HTML, CSS или JSON
- Режим через `mode` (html, css, javascript, json)
- Не навязывает WYSIWYG там, где нужен точный код

## Когда использовать

- Кастомная разметка секции, которую правит разработчик
- Вставка SVG или inline-стилей
- JSON или конфиг, который chunk парсит сам

## Советы

- Редакторам контента чаще подходит [richtext](richtext)
- Не экранируйте HTML в chunk, если выводите как разметку осознанно

## Похожие типы

- [richtext](richtext) для WYSIWYG без кода
- [editorjs](editorjs) для блочного контента с html на save

## Настройка

```json
{
  "name": "markup",
  "type": "ace",
  "label": "Разметка",
  "mode": "html",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Строка с исходным кодом.

## Вывод в section.data

Ключ `markup` в `section.data`:

```json
{
  "markup": "<section class=\"hero\">\n  …\n</section>"
}
```

## Пример в chunk

```fenom
{$markup}
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
