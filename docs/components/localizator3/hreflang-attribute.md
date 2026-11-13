---
title: Атрибут hreflang
description: 'Сниппет getLocalizedCanonical: canonical, alternate и x-default'
---

# Атрибут hreflang

Сниппет **getLocalizedCanonical** выводит `link rel="canonical"` для текущего языка и `link rel="alternate" hreflang="..."` для активных языков. Свой сниппет с разметкой писать не нужно.

Сниппет добавляет `hreflang="x-default"`, если нашёлся URL языка по умолчанию. `localizator3_default_language` сравнивается с `cultureKey`, при пустом `cultureKey` с `key`. Пустая настройка: URL текущего языка.

## Параметры

| Название | По умолчанию | Описание |
| --- | --- | --- |
| **id** | текущий ресурс | ID ресурса. Пустые `null` и `''` берут текущий ресурс. Пустая строка, если ресурса нет |
| **tpl** | пусто | Чанк. Плейсхолдеры: `links` (элементы с `url`, `hreflang`, `is_current`) и готовый `output` |

Пустая строка, если:

- нет текущего `localizator3_key`
- ни один URL не собрался

`canonical` и (при пустой настройке) `x-default` выводятся, только если текущий ключ есть у активного языка с непустым URL.

Порядок языков: `rank`, затем `id`. В разметке `canonical` у текущего языка, `x-default` последний.

## Вызов в head

::: code-group

```fenom
{'!getLocalizedCanonical' | snippet : ['id' => $_modx->resource.id]}
```

```modx
[[!getLocalizedCanonical? &id=`[[*id]]`]]
```

:::

Пример вывода (порядок языков зависит от ранга):

```html
<link rel="canonical" href="https://site.example/page.html">
<link rel="alternate" hreflang="ru" href="https://site.example/page.html">
<link rel="alternate" hreflang="en" href="https://en.site.example/page.html">
<link rel="alternate" hreflang="x-default" href="https://site.example/page.html">
```

Значение `hreflang` берётся из `cultureKey` языка, иначе из ключа. URL собирает `makeLocalizedUrl`.
