---
title: "chunk"
description: "Объект name выбранного modChunk для include в Fenom"
---

# Поле chunk

Слой: **Pro**.

<!-- ![chunk](/components/pagebuilder/screenshots/fields/chunk.png) -->

## Зачем этот тип

- Picker chunk по name без ручного ввода
- `{include file="file:chunks/{$chunk.name}.tpl"}` pattern
- Pro для dynamic partial sections

## Когда использовать

- Редактор выбирает variant chunk layout
- A/B partial swap в custom секции
- Dev-curated list of allowed chunks

## Советы

- Snippet call это [snippet](snippet) type
- Static chunk name можно [text](text) если list closed

## Похожие типы

- [snippet](snippet) для modSnippet name
- [combo](combo) optionsSource modChunk для id-style pick

## Настройка

```json
{
  "name": "chunk",
  "type": "chunk",
  "label": "Chunk",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ name }`.

## Вывод в section.data

Ключ `chunk` в `section.data`:

```json
{
  "chunk": {
    "name": "pbHero"
  }
}
```

## Пример в chunk

```fenom
{include file="file:chunks/{$chunk.name}.tpl"}
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
- [Pro в менеджере](../integration)
