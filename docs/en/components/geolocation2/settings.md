---
title: System settings
description: geolocation2 namespace keys in MODX
---

# System settings

Namespace: **geolocation2**. Database keys use prefix `geolocation2_`.

## Main

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `geolocation2_debug` | boolean | `0` | Log to MODX error log |
| `geolocation2_detect_method` | text | `sxgeo` | Initial detection: `sxgeo` (IP → SxGeo) or `session` (saved session only) |

## SxGeo

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `geolocation2_sxgeo_auto_update` | boolean | `1` | Auto-update database via Scheduler |
| `geolocation2_sxgeo_update_interval_days` | number | `14` | Days between update checks |
| `geolocation2_sxgeo_last_run_at` | text | *(empty)* | Service: last task run time |
| `geolocation2_sxgeo_last_status` | text | *(empty)* | Service: last update status |
| `geolocation2_sxgeo_last_message` | text | *(empty)* | Service: last update message |
| `geolocation2_sxgeo_last_header_time` | text | *(empty)* | Service: date from downloaded file header |

Component writes `geolocation2_sxgeo_last_*` on auto-update and CLI. You normally do not edit them manually.

## Permissions

| Identifier | Purpose |
|------------|---------|
| `geolocation2_save` | Save records in GeoLocation2 manager |

See also: [Integration → SxGeo update](integration#sxgeo-update).
