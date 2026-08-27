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

Импорт и экспорт CSV доступны из интерфейса менеджера (страны, регионы, города).

## Модель данных

```
gl_countries
  └── gl_regions
        └── gl_cities
              └── gl_data (0..n записей на город)
```

Сессия пользователя (`$_SESSION['gl2']`, ключ задаётся сервисом):

| Поле сессии | Назначение |
|-------------|------------|
| `city_id` | ID из `gl_cities` |
| `confirmed` | Пользователь подтвердил или выбрал город |
| `dismissed` | Модалку закрыли без выбора (если применимо) |
| `csrf` | Токен для POST в `action.php` |

## PHP-сервис

```php
/** @var \GeoLocation2\Service\GeoLocation2 $gl2 */
$gl2 = $modx->services->get('GeoLocation2');

$cityId = $gl2->getCurrentCityId();
$state = $gl2->getSessionState();
$gl2->setCity($cityId, true);
```

Методы и события смотрите в исходниках `core/components/geolocation2/src/Service/`.

## SxGeo

Файл базы:

```text
assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat
```

При `geolocation2_detect_method = sxgeo` первый визит без сессии: IP → SxGeo → сопоставление с `gl_cities` (по названию/региону, логика в сервисе).

### Обновление SxGeo

**CLI** (из корня MODX):

```bash
php assets/components/geolocation2/bin/update-sxgeo.php
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
