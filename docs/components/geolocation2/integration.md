---
title: Интеграция
description: Менеджер gl_*, модель данных, CSV, PHP-сервис GeoLocation2, обновление SxGeo
---

# Интеграция

## Менеджер в админке

**Компоненты → GeoLocation2** — вкладки:

| Вкладка | Таблица | Содержимое |
|---------|---------|------------|
| Страны | `gl_countries` | ISO, timezone, страна по умолчанию |
| Регионы | `gl_regions` | Регион, привязка к стране |
| Города | `gl_cities` | Город, регион, координаты, признак «основной» |
| Данные | `gl_data` | Контакты, адрес, изображение, alt-название для города |

Импорт и экспорт CSV доступны из интерфейса менеджера (страны, регионы, города). Формат файлов описан ниже — он относится к справочнику городов, для стран и регионов используются те же правила.

### CSV городов

Импорт и экспорт cities обрабатывают процессоры `GlCity/ImportCsv` и `GlCity/ExportCsv`.

| Правило | Поведение |
|---------|-----------|
| Разделитель | Определяется по строке: если в строке есть `;`, берётся `;`, иначе `,` |
| Обязательные колонки | `region_id` и `name_ru`. Без них строка пропускается с ошибкой `geolocation2_csv_err_line` |
| Необязательные колонки | `id`, `name_en`, `lat`, `lon`, `okato`, `default`, `active` |
| Булевы колонки | `default` и `active` понимают `1`, `true`, `yes`, `y` |
| Ключ обновления | Пара `region_id` + `name_ru`: существующий город обновляется, новый создаётся |
| Регион | Должен существовать в `gl_regions`, иначе строка пропускается с ошибкой |
| Координаты | `lat` и `lon` проходят через `CoordinateSanitizer`: тильда `~`, запятая и пробелы допустимы, значение нормализуется в число |

Импорт собирает список пропущенных строк и отдаёт его в ответе вместе с числом обработанных записей.

## Модель данных

```
gl_countries
  └── gl_regions
        └── gl_cities
              └── gl_data (0..n записей на город)
```

Сессия пользователя (`$_SESSION['geolocation2']`, ключ константой `GeoLocation2::SESSION_KEY`):

| Поле сессии | Назначение |
|-------------|------------|
| `city_id` | ID из `gl_cities` |
| `confirmed` | Пользователь подтвердил или выбрал город |
| `prompt_done` | Модалку показали, дальше выбор не повторяют |
| `csrf` | Токен для POST в `action.php` |

## PHP-сервис

```php
/** @var \GeoLocation2\GeoLocation2 $gl2 */
$gl2 = $modx->services->get('GeoLocation2');

// состояние сессии: city_id, confirmed, prompt_done, csrf
$state = $gl2->getSessionGeo();
$cityId = (int) ($state['city_id'] ?? 0);

// записать город и подтвердить выбор
$gl2->mergeSessionGeo(['city_id' => 8, 'confirmed' => 1]);

// город по умолчанию из gl_cities
$default = $gl2->getDefaultCityRow();
```

Сервис лежит в `core/components/geolocation2/src/GeoLocation2.php`, класс `GeoLocation2\GeoLocation2`. Публичные методы: `getSessionGeo()`, `mergeSessionGeo()`, `isConfirmed()`, `markConfirmed()`, `getOrCreateCsrfToken()`, `validateCsrfToken()`, `getDefaultCityRow()`, `getCountry()`, `getCity()`, `getCityFull()`, `getCityFullByIp()`, `findGlCityFromSxGeo()`, `buildWebPlaceholders()`.

## SxGeo

Файл базы:

```text
assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat
```

При `geolocation2_detect_method = sxgeo` первый визит без сессии: IP → SxGeo → сопоставление с `gl_cities` (по названию/региону, логика в сервисе).

### Обновление SxGeo

**CLI** (из корня MODX):

```bash
php core/components/geolocation2/bin/update-sxgeo.php
```

**Scheduler** (MODX 3): задача `geolocation2_update_sxgeo`. Включите `geolocation2_sxgeo_auto_update` и задайте `geolocation2_sxgeo_update_interval_days`.

После обновления перезапуск PHP-FPM не обязателен: подхватывается новый `.dat` при следующем обращении к SxGeo.

## Fenom и плейсхолдеры

Текущий город в шаблоне:

::: code-group

```fenom
{$_modx->runSnippet('!GeoLocation2Current', ['tpl' => 'tpl.GeoLocation2.current'])}
```

```modx
[[!GeoLocation2Current? &tpl=`tpl.GeoLocation2.current`]]
```

:::

Плейсхолдеры чанка зависят от `tpl`; в `tpl.GeoLocation2.current` обычно есть `[[+city_name]]`, `[[+region_name]]`, `[[+country_name]]`.

## Связь с miniShop и доставкой

GeoLocation2 не меняет корзину сам. Типичная схема:

1. Пользователь выбирает город в модалке.
2. `city_id` из сессии передаёте в сниппет доставки или в options заказа.
3. `gl_data` используйте для телефона/адреса пункта выдачи в выбранном городе.

## Чанки пакета

| Чанк | Назначение |
|------|------------|
| `tpl.GeoLocation2.current` | Текущий город (кнопка открытия модалки) |
| `tpl.GeoLocation2.modal` | Разметка модалки Bootstrap 5 |
| `tpl.GeoLocation2.modal.item` | Строка города в списке модалки |
| `tpl.GeoLocation2.item` | Строка в списке `GeoLocation2` |
| `tpl.GeoLocation2.location` | Вывод SxGeo lookup |
| `tpl.GeoLocation2.data.item` | Строка таблицы `gl_data` |
| `tpl.GeoLocation2.data.current` | Карточка `gl_data` для текущего города |

См. [Web API](api-action) и [сниппеты](snippets/).
