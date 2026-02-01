# JavaScript

Architecture and loading of mFilter JavaScript.

## Architecture

mFilter uses a two-layer architecture:

```
┌─────────────────────────────────────────┐
│              mfilter.js                  │  ← Entry point, auto-init
├─────────────────────────────────────────┤
│              UI Layer                    │  ← DOM bindings for SSR
│            (FilterUI.js)                 │
├─────────────────────────────────────────┤
│             API Core                     │  ← Headless core
│  ApiClient.js │ FilterAPI.js │ hooks.js │
└─────────────────────────────────────────┘
```

### API Core (Headless)

DOM-independent core:

- **ApiClient.js** — HTTP client for server requests
- **FilterAPI.js** — filter API methods
- **hooks.js** — hook system for extension
- **mfilter.headless.js** — init and export of `window.mfilter`

### UI Layer (SSR)

DOM bindings for server-rendered markup:

- **FilterUI.js** — form, results, pagination
- **mfilter.slider.js** — noUiSlider integration
- **mfilter.js** — auto-init

## Files

| File | Size | Purpose |
|------|--------|------------|
| `core/ApiClient.js` | ~3 KB | HTTP client |
| `core/FilterAPI.js` | ~5 KB | API methods |
| `modules/hooks.js` | ~3 KB | Hook system |
| `mfilter.headless.js` | ~4 KB | Headless entry |
| `ui/FilterUI.js` | ~40 KB | UI for SSR |
| `mfilter.slider.js` | ~8 KB | noUiSlider integration |
| `mfilter.js` | ~4 KB | Auto-init |

## Loading

### Automatic (default)

The mFilter plugin loads scripts on pages with filters.

Controlled by system setting `mfilter.register_frontend`:

- `true` — auto-load (default)
- `false` — disable, load manually

### Manual loading

```html
<!-- Base styles -->
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">

<!-- API Core (required) -->
<script src="/assets/components/mfilter/js/web/core/ApiClient.js"></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js"></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>

<!-- UI Layer (for SSR) -->
<script src="/assets/components/mfilter/js/web/ui/FilterUI.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.slider.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.js"></script>
```

### Minimal set (Headless only)

For SPA apps:

```html
<script src="/assets/components/mfilter/js/web/core/ApiClient.js"></script>
<script src="/assets/components/mfilter/js/web/core/FilterAPI.js"></script>
<script src="/assets/components/mfilter/js/web/modules/hooks.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>
```

## Configuration

Global config via `window.mfilterConfig`:

```html
<script>
window.mfilterConfig = {
    apiUrl: '/assets/components/mfilter/api.php',
    resourceId: 5,      // Category ID
    debug: false        // Debug mode
};
</script>
```

## Initialization

### Automatic

Elements with `data-mfilter` are initialized automatically:

```html
<form data-mfilter data-mfilter-results=".results">
    <!-- filters -->
</form>
```

### Manual

```javascript
// Create instance
const instance = mfilterInit('#my-filter', {
    ajax: true,
    autoSubmit: true,
    autoSubmitDelay: 500
});

// Get existing instance
const filter = mfilterGet('my-filter');

// Destroy instance
mfilterDestroy('my-filter');
```

## Data attributes

### On container/form

| Attribute | Description |
|---------|----------|
| `data-mfilter` | Marker for auto-init |
| `data-mfilter-results` | CSS selector for results block |
| `data-mfilter-pagination` | CSS selector for pagination |
| `data-mfilter-ajax` | Enable AJAX (true/false) |
| `data-mfilter-mode` | Mode: form or instant |
| `data-mfilter-auto-submit` | Auto-submit (true/false) |
| `data-mfilter-delay` | Auto-submit delay (ms) |
| `data-mfilter-seo-url` | SEO URL (true/false) |
| `data-mfilter-push-state` | Update URL (true/false) |
| `data-mfilter-scroll-to-results` | Scroll to results |
| `data-mfilter-scroll-offset` | Scroll offset (px) |
| `data-mfilter-debug` | Debug mode |
| `data-base-url` | Category base URL |
| `data-resource-id` | Resource ID |

### On elements

| Attribute | Description |
|---------|----------|
| `data-filter` | Filter key (on block) |
| `data-range="min"` | Range min field |
| `data-range="max"` | Range max field |
| `data-mfilter-slider` | Marker for noUiSlider |
| `data-mfilter-sort` | Sort element |
| `data-mfilter-limit` | Limit selector element |
| `data-mfilter-tpl` | Template switch element |

## DOM events

| Event | Description | detail |
|---------|----------|--------|
| `mfilter:ready` | API Core initialized | `{ mfilter }` |
| `mfilter:ui:ready` | UI initialized | `{ instances }` |
| `mfilter:contentLoaded` | New content loaded (AJAX) | `{ container }` |
| `mfilter:beforeSubmit` | Before submit | `{ state, instance }` |
| `mfilter:afterSubmit` | After submit | `{ state, instance }` |
| `mfilter:success` | Success response | `{ response, instance }` |
| `mfilter:error` | Error | `{ error, instance }` |

### Subscribing to events

```javascript
document.addEventListener('mfilter:ui:ready', (e) => {
    console.log('Instances:', e.detail.instances);
});

document.addEventListener('mfilter:success', (e) => {
    console.log('Results:', e.detail.response);
});
```

## Global objects

| Object | Description |
|--------|----------|
| `window.mfilter` | API Core (headless) |
| `window.mfilterHooks` | Hook system |
| `window.MFilterUI` | UI constructor |
| `window.MFilterSlider` | Slider API |
| `window.mfilterInit()` | Create instance |
| `window.mfilterGet()` | Get instance |
| `window.mfilterDestroy()` | Destroy instance |

## noUiSlider

Range filters use [noUiSlider](https://refreshless.com/nouislider/).

### Loading

Load noUiSlider before mFilter scripts:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.css">
<script src="https://cdn.jsdelivr.net/npm/nouislider@15/dist/nouislider.min.js"></script>
```

### Customizing the slider

```javascript
// Create slider manually
MFilterSlider.create('#my-slider', {
    start: [1000, 50000],
    range: { min: 0, max: 100000 },
    step: 100,
    tooltips: true,
    format: MFilterSlider.formats.currency
});

// Update range
MFilterSlider.updateRange('#my-slider', 0, 200000);

// Set values
MFilterSlider.set('#my-slider', [5000, 30000]);
```

### Formats

```javascript
MFilterSlider.formats.integer   // 12345
MFilterSlider.formats.float     // 123.45
MFilterSlider.formats.currency  // 12 345 ₽
MFilterSlider.formats.percent   // 50%
```

## jQuery (optional)

If jQuery is loaded, the plugin is available:

```javascript
$('#my-filter').mfilter({
    ajax: true,
    autoSubmit: true
});
```
