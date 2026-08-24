---
title: "editorjs"
description: "Объект json и html из Editor.js в section.data"
---

# Поле editorjs

Слой: **Free**.

<!-- ![editorjs](/components/pagebuilder/screenshots/fields/editorjs.png) -->

## Зачем этот тип

- Блочный контент с заголовками, списками, embed
- html готов для chunk, json для кастомного рендера
- Структура предсказуемее произвольного HTML

## Когда использовать

- Длинная статья или landing с блоками
- Контент, который потом парсят по json
- Альтернатива richtext для block-first UX

## Советы

- В chunk обычно `{$body.html}`, не raw json
- Простой HTML без блоков быстрее в [richtext](richtext)

## Похожие типы

- [richtext](richtext) для классического WYSIWYG HTML
- [ace](ace) если html правит разработчик

## Настройка

```json
{
  "name": "body",
  "type": "editorjs",
  "label": "Контент",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ json, html }`; на фронте обычно `html`.

## Вывод в section.data

Ключ `body` в `section.data`:

```json
{
  "body": {
    "json": {
      "time": 1710000000000,
      "blocks": [
        {
          "type": "paragraph",
          "data": {
            "text": "Текст блока"
          }
        }
      ],
      "version": "2.29.0"
    },
    "html": "<p>Текст блока</p>"
  }
}
```

- В chunk обычно используют `html`; `json` — сырой Editor.js.

## Пример в chunk

```html
<div class="pb-richtext__content">{$body.html}</div>
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

- Дополнительно: в data `{ json, html }`; в chunk обычно `{$field.html}`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
