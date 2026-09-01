---
title: YandexMapsLocator
description: 'Сниппет YandexMapsLocator: карта, список точек, поиск, режимы return'
---

# YandexMapsLocator

Единственный сниппет Free. Рисует форму поиска, список точек и карту Яндекса. HTML собирают Fenom-чанки, JS держит список и маркеры синхронно.

Pro сниппет не подменяет: те же параметры, плюс фильтры и поля из [Pro](../pro/).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `parents` | *(пусто)* | ID родителей через запятую |
| `limit` | `0` | Лимит (0: без ограничения) |
| `offset` | `0` | Смещение |
| `radius` | `0` | Радиус, км (0 → `yandexmapslocator_default_radius`) |
| `sortby` | `pagetitle` | `pagetitle`, `distance`, `menuindex`, `id`, … |
| `sortdir` | `ASC` | `ASC` или `DESC` |
| `tpl` | `yandexmapslocator.store` | Чанк одной точки |
| `tplOuter` | `yandexmapslocator.outer` | Обёртка |
| `tplSearch` | `yandexmapslocator.search` | Форма поиска |
| `tplEmpty` | `yandexmapslocator.empty` | Пустой результат |
| `tplError` | `yandexmapslocator.error` | Ошибка |
| `includeTVs` | *(пусто)* | Доп. TV в плейсхолдеры точки |
| `context` | *(текущий)* | Context key или список через запятую |
| `where` | *(пусто)* | JSON-условие для ресурсов (**только сниппет**). В `search.php` и REST запрещён |
| `filters` | *(пусто)* | Имена фильтров через запятую или JSON |
| `category` | *(пусто)* | Значение категории |
| `amenity` / `amenities` | *(пусто)* | **Pro:** теги удобств через запятую |
| `brand` | *(пусто)* | **Pro:** фильтр по TV `yandexmaps_brand` |
| `return` | `chunks` | `chunks`, `data`, `json` |
| `latitude`, `longitude` | *(пусто)* | Стартовые координаты для радиуса/сортировки |
| `address` | *(пусто)* | Адрес для геокодирования на сервере |
| `productId` / `product_id` | *(пусто)* | **Pro:** ID товара MiniShop3 (сам включает фильтр). Без Pro сбрасывается |

## Режимы `return`

| Значение | Результат |
|----------|-----------|
| `chunks` | HTML локатора (по умолчанию) |
| `data` | Плейсхолдеры `yandexmapslocator.stores` (массив) и `yandexmapslocator.count` |
| `json` | JSON `{ success, results }` без обёртки чанков |

`return=json` на том же сайте — не REST Pro. Нет CORS, `fields` и Bearer.

## Фильтры

| Фильтр | Пакет | Как включить |
|--------|-------|--------------|
| `category` | Free | `filters=category` + параметр `category` |
| `working_now` | Pro | `filters=working_now` или `working_now=1` |
| `minishop_product` | Pro | `productId` (явный `filters=minishop_product` не обязателен) |
| `amenity` | Pro | `amenity` / `amenities` |
| `brand` | Pro | `brand` |

## Плейсхолдеры чанка точки (`tpl`)

| Переменная | Описание |
|------------|----------|
| `{$id}` | ID ресурса |
| `{$pagetitle}`, `{$longtitle}`, `{$description}` | Поля ресурса |
| `{$url}` | Ссылка на ресурс |
| `{$address}` | Адрес |
| `{$latitude}`, `{$longitude}` | Координаты |
| `{$phone}`, `{$email}`, `{$working_hours}` | Контакты |
| `{$working_hours_formatted}`, `{$working_hours_compact}` | Расписание (plain text) |
| `{$working_hours_compact_html}` | Компактное HTML (`\| raw` в Fenom) |
| `{$is_open_now}` | **Pro:** открыто ли сейчас |
| `{$category}` | Категория |
| `{$balloon_image}`, `{$marker_icon}` | Медиа |
| `{$distance_formatted}` | Расстояние (если задан центр поиска) |
| `{$idx}` | Порядковый номер |

Иконка маршрута в default-чанке: `{$_modx->config['assets_url']}components/yandexmapslocator/img/yandex-navigator.svg`.

