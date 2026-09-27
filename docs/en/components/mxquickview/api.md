---
title: API and interfaces
---
# API and interfaces

## Snippet `mxQuickView.initialize`

Loads quick view CSS/JS and outputs the built-in modal HTML.

### Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `modalSize` | non-empty property overrides `mxquickview_modal_size` (transport `modal-lg`) | `modal-sm`, `modal-lg`, `modal-xl` for `native` and `bootstrap` only |
| `mouseoverDelay` | non-empty property overrides `mxquickview_mouseover_delay` | Hover delay in ms. Empty property string means “not set”: the setting is used (default 300) |
| `modalLibrary` | `native` | `native`, `bootstrap`, `fancybox` (`bootstrap5` alias). No `window.bootstrap.Modal` or no `#mxqv-bootstrap-modal` → `native`. No Fancybox API (`Fancybox.show`) → `native` |
| `debug` | `mxquickview_debug` when parameter omitted | Console `[mxqv]` logs. Not in manager snippet properties; works via `scriptProperties` |
| `loadingText` | lexicon `mxqv_loading` | Loading text in modal/selector. Not in transport snippet properties |
| `fancyboxCss` | `mxquickview_fancybox_css` if the parameter is omitted or empty | Fancybox CSS URL/path; then bundled files or CDN |
| `fancyboxJs` | same | Fancybox JS |
| `bootstrapCss` | same | Bootstrap CSS for `modalLibrary=bootstrap` |
| `bootstrapJs` | same | Bootstrap JS |

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
| `data-mxqv-parent` | List container for loop |
| `data-mxqv-loop` | `true` — collect sibling triggers for prev/next (click only, not mouseover) |

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
- For `modalLibrary=bootstrap`: container `#mxqv-bootstrap-modal` and Bootstrap from `bootstrapCss/bootstrapJs` or bundled files. If missing, Bootstrap CDN
- For `modalLibrary=fancybox`: Fancybox from `fancyboxCss/fancyboxJs` or bundled files. If missing, CDN `@fancyapps/ui`

## Native modal CSS variables

For `modalLibrary=native` they are defined in `assets/components/mxquickview/css/mxqv.css`.

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

The connector accepts only `POST` with `action=render` and returns JSON.

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
| `context` | no | Context key. Invalid value falls back to `web` |
| `mode` | no | `modal` or `selector`. Only in `renderSnippet` for `msCart` / `msMiniCart` |
| `output` | no | CSS selector. Only for `msCart` with `mode=selector` (snippet `selector` param) |
| `modal_library` | no | `native`, `bootstrap`, `fancybox`. Only for `msCart` default cart selector. Fancybox default selector is empty: the script attaches the token to the current container |

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

JSON field `message` is a **resolved string**, not a key. Before MODX loads, the connector returns English literals.

| Condition | Lexicon key | RU | EN |
| --- | --- | --- | --- |
| Method not POST | `mxqv_invalid_request` exists in lexicon; PHP does not call it | | always `Invalid request method` |
| `action != render` | `mxqv_invalid_action` | | lexicon: Invalid action |
| `index.php` not found | `mxqv_index_not_found` exists; PHP does not call it | | always `index.php not found` |
| Empty `element` or `id <= 0` | `mxqv_missing_element_or_id` | Не переданы element или id | Missing element or id |
| Resource not found | `mxqv_resource_not_found` | Ресурс не найден | Resource not found |
| No view access | `mxqv_access_denied` | Доступ запрещён | Access denied |
| Chunk not in whitelist | `mxqv_chunk_not_allowed` | Чанк не разрешён | Chunk not allowed |
| Chunk not found | `mxqv_chunk_not_found` | Чанк не найден | Chunk not found |
| Snippet not in whitelist | `mxqv_snippet_not_allowed` | Сниппет не разрешён | Snippet not allowed |
| Snippet not found | `mxqv_snippet_not_found` | Сниппет не найден | Snippet not found |
| Template not in whitelist | `mxqv_template_not_allowed` | Шаблон не разрешён | Template not allowed |
| Template not found | `mxqv_template_not_found` | Шаблон не найден | Template not found |
| Unsupported `data_action` | `mxqv_invalid_data_action` | Недопустимый тип рендера | Invalid action |

Snippet name in POST `element` for `data_action=snippet`: leading `!` is stripped (`Render.php`).

## JS API (via events)

There is no separate API object. `CustomEvent` events are dispatched on `document`:

| Event | When | `detail` |
| --- | --- | --- |
| `mxqv:open` | Modal opened | `{ title }` |
| `mxqv:close` | Modal closed | — |
| `mxqv:loaded` | Content inserted into modal | `{ content }` |
| `ms3:cart:updated` | after `reinitIntegrations()` | `{ source: 'mxqv' }` |

### Keyboard (modal open)

- **Escape**: closes only `modalLibrary=native`.
- **← / →**: prev/next in loop list (same as `[data-mxqv-nav]`), `native`/`bootstrap` only.

### msCart / ms3 render markers

After `msCart` render, HTML may include hidden `<span class="mxqv-ms3-render">` with:

- `data-mxqv-ms3-render-token` — token for `ms3Config.render.cart`
- `data-mxqv-ms3-render-selector` — optional cart container CSS selector

JS pushes the token into `window.ms3Config.render.cart` without inline script.

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
