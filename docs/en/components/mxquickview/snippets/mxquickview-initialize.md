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
| `mouseoverDelay` | overrides setting; transport default `''` | Empty property → 0 in PHP, effectively 300 ms in JS ([issue #1](https://github.com/Ibochkarev/mxQuickView/issues/1)) |
| `modalLibrary` | `native` | `native`, `bootstrap`, `fancybox` (`bootstrap5` alias) |
| `debug` | `mxquickview_debug` | Not in transport snippet properties in the manager; pass `&debug=` in the call |
| `loadingText` | lexicon `mxqv_loading` | Not in transport properties; pass `&loadingText=` |
| `fancyboxCss` | setting when parameter omitted | Empty snippet property skips `mxquickview_fancybox_css` |
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
