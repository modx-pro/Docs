---
title: "snippet"
description: "Объект name выбранного modSnippet для вызова в chunk"
---

# Поле snippet

Слой: **Pro**.

<!-- ![snippet](/components/pagebuilder/screenshots/fields/snippet.png) -->

## Зачем этот тип

- Picker snippet name для `[[!{$snippet.name}]]`
- Pro dynamic processor hook in section
- Отделяет snippet call от chunk include

## Когда использовать

- Секция делегирует render сниппету
- Editor picks from allowed snippets list
- Wrapper around legacy MODX snippet

## Советы

- Partial template include это [chunk](chunk)
- Params snippet задаются отдельными полями или static in chunk

## Похожие типы

- [chunk](chunk) для Fenom include
- [combo](combo) optionsSource modSnippet

## Настройка

```json
{
  "name": "snippet",
  "type": "snippet",
  "label": "Snippet",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ name }`.

## Вывод в section.data

Ключ `snippet` в `section.data`:

```json
{
  "snippet": {
    "name": "pbHero"
  }
}
```

## Пример в chunk

```html
[[!{$snippet.name}]]
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
