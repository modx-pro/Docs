---
title: BannerPro
description: "Параметры сниппета BannerPro, плейсхолдеры, чанки и примеры вызова"
---

# BannerPro

Сниппет `BannerPro` выводит баннеры по позициям. Для работы нужен pdoTools.

## Синтаксис

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'limit' => 3
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &limit=`3`
]]
```

:::

## Основные параметры

| Параметр | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `position` | int | пусто | ID позиции. Имеет приоритет над `positionName` |
| `positions` | string | пусто | Несколько ID через запятую |
| `positionName` | string | пусто | Имя позиции или список имён через запятую |
| `positionKey` | string | пусто | Синоним `positionName` (то же поведение) |
| `context` | string | текущий | Фильтр позиций по `context_key`. `*` = текущий контекст |
| `productId` | int | пусто | ID товара MiniShop3 |
| `tags` | string | пусто | Метки через запятую для фильтра баннеров |
| `tagsMode` | string | `any` | `any` или `all` для сопоставления меток |
| `resource` | int | пусто | ID ресурса для таргетинга (явная подстановка) |
| `parent` | int | пусто | ID родителя для таргетинга по разделу |
| `showInactive` | bool | `false` | Показывает баннеры с `active = 0` |
| `sortby` | string | `RAND()` | `RAND()`, `idx`, `weighted`, `ab` или поле `byAd` |
| `tpl` | string | `byAd` | Чанк для одного баннера |
| `cache` | bool | пусто | Переопределяет `bannerpro_cache` для вызова |
| `cacheLifetime` | int | пусто | Переопределяет `bannerpro_cache_lifetime` |

## Чанки по позиции в выдаче

| Параметр | Описание |
| --- | --- |
| `tplFirst` | Чанк первого баннера |
| `tplLast` | Чанк последнего баннера |
| `tplOdd` | Чанк нечётных баннеров |
| `tplImage` | Чанк для `type=image` |
| `tplImageFirst` | Чанк первого image-баннера |
| `tplImageLast` | Чанк последнего image-баннера |
| `tplImageOdd` | Чанк нечётных image-баннеров |
| `tplHtml` | Чанк для `type=html` |
| `tplHtmlFirst` | Чанк первого html-баннера |
| `tplHtmlLast` | Чанк последнего html-баннера |
| `tplHtmlOdd` | Чанк нечётных html-баннеров |

Для `type=html` сниппет использует `byHtml`, если не задан `tplHtml`.

## Параметры pdoTools

`BannerPro` передаёт выборку в pdoFetch, поэтому поддерживает основные параметры pdoTools.

| Параметр | Описание |
| --- | --- |
| `limit` | Лимит выборки |
| `offset` | Смещение |
| `sortdir` | `ASC` или `DESC` |
| `where` | JSON с дополнительными условиями xPDO |
| `innerJoin` | JSON с дополнительными join |
| `select` | JSON с дополнительными полями select |
| `tplWrapper` | Обёртка с плейсхолдером `output` |
| `tplOuter` | Алиас `tplWrapper` |
| `wrapIfEmpty` | Выводит обёртку при пустом результате |
| `toPlaceholder` | Записывает итог в плейсхолдер |
| `toSeparatePlaceholders` | Записывает баннеры в отдельные плейсхолдеры |
| `outputSeparator` | Разделитель между баннерами |
| `fastMode` | Быстрый рендер чанков pdoTools |
| `showLog` | Выводит лог pdoFetch для сессии `mgr` |

## Плейсхолдеры

| Плейсхолдер | Что содержит |
| --- | --- |
| `id` | ID баннера |
| `name` | Название баннера |
| `url` | URL перехода после клика |
| `click_url` | Готовый URL учёта клика (`/{bannerpro_click}/{adposition}` + UTM при включённых настройках) |
| `type` | `image` или `html` |
| `image` | Полный URL изображения |
| `html` | HTML-код баннера |
| `source` | ID Media Source |
| `active` | `0` или `1` |
| `description` | Описание баннера |
| `start`, `end` | Даты показа |
| `adposition` | ID связи `bannerpro_ads_positions` |
| `ad` | ID баннера в связи |
| `position_name` | Имя позиции |
| `idx` | Номер строки в выдаче |
| `weight` | Вес связи баннер + позиция |
| `product_id` | ID товара MiniShop3 |
| `product_title` | `pagetitle` товара |
| `product_url` | Полный URL товара |
| `product_price` | TV `price` |
| `product_old_price` | TV `old_price` |
| `product_thumb` | TV `thumb` или `image` |

Дополнительные параметры вызова, которых нет в свойствах сниппета, тоже попадают в плейсхолдеры строки.

## Примеры

### Один случайный баннер

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'limit' => 1,
  'sortby' => 'RAND()'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &limit=`1`
  &sortby=`RAND()`
]]
```

:::

### Несколько позиций

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar,footer',
  'tpl' => 'byAd',
  'sortby' => 'idx',
  'sortdir' => 'ASC'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar,footer`
  &tpl=`byAd`
  &sortby=`idx`
  &sortdir=`ASC`
]]
```

:::

### JSON-фильтр

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'where' => '{"byAd.name:LIKE":"%акция%"}'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &where=`{"byAd.name:LIKE":"%акция%"}`
]]
```

:::

### Обёртка блока

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'tplWrapper' => '@INLINE <div class="banners">{$output}</div>'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &tplWrapper=`@INLINE <div class="banners">[[+output]]</div>`
]]
```

:::

### Вывод в плейсхолдер

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'toPlaceholder' => 'sidebarBanners'
]}
{$_modx->getPlaceholder('sidebarBanners')}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &toPlaceholder=`sidebarBanners`
]]
[[+sidebarBanners]]
```

:::

### A/B-деление

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'hero',
  'sortby' => 'ab',
  'limit' => 1
]}
```

```modx
[[!BannerPro?
  &positionName=`hero`
  &sortby=`ab`
  &limit=`1`
]]
```

:::

Работает только при ровно двух баннерах в позиции. TTL cookie задаёт `bannerpro_ab_ttl`.

### Фильтр по контексту

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'context' => 'web',
  'tpl' => 'byAd'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &context=`web`
  &tpl=`byAd`
]]
```

:::

### Фильтр по меткам

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tags' => 'sale,promo',
  'tpl' => 'byAd'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tags=`sale,promo`
  &tpl=`byAd`
]]
```

:::

## Пример чанка

::: code-group

```fenom
<article class="banner" data-banner-id="{$id}" data-adposition="{$adposition}">
  <a class="banner__link"
     href="{$click_url|escape:'html'}"
     {if $description}title="{$description|escape}"{/if}>
    {if $image}
      <img class="banner__image" src="{$image}" alt="{$name|escape}" loading="lazy" />
    {else}
      <span class="banner__title">{$name|escape}</span>
    {/if}
  </a>
</article>
```

```modx
<article class="banner" data-banner-id="[[+id]]">
  <a href="[[+click_url]]" title="[[+description]]">
    <img src="[[+image]]" alt="[[+name]]" loading="lazy" />
  </a>
</article>
```

:::

## Ошибка pdoTools

Если pdoTools не установлен, сниппет вернёт:

```text
You need to install pdoTools to use this snippet!
```

Установите pdoTools и очистите кэш MODX.
