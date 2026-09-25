---
title: PageBuilderResource
description: Сниппет PageBuilderResource — секции другого ресурса
---

# Сниппет PageBuilderResource

Тот же PHP, что у [PageBuilder](PageBuilder). В properties сниппета `resource_id` помечен обязательным, но код берёт текущий ресурс, если передали `0`.

## Назначение

- Hero или FAQ с дочерней страницы на главной.
- Общий блок контента на нескольких ресурсах без дублирования секций в каждом документе.

## Где вызывать

Любой шаблон или chunk, где нужен HTML опубликованных секций **чужого** ресурса. Вызов некэшированный.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID источника. `0` = текущий ресурс. Если ресурс не найден, сниппет вернёт пустую строку |
| `section_types` | пусто | Фильтр по ключам секций |
| `return_values` | `0` | JSON вместо HTML (как у PageBuilder) |
| `use_cache` | `1` | Кеш HTML |
| `load_css` | из настройки | Frontend CSS |
| `wrap_page` | как `load_css` | Обёртка `pb-page` |

В properties сниппета **PageBuilderResource** перечислены только `resource_id` и `section_types`. Остальные параметры работают так же, как у PageBuilder.

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
