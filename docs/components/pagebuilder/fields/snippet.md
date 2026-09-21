---
title: "snippet"
description: "Объект name выбранного modSnippet для вызова в chunk"
---

# Поле snippet

Версия: **Free**.

<!-- ![snippet](/components/pagebuilder/screenshots/fields/snippet.jpg) -->

## Зачем этот тип

Редактор выбирает имя сниппета. На сайте его вызывают динамически, например `[[!{$snippet.name}]]`. Чанк подключают отдельным полем [chunk](chunk), не этим.

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

::: code-group

```modx
[[!snippetName]]
```

```fenom
{('!' ~ $snippet.name) | snippet}
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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
