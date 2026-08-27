---
title: Integration
description: gl_* manager, data model, CSV, GeoLocation2 PHP service, SxGeo update
---

# Integration

## Manager

**Components → GeoLocation2** tabs:

| Tab | Table | Content |
|-----|-------|---------|
| Countries | `gl_countries` | ISO, timezone, default country |
| Regions | `gl_regions` | Region linked to country |
| Cities | `gl_cities` | City, region, coordinates, default flag |
| Data | `gl_data` | Contacts, address, image, alt name for a city |

CSV import and export are available in the manager UI.

## Data model

```
gl_countries
  └── gl_regions
        └── gl_cities
              └── gl_data (0..n per city)
```

User session (`$_SESSION['gl2']`, key from service):

| Session field | Purpose |
|---------------|---------|
| `city_id` | ID from `gl_cities` |
| `confirmed` | User confirmed or picked a city |
| `dismissed` | Modal closed without choice (when applicable) |
| `csrf` | Token for POST to `action.php` |

## PHP service

```php
/** @var \GeoLocation2\Service\GeoLocation2 $gl2 */
$gl2 = $modx->services->get('GeoLocation2');

$cityId = $gl2->getCurrentCityId();
$state = $gl2->getSessionState();
$gl2->setCity($cityId, true);
```

See `core/components/geolocation2/src/Service/` for methods and events.

## SxGeo

Database file:

```text
assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat
```

With `geolocation2_detect_method = sxgeo`, first visit without session: IP → SxGeo → match against `gl_cities`.

### SxGeo update

**CLI** (from MODX root):

```bash
php assets/components/geolocation2/bin/update-sxgeo.php
```

**Scheduler** (MODX 3): task `geolocation2_update_sxgeo`. Enable `geolocation2_sxgeo_auto_update` and set `geolocation2_sxgeo_update_interval_days`.

PHP-FPM restart is not required: new `.dat` is picked up on next SxGeo read.

## Fenom and placeholders

Current city in template:

::: code-group

```fenom
{$_modx->runSnippet('!GeoLocation2Current', ['tpl' => 'tpl.GeoLocation2.current'])}
```

```modx
[[!GeoLocation2Current? &tpl=`tpl.GeoLocation2.current`]]
```

:::

Chunk placeholders depend on `tpl`; `tpl.GeoLocation2.current` usually exposes `[[+city_name]]`, `[[+region_name]]`, `[[+country_name]]`.

## miniShop and delivery

GeoLocation2 does not change the cart. Typical flow:

1. User picks a city in the modal.
2. Pass `city_id` from session to a delivery snippet or order options.
3. Use `gl_data` for phone/address of a pickup point in the selected city.

## Package chunks

| Chunk | Purpose |
|-------|---------|
| `tpl.GeoLocation2.current` | Current city (modal trigger) |
| `tpl.GeoLocation2.modal` | Bootstrap 5 modal markup |
| `tpl.GeoLocation2.modal.item` | City row in modal list |
| `tpl.GeoLocation2.item` | Row in `GeoLocation2` list |
| `tpl.GeoLocation2.location` | SxGeo lookup output |
| `tpl.GeoLocation2.data.item` | `gl_data` table row |
| `tpl.GeoLocation2.data.current` | `gl_data` card for current city |

See [Web API](api-action) and [snippets](snippets/).
