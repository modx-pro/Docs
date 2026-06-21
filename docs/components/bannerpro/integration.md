---
title: Интеграция и сценарии
description: "Вывод BannerPro на сайте: чанки, ротация, кэш, клики, показы, лимиты и очистка статистики"
---

# Интеграция и сценарии

Сниппет `BannerPro` выбирает активные баннеры, рендерит их через pdoTools и отдаёт HTML для позиции. Клики обрабатывает плагин `BannerProClickout`, показы обрабатывает `BannerProImpression`.

## Базовый вывод

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

`positionName` принимает одно имя или список через запятую: `sidebar,footer`. Если вы передали `position`, сниппет игнорирует `positionName`.

## Выборка

Сниппет всегда добавляет базовые условия:

| Условие | Что делает |
| --- | --- |
| `start` / `end` | Показывает баннер только в активный период |
| `active = 1` | Скрывает выключенные баннеры, если не задан `showInactive` |
| `byAdPosition` | Берёт только баннеры, привязанные к позиции |
| `position` / `positions` / `positionName` | Фильтрует позиции |
| `max_clicks` / `max_impressions` | Скрывает баннер при достижении лимита |

Лимит кликов и показов не меняет поле `active`. Баннер просто перестаёт попадать в выборку.

## Ротация и порядок

| `sortby` | Поведение |
| --- | --- |
| `RAND()` | Случайный порядок, значение по умолчанию |
| `idx` | Порядок связи баннер + позиция |
| `weighted` | Взвешенная ротация через `RAND() * weight` |
| поле `byAd` | Сортировка по полю баннера |

Фиксированный порядок:

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'sortby' => 'idx',
  'sortdir' => 'ASC'
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &sortby=`idx`
  &sortdir=`ASC`
]]
```

:::

Взвешенная ротация:

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'sortby' => 'weighted',
  'limit' => 1
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &sortby=`weighted`
  &limit=`1`
]]
```

:::

Вес задайте в админке на связи баннер + позиция.

## Кэш HTML

`BannerPro` кэширует готовый HTML, если включена настройка `bannerpro_cache` и вызов подходит для кэша.

Сниппет не использует кэш при таких условиях:

- `sortby=RAND()`
- `sortby=weighted`
- `&cache=0`
- `&toSeparatePlaceholders`
- `&showLog=1` и активная сессия `mgr`

Принудительно отключить кэш для одного вызова:

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'sortby' => 'idx',
  'cache' => false
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &sortby=`idx`
  &cache=`0`
]]
```

:::

Ключ кэша учитывает контекст, культуру, сортировку, параметры вызова и часовой bucket. Это помогает обновлять баннеры с датами `start` и `end`.

## Чанки

В transport входят два базовых чанка:

| Чанк | Для чего |
| --- | --- |
| `byAd` | Баннер-изображение со ссылкой клика |
| `byHtml` | HTML-баннер |

Базовый чанк:

::: code-group

```fenom
<article class="banner" data-banner-id="{$id}" data-adposition="{$adposition}">
  <a class="banner__link"
     href="{$_modx->config.bannerpro_click}/{$adposition}"
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
<p>
  <a href="[[++bannerpro_click]]/[[+adposition]]" data-bannerpro-adposition="[[+adposition]]" data-bannerpro-ad-id="[[+id]]">
    <img src="[[+image]]" alt="[[+name]]" title="[[+description]]" />
  </a>
</p>
```

:::

Вызов с файловым чанком:

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => '@FILE chunks/banner.fenom.tpl',
  'fastMode' => true
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`@FILE chunks/banner.fenom.tpl`
  &fastMode=`1`
]]
```

:::

## Клики

Поток клика:

1. Посетитель открывает ссылку `/{bannerpro_click}/{adposition}`.
2. MODX не находит ресурс и вызывает `OnPageNotFound`.
3. `BannerProClickout` ищет связь `byAdPosition` по `adposition`.
4. Компонент пишет клик в `bannerpro_clicks`.
5. Компонент вызывает `OnBannerProClick`.
6. MODX перенаправляет посетителя на URL баннера.

Повторный клик с того же IP за сутки на ту же пару баннер + позиция не создаёт новую запись. Redirect и событие всё равно выполняются, в payload будет `duplicate: true`.

URL баннера поддерживает плейсхолдеры из query string:

::: code-group

```fenom
<a href="{$_modx->config.bannerpro_click}/{$adposition}?page_id={$_modx->resource.id}&utm_source=sidebar">
  <img src="{$image}" alt="{$name|escape}" />
</a>
```

```modx
<a href="[[++bannerpro_click]]/[[+adposition]]?page_id=[[*id]]&utm_source=sidebar">
  <img src="[[+image]]" alt="[[+name]]" />
</a>
```

:::

Если в админке URL равен `https://shop.example/sale?utm_campaign=[[+utm_source]]`, компонент подставит `sidebar`.

## Показы

Для показов включите настройку `bannerpro_track_impressions`.

После включения сниппет:

1. Оборачивает каждый баннер в `data-bannerpro-impression`.
2. Подключает `assets/components/bannerpro/js/impression.js`.
3. Отправляет pixel `/{bannerpro_impression}/{adposition}` при появлении баннера в viewport.
4. Вызывает `OnBannerProImpression`.
5. Отправляет браузерное событие `bannerpro:impression`.

Дубликаты показов с того же IP за сутки не пишутся в БД. В событии будет `duplicate: true`.

## Вывод в плейсхолдер

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

## Обёртка

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'tplWrapper' => '@INLINE <div class="banners banners--sidebar">{$output}</div>',
  'wrapIfEmpty' => false
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &tplWrapper=`@INLINE <div class="banners banners--sidebar">[[+output]]</div>`
  &wrapIfEmpty=`0`
]]
```

:::

## Очистка старой статистики

Retention задают настройки `bannerpro_clicks_retention_days` и `bannerpro_impressions_retention_days`.

Запуск:

```bash
php core/components/bannerpro/cron/purge.php
```

На активном сайте запускайте cron раз в сутки.

## Отладка

`showLog` работает только для авторизованных пользователей с контекстом `mgr`.

::: code-group

```fenom
{'!BannerPro' | snippet : [
  'positionName' => 'sidebar',
  'tpl' => 'byAd',
  'showLog' => true
]}
```

```modx
[[!BannerPro?
  &positionName=`sidebar`
  &tpl=`byAd`
  &showLog=`1`
]]
```

:::

В конце вывода появится блок `<pre class="pdoUsersLog">` с таймингами pdoFetch.
