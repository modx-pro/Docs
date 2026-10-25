---
title: PageBuilderResource
description: Сниппет PageBuilderResource — секции другого ресурса
---

# Сниппет PageBuilderResource

Выводит секции другого ресурса. Тот же PHP, что у [PageBuilder](PageBuilder). Ресурс задаётся параметром `resource_id`.

## Назначение

- Hero или FAQ с дочерней страницы на главной.
- Общий блок контента на нескольких ресурсах без дублирования секций в каждом документе.

## Где вызывать

Шаблон или чанк. Вызов некэшированный.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID источника. `0` = текущий ресурс |
| `section_types` | пусто | Фильтр по ключам секций |
| `return_values` | `0` | JSON вместо HTML (как у PageBuilder) |
| `use_cache` | `1` | Кеш HTML |
| `load_css` | из настройки | Frontend CSS |
| `wrap_page` | как `load_css` | Обёртка `pb-page` |

Если ресурс не определился, ответ пустая строка, в том числе при `return_values=1`. Если id есть, а записи PageBuilder нет, `return_values=1` отдаёт `{ "plainText": "", "sections": [] }`.

В properties перечислены только `resource_id` и `section_types`. Отметки обязательности у `resource_id` нет. Остальные параметры работают как у PageBuilder. Сниппет без аргументов не падает.

## Пример: FAQ с страницы «О компании» на главной

::: code-group

```modx
[[!PageBuilderResource?
  &resource_id=`15`
  &section_types=`faq`
]]
```

```fenom
{'!PageBuilderResource' | snippet : [
  'resource_id' => 15,
  'section_types' => 'faq'
]}
```

:::

## Права и публикация

- HTML-путь отдаёт только **опубликованный** snapshot PageBuilder. Черновик источника на сайте не виден.
- Сниппет не проверяет policy **view** на ресурс-источник.
- Ограничьте доступ на стороне ресурса MODX или через [Public API](../public-api): там policy **view** проверяется.

## См. также

- [PageBuilder](PageBuilder)
- [Вывод на сайте](../frontend)
