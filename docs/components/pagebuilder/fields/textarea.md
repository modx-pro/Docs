---
title: "textarea"
description: "Многострочный plain-текст без HTML в section.data"
---

# Поле textarea

Слой: **Free**.

<!-- ![textarea](/components/pagebuilder/screenshots/fields/textarea.png) -->

## Зачем этот тип

- Несколько строк без риска случайной HTML-разметки
- Легче text для описаний и цитат
- Проще richtext, когда форматирование не нужно

## Когда использовать

- Анонс, лид, короткое описание без списков
- Текст FAQ-ответа, если HTML не нужен
- Комментарий или служебная заметка редактора

## Советы

- Длинный форматированный текст лучше в [richtext](richtext) или [editorjs](editorjs)
- Pro: `responsive` работает так же, как у text

## Похожие типы

- [text](text) для одной строки
- [richtext](richtext) для HTML из MODX-редактора

## Настройка

```json
{
  "name": "intro",
  "type": "textarea",
  "label": "Вводный текст",
  "rows": 6,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Многострочная строка.

## Вывод в section.data

Ключ `intro` в `section.data`:

```json
{
  "intro": "Первый абзац.\nВторой абзац."
}
```

## Пример в chunk

```fenom
{if $intro}
  <p class="intro">{$intro|escape|nl2br}</p>
{/if}
```

## Примечание

Высота: `rows` или `height` в schema. Pro: `responsive`.

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
