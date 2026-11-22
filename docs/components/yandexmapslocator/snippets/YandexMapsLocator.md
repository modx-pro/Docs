---
title: YandexMapsLocator
description: 'Сниппет YandexMapsLocator: карта, список точек, поиск, режимы return'
---

# YandexMapsLocator

Единственный сниппет Free. Выводит форму поиска, список точек и карту Яндекса. HTML собирают Fenom-чанки, JS держит список и маркеры синхронно.

Pro сниппет не подменяет: те же параметры, плюс фильтры и поля из [Pro](../pro/).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `parents` | *(пусто)* | ID родителей через запятую |
| `limit` | `0` | Лимит (0: без ограничения) |
| `offset` | `0` | Смещение |
| `radius` | `0` | Радиус, км (0 → `yandexmapslocator_default_radius`) |
| `sortby` | `pagetitle` | `pagetitle`, `distance`, `menuindex`, `createdon`, `id`. Всё, что не в списке, приводится к `pagetitle` |
| `sortdir` | `ASC` | `ASC` или `DESC` |
| `tpl` | `yandexmapslocator.store` | Чанк одной точки |
| `tplOuter` | `yandexmapslocator.outer` | Обёртка |
| `tplSearch` | `yandexmapslocator.search` | Форма поиска |
| `tplEmpty` | `yandexmapslocator.empty` | Пустой результат |
| `tplError` | `yandexmapslocator.error` | Ошибка |
| `includeTVs` | *(пусто)* | Доп. TV в плейсхолдеры точки |
| `context` / `contexts` | *(текущий)* | Context key или список через запятую. Алиас `contexts` читается так же |
| `where` | *(пусто)* | JSON-условие xPDO поверх `parent` / `published` / `deleted` / контекста. Только сниппет. В `search.php` и REST запрещён |
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

`return=json` на том же сайте: не REST Pro. Нет CORS, `fields` и Bearer.

## Фильтры

| Фильтр | Пакет | Как включить |
|--------|-------|--------------|
| `category` | Free | параметр `category`. `filters=category` не нужен |
| `working_now` | Pro | только `filters=working_now`. Параметр `working_now=1` не читается |
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
| `{$working_hours_compact_html}` | Компактное HTML. В чанке пакета: `{raw $ymlHoursHtml}` |
| `{$is_open_now}` | **Pro:** открыто ли сейчас |
| `{$category}` | Категория |
| `{$context_key}` | Контекст ресурса |
| `{$balloon_image}`, `{$marker_icon}` | Медиа |
| `{$distance}` | Число, км. `null`, если расстояние не считали |
| `{$distance_km}` | Строка с единицами: «0.4 км». Пусто, если расстояние не считали |
| `{$distance_m}` | Строка с единицами: «400 м». Пусто, если расстояние не считали |
| `{$distance_formatted}` | Расстояние в единице `distance_unit` |
| `{$timezone}`, `{$amenities}`, `{$brand}` | **Pro:** из extra точки |
| `{$ms3_product_ids}` | **Pro:** ID товаров. `{$ms3_product_id}` только если заполнен прежний TV |
| `{$idx}` | Порядковый номер |

Иконка маршрута в чанке пакета: `{$_modx->config['assets_url']}components/yandexmapslocator/img/yandex-navigator.svg`.

Lexicon: `{'yandexmapslocator_route' | lexicon}`.

## Плейсхолдеры чанка обёртки (`tplOuter`)

| Переменная | Тип | Куда уходит в чанке `yandexmapslocator.outer` |
|------------|-----|---------------------------------------------|
| `{$search}` | string | Готовый HTML формы: результат рендера `tplSearch` |
| `{$stores}` | string | Готовый HTML точек или заглушки `tplEmpty` |
| `{$parents}` | string | ID родителей из критериев. В чанке ставит `data-yml-parents` |
| `{$is_empty}` | boolean | Выдача пуста. В чанке ставит `data-yml-empty` |
| `{$map_config}` | string | JSON конфига карты. В чанке это тело `<script data-yml-config>` |
| `{$stores_json}` | string | JSON массива точек. В чанке это тело `<script data-yml-stores>` |
| `{$assets_url}` | string | Корень файлов пакета. В чанке идёт в `css/locator.css` и `js/locator.js` |
| `{$assets_version}` | string | Версия пакета. В чанке идёт в query-строку обоих файлов как `?v=` |

В `{$search}` форма собрана с одним плейсхолдером: `{$address}` из критериев, чтобы поле поиска держало введённый адрес. URL для запроса JS берёт из `{$map_config}` (`searchUrl` или `apiUrl`), отдельного плейсхолдера для него нет.

## Плейсхолдер чанка ошибки (`tplError`)

| Переменная | Описание |
|------------|----------|
| `{$error}` | Текст исключения. Сниппет логирует его как `[YandexMapsLocator] …` и отдаёт вместо локатора |

Чанк `yandexmapslocator.error` отдаёт его в `<p class="yml-locator__alert" role="alert">`.

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
    'category' => 'аптека'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`аптека`
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

Для CORS и клиента вне сайта используйте [REST Pro](../pro/api), не этот режим.

### `where` (только сниппет)

JSON мержится с обязательными условиями (`parent:IN`, `published`, `deleted`, контекст). В `search.php` и REST параметр запрещён (`400 where_not_allowed`).

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

Задайте пояс на точке (`yandexmaps_timezone`) или сеть `yandexmapslocator_timezone`. Иначе «сейчас» считается в `Europe/Moscow`.

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
{if $working_hours_compact_html}
    <p class="yml-store__hours">{raw $working_hours_compact_html}</p>
{/if}
```

См. [Открыто сейчас](../pro/working-now), [MiniShop3](../pro/minishop3), [Интерфейс](../frontend).
