---
title: "resourcelist"
description: "Выбор одной страницы MODX: тот же picker, что у relation; тип Free"
---

# Поле resourcelist

Версия: **Free**.

<!-- ![resourcelist](/components/pagebuilder/screenshots/fields/resourcelist.jpg) -->

## Зачем этот тип

Поле выбирает одну страницу через Autocomplete с поиском — тот же редактор, что у [relation](relation). Алиасы схемы: `resources`, `resource_list` → `resourcelist`.

По умолчанию поиск идёт через `mgr/resources/search` (до 20 результатов). Свой connector задаётся ключом `searchAction`.

## Когда использовать

- Поле `page` или `blog_parent` в секции
- Когда тип в схеме должен читаться редакторам как «список страниц»
- Устаревшие схемы с `type: resourcelist`

## Советы

Нужен Pro-тип с capability `advanced-fields`: [relation](relation).

## Похожие типы

- [relation](relation): тот же picker, Pro-тип
- [multirelation](multirelation) для нескольких страниц

## Настройка

```json
{
  "name": "page",
  "type": "resourcelist",
  "label": "Страница",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ id, pagetitle }`.

## Данные секции {#vyvod-v-section-data}

Ключ `page` в данных секции (picker сохраняет только выбранное):

```json
{
  "page": {
    "id": 42,
    "pagetitle": "О компании"
  }
}
```

- Поиск в менеджере может показывать `uri` и `context_key`, но в данные секции пишутся `id` и `pagetitle`.

## Пример в chunk

::: code-group

```modx
<span>[[+page.pagetitle]]</span>
```

```fenom
{if $page.id}
  <span>{$page.pagetitle|pb_text}</span>
{/if}
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

- Дополнительно: `searchAction` для своего connector.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
