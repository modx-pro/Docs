---
title: mxQuickView.initialize
---
# Snippet mxQuickView.initialize

Loads mxQuickView frontend assets, sets `window.mxqvConfig` and outputs the modal container(s).

## What it does

- Loads `css/mxqv.min.css` (fallback to `css/mxqv.css` if not found).
- Publishes `window.mxqvConfig` (`connectorUrl`, `mouseoverDelay`, `modalSize`, `modalLibrary`, `debug`, `loadingText`).
- Loads `js/mxqv.min.js` (fallback to `js/mxqv.js` if not found).
- Always outputs the native modal container (`#mxqv-modal-backdrop`, `#mxqv-modal`).
- For `modalLibrary=bootstrap` also outputs bootstrap container (`#mxqv-bootstrap-modal`) and loads Bootstrap CSS/JS.
- For `modalLibrary=fancybox` loads Fancybox CSS/JS.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `modalSize` | from `mxquickview_modal_size` | Modal size (`modal-sm`, `modal-lg`, `modal-xl`) |
| `mouseoverDelay` | from `mxquickview_mouseover_delay` | Hover load delay in ms |
| `modalLibrary` | `native` | Modal mode: `native`, `bootstrap`, `fancybox` (`bootstrap5` alias) |
| `debug` | `0` | Diagnostic logging to console (`[mxqv]`) |
| `loadingText` | from lexicon `mxqv_loading` | Loading indicator text |
| `fancyboxCss` | empty | Override CSS for Fancybox |
| `fancyboxJs` | empty | Override JS for Fancybox |
| `bootstrapCss` | empty | Override CSS for Bootstrap |
| `bootstrapJs` | empty | Override JS for Bootstrap |

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
