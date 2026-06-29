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
| `context_key` | Фильтрует позиции по контексту MODX (текущий или `&context=`) |
| `max_clicks` / `max_impressions` | Скрывает баннер при достижении лимита |

Лимит кликов и показов не меняет поле `active`. Баннер просто перестаёт попадать в выборку.

## Ротация и порядок

| `sortby` | Поведение |
| --- | --- |
| `RAND()` | Случайный порядок, значение по умолчанию |
| `idx` | Порядок связи баннер + позиция |
| `weighted` | Взвешенная ротация через `RAND() * weight` |
| `ab` | Sticky A/B 50/50 при ровно двух баннерах в слоте |
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

## A/B split

При `sortby=ab` компонент делает sticky split 50/50 между **ровно двумя** баннерами в одной позиции (после фильтров расписания, лимитов и таргетинга):

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

| Поведение | Описание |
| --- | --- |
| Первый визит | Случайный выбор одного из двух баннеров |
| Повторные визиты | Тот же баннер по cookie `bannerpro_ab_{positionId}` |
| Не 2 баннера | A/B не применяется, выводятся все подходящие |
| Кэш сниппета | Отключён (как для `RAND()` и `weighted`) |
| TTL cookie | `bannerpro_ab_ttl` (дней, по умолчанию 30) |

## Контекст MODX

Позиция может иметь поле `context_key` (`web`, `mgr`, …). Пустое значение означает все контексты.

Сниппет фильтрует позиции по текущему контексту. Явный override:

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

Ключ кэша учитывает effective context. Два вызова с разным `context` на одной странице не делят один кэш.

## Таргетинг

В админке на баннере задают ограничения показа. Сниппет применяет их автоматически:

| Механизм | Поле / параметр | Что делает |
| --- | --- | --- |
| Расписание | `show_hours` | Дни недели и часы показа в рамках `start` / `end` |
| Страница | `target_resource_id` | Баннер только на указанном ресурсе |
| Раздел | `target_parent_id` | Баннер на дочерних страницах раздела |
| Метки | `&tags=`, `tagsMode` | Фильтр по JSON-меткам баннера |

Таргетинг по странице/разделу в админке: либо конкретный ресурс, либо дочерние страницы раздела, не оба сразу.

Фильтр по меткам в вызове:

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

При `&tags=` баннер без меток не попадёт в выборку.

## Кэш HTML

`BannerPro` кэширует готовый HTML, если включена настройка `bannerpro_cache` и вызов подходит для кэша.

Сниппет не использует кэш при таких условиях:

- `sortby=RAND()`
- `sortby=weighted`
- `sortby=ab`
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

Ключ кэша учитывает контекст, культуру, сортировку, параметры вызова и часовой bucket. Кэш сбрасывается при смене периода показа (`start` / `end`).

## Чанки

В transport входят два базовых чанка:

| Чанк | Для чего |
| --- | --- |
| `byAd` | Баннер-изображение со ссылкой клика |
| `byHtml` | HTML-баннер |

В чанке `byAd` и `byHtml` ссылку клика берите из `click_url` (clickout + UTM при включённых настройках):

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
<article class="banner" data-banner-id="[[+id]]" data-adposition="[[+adposition]]">
  <a class="banner__link" href="[[+click_url]]" title="[[+description]]">
    <img class="banner__image" src="[[+image]]" alt="[[+name]]" loading="lazy" />
  </a>
</article>
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

1. Посетитель открывает ссылку из `click_url` → `/{bannerpro_click}/{adposition}`.
2. MODX не находит ресурс и вызывает `OnPageNotFound`.
3. `BannerProClickout` ищет связь `byAdPosition` по `adposition`.
4. Компонент пишет клик в `bannerpro_clicks`.
5. Компонент вызывает `OnBannerProClick`.
6. MODX перенаправляет посетителя на URL баннера.

Повторный клик с того же IP за сутки на ту же пару баннер + позиция не создаёт новую запись. Redirect и событие всё равно выполняются, в payload будет `duplicate: true`.

URL баннера поддерживает плейсхолдеры из query string:

::: code-group

```fenom
<a href="{$click_url|escape:'html'}?page_id={$_modx->resource.id}">
  <img src="{$image}" alt="{$name|escape}" />
</a>
```

```modx
<a href="[[+click_url]]?page_id=[[*id]]">
  <img src="[[+image]]" alt="[[+name]]" />
</a>
```

:::

### UTM на redirect

Настройки `bannerpro_utm_*` добавляют UTM к URL редиректа при клике. См. [Системные настройки](settings#utm-при-клике). UTM из настроек не перезаписывают уже существующие query-параметры в URL баннера.

Если в админке URL равен `https://shop.example/sale?utm_campaign=[[+utm_source]]`, компонент подставит `sidebar`.

## Показы

Для показов включите настройку `bannerpro_track_impressions`.

При `bannerpro_impression_lazy = 1` (по умолчанию) `impression.js` подключается через IntersectionObserver, а не блокирующим `<script>` в head.

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