Lexicon: `{'yandexmapslocator_route' | lexicon}`.

## Примеры

### Базовый вывод

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'radius' => 50,
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &radius=`50`
    &sortby=`distance`
]]
```

:::

### Поиск от адреса на сервере

Геокодирует `address` и сортирует точки по расстоянию (нужен `yandexmapslocator_api_key`).

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'address' => 'Омск, ул. Ленина, 25',
    'radius' => 20,
    'sortby' => 'distance',
    'limit' => 15
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &address=`Омск, ул. Ленина, 25`
    &radius=`20`
    &sortby=`distance`
    &limit=`15`
]]
```

:::

### Ближайшие от координат

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'latitude' => 55.03,
    'longitude' => 82.92,
    'radius' => 30,
    'sortby' => 'distance',
    'limit' => 20
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &latitude=`55.03`
    &longitude=`82.92`
    &radius=`30`
    &sortby=`distance`
    &limit=`20`
]]
```

:::

### Несколько контейнеров

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => '120,121,122',
    'sortby' => 'pagetitle'
]}
```

```modx
[[!YandexMapsLocator? &parents=`120,121,122` &sortby=`pagetitle`]]
```

:::

### Категория

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'category' => 'аптека',
    'filters' => 'category'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`аптека`
    &filters=`category`
]]
```

:::

### Режим `return=data`

Список точек в плейсхолдерах (свой шаблон рядом со сниппетом).

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'return' => 'data',
    'limit' => 10
]}
{foreach $yandexmapslocator.stores as $store}
    <li><a href="{$store.url}">{$store.pagetitle}</a> {$store.address}</li>
{/foreach}
<p>Всего: {$yandexmapslocator.count}</p>
```

```modx
[[!YandexMapsLocator? &parents=`42` &return=`data` &limit=`10`]]
```

:::

В MODX-чанке обходите плейсхолдер через Fenom или свой сниппет: массив лежит в `yandexmapslocator.stores`.

### Режим `return=json`

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'return' => 'json'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &return=`json`]]
```

:::

Фрагмент ответа:

```json
{
  "success": true,
  "results": [
    {
      "id": 15,
      "pagetitle": "Магазин на Ленина",
      "address": "ул. Ленина, 25",
      "latitude": 54.98,
      "longitude": 73.36
    }
  ]
}
```

Для CORS и headless используйте [REST Pro](../pro/api), не этот режим.

### `where` (только сниппет)

JSON-условие xPDO. В `search.php` и REST запрещено.

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'where' => '{"template":5}'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &where=`{"template":5}`
]]
```

:::

### Доп. TV в карточке

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'includeTVs' => 'metro_station,parking'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &includeTVs=`metro_station,parking`
]]
```

:::

В чанке: `{$metro_station}`, `{$parking}`.

### Контекст

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 2080,
    'context' => 'en'
]}
```

```modx
[[!YandexMapsLocator? &parents=`2080` &context=`en`]]
```

:::

### Только открытые сейчас (Pro)

Задайте TZ на точке (`yandexmaps_timezone`) или сеть `yandexmapslocator_timezone`. Иначе «сейчас» считается в `Europe/Moscow`.

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'filters' => 'working_now'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &filters=`working_now`]]
```

:::

### Категория + открытые (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'category' => 'аптека',
    'filters' => 'category,working_now'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`аптека`
    &filters=`category,working_now`
]]
```

:::

### Карточка товара MiniShop3 (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
]]
```

:::

### Самовывоз + только открытые (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'working_now',
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`working_now`
    &sortby=`distance`
]]
```

:::

### Свой чанк с бейджем Pro

В `tpl` (фрагмент):

```fenom
{if isset($is_open_now)}
    <span class="yml-store__status {if $is_open_now}is-open{else}is-closed{/if}">
        {if $is_open_now}
            {'yandexmapslocator_open_now' | lexicon}
        {else}
            {'yandexmapslocator_closed_now' | lexicon}
        {/if}
    </span>
{/if}
{if $working_hours_compact_html?}
    <p class="yml-store__hours">{$working_hours_compact_html | raw}</p>
{/if}
```

См. [Открыто сейчас](../pro/working-now), [MiniShop3](../pro/minishop3), [Интерфейс](../frontend).
