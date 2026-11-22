---
title: Формирование sitemap
description: Сниппет getLocalizedSitemap для sitemap с учётом языков
---

# Формирование sitemap

Сниппет `getLocalizedSitemap` строит XML-карту по опубликованным, не удалённым ресурсам и активным языкам. В ответе: `loc`, `lastmod`, `xhtml:link`, `x-default`.

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **parents** | пусто | ID родителей через запятую. Пустой список даёт пустой `urlset`, `0` допустим. Указанные ID входят в карту, не только потомки |
| **depth** | `10` | Глубина `getChildIds` для каждого родителя. `0` и отрицательные значения потомков не добавляют. Потомки из текущего контекста |
| **excludeIds** | пусто | ID для исключения, через запятую |
| **scheme** | `0` | В `makeLocalizedUrl` с `fullUrl` true. Путь через `makeUrl` с `-1`. `1` и `2` подменяют протокол |
| **onlyWithLocalization** | Нет | Только ресурсы с записью локализации. В ссылках — языки найденных записей, не все активные |

`loc` берётся из alternate с `cultureKey`, равным `localizator3_default_language`. При пустом ключе или несовпадении — первый alternate. Порядок языков: `rank`, затем `id`.

## Вызов

::: code-group

```fenom
{'!getLocalizedSitemap' | snippet : [
  'parents' => '1',
  'depth' => 5,
]}
```

```modx
[[!getLocalizedSitemap?
  &parents=`1`
  &depth=`5`
]]
```

:::

Выдайте результат как XML-страницу или ресурс с типом `text/xml`. Тип задаёт ресурс или веб-сервер, не пакет.
