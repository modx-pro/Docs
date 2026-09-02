---
title: "textarea"
description: "Многострочный plain-текст без HTML"
---

# Поле textarea

Версия: **Free**.

<!-- ![textarea](/components/pagebuilder/screenshots/fields/textarea.png) -->

## Зачем этот тип

Несколько строк без риска случайной HTML-разметки. Проще [text](text) для описаний и цитат, легче [richtext](richtext), когда форматирование не нужно.

## Когда использовать

- Анонс, лид, короткое описание без списков
- Ответ FAQ без HTML
- Комментарий или служебная заметка редактора

## Советы

Длинный форматированный текст: [richtext](richtext) или [editorjs](editorjs). Pro: `responsive` как у text.

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

## Данные секции {#vyvod-v-section-data}

Ключ `intro` в данных секции:

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в данных секции: ключи `desktop`, `tablet`, `mobile` вместо скаляра.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
