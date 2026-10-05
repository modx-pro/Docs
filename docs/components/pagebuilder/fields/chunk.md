---
title: "chunk"
description: "Объект name выбранного modChunk для include в Fenom"
---

# Поле chunk

Версия: **Free**.

<!-- ![chunk](/components/pagebuilder/screenshots/fields/chunk.jpg) -->

## Зачем этот тип

Редактор выбирает чанк по имени и не вписывает его вручную. В Fenom его подключают так: `{include file="file:chunks/{$chunk.name}.tpl"}`. Нужен, когда секция подставляет разные фрагменты вёрстки.

## Когда использовать

- Редактор выбирает вариант layout чанка
- A/B подмена partial в custom-секции
- Список разрешённых chunks, заданный разработчиком

## Советы

Вызов сниппета: [snippet](snippet). Закрытый список имён: [text](text).

## Похожие типы

- [snippet](snippet) для имени modSnippet
- [combo](combo) с optionsSource modChunk для выбора по id

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

## Данные секции {#vyvod-v-section-data}

Ключ `chunk` в данных секции:

```json
{
  "chunk": {
    "name": "pbHero"
  }
}
```

## Пример в chunk

::: code-group

```modx
[[+chunk.name]]
```

```fenom
{include file="file:chunks/{$chunk.name}.tpl"}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
