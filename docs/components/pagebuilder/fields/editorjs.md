---
title: "editorjs"
description: "Объект json и готовый html из Editor.js"
---

# Поле editorjs

Версия: **Pro** (`advanced-fields`). Новое поле создаётся только в Pro. Уже сохранённое открывается и пишется.

<!-- ![editorjs](/components/pagebuilder/screenshots/fields/editorjs.jpg) -->

## Зачем этот тип

Текст из блоков: заголовки, списки, вставки. В чанк можно отдать готовый HTML (`html`) или JSON (`json`), если разметку собираете сами. Набор блоков предсказуемее, чем произвольный HTML.

## Когда использовать

- Длинная статья или landing с блоками
- Контент, который потом парсят по json
- Альтернатива richtext, когда редактор работает блоками

## Советы

В chunk обычно `{$body.html}`, не сырой json. Простой HTML без блоков быстрее в [richtext](richtext).

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

## Данные секции {#vyvod-v-section-data}

Ключ `body` в данных секции:

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

- В chunk обычно используют `html`; `json`: сырой Editor.js.

## Пример в chunk

::: code-group

```modx
<div class="pb-richtext__content">[[+body.html]]</div>
```

```fenom
<div class="pb-richtext__content">{$body.html}</div>
```

:::

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

- Дополнительно: в data `{ json, html }`; в chunk обычно `{$field.html}`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
