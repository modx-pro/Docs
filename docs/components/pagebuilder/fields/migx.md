---
title: "migx"
description: "ExtJS-грид MIGX в инспекторе секции (Free), зависимость от пакета MIGX"
---

# Поле migx

Версия: **Free**. Нужен установленный пакет **MIGX**. Без него поле в CMP есть, но грид не монтируется: JSON в textarea и кнопка «Повторить».

## Зачем этот тип

Настоящий ExtJS-грид MIGX TV, не Vue-repeater.

## Когда использовать

- Сложные строки с теми же вкладками, что в MIGX Configs
- Миграция контента с MIGX TV в секции PageBuilder
- Штатные окна MIGX вместо `repeater`

## Советы

- Предпочтительнее указать имя config в `configs` (MIGX → Configs)
- Окна добавления и редактирования открываются поверх инспектора (z-index)

## Похожие типы

- [repeater](repeater): Vue-список без зависимости от MIGX
- [jsongrid](jsongrid): одна строка-объект (Pro)

## Настройка

Через MIGX Configs:

```json
{
  "name": "items",
  "type": "migx",
  "label": "Элементы",
  "configs": "my_migx_config",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

Или `formtabs` / `columns` прямо в схеме (как input properties TV):

```json
{
  "name": "items",
  "type": "migx",
  "label": "Элементы",
  "formtabs": "[{\"caption\":\"Item\",\"fields\":[{\"field\":\"title\",\"caption\":\"Title\"}]}]",
  "columns": "[{\"header\":\"Title\",\"dataIndex\":\"title\",\"width\":160}]"
}
```

`migxConfig` / `migx_config` — алиас для `configs`.

## Значение

JSON-массив строк: `MIGX_id` и поля из formtabs, как значение MIGX TV.

## Данные секции {#vyvod-v-section-data}

Ключ `items` в данных секции:

```json
{
  "items": [
    { "MIGX_id": 1, "title": "Первый" },
    { "MIGX_id": 2, "title": "Второй" }
  ]
}
```

## Пример в chunk

::: code-group

```modx
[[+items.0.title]]
```

```fenom
{foreach $items as $item}
  <div>{$item.title|pb_text}</div>
{/foreach}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | array | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |
| `configs` | string | Имя конфигурации MIGX | да |
| `formtabs` | string/array | Вкладки формы элемента | да |
| `columns` | string/array | Колонки грида | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [repeater](repeater)
- [Обзор полей](overview)
