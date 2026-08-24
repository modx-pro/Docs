---
title: "text"
description: "Однострочная строка в section.data для заголовков и коротких подписей"
---

# Поле text

Слой: **Free**.

<!-- ![text](/components/pagebuilder/screenshots/fields/text.png) -->

## Зачем этот тип

- Самый простой скаляр, предсказуем в Fenom и валидации
- Pro: `responsive` для desktop / tablet / mobile
- Не тянет HTML-редактор там, где нужен один заголовок

## Когда использовать

- Заголовок секции, подзаголовок, метка кнопки
- Короткий alt или подпись рядом с изображением
- Любое поле длиной до одной строки

## Советы

- Для многострочного текста возьмите [textarea](textarea)
- Не используйте text для HTML, возьмите [richtext](richtext) или [editorjs](editorjs)

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

Строка в `section.data.title`.

## Вывод в section.data

Ключ `title` в `section.data`:

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

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
