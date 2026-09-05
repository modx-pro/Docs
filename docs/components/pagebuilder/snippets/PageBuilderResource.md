---
title: PageBuilderResource
description: Сниппет PageBuilderResource — секции другого ресурса
---

# Сниппет PageBuilderResource

Тот же PHP, что у [PageBuilder](PageBuilder), но в properties сниппета **обязателен** `resource_id`. Удобное имя для вызова «секции с другой страницы».

## Назначение

- Hero или FAQ с дочерней страницы на главной.
- Общий блок контента на нескольких ресурсах без дублирования секций в каждом документе.

## Где вызывать

Любой шаблон или chunk, где нужен HTML опубликованных секций **чужого** ресурса. Вызов некэшированный.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `resource_id` | `0` | ID источника. **Обязателен** > 0, иначе сниппет вернёт пустую строку |
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

- На источнике должен быть **опубликованный** snapshot PageBuilder.
- Текущий пользователь сайта должен иметь policy **view** на ресурс-источник (проверка при рендере).
- Черновик источника на сайте не виден.

## См. также

- [PageBuilder](PageBuilder)
- [Вывод на сайте](../frontend)
