---
title: "migx"
description: "ExtJS-грид MIGX в инспекторе секции (Free), зависимость от пакета MIGX"
---

# Поле migx

Версия: **Free**. Нужен установленный пакет **MIGX**. Без него поле в CMP есть, но грид не монтируется (fallback: textarea с JSON).

## Зачем этот тип

- Настоящий ExtJS-грид MIGX TV, не Vue-repeater
- Можно взять готовый MIGX Config или задать `formtabs` / `columns` как у TV
- Удобен, если редакторы уже работают с MIGX

## Когда использовать

- Сложные строки с теми же вкладками, что в MIGX Configs
- Миграция контента с MIGX TV в секции PageBuilder
- Когда нужен нативный add/edit MIGX, а не `repeater`

## Советы

- Предпочтительно имя config в `configs` (MIGX → Configs)
- Окна add/edit стекуются над инспектором (z-index)
- Без MIGX: JSON в textarea и кнопка «Повторить»

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

Или inline `formtabs` / `columns` (как input properties TV):

```json
{
  "name": "items",
  "type": "migx",
  "label": "Элементы",
  "formtabs": "[{\"caption\":\"Item\",\"fields\":[{\"field\":\"title\",\"caption\":\"Title\"}]}]",
  "columns": "[{\"header\":\"Title\",\"dataIndex\":\"title\",\"width\":160}]"
}
```

Ключ `migxConfig` / `migx_config` это алиас для `configs`.

## Значение

JSON-массив объектов (как значение MIGX TV):

```json
{
  "items": [
    { "MIGX_id": 1, "title": "Первый" },
    { "MIGX_id": 2, "title": "Второй" }
  ]
}
```

## Данные секции {#vyvod-v-section-data}

Ключ поля (например `items`) хранит массив строк MIGX с `MIGX_id` и полями из formtabs.

## Пример в chunk

```fenom
{foreach $items as $item}
  <div>{$item.title|escape}</div>
{/foreach}
```

## Общие свойства

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы | да |
| `width` | 25–100 | Ширина поля % | да |
| `description` | string | Подсказка | да |
| `default` | array | Начальное значение | да |
| `active` | bool | Скрыть в инспекторе | да |
| `required` | bool | Обязательно при publish | да |
| `configs` | string | Имя MIGX config | да |
| `formtabs` | string/array | Tabs формы элемента | да |
| `columns` | string/array | Колонки грида | да |

## Дальше

- [Справочник типов](types)
- [repeater](repeater)
- [Обзор полей](overview)
