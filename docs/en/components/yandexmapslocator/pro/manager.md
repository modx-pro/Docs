---
title: CSV in the manager
description: Import, export, and bulk geocode for YandexMapsLocator Pro locations
---

# CSV in the manager

After installing Pro open **Components → YandexMapsLocator Pro**.

Requires `save_document` permission.

## Features

- export container locations to CSV
- import CSV (create and update resources)
- bulk geocode for locations without coordinates
- schedule preview on the resource form ("Check schedule")

## Form fields

| Field | Description |
|-------|-------------|
| `parent` | Container ID (required) |
| `template` | Template for new resources (optional, import) |
| CSV | Text or file |

## CSV columns

14 columns:

`id`, `pagetitle`, `address`, `latitude`, `longitude`, `phone`, `email`, `category`, `working_hours`, `timezone`, `ms3_product_id`, `ms3_product_ids`, `amenities`, `brand`.

Export file: `yandexmapslocator-locations.csv`, UTF-8 with BOM.

### Example row

```csv
id,pagetitle,address,latitude,longitude,phone,email,category,working_hours,timezone,ms3_product_id,ms3_product_ids,amenities,brand
15,"Магазин на Ленина","Омск, ул. Ленина, 25",54.9893,73.3682,"+7 3812 00-00-00",shop@example.com,аптека,"{""mon"":[""09:00-21:00""],""tue"":[""09:00-21:00""],""wed"":[""09:00-21:00""],""thu"":[""09:00-21:00""],""fri"":[""09:00-22:00""],""sat"":[""10:00-22:00""],""sun"":[""10:00-20:00""]}",Asia/Omsk,,25,"wifi,card",
16,"Пункт выдачи","Омск, пр. Мира, 10",54.9921,73.3710,"+7 3812 11-11-11",,склад,,Asia/Omsk,,"25,26","parking",
```

- Empty `id` on import: new resource under `parent`.
- Filled `id`: update existing (if found).
- `working_hours`: JSON in one cell (escape quotes as in CSV) or leave empty / plain text for display without "open now".
- `timezone`: IANA per location. Empty → network `yandexmapslocator_timezone`.
- `ms3_product_ids`: comma-separated or JSON. When set, wins over `ms3_product_id`.

## Encoding

Export: UTF-8 with BOM. Import from mgr: file is sent as base64 so Cyrillic survives POST. Importer strips BOM and fixes typical double-UTF-8 in cells. If addresses on the map still look like `Ð…`, re-import CSV after updating the package.

## Export context

Export finds locations in `yandexmapslocator_default_context` (default `web`), **not** the manager context. For locations in another context change the setting or move resources.

## Typical workflow

1. Export container `parent=42`.
2. Fix coordinates, phones, `timezone`, products.
3. Import the same CSV with the same `parent` (and `template` for new rows without `id`).
4. Run bulk geocode for rows without coordinates if needed.
5. Check publication and the snippet on the site.
