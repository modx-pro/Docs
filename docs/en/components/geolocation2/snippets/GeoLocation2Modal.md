---
title: GeoLocation2Modal
description: Bootstrap 5 city confirm and change modal
---

# GeoLocation2Modal

Renders Bootstrap 5 modal and “Your city” toolbar. Uses session, CSRF and [action.php](../api-action). Sets `gl2_*` placeholders on the page (used by [GeoLocation2Current](GeoLocation2Current) and Fenom).

Load [GeoLocation2Initialize](GeoLocation2Initialize) before the modal, or pass `includeAssets=1` (legacy single-snippet mode).

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | `tpl.GeoLocation2.modal` | Modal + toolbar chunk |
| `itemTpl` | `tpl.GeoLocation2.modal.item` | City row in list |
| `modalShow` | `1` | Auto-show on first visit |
| `includeAssets` | `0` | Inline CSS/JS from this snippet |
| `loadBootstrap` | `0` | Bootstrap 5 CDN (with `includeAssets=1`) |
| `preferRealWhenDefault` | `1` | Show SxGeo name in question when default city |
| `dismissSetsDefault` | `1` | Close with X → default city |
| `modalId` | `geolocation2Modal` | HTML `id` |
| `unknownCityLabel` | lexicon | Unknown city label |
| `defaultCityLabel` | lexicon | Default city label |
| `toPlaceholder` | `0` | Output to placeholder |

## Call

::: code-group

```modx
[[!GeoLocation2Initialize]]
[[!GeoLocation2Modal? &modalShow=`1`]]
[[!GeoLocation2Current]]
```

```fenom
{'!GeoLocation2Initialize' | snippet}
{'!GeoLocation2Modal' | snippet : ['modalShow' => 1]}
{'!GeoLocation2Current' | snippet}
```

:::

## Behavior

1. **Confirm step** — “Your city — **Moscow**?” Buttons Yes (`action=confirm`) and Change (list step).
2. **List step** — search field and city list. Search uses `action=search` for cached pages. Initial HTML also lists cities from DB (no-JS fallback).
3. **Toolbar** below modal — current city and `.gl2-open-modal` link.

With `modalShow=1` and `gl2_confirmed=0`, script opens modal after load.

## Markup fragment

From `tpl.GeoLocation2.modal` (simplified):

```html
<div class="modal fade geolocation2-modal" id="geolocation2Modal"
     data-gl2-root data-gl2-action-url="/assets/components/geolocation2/action.php"
     data-gl2-csrf="…" data-gl2-modal-show="1">
  …
</div>
<p class="geolocation2-toolbar">
  <strong class="gl2-toolbar-city">Moscow</strong>
  <a href="#" class="gl2-open-modal">Change</a>
</p>
```

## POST to action.php

| Action | When |
|--------|------|
| `confirm` | Yes on confirm step |
| `save` | Pick city from list |
| `dismiss` | Close via X or backdrop |

Each POST needs `csrf` from `data-gl2-csrf` and header `X-Requested-With: XMLHttpRequest`.

See [GeoLocation2Initialize](GeoLocation2Initialize), [GeoLocation2Current](GeoLocation2Current).
