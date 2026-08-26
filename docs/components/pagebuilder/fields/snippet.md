---
title: "snippet"
description: "Объект name выбранного modSnippet для вызова в chunk"
---

# Поле snippet

Слой: **Pro**.

<!-- ![snippet](/components/pagebuilder/screenshots/fields/snippet.png) -->

## Зачем этот тип

Выбор имени сниппета для `[[!{$snippet.name}]]`. Pro: динамический hook processor в секции. Отделяет вызов сниппета от include chunk.

## Когда использовать

- Секция делегирует render сниппету
- Редактор выбирает из разрешённого списка сниппетов
- Обёртка вокруг legacy MODX snippet

## Советы

Include partial-шаблона: [chunk](chunk). Параметры сниппета задаются отдельными полями или статически в chunk.

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

## Данные секции {#vyvod-v-section-data}

Ключ `snippet` в данных секции:

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
