---
title: GeoLocation2Location
description: Геолокация посетителя по IP через SxGeo
---

# GeoLocation2Location

Берёт IP посетителя (или параметр `ip`), читает локальную базу SxGeo и рендерит чанк с плоскими плейсхолдерами `city_*`, `region_*`, `country_*`. Справочник `gl_cities` и сессию не меняет.

Полезно для отладки SxGeo, блока «мы определили ваш регион» без модалки или A/B-теста до внедрения [GeoLocation2Modal](GeoLocation2Modal).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.GeoLocation2.location` | Чанк вывода |
| `ip` | IP посетителя | Явный IP (тест с `8.8.8.8`) |
| `toPlaceholder` | *(пусто)* | Плейсхолдер вместо echo |

## Вызов

::: code-group

```modx
[[!GeoLocation2Location]]
[[!GeoLocation2Location? &ip=`8.8.8.8`]]
```

```fenom
{'!GeoLocation2Location' | snippet}
{'!GeoLocation2Location' | snippet : ['ip' => '8.8.8.8']}
```

:::

## Как формируются плейсхолдеры

1. `getCityFullByIp()` → вложенный массив SxGeo.
2. Массив «сплющивается» в ключи вида `city_name_ru`, `region_name_ru`.
3. `processData()` добавляет HTML-обёртки: `city_name_ru_html`, `country_iso_html` и т.д.

Набор ключей зависит от редакции `SxGeoCity.dat`. Типичные:

| Плейсхолдер | Пример |
|-------------|--------|
| `city_name_ru` | Москва |
| `region_name_ru` | Москва |
| `country_name_ru` | Россия |
| `country_iso` | RU |
| `city_name_ru_html` | `<span>Москва</span>` (после processData) |

При `geolocation2_debug=1` смотрите сырой ответ в журнале, если чанк пустой.

## Пример вывода

Чанк `tpl.GeoLocation2.location`:

```html
<div class="geolocation2-location">
    <span>Москва</span>
    <span>Moscow</span>
    <span>Москва</span>
    <span>Россия</span>
    <span>RU</span>
</div>
```

## Пустой результат

Сниппет вернёт пустую строку, если:

- нет файла `SxGeoCity.dat`;
- IP не найден (часто `127.0.0.1` на localhost);
- сервис GeoLocation2 не зарегистрирован.

Добавьте fallback в чанк:

::: code-group

```modx
[[!GeoLocation2Location:notempty=`
  <p>Ваш регион: [[+city_name_ru]]</p>
`:default=`
  <p>Регион не определился</p>
`]]
```

```fenom
{$geo = '!GeoLocation2Location' | snippet}
{if $geo}
  <div class="geolocation2-location-fallback">{$geo}</div>
{else}
  <p>Регион не определился</p>
{/if}
```

:::

## SxGeo vs модалка

| | GeoLocation2Location | GeoLocation2Modal |
|---|----------------------|-------------------|
| Данные | Только SxGeo | SxGeo + `gl_cities` + сессия |
| Сохранение выбора | Нет | Да |
| Сопоставление с справочником | Нет | `findGlCityFromSxGeo()` |

См. [Интеграция → SxGeo](../integration), [FAQ](../faq).
