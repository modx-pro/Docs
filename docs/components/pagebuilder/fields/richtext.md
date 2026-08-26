---
title: "richtext"
description: "HTML-строка из привычного richtext MODX"
---

# Поле richtext

Версия: **Free**.

<!-- ![richtext](/components/pagebuilder/screenshots/fields/richtext.png) -->

## Зачем этот тип

- Тот же WYSIWYG, что у ресурса MODX, без отдельного TV
- Ссылки, списки и базовое форматирование из коробки
- В chunk отдаёт готовый HTML, парсить блоки не нужно

## Когда использовать

- Основной текст секции: абзацы, ссылки
- Ответ FAQ с выделением и списками
- Контент, где редактор не пишет разметку вручную

## Советы

- Блочная вёрстка Editor.js: [editorjs](editorjs)
- Сырой HTML или CSS: [ace](ace)

## Похожие типы

- [editorjs](editorjs) для структурированных блоков с json и html
- [textarea](textarea) для простого текста без тегов

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

## Данные секции {#vyvod-v-section-data}

Ключ `content` в данных секции:

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
