---
title: GeoLocation2Initialize
description: GeoLocation2 modal CSS/JS and action.php config
---

# GeoLocation2Initialize

Loads modal assets and sets global config for `modal.js`. Nothing visible on the page: output is `<link>`, `<script>` tags and `window.GeoLocation2Web`.

Call **once** on any page that uses [GeoLocation2Modal](GeoLocation2Modal) or `[data-gl2-data-live]` blocks.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `loadBootstrap` | `0` | Bootstrap 5.3 from jsDelivr (CSS + bundle JS) |
| `loadCss` | `1` | `assets/.../css/web/modal.css` |
| `loadJs` | `1` | `assets/.../js/web/modal.js` (defer) |
| `toPlaceholder` | `0` | Write output to placeholder instead of echo |

If Bootstrap 5 is already in the theme, keep `loadBootstrap=0`.

## Call

::: code-group

```modx
[[!GeoLocation2Initialize]]
[[!GeoLocation2Initialize? &loadBootstrap=`1`]]
```

```fenom
{'!GeoLocation2Initialize' | snippet}
{'!GeoLocation2Initialize' | snippet : ['loadBootstrap' => 1, 'loadCss' => 1, 'loadJs' => 1]}
```

:::

## HTML output

Simplified fragment:

```html
<link rel="stylesheet" href="/assets/components/geolocation2/css/web/modal.css?v=…">
<script>window.GeoLocation2Web = Object.assign({}, window.GeoLocation2Web || {}, {"actionUrl":"/assets/components/geolocation2/action.php","messages":{"networkError":"…"}});</script>
<script src="/assets/components/geolocation2/js/web/modal.js?v=…" defer></script>
```

With `loadBootstrap=1`, Bootstrap 5.3.3 CDN links are added.

## Related snippets

| Snippet | Dependency |
|---------|------------|
| GeoLocation2Modal | Needs CSS/JS; without Initialize use `includeAssets=1` on Modal (legacy) |
| GeoLocation2Data + `liveUpdate` | `modal.js` calls `action=data` after city change |
| GeoLocation2Current | Does not require Initialize |

See [GeoLocation2Modal](GeoLocation2Modal), [FAQ](../faq).
