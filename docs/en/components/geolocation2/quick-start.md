---
title: Quick start
description: Minimal GeoLocation2 setup — initialize, modal, current city
---

# Quick start

## 1. Settings

In **System → System Settings → geolocation2** set:

| Key | Recommended for start |
|-----|----------------------|
| `geolocation2_detect_method` | `sxgeo` — detect by IP on first visit |
| `geolocation2_debug` | `0` in production, `1` while debugging |

Details: [System settings](settings).

## 2. Site template

In `<head>` or before `</body>` add initialization (CSS/JS and Bootstrap 5 if not already on the page):

::: code-group

```fenom
{'!GeoLocation2Initialize' | snippet}
```

```modx
[[!GeoLocation2Initialize]]
```

:::

Parameters `loadBootstrap`, `loadCss`, `loadJs` — see [GeoLocation2Initialize](snippets/GeoLocation2Initialize).

## 3. Modal and current city

In header or footer:

::: code-group

```fenom
{'!GeoLocation2Current' | snippet : [
  'tpl' => 'tpl.GeoLocation2.current'
]}
{'!GeoLocation2Modal' | snippet}
```

```modx
[[!GeoLocation2Current? &tpl=`tpl.GeoLocation2.current`]]
[[!GeoLocation2Modal]]
```

:::

Chunk `tpl.GeoLocation2.current` ships with the package. Use `data-gl2-open="1"` on the button to open the modal.

## 4. Verify

1. Open the site in a private window.
2. Modal should offer a city (SxGeo) or a city list.
3. After selection the city is stored in `$_SESSION['gl2']`.
4. `GET /assets/components/geolocation2/action.php?action=state` (with `X-Requested-With`) returns JSON with `state`, `confirmed` and session fields.

## 5. City data

If you filled `gl_data` in the manager:

::: code-group

```fenom
{'!GeoLocation2Data' | snippet : [
  'forCurrent' => 1,
  'tpl' => 'tpl.GeoLocation2.data.current'
]}
```

```modx
[[!GeoLocation2Data? &forCurrent=`1` &tpl=`tpl.GeoLocation2.data.current`]]
```

:::

Next: [Integration](integration), [Web API](api-action), [FAQ](faq).
