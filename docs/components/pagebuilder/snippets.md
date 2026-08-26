---
title: Сниппеты
description: PageBuilder, PageBuilderResource, sitemap, UTM и табличные данные
---
# Сниппеты

Пакет поставляет шесть сниппетов. Namespace chunks и секций: `pagebuilder`.

## PageBuilder

Рендер **опубликованных** секций ресурса в HTML (или JSON при `return_values`).

| Параметр | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `resource_id` | number | `0` | ID ресурса. `0` = текущий |
| `section_types` | text | пусто | Ключи секций через запятую (`hero,gallery`). Пусто = все |
| `return_values` | boolean | `0` | Вернуть JSON с `plainText` и `sections` вместо HTML |
| `use_cache` | boolean | `1` | Кеш MODX для HTML. `0` для отладки |
| `load_css` | boolean | из `pagebuilder_load_frontend_css` | Подключить frontend CSS |
| `wrap_page` | boolean | как `load_css` | Обёртка `<div class="pb-page">` |
| `qa_css` | boolean | `0` | QA-стили для отладки |

::: code-group

```modx
[[!PageBuilder]]

[[!PageBuilder?
  &section_types=`hero,cta`
  &use_cache=`0`
]]
```

```fenom
{'!PageBuilder' | snippet}

{'!PageBuilder' | snippet : [
  'section_types' => 'hero,cta',
  'use_cache' => 0
]}
```

:::

При `return_values=1` срабатывает событие `pbOnGetValues`.

## PageBuilderResource

Тот же рендер, но **обязателен** `resource_id`: секции другого ресурса (блок на главной из дочерней страницы).

| Параметр | Тип | Описание |
| --- | --- | --- |
| `resource_id` | number | ID источника (обязателен) |
| `section_types` | text | Опциональный фильтр по ключам |

## PageBuilderSitemap

XML sitemap для ресурсов с опубликованными секциями PageBuilder.

| Параметр | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `context` | text | пусто | Фильтр по ключу контекста MODX |
| `priority` | text | `0.5` | Приоритет URL |
| `changefreq` | text | `weekly` | Значение changefreq |

Выведите сниппет на отдельном ресурсе с типом содержимого, подходящим для XML, и укажите URL в `robots.txt`.

## PageBuilderUtmSession

Сохраняет UTM-параметры из query string в `$_SESSION['utm']`. Нужен для правил видимости секций (`settings.utm` в JSON документа).

Разместите некэшированный вызов в общем layout до `PageBuilder`:

::: code-group

```modx
[[!PageBuilderUtmSession]]
```

```fenom
{'!PageBuilderUtmSession' | snippet}
```

:::

## PageBuilderUtmUrl

Добавляет UTM из реестра PageBuilder к URL.

| Параметр | Тип | Описание |
| --- | --- | --- |
| `url` | text | Целевой URL |
| `params` | text | JSON с дополнительными query-параметрами |

## PageBuilderTableRows

Строки **табличных данных** на ресурсе.

| Параметр | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `resource_id` | number | `0` | ID ресурса |
| `table_key` | text | — | Ключ таблицы на ресурсе |
| `table_id` | number | `0` | ID таблицы вместо `table_key` |
| `limit` | number | `20` | Максимум строк |
| `return` | list | `json` | `json` или `chunk` |

Секция `data_table` (Pro) использует встроенный chunk `pagebuilder_data_table`. Сниппет нужен для кастомного вывода таблицы в шаблоне или другом chunk.
