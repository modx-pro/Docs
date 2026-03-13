---
title: API and interfaces
---
# API and interfaces

## Snippet `mxQuickView.initialize`

Loads quick view CSS/JS and outputs the built-in modal HTML.

### Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `modalSize` | from `mxquickview_modal_size` | Modal size: `modal-sm`, `modal-lg`, `modal-xl` |
| `mouseoverDelay` | from `mxquickview_mouseover_delay` | Delay before load on hover |
| `modalLibrary` | `native` | Modal mode: `native`, `bootstrap`, `fancybox` (`bootstrap5` supported as alias) |
| `debug` | `0` | Enable diagnostic logging to console (`[mxqv]`) |
| `loadingText` | from lexicon `mxqv_loading` | Loading indicator text in modal/selector |
| `fancyboxCss` | empty | URL/path to Fancybox CSS. If empty: bundled `assets/components/mxquickview/vendor/fancybox/fancybox.css`, else CDN |
| `fancyboxJs` | empty | URL/path to Fancybox JS. If empty: bundled `assets/components/mxquickview/vendor/fancybox/fancybox.umd.js`, else CDN |
| `bootstrapCss` | empty | URL/path to Bootstrap CSS for `modalLibrary=bootstrap`. If empty: bundled file, else CDN |
| `bootstrapJs` | empty | URL/path to Bootstrap JS for `modalLibrary=bootstrap`. If empty: bundled file, else CDN |

### Trigger data attributes

| Attribute | Description |
| --- | --- |
| `data-mxqv-click` | Load on click |
| `data-mxqv-mouseover` | Load on hover |
| `data-mxqv-mode` | Output mode: `modal` or `selector` (default `modal`) |
| `data-mxqv-action` | Render type: `chunk`, `snippet`, `template` (default `chunk`) |
| `data-mxqv-element` | Chunk/snippet/template name or ID |
| `data-mxqv-id` | Resource ID |
| `data-mxqv-title` | Modal title for `mode=modal` |
| `data-mxqv-output` | CSS selector for container when `mode=selector` |
| `data-mxqv-context` | Context key (for multi-language / multi-site) |

### Call examples

::: code-group

```modx
[[!mxQuickView.initialize?
  &modalSize=`modal-xl`
  &mouseoverDelay=`350`
  &modalLibrary=`native`
  &debug=`1`
  &loadingText=`Loading...`
]]
```

```fenom
{'!mxQuickView.initialize'|snippet:[
  'modalSize' => 'modal-xl',
  'mouseoverDelay' => 350,
  'modalLibrary' => 'native',
  'debug' => 1,
  'loadingText' => 'Loading...'
]}
```

:::

### What it adds to the page

- `<link ... mxqv.min.css?v=filemtime>` (fallback to `mxqv.css` if min not found)
- `<script>window.mxqvConfig = ...</script>`
- `<script src="...mxqv.min.js?v=filemtime" defer></script>` (fallback to `mxqv.js` if min not found)
- Native modal markup (`#mxqv-modal-backdrop`, `#mxqv-modal`)
- For `modalLibrary=bootstrap`: container `#mxqv-bootstrap-modal` and Bootstrap from `bootstrapCss/bootstrapJs` or bundled files; if missing, Bootstrap CDN
- For `modalLibrary=fancybox`: Fancybox from `fancyboxCss/fancyboxJs` or bundled files; if missing, CDN `@fancyapps/ui`

## Native modal CSS variables

Variables apply to the built-in modal (`modalLibrary = native`) and are defined in:

- `assets/components/mxquickview/css/mxqv.css`

### Full list

