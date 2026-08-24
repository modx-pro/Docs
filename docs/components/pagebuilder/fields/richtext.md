---
title: "richtext"
description: "HTML-строка из привычного richtext MODX в section.data"
---

# Поле richtext

Слой: **Free**.

<!-- ![richtext](/components/pagebuilder/screenshots/fields/richtext.png) -->

## Зачем этот тип

- WYSIWYG как в ресурсе MODX, без отдельного TV
- Ссылки, списки и базовое форматирование из коробки
- В chunk выводится готовый HTML без парсинга блоков

## Когда использовать

- Основной текст секции с абзацами и ссылками
- Ответ FAQ с жирным текстом и списками
- Любой контент, где редактор не пишет разметку руками

## Советы

- Для блочного контента Editor.js возьмите [editorjs](editorjs)
- Для сырого HTML/CSS возьмите [ace](ace)

## Похожие типы

- [editorjs](editorjs) для структурированных блоков с json и html
- [textarea](textarea) для plain-текста без тегов

## Настройка

```json
{
  "name": "content",
  "type": "richtext",
  "label": "Текст",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

HTML-строка.

## Вывод в section.data

Ключ `content` в `section.data`:

```json
{
  "content": "<p>Текст с <strong>разметкой</strong>.</p>"
}
```

## Пример в chunk

```html
<div class="pb-richtext__content">{$content}</div>
```

## Примечание

Pro: `responsive`.

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
