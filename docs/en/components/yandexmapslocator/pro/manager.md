---
title: CSV in the manager
description: YandexMapsLocator Pro location import and export
---

# CSV in the manager

After installing Pro, open **Components → YandexMapsLocator Pro**.

Requires permission `save_document`.

## Features

- Export container locations to CSV
- Import CSV (create/update resources)

## Form fields

| Field | Description |
|------|----------|
| `parent` | Container ID (required) |
| `template` | Template for new resources (optional, import) |
| CSV | Text or file |

## CSV columns

`id`, `pagetitle`, `address`, `latitude`, `longitude`, `phone`, `email`, `category`, `working_hours`.

Export filename: `yandexmapslocator-locations.csv`, UTF-8 BOM.

### Sample rows

```csv
id,pagetitle,address,latitude,longitude,phone,email,category,working_hours
15,"Store on Lenina","Omsk, Lenina st., 25",54.9893,73.3682,"+7 3812 00-00-00",shop@example.com,pharmacy,"{""mon"":[""09:00-21:00""],""tue"":[""09:00-21:00""],""wed"":[""09:00-21:00""],""thu"":[""09:00-21:00""],""fri"":[""09:00-22:00""],""sat"":[""10:00-22:00""],""sun"":[""10:00-20:00""]}"
16,"Pickup point","Omsk, Mira ave., 10",54.9921,73.3710,"+7 3812 11-11-11",,warehouse,
```

- Empty `id` on import: creates a new resource under `parent`.
- Filled `id`: updates an existing resource (if found).
- `working_hours`: JSON in one cell (escape quotes as in CSV), or leave empty / plain text for display without open-now.

## Export context

Export searches locations in context `yandexmapslocator_default_context` (default `web`), **not** the manager context. If locations live in another context, change the setting or move resources.

## Typical flow

1. Export container `parent=42`.
2. Edit coordinates and phones in a spreadsheet.
3. Import the same CSV with the same `parent` (and `template` for new rows without `id`).
4. Check resource publication and the snippet on the site.
