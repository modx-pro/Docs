---
title: "resourcelist"
description: "Alias relation с тем же модальным picker и объектом id pagetitle"
---

# Поле resourcelist

Слой: **Free**.

<!-- ![resourcelist](/components/pagebuilder/screenshots/fields/resourcelist.png) -->

## Зачем этот тип

Семантика «выбор страницы» в label CMP. Поведение и data совпадают с [relation](relation): `searchAction` и модальный поиск из коробки.

## Когда использовать

- Поле `page` или `blog_parent` в секции
- Когда тип в схеме должен читаться редакторам как «список страниц»
- Legacy-схемы с `type: resourcelist`

## Советы

Функционально эквивалент [relation](relation). Несколько страниц: [multirelation](multirelation).

## Похожие типы

- [relation](relation): тот же picker
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

Как у `relation`.

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

- Поиск в менеджере может показывать `uri` и `context_key`, но в data пишутся `id` и `pagetitle`.

## Пример в chunk

```fenom
{if $page.id}
  <span>{$page.pagetitle|escape}</span>
{/if}
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
- [Менеджер и события](../integration)
