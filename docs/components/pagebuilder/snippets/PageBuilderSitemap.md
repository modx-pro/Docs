---
title: PageBuilderSitemap
description: XML sitemap ресурсов с опубликованными секциями PageBuilder
---

# Сниппет PageBuilderSitemap

Формирует XML sitemap для ресурсов MODX, у которых в `pb_pages` есть опубликованный snapshot (`published_revision > 0`).

## Назначение

Отдельный URL sitemap для лендингов и страниц, собранных в PageBuilder, без ручного списка ID.

## Где вызывать

- Отдельный ресурс с типом содержимого или шаблоном под XML.
- URL ресурса добавьте в `robots.txt`.

Ресурс MODX должен быть опубликован и не удалён. Контекст фильтруется параметром `context`.

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `context` | пусто | Ключ контекста MODX. Пусто = все контексты |
| `priority` | `0.5` | Значение `<priority>` |
| `changefreq` | `weekly` | Значение `<changefreq>` |

## Вызов

::: code-group

```modx
[[!PageBuilderSitemap]]

[[!PageBuilderSitemap?
  &context=`web`
  &priority=`0.8`
  &changefreq=`daily`
]]
```

```fenom
{'!PageBuilderSitemap' | snippet}

{'!PageBuilderSitemap' | snippet : [
  'context' => 'web',
  'priority' => '0.8',
  'changefreq' => 'daily'
]}
```

:::

## Формат ответа

Каждый URL содержит:

- `<loc>` — полный URL ресурса (`makeUrl`, режим `full`)
- дата последнего изменения ресурса (`editedon`) в ISO 8601
- `<changefreq>` и `<priority>` — из параметров сниппета

Если подходящих страниц нет, вернётся пустой sitemap.

## Content-Type

Задайте `application/xml` на уровне ресурса, шаблона или правила веб-сервера. Сниппет отдаёт только тело XML.

## См. также

- [PageBuilder](PageBuilder)
- [Разработчик → Модель данных](../developer#model-dannyh)
