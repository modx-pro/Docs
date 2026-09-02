---
title: GeoLocation2
description: Список активных городов из gl_cities
---

# GeoLocation2

Выводит список **активных** городов из `gl_cities`. Каждая строка — один проход чанка `tpl`. Сессию и модалку не трогает: статический справочник для меню, карты сайта или подсказок в шаблоне.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.GeoLocation2.item` | Чанк одной строки |
| `sortby` | `name_ru` | Поле сортировки (`name_ru`, `name_en`, `id`, …) |
| `sortdir` | `ASC` | `ASC` или `DESC` |
| `limit` | `10` | Максимум строк; `0` — все активные |
| `region_id` | *(пусто)* | Фильтр по `gl_regions.id` |
| `outputSeparator` | перевод строки | Между строками |
| `toPlaceholder` | *(пусто)* | Имя плейсхолдера вместо вывода |

## Вызов

::: code-group

```modx
[[!GeoLocation2]]
[[!GeoLocation2? &limit=`0` &sortby=`name_ru`]]
[[!GeoLocation2? &region_id=`5` &limit=`20`]]
```

```fenom
{'!GeoLocation2' | snippet}
{'!GeoLocation2' | snippet : ['limit' => 0, 'region_id' => 5]}
```

:::

## Пример вывода

Чанк по умолчанию `tpl.GeoLocation2.item` для двух городов:

```html
<p>
    <strong>Москва</strong>
    Moscow — id региона: 1
    55.7558 37.6173
</p>
<p>
    <strong>Казань</strong>
    Kazan — id региона: 2
    55.7963 49.1088
</p>
```

Плейсхолдеры строки — поля `GlCity`: `id`, `name_ru`, `name_en`, `region_id`, `lat`, `lon`, `active`, `default` и др.

## Свой чанк — ссылки на город

::: code-group

```modx
<a href="[[~42]]?city=[[+id]]">[[+name_ru]]</a>
```

```fenom
<a href="{$_modx->makeUrl(42)}?city={$id}">{$name_ru}</a>
```

:::

Логику «выбрать город по клику» лучше вешать на [GeoLocation2Modal](GeoLocation2Modal) или свой JS с `action=save`.

## Отличие от модалки

| | GeoLocation2 | GeoLocation2Modal |
|---|--------------|-------------------|
| Источник | Только `gl_cities` | Сессия + SxGeo + API search |
| Кеш страницы | Можно кешировать список отдельно | Modal/Initialize — некэшированно |
| Выбор города | Нет | Да |

См. [GeoLocation2Modal](GeoLocation2Modal).