| Variable | Default | Purpose |
| --- | --- | --- |
| `--mxqv-backdrop-bg` | `rgba(0, 0, 0, 0.5)` | Backdrop background |
| `--mxqv-backdrop-z-index` | `1050` | Backdrop z-index |
| `--mxqv-backdrop-padding-mobile` | `0` | Backdrop padding on mobile |
| `--mxqv-backdrop-padding-tablet` | `1rem` | Backdrop padding on tablet/desktop |
| `--mxqv-modal-bg` | `#fff` | Modal background |
| `--mxqv-modal-radius-mobile` | `0` | Modal radius on mobile |
| `--mxqv-modal-radius-tablet` | `0.25rem` | Modal radius on tablet/desktop |
| `--mxqv-modal-shadow` | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)` | Modal shadow |
| `--mxqv-modal-width-mobile` | `100%` | Modal width on mobile |
| `--mxqv-modal-width-tablet` | `90vw` | Modal width on tablet/desktop |
| `--mxqv-modal-max-width-mobile` | `100%` | Modal max-width on mobile |
| `--mxqv-modal-max-width-tablet` | `90vw` | Modal max-width on tablet/desktop |
| `--mxqv-modal-max-height-mobile` | `100%` | Modal max-height on mobile |
| `--mxqv-modal-max-height-tablet` | `90vh` | Modal max-height on tablet/desktop |
| `--mxqv-modal-size-sm` | `24rem` | Max width for `modal-sm` |
| `--mxqv-modal-size-lg` | `50rem` | Max width for `modal-lg` |
| `--mxqv-modal-size-xl` | `70rem` | Max width for `modal-xl` |
| `--mxqv-header-gap` | `0.5rem` | Header element spacing |
| `--mxqv-header-padding` | `1rem 1.25rem` | Header padding |
| `--mxqv-header-border-color` | `#dee2e6` | Header border |
| `--mxqv-title-font-size` | `1.25rem` | Title font size |
| `--mxqv-title-font-weight` | `600` | Title font weight |
| `--mxqv-actions-gap` | `0.25rem` | Action button spacing |
| `--mxqv-btn-padding` | `0.25rem 0.5rem` | Control button padding |
| `--mxqv-btn-radius` | `0.25rem` | Control button radius |
| `--mxqv-btn-font-size` | `1.25rem` | Control button font size |
| `--mxqv-close-font-size` | `1.5rem` | Close button font size |
| `--mxqv-body-padding` | `1.25rem` | Body padding |
| `--mxqv-btn-hover-bg` | `#f0f0f0` | Header button hover background |
| `--mxqv-loading-color` | `#6c757d` | Loading indicator text color |
| `--mxqv-loading-padding` | `1rem 0` | Loading indicator padding |

### Override example

```css
:root {
  --mxqv-modal-size-lg: 56rem;
  --mxqv-modal-size-xl: 76rem;
  --mxqv-modal-bg: #ffffff;
  --mxqv-header-border-color: #e9ecef;
  --mxqv-backdrop-bg: rgba(0, 0, 0, 0.6);
}
```

## Connector `assets/components/mxquickview/connector.php`

### Endpoint

- Method: `POST`
- Request `Content-Type`: `application/x-www-form-urlencoded`
- Response: JSON `{ success, html?, message? }`

### POST parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `action` | yes | Only `render` |
| `data_action` | no | `chunk`, `snippet`, `template` (default `chunk`) |
| `element` | yes | Chunk/snippet/template name |
| `id` | yes | Resource ID (integer > 0) |
| `context` | no | Context key; invalid value falls back to `web` |
| `mode` | no | `modal` or `selector` (used for snippet/template render) |
| `output` | no | CSS selector for target container (for `mode=selector`) |
| `modal_library` | no | `native`, `bootstrap`, `fancybox` (used for correct selector with cart snippets) |

### Success response

```json
{
  "success": true,
  "html": "<div>...</div>"
}
```

### Error response

```json
{
  "success": false,
  "message": "Chunk not allowed",
  "html": ""
}
```

## Errors and messages

| Condition | `message` |
| --- | --- |
| Method not POST | `Invalid request method` |
| `action != render` | `mxqv_invalid_action` (lexicon) |
| `index.php` not found | `index.php not found` |
| `element` empty or `id <= 0` | `Missing element or id` |
| Resource not found | `Resource not found` |
| No view permission | `Access denied` |
| Chunk not in whitelist | `Chunk not allowed` |
| Chunk not found | `Chunk not found` |
| Snippet not in whitelist | `Snippet not allowed` |
| Snippet not found | `Snippet not found` |
| Template not in whitelist | `Template not allowed` |
| Template not found | `Template not found` |
| Unsupported `data_action` | `Invalid action` |

Note: error text is localized via lexicon `mxquickview:default` (keys `mxqv_*`).

## JS API (via events)

The component does not export a separate API object but dispatches `CustomEvent` on `document`:

| Event | When | `detail` |
| --- | --- | --- |
| `mxqv:open` | Modal opened | `{ title }` |
| `mxqv:close` | Modal closed | — |
| `mxqv:loaded` | Content inserted into modal | `{ content }` |

## Request example

```javascript
const response = await fetch('/assets/components/mxquickview/connector.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    action: 'render',
    data_action: 'chunk',
    element: 'mxqv_product',
    id: '7'
  })
});

const data = await response.json();
```
