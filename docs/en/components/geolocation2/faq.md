---
title: FAQ
description: GeoLocation2 — SxGeo, modal, CSRF, catalog
---

# FAQ

## Modal does not open

- Is `[[!GeoLocation2Initialize]]` on the page?
- Is Bootstrap 5 loaded (theme or `loadBootstrap=1` on Initialize)?
- Does the current-city chunk have `data-gl2-open="1"`?

## SxGeo picks wrong city

- Update `SxGeoCity.dat` — [CLI or Scheduler](integration#sxgeo-update).
- Check `gl_cities` names: matching uses the catalog, not free text.
- On local `127.0.0.1` SxGeo often returns nothing useful; test with a real IP or pick a city manually.

## SxGeo file missing

Path: `assets/components/geolocation2/vendor/sypexgeo/data/SxGeoCity.dat`.

Run:

```bash
php assets/components/geolocation2/bin/update-sxgeo.php
```

or reinstall package assets.

## POST action.php CSRF error

- PHP session must work on the front (cookie, same domain).
- Use fresh `csrf` from `action=state` after reload.
- Do not full-page cache modal markup without excluding session.

## Empty city list in modal

- Fill `gl_cities` in the manager or import CSV.
- For `action=search` check `query` and active records in DB.

## Package provider not found

modstore package: in **Installer** add provider `modstore.pro` → `https://modstore.pro/extras/`.

## geolocation2_debug

Set `geolocation2_debug = 1`, reproduce, check **Manage → Error log**. Set back to `0` on production.

## Manager permissions

Editing the catalog requires `geolocation2_save` for the user policy.
