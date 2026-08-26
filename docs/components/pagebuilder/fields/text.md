---
title: "text"
description: "Однострочный текст для заголовков и коротких подписей"
---

# Поле text

Версия: **Free**.

<!-- ![text](/components/pagebuilder/screenshots/fields/text.png) -->

## Зачем этот тип

- Одна строка в данных секции, без сюрпризов в Fenom и валидации
- В Pro можно включить `responsive` (desktop, tablet, mobile)
- Заголовок или подпись без лишнего WYSIWYG

## Когда использовать

- Заголовок секции, подзаголовок, текст кнопки
- Короткий alt или подпись к изображению
- Любое значение, которое умещается в одну строку

## Советы

- Абзацы без разметки берите в [textarea](textarea)
- HTML пишите через [richtext](richtext) или [editorjs](editorjs), не через text

## Похожие типы

- [textarea](textarea) для абзацев без разметки
- [slug](slug) для ЧПУ из другого поля

## Настройка

```json
{
  "name": "title",
  "type": "text",
  "label": "Заголовок",
  "tab": "Контент",
  "width": 100,
  "description": "Подсказка под полем",
  "default": "",
  "required": true,
  "active": true
}
```

## Значение

Строка. В примере ниже ключ `title`.

## Данные секции {#vyvod-v-section-data}

Ключ `title` в данных секции:

```json
{
  "title": "Заголовок секции"
}
```

## Пример в chunk

```fenom
{$title|escape}
```

## Примечание

Pro: `field.responsive` (desktop / tablet / mobile).

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в данных секции — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
