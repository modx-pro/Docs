---
title: mxQuickView.initialize
---
# Snippet mxQuickView.initialize

Loads mxQuickView frontend assets, sets `window.mxqvConfig` and outputs the modal container(s).

## What it does

- Loads `css/mxqv.min.css` (falls back to `css/mxqv.css` if not found).
- Publishes `window.mxqvConfig` (`connectorUrl`, `mouseoverDelay`, `modalSize`, `modalLibrary`, `debug`, `loadingText`).
- Loads `js/mxqv.min.js` (falls back to `js/mxqv.js` if not found).
- Always outputs the native modal container (`#mxqv-modal-backdrop`, `#mxqv-modal`).
- For `modalLibrary=bootstrap` also outputs the `#mxqv-bootstrap-modal` container and loads Bootstrap CSS/JS.
- For `modalLibrary=fancybox` loads Fancybox CSS/JS.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `modalSize` | overrides `mxquickview_modal_size` | `native`/`bootstrap` only: `modal-sm`, `modal-lg`, `modal-xl` |
| `mouseoverDelay` | overrides `mxquickview_mouseover_delay` | Empty string uses the setting (default 300 ms) |
| `modalLibrary` | `native` | `native`, `bootstrap`, `fancybox` (`bootstrap5` alias) |
| `debug` | `mxquickview_debug` | Not in transport snippet properties in the manager; pass `&debug=` in the call |
| `loadingText` | lexicon `mxqv_loading` | Not in transport properties; pass `&loadingText=` |
| `fancyboxCss` | `mxquickview_fancybox_css` if omitted or empty | Fancybox CSS URL/path |
| `fancyboxJs` | same | Fancybox JS |
| `bootstrapCss` | same | Bootstrap CSS |
| `bootstrapJs` | same | Bootstrap JS |

## Usage

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

With parameters:

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalLibrary=`bootstrap`
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
  &debug=`1`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalLibrary' => 'bootstrap',
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350,
  'debug' => 1
]}
```

:::
